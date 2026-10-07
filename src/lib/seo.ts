// Google truncates <title> around 60 chars and meta descriptions around 160. Articles
// (human- or agent-written) often exceed that, so clamp at render time instead of
// asking editors to count characters.

/** "Title — Brand" when it fits, otherwise the bare title (brand is the first thing to drop). */
export function seoTitle(title: string, suffix: string, max = 62): string {
  const full = `${title} — ${suffix}`;
  return full.length <= max ? full : title;
}

/** Cut at a word boundary and add an ellipsis when over the limit. */
export function seoDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\-–—\s]+$/, '') + '…';
}
