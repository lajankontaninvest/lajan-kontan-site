// Menu mobile, menu Ressources et chargement d'outils tiers au clic. Sans JavaScript, tout reste accessible.
(function () {
  var bouton = document.querySelector(".menu-bouton");
  var nav = document.getElementById("nav");
  if (bouton && nav) {
    bouton.addEventListener("click", function () {
      var ouvert = nav.classList.toggle("ouvert");
      bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
  }
  var menu = document.querySelector(".menu-deroulant");
  var declencheur = menu && menu.querySelector(".menu-deroulant__bouton");
  function fermer() {
    if (!menu) return;
    menu.classList.remove("ouvert");
    declencheur.setAttribute("aria-expanded", "false");
  }
  if (declencheur) {
    declencheur.addEventListener("click", function (e) {
      e.stopPropagation();
      var ouvert = menu.classList.toggle("ouvert");
      declencheur.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
    document.addEventListener("click", function (e) { if (!menu.contains(e.target)) fermer(); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (menu && menu.classList.contains("ouvert")) { fermer(); declencheur.focus(); return; }
    if (nav && nav.classList.contains("ouvert")) {
      nav.classList.remove("ouvert");
      bouton.setAttribute("aria-expanded", "false");
      bouton.focus();
    }
  });
  document.querySelectorAll("[data-charger-outil]").forEach(function (b) {
    var zone = document.getElementById(b.getAttribute("data-cible") || "outil");
    if (!zone) return;
    b.hidden = false;
    b.addEventListener("click", function () {
      if (!zone.firstChild) {
        var cadre = document.createElement("iframe");
        cadre.src = b.getAttribute("data-charger-outil");
        cadre.title = b.getAttribute("data-titre") || "Contenu intégré";
        cadre.loading = "lazy";
        cadre.setAttribute("allow", "clipboard-write; fullscreen");
        cadre.setAttribute("allowfullscreen", "");
        zone.appendChild(cadre);
      }
      zone.hidden = false;
      b.hidden = true;
      zone.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
