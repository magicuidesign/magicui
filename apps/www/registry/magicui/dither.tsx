"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from "react"

import { cn } from "@/lib/utils"

export const DITHER_PATTERNS = [
  "horizon",
  "glow",
  "aurora",
  "waves",
  "clouds",
  "sunset",
  "planet",
  "moonrise",
  "orbit",
  "meridian",
  "eclipse",
  "ridgeline",
  "contour",
  "dunes",
  "corona",
  "orb",
  "veil",
] as const

export type DitherPattern = (typeof DITHER_PATTERNS)[number]

/**
 * The 256 lattice permutation bytes, then 256 lattice values (0 to 255), that
 * drive `fbmN`, as base64.
 */
const NOISE = {
  11: "goQ2w/RYi3UkakR4a9LzHhmb912vxHS0W8EmReyg1FPw6dEzPty6eq3tRhhsn5wwJQ/HqYkhpH00Uk9wl74rzSCrAR0NShE5ecAvCJPW+xLMFLxQP0cDgKLq+oZ/ss+ot2XLI7U8hZhk/arnWusiF5UVYQm45tAWkqcGYDoM2Zot2qVmSeHJj6Yn/4H1ux9yoe5uSP6s43v4OPEOQG/vvSlpxQteTQdV5N2DSxqjrsYEnXOH/OhxHAUsX9hBMc62bZHIji5DuT3lyvZXiLOWCjJCjOAbKmgA8mKemQK/wlHX4n4odxNj1ds7VpBcsUxZlHY3NflU342w0958imcQTsii5sFMpFe/YiffsL6PyHKQEI7QtM1/4RzfXxeedG3ZI51qh38ig9wsAxF1+Av9iR9rNbaKSUHdw29nvPgUKVyBEg44Yr2cBwtz3+ld4u1ovl0nkxapzulyHube95esXy9KuFOwgHL3Knwp731VK5dmIAhklYTm6O/MeoZlZgvMPwd3t29dqCoDl4fdasgFB5k6ESFgVpDiXS+TAWJRYw2Nn7/0WqdxN+O+8NHqIQQzaa9wg8ISrQw/uK5nS9NGCD8Fzx/4Nk6VT2EbYwY56EhFreFLYLbKnS4uwbTlx2si47GTrmJYk3u179hjX+xlzBhzhM7gJ52gJ9WN9TCGUqQ=",
  5: "rE8+VuhkVChfFxEVsyKSA2+kmmc5PZ3r9roEobFdGv1CegfFasZyWFqTFpErL+RXLhQMUTx9oOBg86OAlhvS/KdJXu+5Y7xGTf7/HcmE3sPljh47nIhwMSwnRPHRJgE2Zcr5IOJmHxk1YjffAm4F2NNBE2F3qnE6m+oAr3X3i/toKtvaCa7BtqtLe1ui1UCYnykQid1SzMuyGIby3M+38EyN7EXImdSmnhxzg2wLUIwjDZU45nlpqePXsILHBhK7lHTW6Vm4XErC4Yf0zb4kSC34R+eXMw+K+jRrfq1T0A542SFDML8IvU5tf1WBkKW0tc4yxIWPCu18dj/AJfXuqD/cKrBAETGtgIx0Rn3rM7tAMVMY710tAA83a5n64z6c6xraZcdSoIEbwtJ7Y/Jf4GtfXA9HOxCKcQYo6iJf8h1pzAUR7a5Dej/k8hKGL2e9tjBVbGOuyVZxEV7xgI6bkc1CUeJ/9SPIeXnhIYNAV9BmyAP/9K0ypzFfCRIoLtY+0gIPEO7QBO46Q5U0+V2Skki7/ZgVzqp9p0NNgxGWL0Hllj6y/uXMVZWVF7GFhbwUNvxMQRJQjwpKQSfK9elwEVmGYbq95Xg96OEgNqjR9QUwbIzGjoQ9ppXxMCBaU3QstNIC6BdOfGw3utY6KoQm8NnVaclkdRsKqzH0kJPkTAM=",
  23: "Cuf5FSbQduNd7C30tQF7pbrksFfx0+08nlsq/SmGJGXrbIq/1mjOrWdpRtR/rJIjZvrFmHDoWT0nAr5Dp2D8wa8sl/9VEVq3R+G9/sL4ekm4SFz3UvbgEowPGNziS3Qbh8oDjRcWOdiIw1NKoICxnz9EnDIHlY9rHhkFtscumTe00mTbc6b7MwCBs6vPnXKL119eIY5iVhzR80JMTc2Jy6MUKHyb3dqoaqKQqQmCVFHlcZMabaQIWFD1b6odfmGuMeY7Yw1OdZqWMKG5xsw6331PEAZ3JYVAg8gMlNlB7tW7wMlued41DiITBCsLPjhFxPIfeDbq77KE6fC8IJEvNCpgjfhG28hekwf6fifK3rz7R41wo0iud2KyRVT+Y1b27+sZzTal2r4PmCzTOjVbjeYu1mv9ojiCvdR3YLwatGWxFkBKTvfaFpPyzw29x+aUby+YR0mHE3xAdjC+3LHk4pbAJI73vvdQJhAFl7Qs80g8tAd3q487zo2SY/kPQbZOwL5p17Gsi5Hr1D/jm3mJi3v1wBtIXvqPoPTTPEGZgQSK8K4jsy34i+PF94R+EKw9Q5apIIgCCpGzbKDViuJ50aWhfcmi3NiqXPGeRtM6A+M+W3obgGEKXK3sm/WdZJ+f0HrON05uQk5Zwng7Fdy0rhUHUgg1+XK/6H7Gl3TIMT8=",
} as const

type Seed = keyof typeof NOISE

/** Draws with a fixed set of colours and its own ground. */
type PalettePattern = {
  field: string
  /** From the ground to the brightest dots. Two colours draw one-bit. */
  palette: readonly string[]
  matrix: 2 | 4 | 8
  /** The lattice that `fbmN` reads. */
  seed?: Seed
}

/**
 * A light pattern dithers in `colors` over a clear background and blooms.
 * Every `field` is GLSL for `float field(vec2 uv, float t)`, the same
 * contract as the `shader` prop.
 */
type PatternSpec = { field: string } | PalettePattern

