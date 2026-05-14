import { useTheme } from "@/context/ThemeContext";
import { Check, Palette, Loader2, Sparkles, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  CUSTOM_THEME_ID,
  hexToHslString,
  hslStringToHex,
  THEMES,
  ThemeTokens,
  TOKEN_LABELS,
} from "@/lib/themes";

const DEFAULT_BUILDER_TOKENS: ThemeTokens = THEMES[0].tokens;

const AdminTheme = () => {
  const { themes, themeId, setThemeId, customTheme, saveCustomTheme } = useTheme();
  const [pending, setPending] = useState<string | null>(null);
  const [builderTokens, setBuilderTokens] = useState<ThemeTokens>(
    customTheme?.tokens ?? DEFAULT_BUILDER_TOKENS,
  );
  const [builderMode, setBuilderMode] = useState<"light" | "dark">(customTheme?.mode ?? "dark");
  const [savingCustom, setSavingCustom] = useState(false);

  const allThemes = customTheme ? [...themes, customTheme] : themes;

  const handleApply = async (id: string) => {
    setPending(id);
    try {
      await setThemeId(id);
      toast({ title: "Theme applied", description: "Site-wide theme updated for all visitors." });
    } catch (e: any) {
      toast({ title: "Failed to apply theme", description: e.message, variant: "destructive" });
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" /> Theme Settings
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a theme to instantly rebrand the entire website. Changes apply live to every visitor.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full glass border border-border/40 text-xs">
          Active: <span className="font-semibold text-primary">{themes.find(t => t.id === themeId)?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allThemes.map((t) => {
          const active = t.id === themeId;
          const isPending = pending === t.id;
          return (
            <button
              key={t.id}
              onClick={() => !active && handleApply(t.id)}
              disabled={isPending}
              className={`group text-left rounded-2xl border transition-all overflow-hidden ${
                active ? "border-primary shadow-glow ring-2 ring-primary/40" : "border-border/40 hover:border-primary/50"
              }`}
            >
              {/* Mini preview surface (uses theme's own colors via inline style) */}
              <div
                className="h-36 p-4 flex flex-col justify-between relative"
                style={{
                  background: `hsl(${t.tokens.background})`,
                  color: `hsl(${t.tokens.foreground})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="text-xs font-semibold px-2 py-1 rounded-md"
                    style={{
                      background: `hsl(${t.tokens.card})`,
                      border: `1px solid hsl(${t.tokens.border})`,
                    }}
                  >
                    Aa Bb
                  </div>
                  {active && (
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: `hsl(${t.tokens.primary})`, color: `hsl(${t.tokens["primary-foreground"]})` }}
                    >
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-md"
                    style={{ background: t.gradientPrimary, color: `hsl(${t.tokens["primary-foreground"]})` }}
                  >
                    Button
                  </span>
                  <span
                    className="text-[11px] px-3 py-1.5 rounded-md"
                    style={{
                      background: `hsl(${t.tokens.secondary})`,
                      color: `hsl(${t.tokens["secondary-foreground"]})`,
                    }}
                  >
                    Card
                  </span>
                </div>
              </div>

              <div className="p-4 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{t.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                  </div>
                  <div className="flex -space-x-1.5">
                    {t.preview.map((c, i) => (
                      <span key={i} className="w-5 h-5 rounded-full border-2 border-card" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.mode}</span>
                  {active ? (
                    <span className="ml-auto text-[11px] text-primary font-semibold">Active</span>
                  ) : isPending ? (
                    <span className="ml-auto text-[11px] text-muted-foreground flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Applying…
                    </span>
                  ) : (
                    <span className="ml-auto text-[11px] text-muted-foreground group-hover:text-primary">
                      Click to apply
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Theme Builder */}
      <div className="rounded-2xl border border-border/40 glass overflow-hidden">
        <div className="p-5 border-b border-border/30 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Custom Theme Builder
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Pick a color for every part of the UI — background, cards, text, borders, buttons, sidebar and more.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border/40 overflow-hidden">
              {(["dark", "light"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setBuilderMode(m)}
                  className={`px-3 py-1.5 text-xs font-semibold capitalize ${
                    builderMode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <button
              onClick={async () => {
                setSavingCustom(true);
                try {
                  await saveCustomTheme(builderTokens, builderMode);
                  await setThemeId(CUSTOM_THEME_ID);
                  toast({ title: "Custom theme applied", description: "Your custom palette is now live site-wide." });
                } catch (e: any) {
                  toast({ title: "Failed to save", description: e.message, variant: "destructive" });
                } finally {
                  setSavingCustom(false);
                }
              }}
              disabled={savingCustom}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {savingCustom ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save & Apply
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-0">
          <div className="p-5 space-y-6 max-h-[600px] overflow-y-auto">
            {Object.entries(
              TOKEN_LABELS.reduce<Record<string, typeof TOKEN_LABELS>>((acc, t) => {
                (acc[t.group] ||= []).push(t);
                return acc;
              }, {}),
            ).map(([group, items]) => (
              <div key={group}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{group}</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {items.map(({ key, label }) => {
                    const hex = hslStringToHex(builderTokens[key]);
                    return (
                      <label key={key} className="flex items-center gap-3 p-2.5 rounded-lg border border-border/30 bg-card/50">
                        <div className="relative w-10 h-10 rounded-md border border-border/40 overflow-hidden shrink-0" style={{ background: `hsl(${builderTokens[key]})` }}>
                          <input
                            type="color"
                            value={hex}
                            onChange={(e) =>
                              setBuilderTokens((prev) => ({ ...prev, [key]: hexToHslString(e.target.value) }))
                            }
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium truncate">{label}</div>
                          <div className="text-[10px] text-muted-foreground font-mono truncate">{hex}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Live preview panel */}
          <div className="border-t lg:border-t-0 lg:border-l border-border/30 p-5 bg-muted/30">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Live Preview</h4>
            <div
              className="rounded-xl p-4 space-y-3"
              style={{ background: `hsl(${builderTokens.background})`, color: `hsl(${builderTokens.foreground})` }}
            >
              <div
                className="rounded-lg p-3 border"
                style={{
                  background: `hsl(${builderTokens.card})`,
                  color: `hsl(${builderTokens["card-foreground"]})`,
                  borderColor: `hsl(${builderTokens.border})`,
                }}
              >
                <div className="text-sm font-semibold mb-1">Card Title</div>
                <div className="text-xs opacity-70">Subtle card description goes here.</div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="px-3 py-2 rounded-md text-xs font-semibold"
                  style={{
                    background: `linear-gradient(135deg, hsl(${builderTokens.primary}), hsl(${builderTokens.accent}))`,
                    color: `hsl(${builderTokens["primary-foreground"]})`,
                  }}
                >
                  Primary
                </button>
                <button
                  className="px-3 py-2 rounded-md text-xs font-semibold"
                  style={{
                    background: `hsl(${builderTokens.secondary})`,
                    color: `hsl(${builderTokens["secondary-foreground"]})`,
                  }}
                >
                  Secondary
                </button>
                <button
                  className="px-3 py-2 rounded-md text-xs font-semibold border"
                  style={{
                    borderColor: `hsl(${builderTokens.border})`,
                    color: `hsl(${builderTokens.foreground})`,
                  }}
                >
                  Outline
                </button>
              </div>
              <input
                type="text"
                placeholder="Input field"
                className="w-full rounded-md px-3 py-2 text-xs border outline-none"
                style={{
                  background: `hsl(${builderTokens.background})`,
                  borderColor: `hsl(${builderTokens.input})`,
                  color: `hsl(${builderTokens.foreground})`,
                }}
              />
              <div
                className="rounded-md px-3 py-2 text-xs"
                style={{
                  background: `hsl(${builderTokens.muted})`,
                  color: `hsl(${builderTokens["muted-foreground"]})`,
                }}
              >
                Muted text and surface
              </div>
              <div
                className="rounded-md px-3 py-2 text-xs font-semibold flex items-center justify-between"
                style={{
                  background: `hsl(${builderTokens["sidebar-background"]})`,
                  color: `hsl(${builderTokens["sidebar-foreground"]})`,
                  borderTop: `1px solid hsl(${builderTokens["sidebar-border"]})`,
                }}
              >
                <span>Sidebar / Navbar</span>
                <span style={{ color: `hsl(${builderTokens["sidebar-primary"]})` }}>Active</span>
              </div>
            </div>
            <button
              onClick={() => setBuilderTokens(THEMES.find((t) => t.id === themeId)?.tokens ?? DEFAULT_BUILDER_TOKENS)}
              className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground"
            >
              Reset to current theme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTheme;