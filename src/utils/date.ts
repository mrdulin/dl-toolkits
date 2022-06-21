/**
 * Convert a date string to a date string in the format dd/mm/yyyy
 * @param {string} s - string
 * @returns The date in the format dd/mm/yyyy
 */
function ddmmyyyy(s: string) {
  if (!isValidDate(s)) {
    throw new Error('invalid date string');
  }
  const date = new Date(s);
  const y = date.getFullYear();
  let m = (date.getMonth() + 1).toString();
  m = m.length === 1 ? '0' + m : m;
  let d = date.getDate().toString();
  d = d.length === 1 ? '0' + d : d;
  return d + '/' + m + '/' + y;
}

/**
 * "Check if the string is a valid date."
 *
 * Here's a longer summary: "Check if the string is a valid date. A valid date is a string that can be
 * parsed into a JavaScript Date object."
 *
 * Here's a longer summary with more detail: "Check if the string is a valid date. A valid date is a
 * string that can be parsed into a JavaScript Date object. If the string is a valid date, return true.
 * Otherwise, return false."
 *
 * Here's a longer summary with more detail: "Check if the string is a valid date. A valid date is a
 * string that can be parsed into a JavaScript Date object. If the string is a valid date, return true.
 * Otherwise, return false
 * @param {string} s - string
 * @returns A boolean value.
 */
function isValidDate(s: string): boolean {
  const timestamp = Date.parse(s);
  return !Number.isNaN(timestamp);
}

export { ddmmyyyy, isValidDate };