const PATTERNS: Record<DitherPattern, PatternSpec> = {
  // A low sun on the bottom edge, with haze bands that drift up through it.
  horizon: {
    field: `
float field(vec2 uv, float t) {
  vec2 p = uv * uSize;
  vec2 size = uSize;
  float r = max(min(size.x * 0.42, size.y * 0.8), 90.0);
  vec2 d = (p - vec2(0.5 * size.x, -0.15 * r)) / vec2(1.25 * r, r);
  float wobble = fbm(vec2(atan(d.y, d.x) * 1.8, t * 0.04)) - 0.5;
  float rim = length(d) * (1.0 + 0.14 * wobble);
  float sun = exp(-3.4 * max(rim - 0.42, 0.0)) * 0.78;
  float h = p.y / r;
  float drift = (fbm(vec2(p.x / 320.0, t * 0.03)) - 0.5) * 2.4;
  float band = 0.5 + 0.5 * sin(log(1.0 + 7.0 * h) * 8.0 - t * 0.45 + drift);
  float haze = smoothstep(0.25, 0.95, band) * exp(-1.9 * h) * 0.5;
  float ground = exp(-p.y / 22.0) * 0.32;
  float sides = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
  return (sun * (1.0 + haze) + haze * 0.35 + ground) * sides * (1.0 + 0.04 * sin(t * 0.4));
}`,
  },
  // A soft orb in the middle that breathes and wanders a little.
  glow: {
    field: `
float field(vec2 uv, float t) {
  vec2 p = uv * uSize;
  vec2 c = 0.5 * uSize + vec2(sin(t * 0.21), cos(t * 0.17)) * 0.05 * uSize;
  float r = 0.5 * min(uSize.x, uSize.y);
  float d = length(p - c) / r;
  float n = fbm(p / 170.0 + vec2(t * 0.05, -t * 0.04));
  return exp(-1.7 * d * d) * (0.75 + 0.45 * n) + 0.12 * n * exp(-d);
}`,
  },
  // Curtains of light that hang from the top and sway.
  aurora: {
    field: `
float field(vec2 uv, float t) {
  vec2 p = uv * uSize;
  float sway = fbm(vec2(p.x / 600.0, t * 0.05));
  float d = uv.y - (0.45 + 0.35 * (sway - 0.5));
  float curtain = d > 0.0 ? exp(-d * 4.0) : exp(d * 22.0);
  float rays = fbm(vec2(p.x / 70.0 + sway * 6.0, p.y / 900.0 - t * 0.08));
  float shimmer = fbm(vec2(p.x / 40.0 - t * 0.05, 3.0));
  return curtain * (0.25 + 0.75 * smoothstep(0.3, 0.75, rays)) * (0.6 + 0.5 * shimmer);
}`,
  },
  // Slow diagonal swells, like dunes or contour lines.
  waves: {
    field: `
float field(vec2 uv, float t) {
  vec2 q = uv * uSize / 32.0;
  float warp = fbm(q * 0.09 + vec2(t * 0.035, t * 0.02));
  float s = 0.5 + 0.5 * sin(q.x * 0.9 + q.y * 0.6 + warp * 5.0 - t * 0.4);
  float crest = s * s * s * s;
  return crest * (0.5 + 0.5 * uv.y) + 0.12 * warp;
}`,
  },
  // Drifting clouds that fill the whole area evenly.
  clouds: {
    field: `
float field(vec2 uv, float t) {
  vec2 p = uv * uSize;
  float n = fbm(p / 210.0 + vec2(t * 0.03, t * 0.012));
  float m = fbm(p / 80.0 - vec2(t * 0.02, 0.0));
  return smoothstep(0.28, 0.78, n) * (0.7 + 0.5 * m);
}`,
  },
  // Sun disc with slatted gaps over a banded sky and a reflecting floor.
  sunset: {
    palette: ["#1d2021", "#3c3836", "#b16286", "#d65d0e", "#fabd2f"],
    matrix: 8,
    field: `
float field(vec2 uv, float t) {
  float rise = 4.0 * (0.5 - 0.5 * cos(6.2831853 * t / 90.0));
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float x = p.x, y = p.y, w = uSize.x, h = uSize.y;
  float hy = h * 0.80;
  float r = w * 0.30;
  float cx = w * 0.5;
  float cy = hy - r * (0.42 - 0.10 * rise);
  float sky = 2.95 * pow(ss(hy * 0.30, hy, y), 2.3);
  float d = length(vec2(x - cx, y - cy));
  sky += 0.6 * exp(-max(d - r, 0.0) / (r * 0.8)) * (y < hy ? 1.0 : 0.0);
  sky = min(sky, 2.9);
  float sun = 4.4 - 1.6 * ss(cy - r, cy + r * 0.6, y);
  float rel = (y - cy) / r;
  bool gap = false;
  float starts[5] = float[5](0.02, 0.14, 0.24, 0.32, 0.38);
  for (int i = 0; i < 5; i++) {
    gap = gap || (rel > starts[i] && rel < starts[i] + 0.025 + 0.012 * float(i));
  }
  bool inside = d < r && !gap && y < hy;
  float f = inside ? sun : ((d < r && gap) ? sky - 1.3 : sky);
  if (y < hy) return f / 4.0;
  float ground = 1.15 * (1.0 - ss(hy, hy + (h - hy) * 0.9, y));
  float down = (y - hy) / (h - hy);
  float ry = (y - hy) / 4.0;
  bool reflection = abs(x - cx) < r * (1.0 - down * 0.6)
    && sin(ry * 0.9 + pow(max(ry, 0.0), 1.3) * 0.12) > 0.55;
  if (reflection && y < hy + (h - hy) * 0.7) ground += 1.0;
  return ground / 4.0;
}`,
  },
  // A huge planet limb rising from the bottom edge with a halo.
  planet: {
    palette: ["#2e3440", "#3b4252", "#434c5e", "#5e81ac", "#88c0d0"],
    matrix: 8,
    field: `
float field(vec2 uv, float t) {
  float rise = 4.0 * (0.5 - 0.5 * cos(6.2831853 * t / 90.0));
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float x = p.x, y = p.y, w = uSize.x, h = uSize.y;
  float R = w * 1.25;
  float cx = w * 0.62;
  float cy = h + R * 0.72 - rise * h * 0.012;
  float d = length(vec2(x - cx, y - cy));
  float edge = d - R;
  float sky = 1.25 * pow(ss(h * 0.18, h, y), 2.4);
  sky += 1.9 * exp(-max(edge, 0.0) / (h * 0.10));
  float ang = atan(y - cy, x - cx);
  float light = 0.55 + 0.45 * cos(ang - (-1.5707963 - 0.35));
  float limb = 4.6 * exp(-max(-edge, 0.0) / (h * 0.018));
  float body = 0.1 + limb * light + 0.5 * ss(R * 0.96, R, d) * light;
  return (edge < 0.0 ? min(body, 4.6) : min(sky, 3.2)) / 4.0;
}`,
  },
  // A crescent over a sea with shimmering reflection dashes.
  moonrise: {
    palette: ["#16161d", "#223249", "#2d4f67", "#7e9cd8", "#dcd7ba"],
    matrix: 8,
    field: `
float field(vec2 uv, float t) {
  float drift = 3.0 * (0.5 - 0.5 * cos(6.2831853 * t / 90.0));
  float shimmer = t * 0.4 * 1.6;
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float x = p.x, y = p.y, w = uSize.x, h = uSize.y;
  float hy = h * 0.84;
  float r = w * 0.15;
  float cx = w * 0.58 + drift * r * 0.25;
  float cy = h * 0.52;
  float sky = 1.75 * pow(ss(h * 0.2, hy, y), 2.4);
  float d = length(vec2(x - cx, y - cy));
  sky = min(sky + 1.0 * exp(-max(d - r, 0.0) / (r * 1.5)), 2.5);
  bool shadow = length(vec2(x - (cx - r * 0.42), y - (cy - r * 0.22))) < r * 0.92;
  bool lit = d < r && !shadow;
  float f = lit ? 4.2 : (d < r ? min(sky, 1.2) + 0.25 : sky);
  if (y < hy) return f / 4.0;
  float depth = (y - hy) / (h - hy);
  float sea = 1.6 - 1.3 * ss(0.0, 0.85, depth);
  float width = r * (0.55 + depth * 0.6);
  float wob = sin(depth * 22.0 + shimmer);
  bool column = abs(x - cx) < width * (1.0 - 0.35 * wob * wob);
  bool dash = sin((y - hy) / 4.0 * 0.7 + shimmer + sin(x / 4.0 * 0.05) * 0.6) > 0.15;
  if (column && dash) sea += 1.6 * (1.0 - depth * 0.7);
  return sea / 4.0;
}`,
  },
  // A ring and halo that breathe.
  orbit: {
    palette: ["#2e3440", "#3b4252", "#88c0d0"],
    matrix: 4,
    field: `
float field(vec2 uv, float t) {
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float x = p.x, y = p.y, w = uSize.x, h = uSize.y;
  float cx = w * 0.5, cy = h * 0.98, s = w * 1.6;
  float r = w * 0.62 * (1.0 + 0.04 * sin(6.2831853 * t / 16.0));
  float d = length(vec2(x - cx, y - cy));
  float ring = exp(-pow((d - r) / (0.035 * s), 2.0));
  float halo = exp(-pow((d - r) / (0.22 * s), 2.0));
  float f = 0.9 * halo + 1.8 * ring;
  return f * (0.6 + 0.4 * ss(h * 0.55, h * 0.92, y)) / 2.0;
}`,
  },
  // Three diagonal bars swaying along their normal.
  meridian: {
    palette: ["#272e33", "#374145", "#a7c080"],
    matrix: 4,
    field: `
float field(vec2 uv, float t) {
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float x = p.x, y = p.y, w = uSize.x, h = uSize.y;
  float u = x * 0.866 + y * 0.5;
  float unit = w * 0.16;
  vec2 ref = vec2(w * 0.40, h * 0.86);
  float c0 = ref.x * 0.866 + ref.y * 0.5 + unit * 0.6 * sin(6.2831853 * t / 20.0);
  float f = 0.0;
  float amps[3] = float[3](1.0, 0.72, 0.46);
  for (int k = 0; k < 3; k++) {
    float c = c0 + float(k) * unit * 1.6;
    float e = abs(u - c);
    f = max(f, amps[k] * (1.0 - ss(unit * 0.42, unit * 0.52, e)));
  }
  return f * ss(h * 0.55, h * 1.02, y);
}`,
  },
  // A lit disc with a drifting shadow disc, so the crescent waxes and wanes.
  eclipse: {
    palette: ["#191724", "#26233a", "#c4a7e7", "#ebbcba"],
    matrix: 4,
    field: `
float field(vec2 uv, float t) {
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float x = p.x, y = p.y, w = uSize.x, h = uSize.y;
  float cx = w * 0.62, cy = h * 0.86, r = w * 0.36;
  float ox = r * (0.20 + 0.10 * sin(6.2831853 * t / 24.0));
  float oy = -r * 0.12;
  float d1 = length(vec2(x - cx, y - cy));
  float d2 = length(vec2(x - cx - ox, y - cy - oy));
  float disc = 1.0 - ss(r * 0.96, r * 1.04, d1);
  float shadow = ss(r * 0.80, r * 1.10, d2);
  float lit = disc * shadow;
  float grad = ss(cy + r, cy - r, y);
  float glow = exp(-pow(max(d1 - r, 0.0) / (r * 0.55), 2.0)) * (1.0 - disc);
  float f = lit * (1.6 + 1.4 * grad) + 0.9 * glow + disc * 0.6;
  return min(f, 1.0 + 2.0 * ss(h * 0.6, h * 0.75, y)) / 3.0;
}`,
  },
  // Four fbm ridges in parallax over a misty sky.
  ridgeline: {
    palette: ["#1e2326", "#272e33", "#2e383c", "#374145", "#4f585e", "#7a8478"],
    matrix: 4,
    seed: 11,
    field: `
vec4 ridgeShape(int i) {
  return i == 0 ? vec4(0.76, 0.06, 2.0, 3.4) : (i == 1 ? vec4(0.82, 0.055, 2.6, 2.6) : (i == 2 ? vec4(0.88, 0.05, 3.2, 1.9) : vec4(0.945, 0.04, 3.8, 1.2)));
}
float ridgeAt(float x, float k, int i) {
  vec4 L = ridgeShape(i);
  float fi = float(i);
  float drift = k * 0.02 * (fi + 1.0);
  float r = fbmN(vec2((x + drift) * L.z + 7.7 * fi, 3.1 * fi), 5, 0.55);
  return L.x - L.y * (r - 0.5) * 3.0;
}
float field(vec2 uv, float t) {
  float k = t * 0.1;
  float x = uv.x * uAspect, y = 1.0 - uv.y, W = uAspect;
  float horizon = 0.85;
  float above = max(horizon - y, 0.0);
  float cx = (x - W * 0.5) / max(W, 1.0);
  float glow = ss(0.25, 0.0, above + 0.25 * cx * cx);
  float v = 0.05 + 1.6 * pow(ss(horizon * 0.9, 0.0, above), 2.0) + 1.4 * pow(glow, 3.0);
  float px = 1.0 / uSize.y;
  for (int i = 0; i < 4; i++) {
    vec4 L = ridgeShape(i);
    float ridge = ridgeAt(x, k, i);
    float slope = abs(ridgeAt(x + px, k, i) - ridgeAt(x - px, k, i)) * 0.5;
    float depth = y - ridge;
    float val = L.w - 0.9 * ss(0.0, 0.22, depth);
    bool rim = depth >= 0.0 && depth < 4.0 * max(px, slope * 1.1);
    if (rim) val = 4.6 - 0.9 * float(i);
    if (depth >= 0.0) v = val;
  }
  return v / 5.0;
}`,
  },
  // Terraced fbm elevation with rim lines that creep uphill.
  contour: {
    palette: ["#2e3440", "#3b4252", "#434c5e", "#4c566a", "#5e81ac", "#88c0d0"],
    matrix: 2,
    seed: 5,
    field: `
float level(vec2 q, float k) {
  float sc = 0.9;
  float wx = fbmN(vec2(q.x * sc + 4.0, q.y * sc), 3, 0.5);
  float wy = fbmN(vec2(q.x * sc, q.y * sc + 9.0), 3, 0.5);
  float e = fbmN(vec2(q.x * 1.1 * sc + wx * 0.8, q.y * 1.1 * sc + wy * 0.8), 4, 0.4);
  e = ss(0.36, 0.80, e);
  e *= 0.15 + 0.85 * ss(0.30, 0.95, q.y);
  return e * 10.0 + k * 0.25;
}
float field(vec2 uv, float t) {
  float k = t * 0.25;
  vec2 q = vec2(uv.x * uAspect, 1.0 - uv.y);
  float px = 1.0 / uSize.y;
  float lv = level(q, k);
  float terrace = floor(lv);
  float frac = lv - terrace;
  float tl = clamp(terrace / 10.0, 0.0, 1.0);
  float base = floor(tl * 22.0) / 4.0;
  float gx = (level(q + vec2(px, 0.0), k) - level(q - vec2(px, 0.0), k)) * 0.5;
  float gy = (level(q + vec2(0.0, px), k) - level(q - vec2(0.0, px), k)) * 0.5;
  float g = length(vec2(gx, gy));
  bool edge = frac < clamp(g * 2.0, 0.02, 0.5);
  if (edge && terrace >= 1.0) base += 1.0;
  return base / 5.0;
}`,
  },
  // Warped crests travelling along the wind inside a fixed light mask.
  dunes: {
    palette: ["#191724", "#1f1d2e", "#26233a", "#403d52", "#6e6a86", "#c4a7e7"],
    matrix: 4,
    seed: 23,
    field: `
float field(vec2 uv, float t) {
  float k = t * 0.15;
  float x = uv.x * uAspect, y = 1.0 - uv.y;
  float u = x * cos(1.18) + y * sin(1.18);
  float warp = fbmN(vec2(x * 0.8, y * 0.8 + 2.0), 4, 0.5) * 2.4;
  float wave = (u + warp * 0.45) * 7.0 + k * 0.35;
  float f = wave - floor(wave);
  float lit = ss(0.0, 0.78, f) * ss(1.0, 0.80, f);
  float crest = ss(0.6, 0.80, f) * ss(0.86, 0.80, f);
  float amp = ss(0.32, 0.72, fbmN(vec2(x * 0.7 + 30.0, y * 0.7), 3, 0.5));
  amp = (0.35 + 0.65 * amp) * pow(ss(0.18, 1.0, y), 1.5) * 2.0;
  return (0.15 + amp * (2.6 * lit + 2.2 * crest)) / 5.0;
}`,
  },
  // One-bit corona around a dark disc, the falloff breathing.
  corona: {
    palette: ["#2e3440", "#88c0d0"],
    matrix: 8,
    field: `
float field(vec2 uv, float t) {
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float W = uSize.x, H = uSize.y;
  float cx = W * 0.50, cy = H * 0.79, R = W * 0.36;
  float wd = R * 0.38 * (1.0 + 0.18 * sin(6.2831853 * t / 20.0));
  float d = length(p - vec2(cx, cy)) - R;
  float corona = d > 0.0 ? exp(-d / wd) : 0.0;
  float rim = d <= 0.0 ? exp(d / (R * 0.035)) * 0.9 : 0.0;
  float f = (0.92 * corona + rim) * ss(H * 0.30, H * 0.85, p.y);
  return clamp((clamp(f, 0.0, 1.0) - 0.035) / 0.965, 0.0, 1.0);
}`,
  },
  // A sphere lit by a source that orbits slowly.
  orb: {
    palette: ["#282828", "#d79921"],
    matrix: 8,
    field: `
float field(vec2 uv, float t) {
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float W = uSize.x, H = uSize.y;
  float cx = W * 0.66, cy = H * 0.82, R = W * 0.52;
  float a = 6.2831853 * t / 30.0;
  vec3 L = normalize(vec3(-0.55 + 0.25 * cos(a), -0.55 + 0.20 * sin(a), 0.62));
  float dx = (p.x - cx) / R, dy = (p.y - cy) / R;
  float r2 = dx * dx + dy * dy;
  if (r2 >= 1.0) return 0.0;
  float nz = sqrt(clamp(1.0 - r2, 0.0, 1.0));
  float lam = clamp(dx * L.x + dy * L.y + nz * L.z, 0.0, 1.0);
  float f = 0.04 + 0.96 * pow(lam, 1.6);
  float back = clamp(-(dx * L.x + dy * L.y) / sqrt(r2 + 1e-9), 0.0, 1.0);
  float rim = exp(-(1.0 - sqrt(r2)) / 0.05) * back * 0.75;
  f = max(f, rim);
  return clamp((clamp(f, 0.0, 1.0) - 0.035) / 0.965, 0.0, 1.0);
}`,
  },
  // Diagonal light shafts sliding at different rates.
  veil: {
    palette: ["#191724", "#c4a7e7"],
    matrix: 8,
    field: `
float field(vec2 uv, float t) {
  vec2 p = vec2(uv.x, 1.0 - uv.y) * uSize;
  float W = uSize.x, H = uSize.y;
  float ang = radians(-70.0);
  float S = max(W, H);
  float along = (p.x * cos(ang) + p.y * sin(ang)) / S;
  vec4 beams[4] = vec4[4](vec4(0.07, 0.045, 0.40, 1.0), vec4(-0.13, 0.090, 0.30, -1.0), vec4(-0.30, 0.035, 0.60, 2.0), vec4(-0.40, 0.070, 0.30, -1.0));
  float acc = 1.0;
  for (int i = 0; i < 4; i++) {
    vec4 b = beams[i];
    float cc = b.x - 0.5 + 0.03 * b.w * sin(6.2831853 * t / 25.0);
    acc *= 1.0 - b.z * exp(-pow((along - cc) / b.y, 2.0));
  }
  float f = 1.0 - acc;
  f *= 0.35 + 0.65 * ss(-0.1, 1.0, p.y / H);
  f *= ss(H * 0.25, H * 0.8, p.y);
  return clamp((clamp(f, 0.0, 1.0) - 0.035) / 0.965, 0.0, 1.0);
}`,
  },
}

