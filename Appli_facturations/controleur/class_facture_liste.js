// importation des classes de gestion des données d’une salle et de ses équipements
import { LesFactures /*, TFactures */ } from "../modele/data_facture.js";
import { LesClients } from "../modele/data_client.js";
import { LesForfaits } from "../modele/data_forfait.js";
import { LesProduitsByFacture } from "../modele/data_produit.js";
class VueFactureListe {
    get form() {
        return this._form;
    }
    init(form) {
        this._form = form;
        const lesFactures = new LesFactures();
        const lesClients = new LesClients();
        const lesForfaits = new LesForfaits();
        const lesProduitsByFacture = new LesProduitsByFacture();
        const data = lesFactures.all();
        this.form.divTitre.textContent = "Liste des factures"; // construction du titre
        for (let num in data) {
            const uneFacture = data[num];
            const tr = this.form.tableFacture.insertRow(); // création nlle ligne dans tableau
            let balisea; // déclaration balise <a>
            // création balise <a> pour appel page visualisation du détail de la facture
            balisea = document.createElement("a");
            balisea.classList.add("img_visu"); // définition class contenant l’image (voir css)
            balisea.onclick = function () {
                vueFactureListe.detailFactureClick(uneFacture.numFact);
            };
            tr.insertCell().appendChild(balisea); // création nlle cellule dans ligne
            tr.insertCell().textContent = uneFacture.numFact;
            tr.insertCell().textContent = uneFacture.dateFact;
            tr.insertCell().textContent = uneFacture.idCli;
            tr.insertCell().textContent = lesClients.byIdCli(uneFacture.idCli).nomCli;
            tr.insertCell().textContent = lesClients.byIdCli(uneFacture.idCli).communeCli;
            tr.insertCell().textContent = lesProduitsByFacture.getMontantTotalProduits(lesProduitsByFacture.byNumFact(num)).toFixed(2) + " €";
            tr.insertCell().textContent = lesProduitsByFacture.getAPayer(lesProduitsByFacture.byNumFact(num), uneFacture).toFixed(2) + " €";
            tr.insertCell().textContent = lesForfaits.byIdForfait(uneFacture.idForfait).mtForfait + " €";
            // création balise <a> pour appel page modification du détail de la facture
            balisea = document.createElement("a");
            balisea.classList.add("img_modification"); // définition class contenant l’image (voir css)
            balisea.onclick = function () {
                vueFactureListe.modifierFactureClick(uneFacture.numFact);
            };
            tr.insertCell().appendChild(balisea);
            // création balise <a> pour appel page suppression d'une facture
            balisea = document.createElement("a");
            balisea.classList.add("img_corbeille"); // définition class contenant l’image (voir css)
            balisea.onclick = function () {
                vueFactureListe.supprimerFactureClick(uneFacture.numFact);
            };
            tr.insertCell().appendChild(balisea);
        }
        // définition événement onclick sur bouton "ajouter"
        this.form.btnAjouter.onclick = function () {
            vueFactureListe.ajouterFactureClick();
        };
    }
    detailFactureClick(num) {
        // redirection vers « facture_edit.html » avec indication du statut « affi » et du numéro de facture
        location.href = "facture_edit.html?affi&" + encodeURIComponent(num);
    }
    modifierFactureClick(num) {
        // redirection vers « facture_edit.html » avec indication du statut « modif » et du numéro de facture
        location.href = "facture_edit.html?modif&" + encodeURIComponent(num);
    }
    supprimerFactureClick(num) {
        // redirection vers « facture_edit.html » avec indication du statut « suppr » et du numéro de facture
        location.href = "facture_edit.html?suppr&" + encodeURIComponent(num);
    }
    ajouterFactureClick() {
        // redirection vers « facture_edit.html » avec indication du statut « ajout »
        location.href = "facture_edit.html?ajout";
    }
}
let vueFactureListe = new VueFactureListe();
export { vueFactureListe };
//# sourceMappingURL=class_facture_liste.js.map