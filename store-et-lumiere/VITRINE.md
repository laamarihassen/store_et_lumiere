# Store & Lumière — site vitrine

Version du 12 octobre 2026, à partir de la refonte locale précédente. Aucune mise en ligne effectuée.

## Utilisation
Décompressez le ZIP puis double-cliquez sur lancer.command. Le site doit être servi par ce lanceur : les chemins commencent à la racine du serveur.

## Changements
Navigation professionnelle vert/ivoire conservée et adaptée au catalogue. Panier, compte et liens de commande/paiement retirés sur les 26 pages. Les anciennes pages panier et compte affichent un accès aux devis. Les boutons produits ouvrent un dialogue accessible avec coordonnées et configuration préremplie. Prix indicatifs, descriptions, médias, options, quantités et dimensions conservés. La fonction calculatePrice est conservée à l’identique, ainsi que les champs WAPF, leurs données et scripts de calcul.

## Réception des demandes — en attente
À la demande du propriétaire, l’adresse de réception sera fournie plus tard. Aucun service de transmission n’est configuré. Le formulaire permet seulement de télécharger la demande en JSON, avec un message explicite indiquant qu’elle n’est pas envoyée. Aucun contact préexistant dans le site n’a été utilisé comme destinataire supposé.

Le client dispose d’un point d’intégration : définir window.STORE_QUOTE_ENDPOINT avant le chargement de /js/quote.js. Il transmet les coordonnées, produit, URL, dimensions, quantité, options, prix estimatif et message par POST JSON. Le service doit renvoyer {"received":true} uniquement après réception réelle ; les erreurs HTTP, réseau ou réponse invalide affichent un échec et conservent le formulaire.

Avant activation, fournir l’adresse de réception et choisir un service/hébergement. Le serveur devra valider les champs, limiter les abus, livrer ou enregistrer durablement les demandes, protéger les identifiants d’envoi côté serveur et traiter les données selon la politique du site. Cette partie reste à implémenter et à tester sur le service retenu. Les formulaires de contact/newsletter hérités restent non connectés, avec un message explicite.

## Vérifications
- Comparaison automatique des champs configurateurs sur les 26 pages : identiques à la version précédente.
- Fonction calculatePrice identique au caractère près ; 1 210 autres ressources préexistantes hors HTML/documentation conservées à l’identique.
- Tous les liens locaux vérifiés ; aucun lien vers panier, compte, paiement, commande ni action add-to-cart.
- Syntaxe des scripts local.js et quote.js vérifiée.
- Navigateur : Jour & Nuit, JN 10 S, manuel, commande droite, bloc blanc, 100 × 150 cm : 82,50 € pour 1, 165,00 € pour 2. Dimensions et options correctement reprises dans le formulaire.
- Formulaire : champs requis et email natif ; téléchargement avec confirmation « elle n’a pas été envoyée ».
- À 390 px : accueil, catalogue, devis et moustiquaire sans débordement horizontal, sans image visible manquante, sans lien d’achat. Dialogue de devis dans la largeur de l’écran ; menu mobile ouvert et navigation visible.
- Contrôles représentatifs ; toutes les combinaisons tarifaires et la transmission serveur ne sont pas testées.

La sauvegarde de la version précédente est livrée séparément dans sauvegarde-avant-vitrine.zip.