type DitherSource =
  | {
      /**
       * A built-in picture. `horizon`, `glow`, `aurora`, `waves` and `clouds`
       * are light patterns that dither in `colors` over a clear background.
       * The others are palette patterns with their own ground and colours.
       * @default "horizon"
       */
      pattern?: DitherPattern
      src?: never
      shader?: never
    }
  | {
      /**
       * An image or video URL to dither. Bright areas get more dots. URLs
       * that end in .mp4, .webm, .ogv, .mov or .m4v, and `data:video/` URLs,
       * play as muted, looping video. Remote files must allow CORS.
       */
      src: string
      pattern?: never
      shader?: never
    }
  | {
      /**
       * GLSL that defines `float field(vec2 uv, float t)`. `uv` runs from 0
       * to 1 across the element, from the bottom-left corner. `t` is the time
       * in seconds times `speed`. Return the brightness from 0 to 1.
       */
      shader: string
      pattern?: never
      src?: never
    }

export type DitherProps = Omit<ComponentProps<"div">, "children" | "color"> &
  DitherSource & {
    /**
     * One CSS colour, or colour stops from the dimmest dots to the brightest.
     * `var(--primary)`, `currentColor` and `transparent` all work. One colour
     * fades from 35% to full opacity. Palette patterns default to their own
     * palette, and one colour there draws over a clear ground.
     * @default "currentColor"
     */
    colors?: string | readonly string[]
    /**
     * The size of the Bayer matrix. Smaller matrices give coarser, more
     * graphic banding.
     * @default 8, or the size the pattern was drawn with
     */
    matrix?: 2 | 4 | 8
    /**
     * The size of one dot in CSS pixels. Dots snap to whole device pixels.
     * @default 1
     */
    dotSize?: number
    /**
     * Brightness of the field. 0 shows only the pointer glow, if
     * `interactive` is on. Above 1 fills more.
     * @default 0.75
     */
    intensity?: number
    /**
     * Animation speed multiplier. `0` holds a still frame.
     * @default 1
     */
    speed?: number
    /**
     * Frame rate cap. The dots read as a still texture, so 30 is plenty.
     * @default 30
     */
    fps?: number
    /**
     * Brighten the field around the mouse, the pen or a held finger.
     * @default false
     */
    interactive?: boolean
  }

