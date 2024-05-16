/**
 * Filters out numbers, dashes and filler strings from a string.
 *
 * @param str - The input string to be filtered.
 * @returns {string} The filtered string.
 */
export function filterOutFiller(str: string): string {
  return str.replace(/Account|[\d]|\s-/g, "").trim();
}

/**
 * Selects text content from a specified element or document based on a query selector.
 *
 * @param e - The parent element or document from which to query.
 * @param query - The query selector string to identify the target element.
 * @returns {string} The text content of the selected element, trimmed of whitespace. Returns an empty string if the element is not found.
 */
export function querySelectText(e: Element | Document, query: string): string {
  const s = e.querySelector(query)?.textContent?.trim() ?? "";
  return filterOutFiller(s);
}

/**
 * Selects text content from a specified element or document and parses it as a number.
 *
 * @param e - The parent element or document from which to query.
 * @param query - The query selector string to identify the target element.
 * @returns {number} The numeric value of the selected element's text content. Returns NaN if the content is not a valid number.
 */
export function querySelectNumber(
  e: Element | Document,
  query: string,
): number {
  const textContent = e
    .querySelector(query)
    ?.textContent?.trim() ?? "";

  return stringMoneyToFloat(textContent);
}
/**
 * Converts a string representing a monetary value to a floating point number.
 *
 * @param str - The string to be converted.
 * @returns {number} The numeric value of the input string. Returns NaN if the input is not a valid number.
 */
export function stringMoneyToFloat(str: string): number {
  return parseFloat(
    str.replace(/[,$]/g, "")
      .replace("−", "-"),
  );
}
