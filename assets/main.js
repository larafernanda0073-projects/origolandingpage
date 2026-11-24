(function () {
  var cfg = window.ORIGO_CONFIG || {};

  /* ---------- WhatsApp ---------- */
  var num = String(cfg.whatsapp || "").replace(/\D/g, "");
  var waUrl = num ? "https://wa.me/" + num + "?text=" + encodeURIComponent(cfg.mensagem || "") : null;
  document.querySelectorAll(".js-wa").forEach(function (a) {
    if (waUrl) { a.href = waUrl; a.target = "_blank"; a.rel = "noopener"; }
    a.addEventListener("click", function () {
      if (window.origoTrack) window.origoTrack("whatsapp_click", { origem: a.dataset.origem || "" });
    });
  });
  if (!waUrl) console.warn("[ORIGO] Número de WhatsApp não configurado em ORIGO_CONFIG.whatsapp");

  /* ---------- Galeria ---------- */
  var fotos = [
    ["sala-varanda", "Sala com vista para a varanda", "apto"],
    ["cozinha-ilha", "Cozinha com ilha", "apto"],
    ["sala-nicho", "Sala com nicho iluminado", "apto"],
    ["cozinha-armarios", "Cozinha planejada", "apto"],
    ["varanda-1", "Varanda", "apto"],
    ["sala-ilha", "Integração sala e cozinha", "apto"],
    ["cozinha-cooktop", "Bancada com cooktop", "apto"],
    ["sala-varanda-2", "Sala de estar", "apto"],
    ["cozinha-corredor", "Cozinha", "apto"],
    ["varanda-2", "Vista da varanda", "apto"],
    ["cozinha-ilha-entrada", "Ilha da cozinha", "apto"],
    ["sala-entrada", "Sala", "apto"],
    ["quarto-1", "Dormitório", "apto"],
    ["closet", "Closet", "apto"],
    ["suite-banheiro", "Banheiro da suíte", "apto"],
    ["quarto-2", "Dormitório", "apto"],
    ["suite-box", "Box do banheiro", "apto"],
    ["quarto-armario", "Dormitório com armário", "apto"],
    ["lavabo", "Lavabo", "apto"],
    ["varanda-3", "Varanda", "apto"],
    ["area-servico", "Área de serviço", "apto"],
    ["tenis", "Quadra de tênis", "clube"],
    ["piscina", "Piscina", "clube"],
    ["piscina-coberta", "Piscina coberta com raia", "clube"],
    ["academia", "Academia", "clube"],
    ["academia-2", "Academia", "clube"],
    ["ginastica", "Sala de ginástica", "clube"],
    ["spa", "Spa", "clube"],
    ["quadra", "Quadra poliesportiva", "clube"]
  ];
  var gal = document.getElementById("gallery");
  var visiveis = fotos.slice();
  function render(filtro) {
    visiveis = fotos.filter(function (f) { return filtro === "todos" || f[2] === filtro; });
    gal.innerHTML = visiveis.map(function (f, i) {
      return '<figure data-i="' + i + '"><img src="assets/img/' + f[0] + '.jpg" alt="' + f[1] + '" loading="lazy"><figcaption>' + f[1] + "</figcaption></figure>";
    }).join("");
  }
  render("todos");
  document.querySelectorAll(".tab").forEach(function (t) {
    t.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      render(t.dataset.filtro);
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img"), lbCap = lb.querySelector(".lb-caption"), cur = 0;
  function show(i) {
    cur = (i + visiveis.length) % visiveis.length;
    lbImg.src = "assets/img/" + visiveis[cur][0] + ".jpg";
    lbImg.alt = lbCap.textContent = visiveis[cur][1];
  }
  gal.addEventListener("click", function (e) {
    var fig = e.target.closest("figure"); if (!fig) return;
    show(+fig.dataset.i); lb.hidden = false; document.body.style.overflow = "hidden";
  });
  function close() { lb.hidden = true; document.body.style.overflow = ""; }
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = function () { show(cur - 1); };
  lb.querySelector(".lb-next").onclick = function () { show(cur + 1); };
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });

  /* ---------- Vídeo ---------- */
  var v = document.querySelector("video");
  if (v) v.addEventListener("play", function once() {
    if (window.origoTrack) window.origoTrack("video_play", {});
    v.removeEventListener("play", once);
  });

  /* ---------- Animação de entrada ---------- */
  var els = document.querySelectorAll(".section h2, .split-media, .club-card, .video-wrap, .family, .final h2");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }
})();