type Rgba = [number, number, number, number]

type Media = HTMLImageElement | HTMLVideoElement

/** What the effect draws, resolved once from `pattern`, `src` or `shader`. */
type Layer = {
  /** The program cache key. */
  key: string
  /** GLSL that defines `float field(vec2 uv, float t)`. */
  field: string
  /** The clock reading of the first frame, in seconds. */
  start: number
  palette: PalettePattern | null
  media: string | null
}

/** What one frame needs. The renderer reads it fresh on every draw. */
type Frame = {
  /** Premultiplied colours, dim to bright. */
  stops: Rgba[]
  intensity: number
  matrix: 2 | 4 | 8
  time: number
  /** x and y from 0 to 1 from the bottom-left corner, then 0 to 1 glow. */
  pointer: readonly [number, number, number]
}

/** `pending` means a shader is still compiling; draw again next frame. */
type Drawn = "ok" | "pending" | "failed"

type Renderer = {
  /** Sizes the dot grid (canvas pixels) and the field (CSS pixels). */
  resize: (dotsX: number, dotsY: number, cssX: number, cssY: number) => void
  setMedia?: (media: Media | null) => void
  draw: (frame: Frame) => Drawn
  dispose?: () => void
}

/**
 * `dots` is the CSS fallback for no WebGL, a lost context or a media error.
 * `blank` is a shader that did not compile.
 */
type Status = "pending" | "ready" | "dots" | "blank"

/**
 * Where a field shows its dots. Alone on the page, a field shows the hub
 * canvas itself and `ctx` is null. Otherwise it owns a 2D canvas and copies
 * its rectangle into it.
 */
type Target = {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
}

const VERTEX = `#version 300 es
void main() {
  vec2 corner = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  gl_Position = vec4(corner, 0.0, 1.0);
}`

// The threshold of a 2x2, 4x4 or 8x8 Bayer matrix, built from the 2x2 matrix
// [0 2; 3 1]. The lowest bit of the cell position carries the largest weight.
const BAYER = `
uniform int uMatrix;

float bayer(vec2 cell) {
  vec2 c = floor(cell);
  float sum = 0.0;
  float cells = float(uMatrix * uMatrix);
  float weight = cells * 0.25;
  int levels = uMatrix == 8 ? 3 : (uMatrix == 4 ? 2 : 1);
  for (int i = 0; i < 3; i++) {
    if (i >= levels) break;
    vec2 b = mod(c, 2.0);
    sum += weight * mod(2.0 * b.x + 3.0 * b.y, 4.0);
    c = floor(c * 0.5);
    weight *= 0.25;
  }
  return (sum + 0.5) / cells;
}
`

// Everything a field can read. `uView` is the render target in pixels.
const FIELD_HEAD = `precision highp float;
precision highp sampler2D;
uniform vec2 uView;
uniform vec2 uSize;
uniform float uAspect;
uniform float uDot;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerOn;
uniform sampler2D uNoise;
out vec4 outColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat2 turn = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p);
    p = turn * p * 2.0 + 11.7;
    amp *= 0.5;
  }
  return sum;
}

float ss(float a, float b, float x) {
  float t = clamp((x - a) / (b - a), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

// Value noise over a 256 x 256 lattice read from a texture.
float hv(ivec2 p) { return texelFetch(uNoise, ivec2(p.x & 255, p.y & 255), 0).r; }
float v2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = p - i;
  vec2 s = f * f * (3.0 - 2.0 * f);
  ivec2 ii = ivec2(i);
  float a = hv(ii);
  float b = hv(ii + ivec2(1, 0));
  float c = hv(ii + ivec2(0, 1));
  float d = hv(ii + ivec2(1, 1));
  return (a + (b - a) * s.x) * (1.0 - s.y) + (c + (d - c) * s.x) * s.y;
}
float fbmN(vec2 p, int octaves, float gain) {
  float total = 0.0;
  float amp = 1.0;
  float norm = 0.0;
  float f = 1.0;
  for (int o = 0; o < 5; o++) {
    if (o >= octaves) break;
    float fo = float(o);
    total += amp * v2(vec2(p.x * f + 17.3 * fo, p.y * f - 9.1 * fo));
    norm += amp;
    amp *= gain;
    f *= 2.03;
  }
  return total / norm;
}
`

const LIGHT_MAIN = `
void main() {
  float v = field(gl_FragCoord.xy / uView, uTime);
  outColor = vec4(clamp(v, 0.0, 1.0), 0.0, 0.0, 1.0);
}`

// One pass: evaluate the field, add the threshold, pick a palette colour.
const PALETTE_MAIN = `
uniform float uGain;
uniform int uColours;
uniform vec4 uPal[6];
${BAYER}
void main() {
  vec2 uv = gl_FragCoord.xy / uView;
  float f = clamp(field(uv, uTime), 0.0, 1.0) * float(uColours - 1) * uGain;
  vec2 away = (uv - uPointer) * uSize;
  float glow = uPointerOn * exp(-dot(away, away) / 28000.0);
  float threshold = bayer(vec2(floor(gl_FragCoord.x), uView.y - 1.0 - floor(gl_FragCoord.y)));
#ifdef ONE_BIT
  f += glow * 0.55;
  int idx = f > threshold ? 1 : 0;
#else
  f += glow * 1.4;
  int idx = int(clamp(floor(f + threshold), 0.0, float(uColours - 1)));
#endif
  outColor = uPal[idx];
}`

// Image and video: luminance under a cover fit, so bright areas get more dots.
const MEDIA_FIELD = `
uniform sampler2D uMedia;
uniform vec2 uMediaSize;

float field(vec2 uv, float t) {
  float scale = max(uSize.x / uMediaSize.x, uSize.y / uMediaSize.y);
  vec2 q = (uv - 0.5) * uSize / (uMediaSize * scale) + 0.5;
  vec4 c = texture(uMedia, vec2(q.x, 1.0 - q.y));
  return dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
}`

