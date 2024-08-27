const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const toPrettyFarsiNumber = (n: number | string) => {
  const sn = typeof n === "number" ? String(n) : n;

  return sn.replace(/\d/g, (x: string) => farsiDigits[Number(x)]);
};
