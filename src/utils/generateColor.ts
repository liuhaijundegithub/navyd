/* eslint-disable no-param-reassign */

export default (baseColor: string) => {
  const root = document.documentElement;


  const setCSSVariable = (name: string, value: string): void => {
    root.style.setProperty(name, value);
  };

  const hexToRgb = (hex: string): { r: number, g: number, b: number } => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number, s: number, l: number } => {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
      }
      h /= 6;
    }
    return { h, s, l };
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number, g: number, b: number } => {
    let r = 0, g = 0, b = 0;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 3) return q;
        if (t < 1 / 2) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const adjustLightness = (hex: string, amount: number): string => {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);
    const newL = l + amount;
    return `hsl(${h * 360}, ${s * 100}%, ${newL * 100}%)`;
  };

  const darkerColor = adjustLightness(baseColor, -0.1);
  const lighterColor = adjustLightness(baseColor, 0.1);
  setCSSVariable('--darker-main-color', darkerColor);
  setCSSVariable('--lighter-main-color', lighterColor);
  setCSSVariable('--uni-main-color', baseColor);
};