const DITHER = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uView;
uniform vec2 uSize;
uniform vec4 uStops[8];
uniform int uCount;
uniform float uIntensity;
uniform vec2 uPointer;
uniform float uPointerOn;
out vec4 outColor;
${BAYER}
void main() {
  vec2 uv = gl_FragCoord.xy / uView;
  float base = texture(uField, uv).r;
  float halo = textureLod(uField, uv, 1.0).r * 0.45
    + textureLod(uField, uv, 2.2).r * 0.35
    + textureLod(uField, uv, 3.4).r * 0.2;
  float v = base + 0.55 * halo;
  float over = max(v - 0.85, 0.0);
  v = min(v, 0.85) + over / (1.0 + 4.0 * over);
  v = clamp(v * uIntensity, 0.0, 1.0);
  // The pointer glow comes after intensity, so it shows on quiet fields too.
  vec2 away = (uv - uPointer) * uSize;
  v = min(v + uPointerOn * exp(-dot(away, away) / 28000.0) * (0.35 + 0.5 * v), 1.0);
  // Drop the faintest light, so empty areas stay empty instead of showing
  // a sparse, even grid.
  v = max(v - 0.02, 0.0) / 0.98;
  float on = step(bayer(gl_FragCoord.xy), v);
  float at = v * float(uCount - 1);
  int i = int(min(floor(at), float(uCount - 2)));
  outColor = mix(uStops[i], uStops[i + 1], at - float(i)) * on;
}`

/** The field source, and how many lines come before it in the program. */
type FieldSource = { source: string; offset: number }

type Fragment = { text: string; field?: FieldSource }

function fragment(field: string, main: string, define = ""): Fragment {
  const head = `#version 300 es\n${define}${FIELD_HEAD}`
  return {
    text: `${head}${field}\n${main}`,
    field: { source: field, offset: head.split("\n").length - 1 },
  }
}

/** The light field renders at this fraction of the CSS size, then blooms. */
const FIELD_SCALE = 0.6
const POINTER_EASE = 6
/** `intensity` at which a palette pattern draws exactly as designed. */
const PALETTE_INTENSITY = 0.75
/** Where the clock starts, so slow motion is well into the picture. */
const LIGHT_START = 10
const PALETTE_START = 6
const MAX_STOPS = 8
/** A single colour fades from dim to full opacity. */
const FADES = [0.35, 0.75, 1]
const MAX_DOTS = 4096
const HUB_GRACE_MS = 2000
const COMPLETION_STATUS = 0x91_b1
const VIDEO_FILE = /^data:video\/|\.(mp4|webm|ogv|mov|m4v)(\?|#|$)/i
const ERROR_LINE = /^ERROR: \d+:(\d+): (.*)$/

const FIELD_UNIFORMS = [
  "uView",
  "uSize",
  "uAspect",
  "uDot",
  "uTime",
  "uPointer",
  "uPointerOn",
  "uMediaSize",
] as const
const PALETTE_UNIFORMS = [
  ...FIELD_UNIFORMS,
  "uGain",
  "uColours",
  "uPal",
  "uMatrix",
] as const
const DITHER_UNIFORMS = [
  "uView",
  "uSize",
  "uStops",
  "uCount",
  "uIntensity",
  "uPointer",
  "uPointerOn",
  "uMatrix",
] as const

type Entry = {
  program: WebGLProgram | null
  /** Kept until the link resolves, so a failure can read their logs. */
  shaders: WebGLShader[]
  state: "pending" | "ready" | "failed"
  uniforms: readonly string[]
  /** Sampler uniform name to texture unit. */
  samplers: Record<string, number>
  loc: Record<string, WebGLUniformLocation | null>
  field?: FieldSource
}

/**
 * One WebGL2 context shared by every field on the page. Browsers cap live
 * contexts at about 16, and each new one recompiles every shader. The hub
 * draws into its own canvas. A field that has the hub to itself shows that
 * canvas directly. Once a second field arrives, each field copies its
 * rectangle out into a plain 2D canvas, so any number of fields cost one
 * context and compile each program once.
 */
type Member = {
  /** Moves the field from the hub canvas to its own 2D copy. */
  detach: () => void
  /** Moves the field from its 2D copy back onto the hub canvas. */
  attach: () => void
}

type Hub = {
  canvas: HTMLCanvasElement
  gl: WebGL2RenderingContext
  parallel: boolean
  maxDots: number
  programs: Map<string, Entry>
  noise: Map<number, WebGLTexture | null>
  refs: number
  timer: number
  /** Every field using the hub, whether it shows the hub canvas or a copy. */
  members: Set<Member>
  /** The member that shows the hub canvas itself, if any. */
  owner: Member | null
  listeners: Set<(event: "lost" | "restored") => void>
  destroy: () => void
}

let shared: Hub | null = null

function createHub(): Hub | null {
  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  })
  if (!gl) return null
  const listeners = new Set<(event: "lost" | "restored") => void>()
  const onLost = (event: Event) => {
    event.preventDefault()
    // The next field to mount gets a fresh context.
    if (shared === hub) shared = null
    for (const listener of listeners) listener("lost")
  }
  const onRestored = () => {
    for (const listener of listeners) listener("restored")
  }
  canvas.addEventListener("webglcontextlost", onLost)
  canvas.addEventListener("webglcontextrestored", onRestored)
  const hub: Hub = {
    canvas,
    gl,
    parallel: Boolean(gl.getExtension("KHR_parallel_shader_compile")),
    maxDots: Math.min(MAX_DOTS, gl.getParameter(gl.MAX_TEXTURE_SIZE)),
    programs: new Map(),
    noise: new Map(),
    refs: 0,
    timer: 0,
    members: new Set(),
    owner: null,
    listeners,
    destroy() {
      if (shared === hub) shared = null
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
  return hub
}

function acquireHub() {
  shared ??= createHub()
  if (!shared) return null
  window.clearTimeout(shared.timer)
  shared.refs += 1
  // The hub canvas is about to be shared, so its owner steps back to a copy.
  shared.owner?.detach()
  return shared
}

/**
 * Keeps the context for a moment, so a remount or a fast scroll reuses it.
 * The last field left gets the hub canvas back.
 */
function releaseHub(hub: Hub, member: Member | null) {
  if (member) hub.members.delete(member)
  hub.refs -= 1
  if (hub.refs === 1) {
    for (const last of hub.members) last.attach()
  }
  if (hub.refs > 0) return
  hub.timer = window.setTimeout(() => {
    if (hub.refs <= 0) hub.destroy()
  }, HUB_GRACE_MS)
}

/** Starts a program once per key. It links in the background where it can. */
function program(
  hub: Hub,
  key: string,
  { text, field }: Fragment,
  uniforms: readonly string[],
  samplers: Record<string, number>
) {
  const cached = hub.programs.get(key)
  if (cached) return cached
  const { gl } = hub
  const entry: Entry = {
    program: gl.createProgram(),
    shaders: [],
    state: "pending",
    uniforms,
    samplers,
    loc: {},
    field,
  }
  hub.programs.set(key, entry)
  if (!entry.program) {
    entry.state = "failed"
    return entry
  }
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, text],
  ] as const) {
    const shader = gl.createShader(type)
    if (!shader) {
      entry.state = "failed"
      continue
    }
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    gl.attachShader(entry.program, shader)
    entry.shaders.push(shader)
  }
  gl.linkProgram(entry.program)
  return entry
}

/** Logs each compile error against the line of the field source it is on. */
function reportError(log: string, field: FieldSource | undefined) {
  const lines = field?.source.split("\n") ?? []
  const messages = log
    .trim()
    .split("\n")
    .map((entry) => {
      const match = ERROR_LINE.exec(entry.trim())
      const line = match && field ? Number(match[1]) - field.offset : 0
      const code = lines[line - 1]
      if (!match || code === undefined) return entry
      return `line ${line}: ${match[2]}\n    ${code.trim()}`
    })
  console.error(`Dither: the shader did not compile.\n${messages.join("\n")}`)
}

/** Finishes the link once the driver is done, then reads the uniforms. */
function poll(hub: Hub, entry: Entry) {
  const { gl, parallel } = hub
  const { program: linked } = entry
  if (entry.state !== "pending" || !linked) return entry.state
  if (parallel && !gl.getProgramParameter(linked, COMPLETION_STATUS)) {
    return "pending"
  }
  const linkedOk = Boolean(gl.getProgramParameter(linked, gl.LINK_STATUS))
  if (!linkedOk) {
    const log = entry.shaders
      .map((shader) => gl.getShaderInfoLog(shader) ?? "")
      .join("\n")
      .trim()
    reportError(log || (gl.getProgramInfoLog(linked) ?? ""), entry.field)
  }
  for (const shader of entry.shaders) gl.deleteShader(shader)
  entry.shaders = []
  if (!linkedOk) {
    entry.state = "failed"
    return "failed"
  }
  for (const name of entry.uniforms) {
    entry.loc[name] = gl.getUniformLocation(linked, name)
  }
  gl.useProgram(linked)
  for (const [name, unit] of Object.entries(entry.samplers)) {
    gl.uniform1i(gl.getUniformLocation(linked, name), unit)
  }
  entry.state = "ready"
  return "ready"
}

