// CMS titles are sometimes stored all in lower case ("how much is the average
// price for teeth whitening"). Show them in sentence case with proper nouns.
const PROPER = ['UAE', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Umm Al Quwain', 'Invisalign', 'DHA', 'DoH', 'MOHAP', 'JBR', 'JLT', 'JVC', 'DIFC', 'AED', 'Hollywood'];

export function displayTitle(title: string | null | undefined): string {
  const t = (title || '').trim();
  if (!t || /[A-Z]/.test(t)) return t;
  let out = t.charAt(0).toUpperCase() + t.slice(1);
  for (const p of PROPER) out = out.replace(new RegExp(`\\b${p}\\b`, 'gi'), p);
  return out;
}
