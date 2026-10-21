// Search results show about 60 characters of a title and 155 of a description.

/** Add the suffix only when the result still fits in a search result title. */
export function fitTitle(base: string, suffix: string, max = 58): string {
  return `${base}${suffix}`.length <= max ? `${base}${suffix}` : base;
}

/** Shorten a description at a word boundary. */
export function clip(text: string, max = 158): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
}
