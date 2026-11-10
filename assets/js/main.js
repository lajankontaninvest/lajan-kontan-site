// Menu mobile : le seul script du site. Sans JavaScript, la navigation reste visible.
(function () {
  var bouton = document.querySelector(".menu-bouton");
  var nav = document.getElementById("nav");
  if (!bouton || !nav) return;
  bouton.addEventListener("click", function () {
    var ouvert = nav.classList.toggle("ouvert");
    bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("ouvert")) {
      nav.classList.remove("ouvert");
      bouton.setAttribute("aria-expanded", "false");
      bouton.focus();
    }
  });
})();

// Outil de budget : l'iframe n'est chargée qu'au clic, pour ne rien charger de tiers à l'ouverture de la page.
(function () {
  var bouton = document.querySelector("[data-charger-outil]");
  var zone = document.getElementById("outil");
  if (!bouton || !zone) return;
  bouton.hidden = false;
  bouton.addEventListener("click", function () {
    if (!zone.firstChild) {
      var cadre = document.createElement("iframe");
      cadre.src = bouton.getAttribute("data-charger-outil");
      cadre.title = "Outil de budget Lajan Kontan";
      cadre.loading = "lazy";
      cadre.setAttribute("allow", "clipboard-write");
      zone.appendChild(cadre);
    }
    zone.hidden = false;
    bouton.hidden = true;
    zone.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
