// Image hosts that no longer exist. Clinic photos were uploaded to an earlier
// Supabase project that has been deleted, so those URLs can never load.
const DEAD_HOSTS = ['apztvwpogywvounohqtk.supabase.co'];

/** The URL if it can load, otherwise null so the page shows its placeholder. */
export function liveImage(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    return DEAD_HOSTS.includes(u.hostname) ? null : url;
  } catch {
    return null;
  }
}
