import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

/** Get autonym like “Deutsch (Schweiz)” from a BCP-47 code */
function labelFor(lng) {
  try {
    const [lang, region] = lng.split("-");
    const langName = new Intl.DisplayNames([lng], { type: "language" }).of(lang);
    let label = langName || lng;

    if (region) {
      const regionName = new Intl.DisplayNames([lng], { type: "region" }).of(region);
      label += regionName ? ` (${regionName})` : ` (${region})`;
    }
    // Capitalize first letter (some locales return lowercase)
    return label.charAt(0).toUpperCase() + label.slice(1);
  } catch {
    return lng;
  }
}

export default function LanguageSwitcher({ className = "" }) {
  const { i18n, t } = useTranslation();

  // Derive the list dynamically from i18next config/store
  const languages = useMemo(() => {
    let list =
      i18n.options?.supportedLngs?.filter((l) => l && l !== "cimode") ??
      Object.keys(i18n.store?.data ?? {});
    // Deduplicate and keep stable order (current first, then alpha)
    const uniq = Array.from(new Set(list));
    const current = i18n.resolvedLanguage || i18n.language || uniq[0] || "en";
    const rest = uniq.filter((l) => !current.startsWith(l));
    return [current, ...rest.sort((a, b) => labelFor(a).localeCompare(labelFor(b)))];
  }, [i18n.options?.supportedLngs, i18n.store?.data, i18n.resolvedLanguage, i18n.language]);

  const current = i18n.resolvedLanguage || i18n.language || languages[0] || "en";

  useEffect(() => {
    if (current) document.documentElement.setAttribute("lang", current);
  }, [current]);

  const onChange = async (lng) => {
    await i18n.changeLanguage(lng);
    try {
      localStorage.setItem("i18nextLng", lng);
    } catch {}
  };

  return (
     <div className="fixed top-3 left-3 z-50">
    
    <Select value={current} onValueChange={onChange}>
      <SelectTrigger
        className={`h-9 w-[200px] justify-between bg-background text-foreground ${className}`}
        aria-label={t("language.selectLabel", "Select language")}
      >
        <SelectValue placeholder={t("language.placeholder", "Language")} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lng) => (
          <SelectItem key={lng} value={lng}>
            {labelFor(lng)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select></div>
  );
}
