function enumKeys(enu: any): string[] {
  return Object.keys(enu)
    .map(key => enu[key])
    .filter(value => typeof value === 'string');
}

function enumValues(enu: { [s: number]: string }) {
  const keys = enumKeys(enu);
  return keys.map(k => enu[k.trim()]);
}

export { enumKeys, enumValues };
