export const maskNumber = (value?: string) => {
  if (!value) return "";
  return value.replace(/\D/g, "");
};

export const maskCash = (value?: string) => {
  let price = value ?? "";
  price = price.replace(/\D/g, "");
  price = (Number(price) / 100).toFixed(2) + "";
  price = price.replace(".", ",");
  price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return price;
};

export const maskDate = (value?: string) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/^0$/, "")
    .replace(/^([1-9])$/, "0$1")
    .replace(/^(?!0)(\d{1})$/, "0$1")
    .replace(/^(0)(1|2)([0-9])$/, "$2$3")
    .replace(/^(0)(3)([0-1])$/, "$2$3")
    .replace(/^(.{2}).*/, "$1");
};

export const formatCash = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  }).format(value);
