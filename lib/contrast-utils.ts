import convert from "color-convert";

export const getLuminance = (r: number, g: number, b: number) => {
  const [fR, fG, fB] = [r / 255, g / 255, b / 255].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * fR + 0.7152 * fG + 0.0722 * fB;
};

export const getContrast = (hex1: string, hex2: string) => {
  const rgb1 = convert.hex.rgb(hex1);
  const rgb2 = convert.hex.rgb(hex2);
  const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
