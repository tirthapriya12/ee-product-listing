export const formatCurrency = (
  amount: number,
  currency: string = "INR"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const textEllipsis = (text: string, maxLength: number): string => {
  if (text.length < maxLength) return text;

  return text.substring(0, maxLength - 3) + "...";
};
