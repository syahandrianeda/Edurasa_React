export interface OklchColorResult {
  r: number
  g: number
  b: number
  a: number
  rgba: string
  hex: string
}

export function oklchToRgbaHex(oklchString: string): OklchColorResult {
  const match = oklchString
    .trim()
    .match(
      /oklch\(\s*([\d.]+)(%)?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i
    )

  if (!match) {
    throw new Error(`Invalid OKLCH format: ${oklchString}`)
  }

  let [, lStr, percent, cStr, hStr, aStr] = match

  // Handle lightness with or without %
  const l = percent ? parseFloat(lStr) / 100 : parseFloat(lStr)

  const c = parseFloat(cStr)
  const h = (parseFloat(hStr) * Math.PI) / 180
  const a = aStr !== undefined ? parseFloat(aStr) : 1

  // OKLCH → OKLab
  const a_ = c * Math.cos(h)
  const b_ = c * Math.sin(h)

  // OKLab → LMS
  const l_ = l + 0.3963377774 * a_ + 0.2158037573 * b_
  const m_ = l - 0.1055613458 * a_ - 0.0638541728 * b_
  const s_ = l - 0.0894841775 * a_ - 1.2914855480 * b_

  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3

  // LMS → linear RGB
  let r =
    4.0767416621 * l3 -
    3.3077115913 * m3 +
    0.2309699292 * s3

  let g =
    -1.2684380046 * l3 +
    2.6097574011 * m3 -
    0.3413193965 * s3

  let b =
    -0.0041960863 * l3 -
    0.7034186147 * m3 +
    1.7076147010 * s3

  // Gamma correction
  const toSRGB = (x: number): number =>
    x <= 0.0031308
      ? 12.92 * x
      : 1.055 * Math.pow(x, 1 / 2.4) - 0.055

  r = toSRGB(r)
  g = toSRGB(g)
  b = toSRGB(b)

  const clamp = (x: number): number =>
    Math.min(Math.max(0, x), 1)

  const r255 = Math.round(clamp(r) * 255)
  const g255 = Math.round(clamp(g) * 255)
  const b255 = Math.round(clamp(b) * 255)

  const toHex = (x: number): string =>
    x.toString(16).padStart(2, "0")

  const hex = `#${toHex(r255)}${toHex(g255)}${toHex(b255)}`

  return {
    r: r255,
    g: g255,
    b: b255,
    a,
    rgba: `rgba(${r255}, ${g255}, ${b255}, ${a})`,
    hex: hex.toUpperCase()
  }
}
export interface RgbColorResult {
  r: number
  g: number
  b: number
  a: number
  hex: string
}

/**
 * Convert rgb() / rgba() string to HEX
 *
 * Supported inputs:
 *  - "rgb(0, 188, 255)"
 *  - "rgba(0, 188, 255, 0.5)"
 *  - "rgb(0 188 255)"
 *  - "rgba(0 188 255 / 0.5)"
 */
export function rgbStringToHex(rgbString: string): RgbColorResult {
  const cleaned = rgbString.trim()

  const match = cleaned.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s\/]+([\d.]+))?\s*\)/i
  )

  if (!match) {
    throw new Error(`Invalid RGB/RGBA format: ${rgbString}`)
  }

  let [, rStr, gStr, bStr, aStr] = match

  const clamp255 = (value: number): number =>
    Math.min(Math.max(0, value), 255)

  const r = clamp255(Math.round(parseFloat(rStr)))
  const g = clamp255(Math.round(parseFloat(gStr)))
  const b = clamp255(Math.round(parseFloat(bStr)))
  const a = aStr !== undefined ? parseFloat(aStr) : 1

  const toHex = (value: number): string =>
    value.toString(16).padStart(2, "0")

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`

  return {
    r,
    g,
    b,
    a,
    hex: hex.toUpperCase()
  }
}


export function resolveRgbaOrOklchToHex(colorStr: string):OklchColorResult|RgbColorResult|undefined {
    // Cek format RGBA
    const rgbaMatch = colorStr.startsWith('rgb');//colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
        return rgbStringToHex(colorStr);
    }
    // Cek format OKLCH (contoh: oklch(50% 0.1 240))
    const oklchMatch = colorStr.startsWith('oklch');//colorStr.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s+\/\s*([\d.]+))?\s*\)/);
    
    if (oklchMatch) {
        return oklchToRgbaHex(colorStr);
    }
    return undefined
}