export default defineNuxtPlugin(() => {
  if (process.client) {
    (function(d, t) {
      const BASE_URL = "https://app.chatwoot.com"; // or your self-hosted domain
      const g = d.createElement(t) as HTMLScriptElement;
      const s:any = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode?.insertBefore(g, s);

      g.onload = () => {
        (window as any).chatwootSDK.run({
          websiteToken: "SWZh4kDwZJd9ks5JZN2pPLwv", // replace with your Chatwoot token
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }
});