function waiting(hub: Hub, entries: Entry[]): Drawn {
  const states = entries.map((entry) => poll(hub, entry))
  if (states.includes("failed")) return "failed"
  return states.includes("pending") ? "pending" : "ok"
}

function createTexture(gl: WebGL2RenderingContext, mipmaps: boolean) {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  const min = mipmaps ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}

/**
 * Binds the lattice behind `fbmN` to unit 2: texel (ix, iy) holds
 * vals[(perm[ix] + iy) & 255]. Built once per seed and shared by all fields.
 */
function bindNoise(hub: Hub, seed: Seed) {
  const { gl } = hub
  gl.activeTexture(gl.TEXTURE2)
  const cached = hub.noise.get(seed)
  if (cached) {
    gl.bindTexture(gl.TEXTURE_2D, cached)
    return
  }
  const bytes = Uint8Array.from(atob(NOISE[seed]), (char) => char.charCodeAt(0))
  const table = new Uint8Array(256 * 256)
  for (let iy = 0; iy < 256; iy += 1) {
    for (let ix = 0; ix < 256; ix += 1) {
      table[iy * 256 + ix] = bytes[256 + ((bytes[ix] + iy) % 256)]
    }
  }
  const texture = createTexture(gl, false)
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.R8,
    256,
    256,
    0,
    gl.RED,
    gl.UNSIGNED_BYTE,
    table
  )
  hub.noise.set(seed, texture)
}

/** Makes room in the hub canvas. It only grows, so fields never fight over it. */
function fit(hub: Hub, dotsX: number, dotsY: number) {
  const { canvas, maxDots } = hub
  if (canvas.width < dotsX) {
    canvas.width = Math.min(Math.ceil(dotsX / 256) * 256, maxDots)
  }
  if (canvas.height < dotsY) {
    canvas.height = Math.min(Math.ceil(dotsY / 256) * 256, maxDots)
  }
}

/**
 * Copies the finished rectangle, which GL draws from the bottom-left. A field
 * that shows the hub canvas has nothing to copy.
 */
function present(hub: Hub, { ctx }: Target, dotsX: number, dotsY: number) {
  if (!ctx) return
  ctx.globalCompositeOperation = "copy"
  ctx.drawImage(
    hub.canvas,
    0,
    hub.canvas.height - dotsY,
    dotsX,
    dotsY,
    0,
    0,
    dotsX,
    dotsY
  )
}

/** Sets what every field can read. `view` is the render target in pixels. */
function setField(
  gl: WebGL2RenderingContext,
  loc: Entry["loc"],
  view: number[],
  css: number[],
  dot: number,
  { time, pointer }: Frame
) {
  gl.uniform2f(loc.uView, view[0], view[1])
  gl.uniform2f(loc.uSize, css[0], css[1])
  gl.uniform1f(loc.uAspect, css[0] / css[1])
  gl.uniform1f(loc.uDot, dot)
  gl.uniform1f(loc.uTime, time)
  gl.uniform2f(loc.uPointer, pointer[0], pointer[1])
  gl.uniform1f(loc.uPointerOn, pointer[2])
}

/**
 * Light fields take two passes: the field renders small into a mipmapped
 * texture, then the dither pass reads it with a bloom from the blurred mip
 * levels and thresholds it into dots, one canvas pixel per dot.
 */
function createFieldRenderer(hub: Hub, target: Target, layer: Layer): Renderer {
  const { gl } = hub
  const field = program(
    hub,
    layer.key,
    fragment(layer.field, LIGHT_MAIN),
    FIELD_UNIFORMS,
    { uMedia: 1, uNoise: 2 }
  )
  const dither = program(hub, "dither", { text: DITHER }, DITHER_UNIFORMS, {
    uField: 0,
  })
  const fieldTexture = createTexture(gl, true)
  const mediaTexture = createTexture(gl, false)
  const framebuffer = gl.createFramebuffer()
  const stops = new Float32Array(MAX_STOPS * 4)
  let media: Media | null = null
  // Images upload once; video uploads a new frame on every draw.
  let mediaStale = false
  let view = [1, 1]
  let fieldView = [1, 1]
  let css = [1, 1]

  return {
    resize(dotsX, dotsY, cssX, cssY) {
      view = [dotsX, dotsY]
      css = [cssX, cssY]
      fieldView = [
        Math.max(1, Math.round(cssX * FIELD_SCALE)),
        Math.max(1, Math.round(cssY * FIELD_SCALE)),
      ]
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fieldTexture)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        fieldView[0],
        fieldView[1],
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      )
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        fieldTexture,
        0
      )
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    },
    setMedia(next) {
      media = next
      mediaStale = true
    },
    draw(frame) {
      const ready = waiting(hub, [field, dither])
      if (ready !== "ok") return ready
      fit(hub, view[0], view[1])

      gl.useProgram(field.program)
      const source = media
      if (source) {
        const isVideo = source instanceof HTMLVideoElement
        const width = isVideo ? source.videoWidth : source.naturalWidth
        const height = isVideo ? source.videoHeight : source.naturalHeight
        if (!width || !height) return "pending"
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D, mediaTexture)
        if (mediaStale || isVideo) {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            source
          )
          mediaStale = false
        }
        gl.uniform2f(field.loc.uMediaSize, width, height)
      }
      bindNoise(hub, 11)
      setField(gl, field.loc, fieldView, css, css[0] / view[0], frame)
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
      gl.viewport(0, 0, fieldView[0], fieldView[1])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, fieldTexture)
      gl.generateMipmap(gl.TEXTURE_2D)

      for (const [index, colour] of frame.stops.entries()) {
        stops.set(colour, index * 4)
      }
      gl.useProgram(dither.program)
      gl.uniform2f(dither.loc.uView, view[0], view[1])
      gl.uniform2f(dither.loc.uSize, css[0], css[1])
      gl.uniform4fv(dither.loc.uStops, stops)
      gl.uniform1i(dither.loc.uCount, frame.stops.length)
      gl.uniform1f(dither.loc.uIntensity, frame.intensity)
      gl.uniform1i(dither.loc.uMatrix, frame.matrix)
      gl.uniform2f(dither.loc.uPointer, frame.pointer[0], frame.pointer[1])
      gl.uniform1f(dither.loc.uPointerOn, frame.pointer[2])
      gl.viewport(0, 0, view[0], view[1])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      present(hub, target, view[0], view[1])
      return "ok"
    },
    dispose() {
      gl.deleteTexture(fieldTexture)
      gl.deleteTexture(mediaTexture)
      gl.deleteFramebuffer(framebuffer)
    },
  }
}

function createPaletteRenderer(
  hub: Hub,
  target: Target,
  layer: Layer,
  palette: PalettePattern
): Renderer {
  const { gl } = hub
  const oneBit = palette.palette.length === 2 ? "#define ONE_BIT\n" : ""
  const entry = program(
    hub,
    layer.key,
    fragment(layer.field, PALETTE_MAIN, oneBit),
    PALETTE_UNIFORMS,
    { uNoise: 2 }
  )
  const colours = new Float32Array(24)
  let view = [1, 1]
  let css = [1, 1]

  return {
    resize(dotsX, dotsY, cssX, cssY) {
      view = [dotsX, dotsY]
      css = [cssX, cssY]
    },
    draw(frame) {
      const ready = waiting(hub, [entry])
      if (ready !== "ok") return ready
      fit(hub, view[0], view[1])

      gl.useProgram(entry.program)
      bindNoise(hub, palette.seed ?? 11)
      for (const [index, colour] of frame.stops.entries()) {
        colours.set(colour, index * 4)
      }
      setField(gl, entry.loc, view, css, css[0] / view[0], frame)
      gl.uniform1f(entry.loc.uGain, frame.intensity / PALETTE_INTENSITY)
      gl.uniform1i(entry.loc.uColours, frame.stops.length)
      gl.uniform4fv(entry.loc.uPal, colours)
      gl.uniform1i(entry.loc.uMatrix, frame.matrix)
      gl.viewport(0, 0, view[0], view[1])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      present(hub, target, view[0], view[1])
      return "ok"
    },
  }
}

