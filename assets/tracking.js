/* Rastreamento: Meta Pixel e Google Tag Manager.
   Só carrega o que tiver ID preenchido em ORIGO_CONFIG (index.html). */
(function () {
  var cfg = window.ORIGO_CONFIG || {};

  if (cfg.gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(cfg.gtmId);
    document.head.appendChild(g);
  }

  if (cfg.metaPixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", cfg.metaPixelId);
    fbq("track", "PageView");
  }

  /* Evento único usado pela página. O clique no WhatsApp vira "Contact" no Pixel
     e "whatsapp_click" no dataLayer (para configurar conversão no GTM/GA4). */
  window.origoTrack = function (evento, dados) {
    if (window.dataLayer) window.dataLayer.push(Object.assign({ event: evento }, dados));
    if (window.fbq) {
      if (evento === "whatsapp_click") fbq("track", "Contact", dados);
      else fbq("trackCustom", evento, dados);
    }
  };
})();
