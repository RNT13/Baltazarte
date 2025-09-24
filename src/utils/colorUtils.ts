// 🎨 COLOR UTILS - Utilitários para geração de variantes de cores HSL

export function colorHSLVariants(h: number, s: number, l: number): ColorVariants {
  const clamp = (val: number) => Math.min(100, Math.max(0, val))
  return {
    base: `hsl(${h}, ${s}%, ${clamp(l)}%)`,
    light: `hsl(${h}, ${s}%, ${clamp(l + 10)}%)`,
    light02: `hsla(${h}, ${s}%, ${clamp(l + 2)}%, 0.2)`,
    light04: `hsla(${h}, ${s}%, ${clamp(l + 4)}%, 0.4)`,
    light08: `hsla(${h}, ${s}%, ${clamp(l + 6)}%, 0.8)`,
    light20: `hsl(${h}, ${s}%, ${clamp(l + 20)}%)`,
    light30: `hsl(${h}, ${s}%, ${clamp(l + 30)}%)`,
    light40: `hsl(${h}, ${s}%, ${clamp(l + 40)}%)`,
    light50: `hsl(${h}, ${s}%, ${clamp(l + 50)}%)`,
    dark: `hsl(${h}, ${s}%, ${clamp(l - 10)}%)`,
    dark02: `hsla(${h}, ${s}%, ${clamp(l - 2)}%, 0.2)`,
    dark04: `hsla(${h}, ${s}%, ${clamp(l - 4)}%, 0.4)`,
    dark08: `hsla(${h}, ${s}%, ${clamp(l - 6)}%, 0.8)`,
    dark20: `hsl(${h}, ${s}%, ${clamp(l - 20)}%)`,
    dark30: `hsl(${h}, ${s}%, ${clamp(l - 30)}%)`,
    dark40: `hsl(${h}, ${s}%, ${clamp(l - 40)}%)`,
    dark50: `hsl(${h}, ${s}%, ${clamp(l - 50)}%)`
  }
}
