# Lajan Kontan

Bienvenue sur le site de **Lajan Kontan**, mon projet pour parler d'éducation financière et d'investissement aux Antilles-Guyane (et plus encore).

## Mes 3 objectifs

- Vulgariser et partager les bases de l'investissement
- Publier mon premier site en ligne
- Construire une communauté autour de la finance

## Pour me retrouver

[@lajankontaninvest](https://www.instagram.com/lajankontaninvest)

## Version bêta du site

Site statique (HTML, CSS, un peu de JavaScript), sans étape de build, sans cookie, sans traceur. Les polices sont hébergées dans le dépôt.

- `index.html` : accueil
- `accompagnements.html`, `apero-invest.html`, `a-propos.html`, `devenir-partenaire.html`
- `transparence.html`, `mentions-legales.html`, `404.html`
- `assets/` : styles, scripts (menu, Laji), polices, images
- `assets/img/laji/` : illustrations de Laji (WebP en 320 et 640 px, même cadrage pour toutes). Ajouter une variante : déposer `laji-<clé>.webp` dans les deux dossiers puis ajouter une ligne dans `assets/js/laji.js` (liste `VARIANTES`).

Aperçu en local : `python3 -m http.server` puis ouvrir `http://localhost:8000`.

La bêta est volontairement non indexée (`noindex` et `robots.txt`). Le dépôt étant public, aucune donnée sensible n'y est stockée.
