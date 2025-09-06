export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Only add once
    if (!document.getElementById("google-translate-script")) {
      const s = document.createElement("script");
      s.id = "google-translate-script";
      s.src = "//translate.google.com/translate_a/element.js?cb=__nuxtInitGoogleTranslate";
      document.head.appendChild(s);
    }

    // global init for the script callback
    // @ts-expect-error: window shim
    window.__nuxtInitGoogleTranslate = () => {
      // Declare google on window to satisfy TypeScript
      const google = (window as any).google;
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",     // change to your base language
          includedLanguages: "en,fr,es,de,it,pt,ar,hi,zh-CN,ja,ru",
          autoDisplay: false,
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "gt-el" // hidden mount point (we’ll hide it via CSS)
      );
    };
  }
});