function layerOf(
  pattern: DitherPattern,
  src: string | undefined,
  shader: string | undefined
): Layer {
  if (src) {
    return {
      key: "field:media",
      field: MEDIA_FIELD,
      start: 0,
      palette: null,
      media: src,
    }
  }
  // The source itself is the key, so each unique shader compiles once.
  if (shader) {
    return {
      key: `field:shader:${shader}`,
      field: shader,
      start: 0,
      palette: null,
      media: null,
    }
  }
  const spec = PATTERNS[pattern]
  if ("palette" in spec) {
    return {
      key: `palette:${pattern}`,
      field: spec.field,
      start: PALETTE_START,
      palette: spec,
      media: null,
    }
  }
  return {
    key: `field:${pattern}`,
    field: spec.field,
    start: LIGHT_START,
    palette: null,
    media: null,
  }
}

/** The CSS colours to resolve, dim to bright. */
function colorStops(
  colors: DitherProps["colors"],
  palette: PalettePattern | null
): readonly string[] {
  const list = typeof colors === "string" ? [colors] : colors
  if (!palette) return list?.length ? list : ["currentColor"]
  if (!list?.length) return palette.palette
  return list.length === 1 ? ["transparent", list[0]] : list
}

let probeContext: CanvasRenderingContext2D | null = null

/**
 * Resolves CSS colours (`var(--x)`, `currentColor`, `oklch()`) in the
 * context of `host`, then reads them back as straight RGBA through one
 * shared 1x1 canvas.
 */
function resolveColors(host: HTMLElement, values: readonly string[]): Rgba[] {
  probeContext ??= document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true })
  const context = probeContext
  const probe = document.createElement("span")
  probe.style.display = "none"
  host.appendChild(probe)
  const colors = values.map((value): Rgba => {
    probe.style.color = ""
    probe.style.color = value
    if (!context) return [0.5, 0.5, 0.5, 1]
    context.clearRect(0, 0, 1, 1)
    context.fillStyle = "#808080"
    context.fillStyle = getComputedStyle(probe).color
    context.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
    return [r / 255, g / 255, b / 255, a / 255]
  })
  probe.remove()
  return colors
}

/** Blends premultiplied stops evenly down or up to `count` colours. */
function resample(stops: Rgba[], count: number): Rgba[] {
  const last = stops.length - 1
  return Array.from({ length: count }, (_, index): Rgba => {
    const at = (index / Math.max(count - 1, 1)) * last
    const from = Math.floor(at)
    const low = stops[from]
    const high = stops[Math.min(from + 1, last)]
    const k = at - from
    const mix = (channel: 0 | 1 | 2 | 3) =>
      low[channel] + (high[channel] - low[channel]) * k
    return [mix(0), mix(1), mix(2), mix(3)]
  })
}

/** Premultiplied colours, one per palette level or up to `MAX_STOPS`. */
function resolveStops(
  host: HTMLElement,
  values: readonly string[],
  palette: PalettePattern | null
): Rgba[] {
  let colors = resolveColors(host, values)
  if (!palette && colors.length === 1) {
    const [r, g, b, a] = colors[0]
    colors = FADES.map((fade): Rgba => [r, g, b, a * fade])
  }
  const premultiplied = colors.map(([r, g, b, a]): Rgba => [
    r * a,
    g * a,
    b * a,
    a,
  ])
  const count = palette
    ? palette.palette.length
    : Math.min(premultiplied.length, MAX_STOPS)
  return resample(premultiplied, count)
}

function loadMedia(
  src: string,
  onReady: (media: Media) => void,
  onError: () => void
) {
  if (VIDEO_FILE.test(src)) {
    const video = document.createElement("video")
    video.crossOrigin = "anonymous"
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = "auto"
    video.addEventListener("loadeddata", () => onReady(video), { once: true })
    video.addEventListener("error", onError, { once: true })
    video.src = src
    return video
  }
  const image = new Image()
  image.crossOrigin = "anonymous"
  image.decoding = "async"
  image.addEventListener("load", () => onReady(image), { once: true })
  image.addEventListener("error", onError, { once: true })
  image.src = src
  return image
}

const CANVAS_CLASS =
  "absolute top-0 left-0 opacity-0 transition-opacity duration-700 [image-rendering:pixelated] data-[ready]:opacity-100 motion-reduce:transition-none"

const hubTarget = (hub: Hub): Target => ({ canvas: hub.canvas, ctx: null })

function copyTarget(): Target | null {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  return ctx ? { canvas, ctx } : null
}

const ease = (from: number, to: number, rate: number, dt: number) =>
  from + (to - from) * (1 - Math.exp(-rate * dt))

/**
 * An animated ordered-dither layer. A light pattern, a palette pattern, an
 * image or video, or your own GLSL field is thresholded against a Bayer
 * matrix into crisp square dots. It fills its nearest positioned parent.
 */
