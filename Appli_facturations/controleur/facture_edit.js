import { vueFactureEdit } from "../controleur/class_facture_edit.js";
vueFactureEdit.init({
    divDetail: document.querySelector("[id=div_facture_detail]"),
    divTitre: document.querySelector("[id=div_facture_titre]"),
    edtNum: document.querySelector("[id=edt_facture_num]"),
    edtDate: document.querySelector("[id=edt_facture_date]"),
    edtCom: document.querySelector("[id=edt_facture_com]"),
    edtNoClient: document.querySelector("[id=edt_facture_noclient]"),
    listeLivraison: document.querySelector("[id=edt_facture_livraison]"),
    edtRemise: document.querySelector("[id=edt_facture_remise]"),
    btnRetour: document.querySelector("[id=btn_facture_retour]"),
    btnValider: document.querySelector("[id=btn_facture_valider]"),
    btnAnnuler: document.querySelector("[id=btn_facture_annuler]"),
    lblDetailsClient: document.querySelector("[id=lbl_facture_details_client]"),
    lblDetailsLivraison: document.querySelector("[id=lbl_facture_details_livraison]"),
    lblDetailsProduit: document.querySelector("[id=lbl_facture_details_produit]"),
    lblDateErreur: document.querySelector("[id=lbl_erreur_date]"),
    lblClientErreur: document.querySelector("[id=lbl_erreur_client]"),
    lblRemiseErreur: document.querySelector("[id=lbl_erreur_remise]"),
    lblProdErreur: document.querySelector("[id=lbl_erreur_prod]"),
    divFactureProduit: document.querySelector("[id=div_facture_produit]"),
    divFactureProduitEdit: document.querySelector("[id=div_facture_produit_edit]"),
    btnAjouterProduit: document.querySelector("[id=btn_produit_ajouter]"),
    lblHT: document.querySelector("[id=lbl_HT_produit]"),
    lblRemise: document.querySelector("[id=lbl_remise_produit]"),
    lblAPayer: document.querySelector("[id=lbl_a_payer_produit]"),
    tableProduit: document.querySelector("[id=table_produit]"),
    listeProduit: document.querySelector("[id=select_produit]"),
    edtQte: document.querySelector("[id=edt_produit_qte]"),
    btnValiderProduit: document.querySelector("[id=btn_produit_valider]"),
    btnAnnulerProduit: document.querySelector("[id=btn_produit_annuler]"),
    lblSelectProduitErreur: document.querySelector("[id=lbl_erreur_select_produit]"),
    lblQteErreur: document.querySelector("[id=lbl_erreur_qte]"),
});
//# sourceMappingURL=facture_edit.js.map