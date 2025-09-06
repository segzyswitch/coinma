export const useGoogleTranslate = () => {
  const getHostVariants = () => {
    const host = location.hostname;
    const parts = host.split(".");
    // current host + top-level variant (handles localhost + domains)
    const variants = new Set<string>([host]);
    if (parts.length > 1) variants.add("." + parts.slice(-2).join("."));
    return Array.from(variants);
  };

  const setCookie = (name: string, value: string) => {
    const expires = "; expires=" + new Date(Date.now() + 365*24*60*60*1000).toUTCString();
    const path = "; path=/";
    for (const domain of getHostVariants()) {
      document.cookie = `${name}=${value}${expires}${path}; domain=${domain}`;
    }
    // Also set without domain (covers localhost)
    document.cookie = `${name}=${value}${expires}${path}`;
  };

  const getCookie = (name: string) => {
    return document.cookie
      .split("; ")
      .find((c) => c.startsWith(name + "="))
      ?.split("=")[1] ?? "";
  };

  const applyLanguage = (lang: string) => {
    // Format: /<src>/<dst>. Using /auto/ lets Google detect source.
    const target = lang || "en";
    setCookie("googtrans", `/auto/${target}`);
    // Google also reads this alt cookie key sometimes:
    setCookie("googtrans", `/auto/${target}`);
    // Force reload to re-run DOM translation
    location.reload();
  };

  const currentLanguage = () => {
    const v = getCookie("googtrans");
    // v looks like "/auto/es" or "/en/fr"
    const parts = v.split("/");
    return parts[2] || "en";
  };

  return { applyLanguage, currentLanguage };
};
