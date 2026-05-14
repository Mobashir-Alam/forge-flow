import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { applyTheme, buildCustomTheme, CUSTOM_THEME_ID, DEFAULT_THEME_ID, getThemeById, Theme, ThemeTokens, THEMES } from "@/lib/themes";

type ThemeContextValue = {
  theme: Theme;
  themeId: string;
  themes: Theme[];
  setThemeId: (id: string) => Promise<void>;
  customTheme: Theme | null;
  saveCustomTheme: (tokens: ThemeTokens, mode: "light" | "dark") => Promise<void>;
  loading: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeId, setThemeIdState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME_ID;
    return localStorage.getItem("active_theme") || DEFAULT_THEME_ID;
  });
  const [customTheme, setCustomTheme] = useState<Theme | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("custom_theme");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return buildCustomTheme(parsed.tokens, { mode: parsed.mode });
    } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  const resolvedTheme = useMemo(() => {
    if (themeId === CUSTOM_THEME_ID && customTheme) return customTheme;
    return getThemeById(themeId);
  }, [themeId, customTheme]);

  // Apply immediately on mount + whenever theme changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Fetch active theme from DB + subscribe to realtime updates
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: settings } = await supabase
        .from("site_settings")
        .select("key,value")
        .in("key", ["active_theme", "custom_theme"]);
      if (mounted && settings) {
        const active = settings.find((s) => s.key === "active_theme")?.value;
        const custom = settings.find((s) => s.key === "custom_theme")?.value;
        if (custom) {
          try {
            const parsed = JSON.parse(custom);
            setCustomTheme(buildCustomTheme(parsed.tokens, { mode: parsed.mode }));
            localStorage.setItem("custom_theme", custom);
          } catch {}
        }
        if (active) {
          setThemeIdState(active);
          localStorage.setItem("active_theme", active);
        }
      }
      setLoading(false);
    })();

    const channel = supabase
      .channel("site_settings_theme")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        (payload) => {
          const row = payload.new as any;
          if (!row) return;
          if (row.key === "active_theme" && row.value) {
            setThemeIdState(row.value);
            localStorage.setItem("active_theme", row.value);
          } else if (row.key === "custom_theme" && row.value) {
            try {
              const parsed = JSON.parse(row.value);
              setCustomTheme(buildCustomTheme(parsed.tokens, { mode: parsed.mode }));
              localStorage.setItem("custom_theme", row.value);
            } catch {}
          }
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const setThemeId = async (id: string) => {
    setThemeIdState(id);
    localStorage.setItem("active_theme", id);
    const { error } = await supabase
      .from("site_settings")
      .update({ value: id })
      .eq("key", "active_theme");
    if (error) throw error;
  };

  const saveCustomTheme = async (tokens: ThemeTokens, mode: "light" | "dark") => {
    const payload = JSON.stringify({ tokens, mode });
    setCustomTheme(buildCustomTheme(tokens, { mode }));
    localStorage.setItem("custom_theme", payload);
    // upsert
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "custom_theme")
      .maybeSingle();
    if (existing) {
      const { error } = await supabase.from("site_settings").update({ value: payload }).eq("key", "custom_theme");
      if (error) throw error;
    } else {
      const { error } = await supabase.from("site_settings").insert({ key: "custom_theme", value: payload });
      if (error) throw error;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, themeId, themes: THEMES, setThemeId, customTheme, saveCustomTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};