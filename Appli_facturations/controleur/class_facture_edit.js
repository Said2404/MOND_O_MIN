import { UneFacture, LesFactures } from "../modele/data_facture.js";
import { LesClients } from "../modele/data_client.js";
import { LesForfaits } from "../modele/data_forfait.js";
import { UnProduitByFacture, LesProduitsByFacture, LesProduits, } from "../modele/data_produit.js";
class VueFactureEdit {
    get form() {
        return this._form;
    }
    get params() {
        return this._params;
    }
    get grille() {
        return this._grille;
    }
    get erreur() {
        return this._erreur;
    }
    get detailsProduitSelectionne() {
        return this._detailsProduitSelectionne;
    }
    set detailsProduitSelectionne(string) {
        this._detailsProduitSelectionne = string;
    }
    initMsgErreur() {
        // les erreurs "champ vide", "valeur inconnue", "doublon"
        //sont les trois principales erreurs dans un formulaire
        // pour chaque champ à contrôler (événement onChange),
        //création des 3 messages d'erreur + message pour correct
        // avec chaîne vide si pas d'erreur générée pour un type d'erreur potentielle
        this._erreur = {
            edtDate: {
                statut: "vide",
                msg: {
                    correct: "",
                    vide: "La date doit être renseignée.",
                    inconnu: "La date doit être une date valide au format jj/mm/aaaa, et inférieur à la date du jour.",
                    doublon: "",
                },
            },
            edtNoClient: {
                statut: "vide",
                msg: {
                    correct: "",
                    vide: "Le numéro de client doit être renseigné.",
                    inconnu: "Numéro de client inconnu.",
                    doublon: "",
                },
            },
            edtRemise: {
                statut: "vide",
                msg: {
                    correct: "",
                    vide: "Le taux de remise doit être renseigné.",
                    inconnu: "Le taux de remise doit être compris entre 0 et le taux de remise maximum accordé au client.",
                    doublon: "",
                },
            },
            produit: {
                statut: "vide",
                msg: {
                    correct: "",
                    vide: "La facture doit contenir au moins un produit.",
                    inconnu: "",
                    doublon: "",
                },
            },
            listeProduit: {
                statut: "vide",
                msg: {
                    correct: "",
                    vide: "Aucun produit choisi",
                    inconnu: "",
                    doublon: "",
                },
            },
            edtQte: {
                statut: "vide",
                msg: {
                    correct: "",
                    vide: "La quantité doit être un nombre entier supérieur à 0",
                    inconnu: "",
                    doublon: "",
                },
            },
        };
    }
    init(form) {
        this._form = form;
        this._params = location.search.substring(1).split("&");
        // params[0] : mode affi, modif, suppr, ajout
        // params[1] : id en mode affi, modif, suppr
        this.form.divFactureProduitEdit.hidden = true;
        this.initMsgErreur();
        let titre;
        switch (this.params[0]) {
            case "suppr":
                titre = "Suppression d'une facture";
                break;
            case "ajout":
                titre = "Nouvelle facture";
                break;
            case "modif":
                titre = "Modification d'une facture";
                break;
            default:
                titre = "Détail d'une facture";
        }
        this.form.divTitre.textContent = titre;
        this.form.listeLivraison.innerHTML = "";
        const lesFactures = new LesFactures();
        const lesForfaits = new LesForfaits();
        const affi = this.params[0] === "affi";
        this.detailsProduitSelectionne = "";
        this.form.lblDetailsProduit.style.border = "";
        if (this.params[0] === "ajout") {
            let listeFactures = lesFactures.all();
            let listeLivraison = lesForfaits.all();
            let i = 0;
            let k;
            const numNouvelleFact = lesFactures.numDerniereFacture(listeFactures) + 1;
            const dateDuJour = lesFactures.dateDuJour();
            const remiseParDéfaut = 0;
            this.form.edtNum.value = numNouvelleFact.toFixed(0);
            this.form.edtDate.value = lesFactures.dateStringToSql(dateDuJour);
            for (let j in listeLivraison) {
                if (i === 0) {
                    k = j;
                }
                const forfait = listeLivraison[j];
                const option = document.createElement("option");
                option.value = forfait.idForfait;
                option.text = forfait.libForfait;
                this.form.listeLivraison.appendChild(option);
                i = 1;
            }
            this.form.listeLivraison.value = listeLivraison[k].idForfait;
            this.form.edtRemise.value = remiseParDéfaut.toFixed(0);
            this.form.edtNum.readOnly = true;
            this.form.edtDate.readOnly = affi;
            this.form.edtCom.readOnly = affi;
            this.form.edtNoClient.readOnly = affi;
            this.form.listeLivraison.disabled = affi;
            this.form.edtRemise.readOnly = affi;
            this.detailForfait(vueFactureEdit.form.listeLivraison.value);
        }
        else {
            // affi ou modif ou suppr
            const facture = lesFactures.byNumFact(this._params[1]);
            const forfait = lesForfaits.byIdForfait(facture.idForfait);
            let listeLivraison = lesForfaits.all();
            this.form.edtNum.value = facture.numFact;
            this.form.edtDate.value = lesFactures.dateStringToSql(facture.dateFact);
            this.form.edtCom.value = facture.commentFact;
            this.form.edtNoClient.value = facture.idCli;
            for (const j in listeLivraison) {
                const forfait = listeLivraison[j];
                const option = document.createElement("option");
                option.value = forfait.idForfait;
                option.text = forfait.libForfait;
                this.form.listeLivraison.appendChild(option);
            }
            this.form.listeLivraison.value = forfait.idForfait;
            this.form.edtRemise.value = facture.tauxRemiseFact;
            this.form.edtNum.readOnly = true;
            this.form.edtDate.readOnly = affi;
            this.form.edtCom.readOnly = affi;
            this.form.edtNoClient.readOnly = affi;
            this.form.listeLivraison.disabled = affi;
            this.form.edtRemise.readOnly = affi;
            this.detailClient(String(facture.idCli));
            this.detailForfait(vueFactureEdit.form.listeLivraison.value);
        }
        this.affiProduit();
        if (this.params[0] === "suppr") {
            // temporisation 1 seconde pour afficher les données de la facture avant demande de confirmation de la supression
            setTimeout(() => {
                this.supprimer(this.params[1]);
            }, 1000);
        }
        this.form.btnRetour.hidden = !affi;
        this.form.btnValider.hidden = affi;
        this.form.btnAnnuler.hidden = affi;
        this.form.btnAjouterProduit.hidden = affi;
        // définition des événements
        this.form.edtNoClient.onchange = function () {
            vueFactureEdit.detailClient(String(vueFactureEdit.form.edtNoClient.value));
        };
        this.form.listeLivraison.onchange = function () {
            vueFactureEdit.detailForfait(vueFactureEdit.form.listeLivraison.value);
            ;
        };
        this.form.edtRemise.onchange = function () {
            vueFactureEdit.calculeMontants(String(vueFactureEdit.form.edtRemise.value), vueFactureEdit.form.edtNoClient.value);
        };
        this.form.listeProduit.addEventListener('mouseover', (event) => {
            const target = event.target;
            const codeProd = target.value;
            vueFactureEdit.detailsProduitSurvolé(String(codeProd));
        });
        this.form.listeProduit.addEventListener('mouseout', () => {
            vueFactureEdit.form.lblDetailsProduit.textContent = this.detailsProduitSelectionne;
            if (this.detailsProduitSelectionne !== "") {
                vueFactureEdit.form.lblDetailsProduit.style.border = "2px solid blue";
            }
            else {
                vueFactureEdit.form.lblDetailsProduit.style.border = "";
            }
        });
        this.form.listeProduit.onchange = function () {
            vueFactureEdit.detailsProduitSelectionne = vueFactureEdit.detailsProduitCliqué(String(vueFactureEdit.form.listeProduit.value));
        };
        this.form.btnRetour.onclick = function () {
            vueFactureEdit.retourClick();
        };
        this.form.btnAnnuler.onclick = function () {
            vueFactureEdit.retourClick();
        };
        this.form.btnValider.onclick = function () {
            vueFactureEdit.validerClick();
        };
        this.form.btnAjouterProduit.onclick = function () {
            vueFactureEdit.ajouterProduitClick();
        };
        this.form.btnValiderProduit.onclick = function () {
            vueFactureEdit.validerProduitClick();
        };
        this.form.btnAnnulerProduit.onclick = function () {
            vueFactureEdit.annulerProduitClick();
        };
    }
    detailClient(valeur) {
        const err = this.erreur.edtNoClient;
        const lesClients = new LesClients();
        const detail = this.form.lblDetailsClient;
        detail.textContent = "";
        err.statut = "correct";
        const chaine = valeur.trim();
        if (chaine.length > 0) {
            const client = lesClients.byIdCli(chaine);
            if (client.idCli !== "") {
                // client trouvé
                detail.textContent =
                    client.civCli + " " + client.nomCli + " " + client.prenomCli + "\r\n" + client.adrCli + " - " + client.cpCli + " " + client.communeCli + "\r\n" + client.melCli + "\r\nTaux de remise maximum accordé : " + client.tauxMaxRemiseCli + "%";
            }
            else {
                err.statut = "inconnu";
                detail.textContent = err.msg.inconnu;
            }
        }
        else
            err.statut = "vide";
    }
    detailForfait(valeur) {
        const lesForfaits = new LesForfaits();
        const detailLiv = this.form.lblDetailsLivraison;
        detailLiv.textContent = "";
        const chaine = valeur.trim();
        if (chaine.length > 0) {
            const unForfaitLivraison = lesForfaits.byIdForfait(chaine);
            if (unForfaitLivraison.idForfait !== "") {
                detailLiv.textContent = unForfaitLivraison.libForfait + "\r\n" + unForfaitLivraison.mtForfait + " €";
            }
        }
    }
    calculeMontants(valeur, client) {
        const err = this._erreur.edtRemise;
        const detailRemise = this.form.lblRemise;
        const detailAPayer = this.form.lblAPayer;
        const detailHT = this.form.lblHT;
        const labelError = this.form.lblRemiseErreur;
        const lesClients = new LesClients();
        labelError.textContent = "";
        detailAPayer.textContent = "";
        detailRemise.textContent = "";
        err.statut = "correct";
        const chaineClient = client.trim();
        const chaine = valeur.trim();
        if (chaineClient.length > 0) {
            const leClient = lesClients.byIdCli(chaineClient);
            if (chaine.length > 0) {
                if (leClient.idCli !== "") {
                    //Client trouvé
                    if (Number(valeur) >= 0 && Number(valeur) <= 100 && Number(valeur) <= Number(leClient.tauxMaxRemiseCli)) {
                        //Taux de remise correct
                        let prix = 0;
                        let remise = 0;
                        for (let id in this.grille) {
                            const unProduitByFacture = this.grille[id];
                            prix = unProduitByFacture.qteProd * Number(unProduitByFacture.unProduit.tarifHt);
                            remise += Number(valeur) / 100 * prix;
                        }
                        detailRemise.textContent = remise.toFixed(2);
                        detailAPayer.textContent = (Number(detailHT.textContent) - remise).toFixed(2);
                    }
                    else {
                        err.statut = "inconnu";
                        labelError.textContent = err.msg.inconnu;
                    }
                }
            }
            else {
                err.statut = "vide";
                labelError.textContent = err.msg.vide;
            }
        }
    }
    detailsProduitCliqué(codeProd) {
        const lesProduits = new LesProduits();
        const detailProd = this.form.lblDetailsProduit;
        const produit = lesProduits.byCodeProd(codeProd);
        if (produit.codeProd !== "") {
            vueFactureEdit.form.lblDetailsProduit.style.border = "2px solid blue";
            detailProd.textContent = produit.type + "\r\n" + produit.conditionnement + "cl" + "\r\n" + produit.origine + "\r\n" + produit.tarifHt + " €";
            return produit.type + "\r\n" + produit.conditionnement + "cl" + "\r\n" + produit.origine + "\r\n" + produit.tarifHt + " €";
        }
        else {
            return "";
        }
    }
    detailsProduitSurvolé(codeProd) {
        const lesProduits = new LesProduits();
        const detailProd = this.form.lblDetailsProduit;
        const produit = lesProduits.byCodeProd(codeProd);
        if (produit.codeProd !== "") {
            detailProd.textContent = produit.type + "\r\n" + produit.conditionnement + "cl" + "\r\n" + produit.origine + "\r\n" + produit.tarifHt + " €";
            vueFactureEdit.form.lblDetailsProduit.style.border = "2px solid blue";
        }
    }
    affiProduit() {
        const lesProduitsByFacture = new LesProduitsByFacture();
        this._grille = lesProduitsByFacture.byNumFact(this.params[1]);
        this.affiGrilleProduit();
    }
    affiGrilleProduit() {
        while (this.form.tableProduit.rows.length > 1) {
            this.form.tableProduit.rows[1].remove();
        }
        let total = 0;
        for (let id in this.grille) {
            const unProduitByFacture = this.grille[id];
            const tr = this.form.tableProduit.insertRow();
            tr.insertCell().textContent = unProduitByFacture.unProduit.codeProd;
            tr.insertCell().textContent = unProduitByFacture.unProduit.libProd;
            tr.insertCell().textContent = unProduitByFacture.unProduit.type;
            tr.insertCell().textContent = unProduitByFacture.unProduit.conditionnement;
            tr.insertCell().textContent = unProduitByFacture.unProduit.tarifHt;
            tr.insertCell().textContent = unProduitByFacture.qteProd.toFixed(0);
            tr.insertCell().textContent = unProduitByFacture.unProduit.getMontantProduit(unProduitByFacture).toFixed(2);
            const affi = this.params[0] === "affi";
            if (!affi) {
                let balisea; // déclaration balise <a>
                // création balise <a> pour appel modification produit dans salle
                balisea = document.createElement("a");
                balisea.classList.add("img_modification");
                balisea.onclick = function () {
                    vueFactureEdit.modifierProduitClick(id);
                };
                tr.insertCell().appendChild(balisea);
                // création balise <a> pour appel suppression produit dans salle
                balisea = document.createElement("a");
                balisea.classList.add("img_corbeille");
                balisea.onclick = function () {
                    vueFactureEdit.supprimerProduitClick(id);
                };
                tr.insertCell().appendChild(balisea);
            }
            total += unProduitByFacture.qteProd * Number(unProduitByFacture.unProduit.tarifHt);
        }
        this.form.lblHT.textContent = total.toFixed(2);
        this.calculeMontants(String(vueFactureEdit.form.edtRemise.value), this.form.edtNoClient.value);
    }
    supprimer(numFact) {
        if (confirm("Confirmez-vous la suppression de la facture " + numFact)) {
            let lesProduitsByFacture = new LesProduitsByFacture();
            lesProduitsByFacture.delete(numFact); // suppression dans la base des produits de la facture
            const lesFactures = new LesFactures();
            lesFactures.delete(numFact); // suppression dans la base de la facture
        }
        this.retourClick();
    }
    verifDate(date) {
        const lesFactures = new LesFactures;
        const uneFacture = new UneFacture();
        const err = this._erreur.edtDate;
        const labelError = this.form.lblDateErreur;
        const chaine = date.trim();
        err.statut = "correct";
        if (chaine.length === 0) {
            err.statut = "vide";
            labelError.textContent = err.msg.vide;
        }
        else if (!uneFacture.estDateValide(chaine)) {
            err.statut = "inconnu";
            labelError.textContent = err.msg.inconnu;
        }
        else {
            const dateRécup = new Date(lesFactures.dateStringToSql(chaine));
            const dateDuJour = new Date(lesFactures.dateStringToSql(lesFactures.dateDuJour()));
            if (dateRécup > dateDuJour) {
                err.statut = "inconnu";
                labelError.textContent = err.msg.inconnu;
            }
        }
    }
    verifNumCli(valeur) {
        const lesFactures = new LesFactures();
        const err = this._erreur.edtNoClient;
        err.statut = "correct";
        const chaine = valeur.trim();
        if (chaine.length > 0) {
            if (!chaine.match(/^(?!0$)[0-9]+$/)) {
                // expression régulière qui teste si la chaîne ne contient rien d'autre
                // que des chiffres
                this._erreur.edtNoClient.statut = "inconnu";
            }
            else if (this.params[0] === "ajout" && lesFactures.idExiste(chaine)) {
                this._erreur.edtNoClient.statut = "doublon";
            }
        }
        else
            err.statut = "vide";
    }
    traiteErreur(uneErreur, zone) {
        let correct = true;
        zone.textContent = "";
        if (uneErreur.statut !== "correct") {
            // non correct ==> erreur
            if (uneErreur.msg[uneErreur.statut] !== "") {
                // erreur
                zone.textContent = uneErreur.msg[uneErreur.statut];
                correct = false;
            }
        }
        return correct;
    }
    validerClick() {
        const lesFactures = new LesFactures();
        const facture = new UneFacture();
        let correct = true;
        this.verifDate(lesFactures.dateSqlToString(this._form.edtDate.value));
        this.verifNumCli(this._form.edtNoClient.value);
        if (JSON.stringify(this.grille) === "{}") {
            this._erreur.produit.statut = "vide";
        }
        else
            this._erreur.produit.statut = "correct";
        correct = this.traiteErreur(this._erreur.edtDate, this.form.lblDateErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtNoClient, this.form.lblClientErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtRemise, this.form.lblRemiseErreur) && correct;
        correct = this.traiteErreur(this._erreur.produit, this.form.lblProdErreur) && correct;
        if (correct) {
            facture.numFact = this.form.edtNum.value;
            const dateFacture = lesFactures.dateSqlToString(this.form.edtDate.value);
            facture.dateFact = dateFacture;
            facture.commentFact = this.form.edtCom.value;
            facture.idCli = this.form.edtNoClient.value;
            facture.idForfait = this.form.listeLivraison.value;
            facture.tauxRemiseFact = this.form.edtRemise.value;
            if (this._params[0] === "ajout") {
                lesFactures.insert(facture);
            }
            else {
                lesFactures.update(facture);
            }
            const lesProduitsByFacture = new LesProduitsByFacture();
            lesProduitsByFacture.delete(facture.numFact);
            lesProduitsByFacture.insert(facture.numFact, this.grille);
            this.retourClick();
        }
    }
    retourClick() {
        location.href = "facture_liste.html";
    }
    // gestion des produits de la facture
    modifierProduitClick(id) {
        this.afficherProduitEdit();
        const lesProduits = new LesProduits();
        const unProduit = lesProduits.byCodeProd(id);
        this.form.listeProduit.length = 0;
        this.form.listeProduit.options.add(new Option(unProduit.libProd, id)); // text, value = 0;
        this.form.listeProduit.selectedIndex = 0;
        this.form.edtQte.value = this._grille[id].qteProd.toFixed(0);
    }
    ajouterProduitClick() {
        this.afficherProduitEdit();
        // réinitialiser la liste des équipements à choisir
        this.form.listeProduit.length = 0;
        const lesProduits = new LesProduits();
        const data = lesProduits.all();
        const codeProduits = [];
        for (let i in this._grille) {
            codeProduits.push(this._grille[i].unProduit.codeProd);
        }
        for (let i in data) {
            const id = data[i].codeProd;
            if (codeProduits.indexOf(id) === -1) {
                // pas dans la liste des produits déjà dans la facture
                this._form.listeProduit.options.add(new Option(data[i].libProd, id)); // text, value
            }
        }
    }
    supprimerProduitClick(id) {
        if (confirm("Confirmez-vous le retrait du produit de la facture ")) {
            delete this._grille[id];
            this.affiGrilleProduit();
        }
    }
    afficherProduitEdit() {
        this.form.divFactureProduitEdit.hidden = false;
        this.form.divDetail.style.pointerEvents = "none";
        this.form.divFactureProduitEdit.style.pointerEvents = "auto";
        this.form.btnAjouterProduit.hidden = true;
        this.form.btnAnnuler.hidden = true;
        this.form.btnValider.hidden = true;
    }
    cacherProduitEdit() {
        this.form.divFactureProduitEdit.hidden = true;
        this.form.divDetail.style.pointerEvents = "auto";
        this.form.btnAjouterProduit.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
        this.form.lblDetailsProduit.style.border = "";
        this.detailsProduitSelectionne = "";
    }
    verifListeProduit() {
        const err = this._erreur.listeProduit;
        err.statut = "correct";
        const cible = this._form.listeProduit;
        if (cible.value === "") {
            err.statut = "vide";
        }
    }
    verifQte() {
        const err = this._erreur.edtQte;
        err.statut = "correct";
        const valeur = this._form.edtQte.value;
        if (!(Number.isInteger(Number(valeur)) && Number(valeur) > 0)) {
            err.statut = "vide";
        }
    }
    validerProduitClick() {
        let correct = true;
        this.verifListeProduit();
        this.verifQte();
        correct =
            this.traiteErreur(this._erreur.listeProduit, this.form.lblSelectProduitErreur) && correct;
        correct =
            this.traiteErreur(this._erreur.edtQte, this.form.lblQteErreur) && correct;
        if (correct) {
            const lesProduits = new LesProduits();
            // ajout visuel de la ligne dans la grille tabulaire de la liste des produits d'une facture
            const unProduit = lesProduits.byCodeProd(this._form.listeProduit.value);
            const unProduitByFacture = new UnProduitByFacture(unProduit, parseInt(this._form.edtQte.value));
            this._grille[unProduit.codeProd] = unProduitByFacture;
            this.affiGrilleProduit();
            this.annulerProduitClick();
        }
    }
    annulerProduitClick() {
        this.cacherProduitEdit();
    }
}
let vueFactureEdit = new VueFactureEdit();
export { vueFactureEdit };
//# sourceMappingURL=class_facture_edit.js.map