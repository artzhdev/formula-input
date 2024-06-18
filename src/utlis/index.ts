export const split = (value: string) => {
  const regex = /[+\-*\/^()]/;

  const tokens = value.split(regex);

  return tokens.filter((token) => token !== "");
};
