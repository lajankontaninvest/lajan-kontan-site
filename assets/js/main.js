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
