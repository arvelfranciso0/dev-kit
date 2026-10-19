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

export const toPx = (value: number, unit: string, baseSize:number[], viewportWidth:number[]) => {
    switch (unit) {
      case "rem":
        return value * baseSize[0];
      case "em":
        return value * baseSize[0];
      case "vw":
        return (value * viewportWidth[0]) / 100;
      case "vh":
        return (value * 1080) / 100;
      case "pt":
        return value * (96 / 72);
      default:
        return value;
    }
  };