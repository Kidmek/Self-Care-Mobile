import i18next from 'i18next';

export const makeObjects = (values: string[]) => {
  const res: Record<string, string> = {};
  values.forEach((v) => {
    res[v] = v;
  });
  return res;
};

export const getMinutes = (start: Date, end: Date) => {
  // Difference in milliseconds
  const difference = end.getTime() - start.getTime();

  // Convert milliseconds to minutes
  const minutesDifference = Math.floor(difference / 60000);

  return minutesDifference;
};

export const checkIfAmh = () => {
  return i18next.language === 'am';
};
