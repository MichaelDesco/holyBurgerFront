Creer un nouveau dossier React
    -ouvrer votre terminal
    -placer vous dans le dossier ou vous voulez créer votre nouveau projet
    -écrire  npx create-react-app nom-du-projet
    -attendre jusqu'à la fin de l'installation
    -garder le terminal ouvert

Installer Bootstrap
    -ouvrir un nouveau terminal
    -écrire npm i bootstrap
    -attendre la fin d'installation

Installer Sass
    -sur le même terminal
    -écrire npm i sass
    -ouvrir votre projet avec vs code
    -ouvrir le fichier package.json
    -ajouter la ligne a la suite dans script
        "sass": "sass -w assets/scss:assets/css"
    -creer dans le dossier src un dossier css et un dossier scss avec un fichier style.scss
    -sur le terminal écrire npm run sass

finir l'installation de bootstrap
    -ouvrir le fichier app.js
    -rajouter les imports:
        import 'bootstrap/dist/css/bootstrap.css';
        import 'bootstrap/dist/js/bootstrap.bundle.min.js';
