function objToMap(obj: object) {
  const entries = Object.entries(obj);
  return new Map(entries);
}

function shallowClone(map: Map<any, any>) {
  return new Map(map);
}

export { objToMap, shallowClone };
