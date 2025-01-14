Pour ouvrir notre site voici les étapes :

1-d'abord cloner la repo dans le local
2-ensuite importer la base de données 
voici la commande :psql -U postgres -f chemin_du_fichier/Game-Store.sql
le fichier Game-Store.sql est dans la repository 
3-apres ouvrir le dossier Game-Store contenant le frontend et le backend dans vs code
4-creer un fichier(ou le modifier si il est deja là) .env dans backend/routes dans vs code et le remplir comme suis :
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=votre mot de passe postgresql
DB_NAME=BDweb (le nom de la base de données)
PORT=3000
5-ouvrir un terminal dans le dossier backend
6-taper node index.js dans le terminal
Maintenant le site sera accessible dans le navigateur avec l'adresse : http://localhost:3000


