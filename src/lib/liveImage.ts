// Image hosts that no longer exist. Clinic photos were uploaded to an earlier
// Supabase project that has been deleted, so those URLs can never load.
const DEAD_HOSTS = ['apztvwpogywvounohqtk.supabase.co'];
// AI image generators. Generated pictures are not used on the site (they can
// mislead readers about real treatment results), so these are dropped too.
const AI_IMAGE_HOSTS = ['cdn.aimlapi.com', 'oaidalleapiprodscus.blob.core.windows.net', 'replicate.delivery', 'pbxt.replicate.delivery', 'fal.media', 'v3.fal.media'];

/** The URL if it can load, otherwise null so the page shows its placeholder. */
export function liveImage(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    return DEAD_HOSTS.includes(u.hostname) || AI_IMAGE_HOSTS.includes(u.hostname) ? null : url;
  } catch {
    return null;
  }
}

/** Remove <img> tags whose source cannot load or is AI-generated from CMS HTML. */
export function stripBlockedImages(html: string): string {
  return html.replace(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi, (tag, src) => (liveImage(src) ? tag : ''));
}
