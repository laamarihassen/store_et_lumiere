# Store & Lumière — reproduction locale

Projet HTML, CSS et JavaScript construit à partir du site public et des médias de la sauvegarde fournie. Les mises en page, les couleurs, les typographies et les contenus de l’original sont conservés. Le projet comprend 25 pages publiques et la page d’erreur correspondant au lien inaccessible « Nos réalisations ».

## Ouvrir le site

Sur ce Mac, double-cliquez sur **lancer.command** et gardez la fenêtre ouverte pendant la consultation. Le site s’ouvre sur http://127.0.0.1:8765/.

Vous pouvez également ouvrir le dossier dans VS Code, puis utiliser un serveur local à sa racine. Avec Python 3 :

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Ouvrez ensuite http://127.0.0.1:8765/. L’ouverture directe de `index.html` sans serveur n’est pas adaptée : les liens et les ressources utilisent les chemins du site.

## Fichiers à modifier

- `index.html` : accueil.
- `produit/*/index.html` : les six fiches produits et leurs configurateurs.
- `boutique/index.html` : catalogue.
- `store-interieur/index.html` : présentation des gammes.
- `contact/index.html` et `demande-de-devis/index.html` : formulaires.
- `css/local.css` : styles des interactions locales.
- `js/local.js` : menus, carrousel, recherche, tris, calcul des prix et panier.
- `data/products.json` et `data/orders.json` : catalogue de recherche et ordre des tris.
- `wp-content/` et `assets/` : styles d’origine, images, documents PDF, polices et bibliothèques JavaScript nécessaires au rendu.

Les dossiers historiques `wp-content` reprennent les chemins des ressources originales. Ils ne contiennent pas de serveur WordPress : aucun PHP ni base de données n’est nécessaire pour consulter cette reproduction. Les bibliothèques et styles d’origine ont été réutilisés pour préserver le rendu ; ce n’est pas une réécriture intégrale de leurs fichiers minifiés.

## Fonctionnalités locales

Le carrousel, les menus, les liens entre les pages, la recherche de produits, les tris, les choix de tissus et de couleurs, l’affichage conditionnel des dimensions, les quantités et les prix fonctionnent dans le navigateur.

Le panier mémorise ses articles dans ce navigateur. Il permet de modifier les quantités, de retirer un article et d’appliquer `BONJOUR10`. Les calculs reprennent les formules présentes dans les pages publiques au moment de la copie. Les tarifs de cette version sont figés et ne sont pas synchronisés avec le site en ligne.

Les formulaires contact et devis peuvent télécharger un brouillon JSON. Ils ne transmettent aucune demande. L’inscription à la newsletter, les comptes, le suivi des commandes et le paiement réel nécessitent une intégration côté serveur et les services correspondants.

## Inspection et limites

Les pages publiques accessibles par les menus et les catégories ont été consultées dans Chrome. Le rapport `inspection.json` répertorie les pages récupérées. Le résultat a été vérifié sur des largeurs de 1440 px et 390 px, ainsi que sur plusieurs parcours interactifs ; voir `VERIFICATION.md`.

La page `/nos-realisations/` renvoie une erreur 404 sur le site original. Sa page d’erreur a été conservée. Les espaces privés, commandes réelles et écrans après authentification n’ont pas été inspectés ni reproduits.

Les formulaires, le panier, le consentement aux cookies et certains comportements des extensions WordPress ont été adaptés au fonctionnement local. Une identité parfaite dans chaque état du site n’est donc pas garantie.
