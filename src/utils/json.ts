function prettyJSON(data: object): string {
  return JSON.stringify(data, null, 2);
}

export { prettyJSON };
