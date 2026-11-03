import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * On-Demand ISR Revalidation API Route
 * 
 * This endpoint allows triggering ISR revalidation for specific pages
 * when content is updated in Supabase or other data sources.
 * 
 * Usage:
 *   POST /api/revalidate
 *   {
 *     "secret": "REVALIDATION_SECRET",
 *     "paths": ["/clinic/slug/", "/dentist/slug/"],
 *     "tags": ["clinics", "dentists"]
 *   }
 * 
 * OR use query params:
 *   POST /api/revalidate?secret=xxx&path=/clinic/slug/
 * 
 * Security: Requires REVALIDATION_SECRET env var to be set.
 */

interface RevalidateRequest {
  secret?: string;
  paths?: string[];
  tags?: string[];
  path?: string;
  tag?: string;
}

const MAX_PATHS_PER_CALL = 10;
// Clinic, dentist and blog pages, and the Dubai guides. Legacy city and listing
// pages refresh on their daily ISR schedule instead.
const REVALIDATABLE = /^\/(clinic|dentist|blog|services|insurance)\/[^/]+\/$|^\/dubai\/[^/]+\/$/;

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '/';
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Get secret from body or query
  const body = req.body as RevalidateRequest;
  const secret = body.secret || req.query.secret;
  const revalidationSecret = process.env.REVALIDATION_SECRET;

  if (!revalidationSecret) {
    return res.status(503).json({ error: 'Revalidation endpoint is not configured' });
  }

  if (secret !== revalidationSecret) {
    return res.status(401).json({ error: 'Invalid revalidation secret' });
  }

  try {
    const results: { path?: string; tag?: string; success: boolean; error?: string }[] = [];

    // Revalidate paths. Each one re-runs the page's data queries, and this is
    // called by a database webhook on every row change, so bulk updates could
    // trigger thousands of rebuilds. Only profile/guide pages, at most 10 per call.
    const requested = body.paths || (body.path ? [body.path] : []);
    const paths = Array.from(new Set(requested.map((p) => normalizePath(String(p)))))
      .filter((p) => REVALIDATABLE.test(p))
      .slice(0, MAX_PATHS_PER_CALL);
    for (const path of paths) {
      try {
        const normalizedPath = normalizePath(path);
        await res.revalidate(normalizedPath);
        results.push({ path: normalizedPath, success: true });
      } catch (err) {
        results.push({ path, success: false, error: err instanceof Error ? err.message : 'Unknown error' });
      }
    }

    // Revalidate tags
    const tags = body.tags || (body.tag ? [body.tag] : []);
    for (const tag of tags) {
      try {
        results.push({ tag, success: false, error: 'Tag revalidation is only supported for App Router caches.' });
      } catch (err) {
        results.push({ tag, success: false, error: err instanceof Error ? err.message : 'Unknown error' });
      }
    }


    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    return res.status(200).json({
      revalidated: true,
      results,
      summary: {
        total: results.length,
        success: successCount,
        failed: failCount,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('[On-Demand ISR] Revalidation failed:', err);
    return res.status(500).json({
      error: 'Revalidation failed',
      detail: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