export function Dither({
  pattern = "horizon",
  src,
  shader,
  colors,
  matrix,
  dotSize = 1,
  intensity = 0.75,
  speed = 1,
  fps = 30,
  interactive = false,
  className,
  style,
  ref,
  ...props
}: DitherProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  // The field only draws while it is near the viewport.
  const [near, setNear] = useState(false)
  const [status, setStatus] = useState<Status>("pending")
  // Bumped when the browser restores a lost WebGL context.
  const [contextKey, setContextKey] = useState(0)
  const layer = useMemo(
    () => layerOf(pattern, src, shader),
    [pattern, src, shader]
  )
  const stops = colorStops(colors, layer.palette)
  const colorKey = stops.join("|")
  const dither = matrix ?? layer.palette?.matrix ?? 8
  // Read every frame, so changing them never rebuilds the GL state.
  const live = useRef({
    stops,
    matrix: dither,
    intensity,
    speed,
    fps,
    interactive,
  })
  live.current = { stops, matrix: dither, intensity, speed, fps, interactive }
  const repaint = useRef<(() => void) | null>(null)
  // Kept across rebuilds, so a field that scrolls back into view resumes.
  const clock = useRef(0)
  const shown = useRef(false)

  const setRoot = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "100px" }
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!near || !root) return

    const hub = acquireHub()
    const target = hub && (hub.refs === 1 ? hubTarget(hub) : copyTarget())
    if (!hub || !target) {
      if (hub) releaseHub(hub, null)
      setStatus("dots")
      return
    }
    target.canvas.className = CANVAS_CLASS
    const renderer = layer.palette
      ? createPaletteRenderer(hub, target, layer, layer.palette)
      : createFieldRenderer(hub, target, layer)
    setStatus(shown.current ? "ready" : "pending")
    // A field that comes back into view skips the fade-in.
    if (shown.current) target.canvas.dataset.ready = ""
    else target.canvas.removeAttribute("data-ready")
    root.appendChild(target.canvas)

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointer = { x: 0, y: 0, clientX: 0, clientY: 0, on: false, hover: 0 }
    const frameData: Frame = {
      stops: [],
      intensity: live.current.intensity,
      matrix: 8,
      time: 0,
      pointer: [0, 0, 0],
    }
    let previous = 0
    let frame = 0
    let retry = 0
    let cssWidth = 0
    let cssHeight = 0
    let glowing = false
    let ready = !layer.media
    let stopped = false
    let disposed = false
    let presented = false

    const resolve = () => resolveStops(root, live.current.stops, layer.palette)

    const draw = () => {
      if (!ready || !cssHeight || stopped) return
      frameData.intensity = live.current.intensity
      frameData.matrix = live.current.matrix
      frameData.time = layer.start + clock.current
      frameData.pointer = [
        pointer.x / cssWidth,
        pointer.y / cssHeight,
        pointer.hover,
      ]
      const result = renderer.draw(frameData)
      if (result === "ok") {
        target.canvas.dataset.ready = ""
        if (!presented) setStatus("ready")
        shown.current = true
        presented = true
      } else if (result === "failed") {
        stopped = true
        sync()
        setStatus("blank")
      } else if (!retry) {
        // Still compiling, or the media is not ready. Retry until the first
        // frame lands, even when the loop has nothing to redraw.
        retry = requestAnimationFrame(() => {
          retry = 0
          if (!presented) draw()
        })
      }
    }

    const fallBack = () => {
      stopped = true
      target.canvas.removeAttribute("data-ready")
      sync()
      setStatus("dots")
    }

    const paint = () => {
      frameData.stops = resolve()
      draw()
    }
    repaint.current = paint
    // Theme changes can arrive in bursts; resolve the colours once a frame.
    let paintFrame = 0
    const schedulePaint = () => {
      cancelAnimationFrame(paintFrame)
      paintFrame = requestAnimationFrame(paint)
    }

    // One dot is a whole number of device pixels, so dots stay crisp
    // squares on any screen. The canvas may overhang the root by under a
    // dot; the root clips it. Layout size, so transforms on a parent (an
    // entrance animation, say) do not shrink the grid.
    const resize = () => {
      const width = root.clientWidth
      const height = root.clientHeight
      if (!width || !height) return
      const dpr = window.devicePixelRatio || 1
      let devicePerDot = Math.max(1, Math.round(dotSize * dpr))
      // Stay inside what the GPU can draw in one go.
      while (
        Math.ceil((width * dpr) / devicePerDot) > hub.maxDots ||
        Math.ceil((height * dpr) / devicePerDot) > hub.maxDots
      ) {
        devicePerDot += 1
      }
      const cssPerDot = devicePerDot / dpr
      const dotsX = Math.ceil((width * dpr) / devicePerDot)
      const dotsY = Math.ceil((height * dpr) / devicePerDot)
      cssWidth = dotsX * cssPerDot
      cssHeight = dotsY * cssPerDot
      const { canvas } = target
      canvas.width = dotsX
      canvas.height = dotsY
      canvas.style.width = `${cssWidth}px`
      canvas.style.height = `${cssHeight}px`
      renderer.resize(dotsX, dotsY, cssWidth, cssHeight)
      draw()
    }

    // Animate only while the tab is visible and motion is allowed.
    // Otherwise hold the last frame.
    const sync = () => {
      const running =
        ready && !stopped && !document.hidden && !reducedMotion.matches
      if (running && !frame) {
        previous = 0
        frame = requestAnimationFrame(tick)
        video?.play().catch(() => {})
      } else if (!running && frame) {
        cancelAnimationFrame(frame)
        frame = 0
        video?.pause()
      }
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const { speed, fps, interactive } = live.current
      if (previous && now - previous < 1000 / Math.max(fps, 1) - 2) return
      // Real time since the last drawn frame, so a low fps keeps the same
      // speed. The clock restarts on resume, and a stalled main thread
      // cannot jump the field by more than 2 s.
      const dt = previous ? Math.min((now - previous) / 1000, 2) : 0
      previous = now
      clock.current += dt * speed

      let inside = false
      if (interactive && pointer.on) {
        const box = root.getBoundingClientRect()
        const left = box.left + root.clientLeft
        const top = box.top + root.clientTop
        inside =
          pointer.clientX >= box.left &&
          pointer.clientX <= box.right &&
          pointer.clientY >= box.top &&
          pointer.clientY <= box.bottom
        const x = pointer.clientX - left
        const y = top + cssHeight - pointer.clientY
        // Away from the field the glow is off, so the spot can jump to the
        // pointer and meet it when it arrives.
        const track = inside || pointer.hover > 0.002
        pointer.x = track ? ease(pointer.x, x, POINTER_EASE, dt) : x
        pointer.y = track ? ease(pointer.y, y, POINTER_EASE, dt) : y
      }
      const fading = pointer.hover > 0.002
      pointer.hover = ease(pointer.hover, inside ? 1 : 0, 4, dt)
      if (!inside && !fading) pointer.hover = 0
      // A still image or a held frame only redraws while the glow moves.
      const animated = Boolean(video) || (!layer.media && speed !== 0)
      const moving = inside || fading || glowing
      glowing = inside || fading
      if (animated || moving) draw()
    }

    const media = layer.media
      ? loadMedia(
          layer.media,
          (source) => {
            if (disposed) return
            renderer.setMedia?.(source)
            ready = true
            draw()
            sync()
          },
          () => {
            if (!disposed) fallBack()
          }
        )
      : null
    const video = media instanceof HTMLVideoElement ? media : null

    const onPointer = (event: PointerEvent) => {
      // A finger only counts while it is down. Hover events from a lifted
      // finger would leave the glow stuck where it last tapped.
      if (event.pointerType === "touch" && event.buttons === 0) return
      if (!pointer.on) {
        const box = root.getBoundingClientRect()
        pointer.x = event.clientX - box.left - root.clientLeft
        pointer.y = box.top + root.clientTop + cssHeight - event.clientY
      }
      pointer.clientX = event.clientX
      pointer.clientY = event.clientY
      pointer.on = true
    }
    const onLeave = () => {
      pointer.on = false
    }
    // Lifting the finger, or the browser taking over the touch to scroll,
    // fades the glow out. The listeners are passive, so scrolling is never
    // blocked.
    const onTouchEnd = (event: PointerEvent) => {
      if (event.pointerType === "touch") pointer.on = false
    }

    // A move to a screen with another pixel ratio changes the dot size
    // without resizing the element.
    let ratioQuery: MediaQueryList | null = null
    const watchRatio = () => {
      ratioQuery?.removeEventListener("change", onRatio)
      ratioQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`
      )
      ratioQuery.addEventListener("change", onRatio)
    }
    const onRatio = () => {
      resize()
      watchRatio()
    }

    // A lost context shows the CSS dots until the browser gives it back.
    const onHub = (event: "lost" | "restored") => {
      if (event === "restored") setContextKey((key) => key + 1)
      else fallBack()
    }
    hub.listeners.add(onHub)

    // The hub canvas changes hands as fields come and go. One field shows it
    // directly. Two or more each copy their rectangle into a canvas of their own.
    const member: Member = {
      detach: () => {
        hub.owner = null
        const own = copyTarget()
        if (!own) {
          fallBack()
          return
        }
        const { canvas } = target
        own.canvas.className = canvas.className
        own.canvas.style.cssText = canvas.style.cssText
        own.canvas.width = canvas.width
        own.canvas.height = canvas.height
        if (canvas.dataset.ready !== undefined) own.canvas.dataset.ready = ""
        canvas.replaceWith(own.canvas)
        target.canvas = own.canvas
        target.ctx = own.ctx
        draw()
      },
      attach: () => {
        if (stopped || !target.ctx) return
        const copy = target.canvas
        const { canvas } = hub
        canvas.className = copy.className
        if (copy.dataset.ready !== undefined) canvas.dataset.ready = ""
        else canvas.removeAttribute("data-ready")
        copy.replaceWith(canvas)
        target.canvas = canvas
        target.ctx = null
        hub.owner = member
        resize()
      },
    }
    hub.members.add(member)
    if (!target.ctx) hub.owner = member

    const resizeObserver = new ResizeObserver(resize)
    // Theme switches usually toggle a class or attribute on <html>.
    const themeObserver = new MutationObserver(schedulePaint)
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

    frameData.stops = resolve()
    resize()
    sync()
    watchRatio()
    resizeObserver.observe(root)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })
    // The root's own class or style can change `currentColor` or a CSS
    // variable in the colours, for example text-red-500 to text-blue-500.
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })
    darkQuery.addEventListener("change", schedulePaint)
    reducedMotion.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    window.addEventListener("pointerdown", onPointer, { passive: true })
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerup", onTouchEnd, { passive: true })
    window.addEventListener("pointercancel", onTouchEnd, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(retry)
      cancelAnimationFrame(paintFrame)
      repaint.current = null
      resizeObserver.disconnect()
      themeObserver.disconnect()
      ratioQuery?.removeEventListener("change", onRatio)
      darkQuery.removeEventListener("change", schedulePaint)
      reducedMotion.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
      window.removeEventListener("pointerdown", onPointer)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerup", onTouchEnd)
      window.removeEventListener("pointercancel", onTouchEnd)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      hub.listeners.delete(onHub)
      if (video) {
        video.pause()
        video.removeAttribute("src")
        video.load()
      } else {
        media?.removeAttribute("src")
      }
      renderer.dispose?.()
      if (hub.owner === member) hub.owner = null
      releaseHub(hub, member)
      target.canvas.remove()
    }
  }, [near, layer, dotSize, contextKey])

  useEffect(() => {
    repaint.current?.()
  }, [colorKey, intensity, dither])

  const fallbackStyle: CSSProperties = layer.palette
    ? {
        backgroundColor: stops[0],
        backgroundImage: `radial-gradient(${stops.at(-1)} 0.6px, transparent 0.9px)`,
        backgroundSize: `${3 * dotSize}px ${3 * dotSize}px`,
        opacity: Math.min(1, intensity / PALETTE_INTENSITY),
      }
    : {
        backgroundImage: `radial-gradient(${stops.at(-1)} 0.6px, transparent 0.9px)`,
        backgroundSize: `${3 * dotSize}px ${3 * dotSize}px`,
        maskImage:
          "radial-gradient(ellipse at 50% 70%, black, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 70%, black, transparent 75%)",
        opacity: Math.min(1, intensity),
      }

  return (
    <div
      ref={setRoot}
      data-slot="dither"
      data-state={status === "dots" || status === "blank" ? "fallback" : status}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className
      )}
      style={status === "dots" ? { ...style, ...fallbackStyle } : style}
      {...props}
    />
  )
}
