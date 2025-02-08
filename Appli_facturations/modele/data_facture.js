import { connexion, APIsql } from "./connexion.js";
import { FactureError } from "./errors.js";
class UneFacture {
    constructor(num_fact = "", date_fact = "", comment_fact = "", taux_remise_fact = "", id_cli = "", id_forfait = "") {
        this._numFact = num_fact;
        this._dateFact = date_fact;
        this._commentFact = comment_fact;
        this._tauxRemiseFact = taux_remise_fact;
        this._idCli = id_cli;
        this._idForfait = id_forfait;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get numFact() { return this._numFact; }
    set numFact(num_fact) {
        const num_fact_number = Number(num_fact);
        if (Number.isInteger(num_fact_number) && num_fact_number > 0) {
            this._numFact = num_fact;
        }
        else {
            throw new FactureError("Le numéro de facture doit etre un entier supérieur à 0");
        }
    }
    get dateFact() { return this._dateFact; }
    set dateFact(date_fact) {
        if (this.estDateValide(date_fact)) {
            this._dateFact = date_fact;
        }
        else {
            throw new FactureError("La date est invalide");
        }
    }
    get commentFact() { return this._commentFact; }
    set commentFact(comment_fact) { this._commentFact = comment_fact; }
    get tauxRemiseFact() { return this._tauxRemiseFact; }
    set tauxRemiseFact(taux_remise_fact) {
        const taux_remise_fact_number = Number(taux_remise_fact);
        if (taux_remise_fact_number >= 0 && taux_remise_fact_number <= 100) {
            this._tauxRemiseFact = taux_remise_fact;
        }
        else {
            throw new FactureError("Le taux de remise doit etre compris entre 0 et 100");
        }
    }
    get idCli() { return this._idCli; }
    set idCli(id_cli) {
        const id_cli_number = Number(id_cli);
        if (Number.isInteger(id_cli_number) && id_cli_number > 0) {
            this._idCli = id_cli;
        }
        else {
            throw new FactureError("L'ID du client doit être un entier supérieur à 0");
        }
    }
    get idForfait() { return this._idForfait; }
    set idForfait(id_forfait) {
        if (id_forfait.length >= 3 && id_forfait.length <= 6) {
            this._idForfait = id_forfait;
        }
        else {
            throw new FactureError("L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long");
        }
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau = { 'numFact': this._numFact, 'dateFact': this._dateFact, 'commentFact': this._commentFact, 'tauxRemiseFact': this._tauxRemiseFact, 'idCli': this._idCli, 'idForfait': this._idForfait };
        return tableau;
    }
    estDateValide(dateString) {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = dateString.match(regex);
        if (!match) {
            return false;
        }
        // Extraire le jour, le mois et l'année
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        // Les mois en JavaScript sont de 0 (janvier) à 11 (décembre)
        const date = new Date(year, month - 1, day);
        // Vérifier si la date est valide
        return (date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day);
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesFactures {
    constructor() {
    }
    idExiste(num_fact) {
        // renvoie le test d’existence d’une facture dans la table
        // sert pour l’ajout d’une nouvelle facture
        return (APIsql.sqlWeb.SQLloadData("SELECT num_fact FROM facture WHERE num_fact=?", [num_fact]).length > 0);
    }
    load(result) {
        let factures = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const facture = new UneFacture(item['num_fact'], this.dateSqlToString(item['date_fact']), item['comment_fact'], item['taux_remise_fact'], item['id_cli'], item['id_forfait']);
            factures[facture.numFact] = facture; // clé d’un élément du tableau : num fact
        }
        return factures;
    }
    prepare(where) {
        let sql;
        sql = "SELECT num_fact, date_fact, comment_fact, taux_remise_fact, id_cli, id_forfait ";
        sql += " FROM facture";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byNumFact(num_fact) {
        let facture = new UneFacture;
        const factures = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_fact=?"), [num_fact]));
        const lesCles = Object.keys(factures);
        // affecte les clés du tableau associatif « factures » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            facture = factures[lesCles[0]]; // récupérer le 1er élément du tableau associatif « factures »
        }
        return facture;
    }
    toArray(factures) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in factures) {
            T.push(factures[id].toArray());
        }
        return T;
    }
    delete(num_fact) {
        let sql;
        sql = "DELETE	FROM	facture		WHERE	num_fact = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_fact]); // requête de manipulation : utiliser SQLexec
    }
    insert(facture) {
        let sql; // requête de manipulation : utiliser SQLexec
        sql = "INSERT INTO facture(num_fact, date_fact,	comment_fact, taux_remise_fact, id_cli, id_forfait ) VALUES	(?, ?, ?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [facture.numFact, this.dateStringToSql(facture.dateFact), facture.commentFact, facture.tauxRemiseFact, facture.idCli, facture.idForfait]);
    }
    update(facture) {
        let sql;
        sql = "UPDATE facture SET date_fact = ?, comment_fact = ?, taux_remise_fact = ?, id_cli = ?, id_forfait = ? ";
        sql += " WHERE	 num_fact	= ?"; // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [this.dateStringToSql(facture.dateFact), facture.commentFact, facture.tauxRemiseFact, facture.idCli, facture.idForfait, facture.numFact]);
    }
    numDerniereFacture(listeFactures) {
        //Renvoie le numéro de la dernière facture
        let numéro = 0;
        for (let i in listeFactures) {
            const facture = listeFactures[i];
            if (!facture) {
                break; //Si la facture n'existe pas, on a atteint la fin du tableau
            }
            numéro = Number(facture.numFact);
        }
        return numéro;
    }
    dateDuJour() {
        //Renvoies la date du jour au format jj/mm/aaaa
        const dateDuJour = new Date();
        const jour = dateDuJour.getDate(); //Obtiens le jour du mois (1-31)
        const mois = dateDuJour.getMonth() + 1; //Obtiens le mois (0-11) donc on y ajoute 1
        const annee = dateDuJour.getFullYear(); //obtiens l'année complète (aaaa)
        //Formatage de la date du jour
        const dateFormatee = `${jour < 10 ? '0' : ''}${jour}/${mois < 10 ? '0' : ''}${mois}/${annee}`;
        return dateFormatee;
    }
    dateStringToSql(string) {
        //Convertit une date au format jj/mm/aaaa en date au format aaaa-mm-jj (erreur qui enlève 1 jour à la date)
        const parties = string.split('/');
        //Analyse de la date
        const jour = parseInt(parties[0]);
        const mois = parseInt(parties[1]);
        const annee = parseInt(parties[2]);
        //Création d'un objet Date à partir des parties de la date
        const date = new Date(annee, mois - 1, jour); //mois -1 car les mois commencent à 0 dans les objets Date
        //Ajouter un jour à la date
        date.setDate(date.getDate() + 1); //+1 car sinon cela enlève un jour
        //Récupération de la date au format aaaa-mm-jj
        const sql = date.toISOString().split('T')[0];
        return sql;
    }
    dateSqlToString(sql) {
        //Convertit une date au format aaaa-mm-jj en date au format jj/mm/aaaa
        // Diviser la chaîne de date en parties (année, mois, jour) en utilisant le séparateur "-"
        const parties = sql.split('-');
        // Réorganiser les parties dans le bon ordre pour obtenir le format "jj/mm/aaaa"
        const jour = parties[2];
        const mois = parties[1];
        const annee = parties[0];
        // Formatage de la date au format "jj/mm/aaaa"
        const string = `${jour}/${mois}/${annee}`;
        return string;
    }
}
export { connexion };
export { UneFacture };
export { LesFactures };
//# sourceMappingURL=data_facture.js.map