import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import english from "./locales/en.json";

export type Language = "ro" | "en";
const dictionary: Record<string, string> = english;
const storageKey = "alandis-language";
const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

export function translate(text: string, language: Language): string {
  return language === "en" ? dictionary[normalize(text)] ?? text : text;
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  tr: (text: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem(storageKey) === "en" ? "en" : "ro"; }
    catch { return "ro"; }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]')?.setAttribute("content", language === "en"
      ? "Driving school, professional certificates and transport consultancy. Discover the right training for your next journey."
      : "Școală de șoferi, atestate profesionale și consultanță în transporturi. Descoperă pregătirea potrivită pentru următorul tău drum.");
    try { localStorage.setItem(storageKey, language); } catch { /* Switching still works when storage is unavailable. */ }
  }, [language]);
  const tr = useCallback((text: string) => translate(text, language), [language]);
  const value = useMemo(() => ({ language, setLanguage, tr }), [language, tr]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is required");
  return context;
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switcher" role="group" aria-label={language === "ro" ? "Selectează limba" : "Select language"}>
      <button type="button" lang="ro" aria-label="Română" aria-pressed={language === "ro"} onClick={() => setLanguage("ro")}>
        RO
      </button>
      <span aria-hidden="true" />
      <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>
        EN
      </button>
    </div>
  );
}
