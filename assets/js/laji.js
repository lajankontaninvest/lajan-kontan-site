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
    s: "(max-width: 760px) 90px, 110px",
    m: "(max-width: 760px) 120px, 160px",
    l: "(max-width: 760px) 150px, 200px"
  };

  if (!("customElements" in window)) return;

  var calme = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var observateur = null;

  if (!calme && "IntersectionObserver" in window) {
    document.documentElement.classList.add("laji-anime");
    observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        // Apparition au premier passage, puis le flottement se met en pause hors de l'écran.
        if (e.isIntersecting) e.target.classList.add("laji-visible", "laji-actif");
        else e.target.classList.remove("laji-actif");
      });
    }, { threshold: 0.25 });
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
      if (observateur) observateur.observe(this);
    }
    disconnectedCallback() {
      if (observateur) observateur.unobserve(this);
    }
  });
})();
