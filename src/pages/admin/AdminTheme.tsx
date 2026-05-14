import { useTheme } from "@/context/ThemeContext";
import { Check, Palette, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const AdminTheme = () => {
  const { themes, themeId, setThemeId } = useTheme();
  const [pending, setPending] = useState<string | null>(null);

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
        {themes.map((t) => {
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
    </div>
  );
};

export default AdminTheme;