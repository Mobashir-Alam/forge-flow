// HSL values (no "hsl()" wrapper) — applied to CSS variables defined in index.css
export type ThemeTokens = {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  "sidebar-background": string;
  "sidebar-foreground": string;
  "sidebar-primary": string;
  "sidebar-primary-foreground": string;
  "sidebar-accent": string;
  "sidebar-accent-foreground": string;
  "sidebar-border": string;
  "sidebar-ring": string;
};

export type Theme = {
  id: string;
  name: string;
  description: string;
  mode: "dark" | "light";
  preview: string[]; // hex or hsl strings just for swatches
  tokens: ThemeTokens;
  gradientPrimary: string; // CSS gradient
  shadowGlow: string;
};

const dark = (over: Partial<ThemeTokens>): ThemeTokens => ({
  background: "220 20% 7%",
  foreground: "40 10% 92%",
  card: "220 18% 10%",
  "card-foreground": "40 10% 92%",
  popover: "220 18% 10%",
  "popover-foreground": "40 10% 92%",
  primary: "38 95% 55%",
  "primary-foreground": "220 20% 7%",
  secondary: "220 14% 16%",
  "secondary-foreground": "40 10% 85%",
  muted: "220 14% 14%",
  "muted-foreground": "220 10% 55%",
  accent: "25 90% 52%",
  "accent-foreground": "220 20% 7%",
  destructive: "0 72% 51%",
  "destructive-foreground": "0 0% 100%",
  border: "220 14% 18%",
  input: "220 14% 18%",
  ring: "38 95% 55%",
  "sidebar-background": "220 18% 10%",
  "sidebar-foreground": "40 10% 92%",
  "sidebar-primary": "38 95% 55%",
  "sidebar-primary-foreground": "220 20% 7%",
  "sidebar-accent": "220 14% 16%",
  "sidebar-accent-foreground": "40 10% 85%",
  "sidebar-border": "220 14% 18%",
  "sidebar-ring": "38 95% 55%",
  ...over,
});

const light = (over: Partial<ThemeTokens>): ThemeTokens => ({
  background: "0 0% 100%",
  foreground: "220 20% 12%",
  card: "0 0% 100%",
  "card-foreground": "220 20% 12%",
  popover: "0 0% 100%",
  "popover-foreground": "220 20% 12%",
  primary: "220 90% 55%",
  "primary-foreground": "0 0% 100%",
  secondary: "220 14% 96%",
  "secondary-foreground": "220 20% 12%",
  muted: "220 14% 96%",
  "muted-foreground": "220 10% 45%",
  accent: "220 90% 55%",
  "accent-foreground": "0 0% 100%",
  destructive: "0 72% 51%",
  "destructive-foreground": "0 0% 100%",
  border: "220 14% 90%",
  input: "220 14% 90%",
  ring: "220 90% 55%",
  "sidebar-background": "0 0% 100%",
  "sidebar-foreground": "220 20% 12%",
  "sidebar-primary": "220 90% 55%",
  "sidebar-primary-foreground": "0 0% 100%",
  "sidebar-accent": "220 14% 96%",
  "sidebar-accent-foreground": "220 20% 12%",
  "sidebar-border": "220 14% 90%",
  "sidebar-ring": "220 90% 55%",
  ...over,
});

