import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { applyTheme, DEFAULT_THEME_ID, getThemeById, Theme, THEMES } from "@/lib/themes";

type ThemeContextValue = {
  theme: Theme;
  themeId: string;
  themes: Theme[];
  setThemeId: (id: string) => Promise<void>;
  loading: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeId, setThemeIdState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME_ID;
    return localStorage.getItem("active_theme") || DEFAULT_THEME_ID;
  });
  const [loading, setLoading] = useState(true);

  // Apply immediately on mount + whenever id changes
  useEffect(() => {
    applyTheme(getThemeById(themeId));
  }, [themeId]);

  // Fetch active theme from DB + subscribe to realtime updates
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "active_theme")
        .maybeSingle();
      if (mounted && data?.value) {
        setThemeIdState(data.value);
        localStorage.setItem("active_theme", data.value);
      }
      setLoading(false);
    })();

    const channel = supabase
      .channel("site_settings_theme")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings", filter: "key=eq.active_theme" },
        (payload) => {
          const newVal = (payload.new as any)?.value;
          if (newVal) {
            setThemeIdState(newVal);
            localStorage.setItem("active_theme", newVal);
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

  return (
    <ThemeContext.Provider value={{ theme: getThemeById(themeId), themeId, themes: THEMES, setThemeId, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};