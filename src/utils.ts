export function querySelectText(e: Element | Document, query: string): string {
  return e.querySelector(query)?.textContent?.trim() ?? "";
}

export function querySelectNumber(
  e: Element | Document,
  query: string,
): number {
  const t = e.querySelector(query)?.textContent?.trim()
    .replace(/[,$]/g, "")
    .replace("−", "-") ?? "";

  return parseFloat(t);
}
