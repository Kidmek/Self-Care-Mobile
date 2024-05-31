export const makeObjects = (values: string[]) => {
  const res: Record<string, string> = {};
  values.forEach((v) => {
    res[v] = v;
  });
  return res;
};
