
export function querySelectText(e: Element | Document, query: string): string {
  return e.querySelector(query)?.textContent?.trim() ?? "";
}