export const THEMES: Theme[] = [
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Industrial dark with amber accents",
    mode: "dark",
    preview: ["#0d1117", "#1a1f2e", "#f59e0b", "#ea7c1c"],
    tokens: dark({}),
    gradientPrimary: "linear-gradient(135deg, hsl(38 95% 55%), hsl(25 90% 52%))",
    shadowGlow: "0 0 30px hsl(38 95% 55% / 0.18)",
  },
  {
    id: "minimal-white",
    name: "Minimal White",
    description: "Clean, airy, editorial",
    mode: "light",
    preview: ["#ffffff", "#f4f4f5", "#18181b", "#3b82f6"],
    tokens: light({
      primary: "220 15% 15%",
      ring: "220 15% 15%",
      accent: "220 15% 15%",
      "sidebar-primary": "220 15% 15%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(220 15% 15%), hsl(220 15% 35%))",
    shadowGlow: "0 0 30px hsl(220 15% 15% / 0.08)",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Deep ocean with teal highlights",
    mode: "dark",
    preview: ["#0c2340", "#1a4a6e", "#2d8a9e", "#5cbdb9"],
    tokens: dark({
      background: "210 60% 8%",
      card: "210 50% 12%",
      popover: "210 50% 12%",
      secondary: "210 40% 18%",
      muted: "210 40% 16%",
      "muted-foreground": "210 20% 65%",
      primary: "190 75% 50%",
      "primary-foreground": "210 60% 8%",
      accent: "175 60% 55%",
      "accent-foreground": "210 60% 8%",
      border: "210 40% 22%",
      input: "210 40% 22%",
      ring: "190 75% 50%",
      "sidebar-background": "210 50% 12%",
      "sidebar-primary": "190 75% 50%",
      "sidebar-accent": "210 40% 18%",
      "sidebar-border": "210 40% 22%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(190 75% 50%), hsl(175 60% 55%))",
    shadowGlow: "0 0 30px hsl(190 75% 50% / 0.25)",
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    description: "Forest depth with emerald glow",
    mode: "dark",
    preview: ["#0a1f17", "#0d7a5f", "#10b981", "#a7f3d0"],
    tokens: dark({
      background: "160 30% 8%",
      card: "160 25% 12%",
      popover: "160 25% 12%",
      secondary: "160 20% 18%",
      muted: "160 20% 16%",
      "muted-foreground": "160 15% 60%",
      primary: "158 75% 45%",
      "primary-foreground": "160 30% 8%",
      accent: "150 60% 55%",
      "accent-foreground": "160 30% 8%",
      border: "160 20% 22%",
      input: "160 20% 22%",
      ring: "158 75% 45%",
      "sidebar-background": "160 25% 12%",
      "sidebar-primary": "158 75% 45%",
      "sidebar-accent": "160 20% 18%",
      "sidebar-border": "160 20% 22%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(158 75% 45%), hsl(150 60% 55%))",
    shadowGlow: "0 0 30px hsl(158 75% 45% / 0.25)",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Regal violet with magenta accents",
    mode: "dark",
    preview: ["#1a0b2e", "#4c1d95", "#a855f7", "#f0abfc"],
    tokens: dark({
      background: "270 40% 8%",
      card: "270 35% 12%",
      popover: "270 35% 12%",
      secondary: "270 25% 18%",
      muted: "270 25% 16%",
      "muted-foreground": "270 15% 65%",
      primary: "270 80% 60%",
      "primary-foreground": "0 0% 100%",
      accent: "300 80% 65%",
      "accent-foreground": "0 0% 100%",
      border: "270 25% 22%",
      input: "270 25% 22%",
      ring: "270 80% 60%",
      "sidebar-background": "270 35% 12%",
      "sidebar-primary": "270 80% 60%",
      "sidebar-accent": "270 25% 18%",
      "sidebar-border": "270 25% 22%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(270 80% 60%), hsl(300 80% 65%))",
    shadowGlow: "0 0 30px hsl(270 80% 60% / 0.3)",
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm sunset gradient energy",
    mode: "dark",
    preview: ["#1a0e0a", "#ff6b35", "#f7931e", "#fbbf24"],
    tokens: dark({
      background: "20 30% 8%",
      card: "20 25% 12%",
      popover: "20 25% 12%",
      secondary: "20 20% 18%",
      muted: "20 20% 16%",
      "muted-foreground": "20 15% 65%",
      primary: "20 95% 55%",
      "primary-foreground": "20 30% 8%",
      accent: "40 95% 55%",
      "accent-foreground": "20 30% 8%",
      border: "20 20% 22%",
      input: "20 20% 22%",
      ring: "20 95% 55%",
      "sidebar-background": "20 25% 12%",
      "sidebar-primary": "20 95% 55%",
      "sidebar-accent": "20 20% 18%",
      "sidebar-border": "20 20% 22%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(20 95% 55%), hsl(40 95% 55%))",
    shadowGlow: "0 0 30px hsl(20 95% 55% / 0.3)",
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    description: "Soft blush with metallic warmth",
    mode: "light",
    preview: ["#fdf2f8", "#fbcfe8", "#be185d", "#f59e0b"],
    tokens: light({
      background: "340 60% 98%",
      card: "0 0% 100%",
      popover: "0 0% 100%",
      secondary: "340 40% 95%",
      muted: "340 40% 95%",
      "muted-foreground": "340 15% 45%",
      primary: "340 75% 45%",
      "primary-foreground": "0 0% 100%",
      accent: "30 90% 55%",
      "accent-foreground": "0 0% 100%",
      border: "340 30% 88%",
      input: "340 30% 88%",
      ring: "340 75% 45%",
      "sidebar-background": "0 0% 100%",
      "sidebar-primary": "340 75% 45%",
      "sidebar-accent": "340 40% 95%",
      "sidebar-border": "340 30% 88%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(340 75% 55%), hsl(30 90% 60%))",
    shadowGlow: "0 0 30px hsl(340 75% 55% / 0.18)",
  },
  {
    id: "cyber-neon",
    name: "Cyber Neon",
    description: "Cyberpunk neon — pink & cyan",
    mode: "dark",
    preview: ["#0a0014", "#ec4899", "#06b6d4", "#a3e635"],
    tokens: dark({
      background: "270 60% 5%",
      card: "270 50% 9%",
      popover: "270 50% 9%",
      secondary: "270 35% 15%",
      muted: "270 35% 13%",
      "muted-foreground": "300 20% 70%",
      primary: "320 95% 60%",
      "primary-foreground": "270 60% 5%",
      accent: "190 95% 55%",
      "accent-foreground": "270 60% 5%",
      border: "270 35% 20%",
      input: "270 35% 20%",
      ring: "320 95% 60%",
      "sidebar-background": "270 50% 9%",
      "sidebar-primary": "320 95% 60%",
      "sidebar-accent": "270 35% 15%",
      "sidebar-border": "270 35% 20%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(320 95% 60%), hsl(190 95% 55%))",
    shadowGlow: "0 0 30px hsl(320 95% 60% / 0.4)",
  },
  {
    id: "luxury-black-gold",
    name: "Luxury Black & Gold",
    description: "Pure black with prestige gold",
    mode: "dark",
    preview: ["#0a0a0a", "#1a1a1a", "#c9a84c", "#f0d78c"],
    tokens: dark({
      background: "0 0% 4%",
      card: "0 0% 7%",
      popover: "0 0% 7%",
      secondary: "0 0% 12%",
      muted: "0 0% 10%",
      "muted-foreground": "45 15% 60%",
      primary: "44 70% 55%",
      "primary-foreground": "0 0% 4%",
      accent: "44 80% 70%",
      "accent-foreground": "0 0% 4%",
      border: "45 20% 18%",
      input: "45 20% 18%",
      ring: "44 70% 55%",
      "sidebar-background": "0 0% 7%",
      "sidebar-primary": "44 70% 55%",
      "sidebar-accent": "0 0% 12%",
      "sidebar-border": "45 20% 18%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(44 70% 55%), hsl(44 80% 70%))",
    shadowGlow: "0 0 30px hsl(44 70% 55% / 0.25)",
  },
  {
    id: "islamic-elegant",
    name: "Islamic Elegant",
    description: "Deep emerald, ivory & gold calligraphy feel",
    mode: "dark",
    preview: ["#0a2e1f", "#064e3b", "#d4af37", "#f5f0e0"],
    tokens: dark({
      background: "160 50% 7%",
      card: "160 40% 11%",
      popover: "160 40% 11%",
      secondary: "160 25% 17%",
      muted: "160 25% 15%",
      "muted-foreground": "45 20% 70%",
      foreground: "45 30% 92%",
      "card-foreground": "45 30% 92%",
      primary: "45 65% 55%",
      "primary-foreground": "160 50% 7%",
      accent: "160 50% 40%",
      "accent-foreground": "45 30% 95%",
      border: "160 25% 20%",
      input: "160 25% 20%",
      ring: "45 65% 55%",
      "sidebar-background": "160 40% 11%",
      "sidebar-primary": "45 65% 55%",
      "sidebar-accent": "160 25% 17%",
      "sidebar-border": "160 25% 20%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(45 65% 55%), hsl(160 50% 40%))",
    shadowGlow: "0 0 30px hsl(45 65% 55% / 0.22)",
  },
  {
    id: "soft-pastel",
    name: "Soft Pastel",
    description: "Gentle pastel light theme",
    mode: "light",
    preview: ["#fef9f5", "#fde4cf", "#a78bfa", "#7dd3fc"],
    tokens: light({
      background: "30 60% 98%",
      card: "0 0% 100%",
      popover: "0 0% 100%",
      foreground: "260 25% 20%",
      "card-foreground": "260 25% 20%",
      secondary: "260 50% 95%",
      muted: "30 50% 95%",
      "muted-foreground": "260 15% 50%",
      primary: "260 70% 70%",
      "primary-foreground": "260 60% 15%",
      accent: "200 80% 75%",
      "accent-foreground": "260 60% 15%",
      border: "260 30% 90%",
      input: "260 30% 90%",
      ring: "260 70% 70%",
      "sidebar-background": "0 0% 100%",
      "sidebar-primary": "260 70% 70%",
      "sidebar-accent": "260 50% 95%",
      "sidebar-border": "260 30% 90%",
    }),
    gradientPrimary: "linear-gradient(135deg, hsl(260 70% 75%), hsl(200 80% 75%))",
    shadowGlow: "0 0 30px hsl(260 70% 75% / 0.2)",
  },
];

export const DEFAULT_THEME_ID = "modern-dark";

export function getThemeById(id: string | null | undefined): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  Object.entries(theme.tokens).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  root.style.setProperty("--gradient-primary", theme.gradientPrimary);
  root.style.setProperty("--shadow-glow", theme.shadowGlow);
  root.dataset.theme = theme.id;
  root.dataset.themeMode = theme.mode;
  if (theme.mode === "light") root.classList.remove("dark");
  else root.classList.add("dark");
}