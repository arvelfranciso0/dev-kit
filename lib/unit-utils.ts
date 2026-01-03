export const convertUnits = (value: number, base: number, toRem: boolean) => {
  if (toRem) {
    return value / base;
  }
  return value * base;
};

export const unitDefinitions = {
  px: { label: "Pixels", unit: "px" },
  rem: { label: "Root EM", unit: "rem" },
  em: { label: "Element EM", unit: "em" },
};
