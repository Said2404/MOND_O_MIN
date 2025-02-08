"use strict";
// dans les outils de développement, désactiver le cache pour forcer le chargement des fichiers js et css 
// sur Firefox : cocher la case "Désactiver le cache"
// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
// définition de la classe 
class VueFacturations {
    init() {
        location.href = "facture_liste.html";
    }
}
const vueFacturations = new VueFacturations;
vueFacturations.init();
//# sourceMappingURL=facturations.js.map