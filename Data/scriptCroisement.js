import fs from "fs";
/*
1) faire la connexion avec l'api YGOProdeck
2) recupérer une liste de nom de cards
3) trouver comment query l'api via les nom

4) comprarer les resultat de ta query par nom et les cards que tu as (eg: tu as 3K cards et 500 resultats)
5) Si le resultat de la query est satisfaisant essayer de trouver un moyen de crée un nouveau json à partir des deux    
*/

//Connect API
const apiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => JSON.parse(data))
  .then((cards) => fs.writeFileSync("./CardsData.json", cards));
