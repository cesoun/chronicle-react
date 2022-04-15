/**
 * Truncate a string to the desired length.
 * @param str The string to truncate
 * @param length Desired string length
 * @param ellipsis Append ellipsis (...) if true. Is appended to total str length. (eg. length = 25 chars + 3 chars (...))
 * @constructor
 */
export function Truncate(
  str: string,
  length: number,
  ellipsis: boolean
): string {
  if (str.length <= length) return str;

  const truncated: string = str.slice(0, length);
  return ellipsis ? truncated + '...' : truncated;
}
