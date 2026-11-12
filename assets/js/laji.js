// Laji, la mascotte de Lajan Kontan : composant <laji-mascotte> et animations légères.
// L'image est déjà dans le HTML : sans JavaScript, Laji s'affiche quand même (sans animation).
// Pour ajouter une variante : déposer laji-<clé>.webp dans assets/img/laji/320/ et /640/ (même cadrage),
// puis ajouter une ligne dans VARIANTES ci-dessous.
(function () {
  var BASE = "assets/img/laji/";
  var LARGEUR = 640;
  var HAUTEUR = 749; // cadre commun à toutes les variantes (1000 x 1170)
  var VARIANTES = {
    accueil: { alt: "Laji, la mascotte de Lajan Kontan, te salue de la main." },
    reflexion: { alt: "Laji, la mascotte, réfléchit la main au menton, un point d'interrogation au-dessus de la tête." }
  };
  var TAILLES = {
    s: "(max-width: 760px) 64px, 80px",
    m: "(max-width: 760px) 96px, 120px",
    l: "(max-width: 760px) 120px, 160px"
  };

  if (!("customElements" in window)) return;

  var calme = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var observateur = null;

  // Laji reste visible quoi qu'il arrive. Hors écran au chargement, il attend puis apparaît en douceur
  // au premier passage. Un délai de sécurité le fait apparaître même si l'observateur ne répond pas.
  function reveler(el) {
    el.removeAttribute("data-attente");
    el.setAttribute("data-apparition", "");
    if (observateur) observateur.unobserve(el);
  }

  if (!calme && "IntersectionObserver" in window) {
    observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) { if (e.isIntersecting) reveler(e.target); });
    }, { threshold: 0.2 });
  }

  function preparerApparition(el) {
    if (calme || !observateur) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) { el.setAttribute("data-apparition", ""); return; }
    el.setAttribute("data-attente", "");
    observateur.observe(el);
    setTimeout(function () { if (el.hasAttribute("data-attente")) reveler(el); }, 6000);
  }

  function construireImage(el) {
    var v = el.getAttribute("variant");
    var def = VARIANTES[v];
    if (!def || el.querySelector("img")) return;
    var img = document.createElement("img");
    img.src = BASE + LARGEUR + "/laji-" + v + ".webp";
    img.srcset = BASE + "320/laji-" + v + ".webp 320w, " + BASE + "640/laji-" + v + ".webp 640w";
    img.sizes = TAILLES[el.getAttribute("size")] || TAILLES.m;
    img.width = LARGEUR;
    img.height = HAUTEUR;
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = el.getAttribute("alt") || def.alt;
    el.appendChild(img);
  }

  customElements.define("laji-mascotte", class extends HTMLElement {
    connectedCallback() {
      construireImage(this);
      preparerApparition(this);
    }
    disconnectedCallback() {
      if (observateur) observateur.unobserve(this);
    }
  });
})();
