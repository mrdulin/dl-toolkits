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

function isValidDate(s: string): boolean {
  const timestamp = Date.parse(s);
  return !Number.isNaN(timestamp);
}

export { ddmmyyyy, isValidDate };
