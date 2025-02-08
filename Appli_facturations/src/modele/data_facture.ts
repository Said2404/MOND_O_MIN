import {connexion, APIsql} from "./connexion.js"
import { FactureError } from "./errors.js";
class UneFacture {
	private _numFact: string;
	private _dateFact: string;
	private _commentFact: string;	 
	private _tauxRemiseFact: string;
	private _idCli: string;
	private _idForfait: string;

	constructor(num_fact = "", date_fact ="" , comment_fact ="", taux_remise_fact = "", id_cli = "", id_forfait = "") { 
		this._numFact = num_fact;
		this._dateFact = date_fact;
		this._commentFact = comment_fact;
		this._tauxRemiseFact = taux_remise_fact;
		this._idCli = id_cli;
		this._idForfait = id_forfait;
	}
	// définition des « getters » et des « setters » pour les attributs privés de la classe
	get numFact(): string { return this._numFact; }
	set numFact(num_fact: string) {
		const num_fact_number = Number(num_fact);
		if (Number.isInteger(num_fact_number) && num_fact_number > 0) {
			this._numFact = num_fact; 
		} else {
			throw new FactureError("Le numéro de facture doit etre un entier supérieur à 0");
		}
	}
	get dateFact(): string { return this._dateFact;	}
	set dateFact(date_fact: string) { 
		if (this.estDateValide(date_fact)) {
			this._dateFact = date_fact; 
		} else {
			throw new FactureError("La date est invalide");
		}
	}
	get commentFact(): string { return this._commentFact; }
	set commentFact(comment_fact: string) { this._commentFact = comment_fact; }
	get tauxRemiseFact(): string { return this._tauxRemiseFact; }
	set tauxRemiseFact(taux_remise_fact: string) {
		const taux_remise_fact_number = Number(taux_remise_fact);
		if (taux_remise_fact_number >= 0 && taux_remise_fact_number <= 100) {
			this._tauxRemiseFact = taux_remise_fact;
		} else {
			throw new FactureError("Le taux de remise doit etre compris entre 0 et 100");
		} 
	}
	get idCli(): string { return this._idCli; }
	set idCli(id_cli: string) { 
		const id_cli_number = Number(id_cli);
		if (Number.isInteger(id_cli_number) && id_cli_number > 0) {
			this._idCli = id_cli; 
		} else {
			throw new FactureError("L'ID du client doit être un entier supérieur à 0");
		} 
	}
	get idForfait(): string { return this._idForfait; }
	set idForfait(id_forfait: string) { 
		if (id_forfait.length >= 3 && id_forfait.length <= 6) {
			this._idForfait = id_forfait;
		} else {
			throw new FactureError("L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long");
		}
	}

	toArray():APIsql.TtabAsso {
	// renvoie l’objet sous la forme d’un tableau associatif 
	// pour un affichage dans une ligne d’un tableau HTML
		const tableau : APIsql.TtabAsso = {'numFact':this._numFact, 'dateFact':this._dateFact, 'commentFact':this._commentFact, 'tauxRemiseFact':this._tauxRemiseFact, 'idCli':this._idCli, 'idForfait':this._idForfait };
		return tableau;
	}

	estDateValide(dateString: string): boolean {	//Vérifie à partir d'une string d'une date au format jj/mm/aaaa si celle-ci est valide
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
		return (
			date.getFullYear() === year &&
			date.getMonth() === month - 1 &&
			date.getDate() === day
		);
	}
}

type TFactures = {[key: string]: UneFacture };		// tableau d’objets UneFacture
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesFactures { // définition de la classe gérant les données de la table facture
	constructor () {	// rien
	}

	idExiste(num_fact : string) : boolean {	
	// renvoie le test d’existence d’une facture dans la table
	// sert pour l’ajout d’une nouvelle facture
		return (APIsql.sqlWeb.SQLloadData("SELECT num_fact FROM facture WHERE num_fact=?",[num_fact]).length > 0);
	}

	private load(result : APIsql.TdataSet) : TFactures {	// à partir d’un TdataSet, conversion en tableau d’objets UneFacture
		let factures : TFactures = {};
		for (let i=0; i<result.length; i++) {
			const item:APIsql.TtabAsso = result[i];
			const facture = new UneFacture(item['num_fact'], this.dateSqlToString(item['date_fact']), item['comment_fact'], item['taux_remise_fact'], item['id_cli'], item['id_forfait']);
			factures[facture.numFact] = facture;	// clé d’un élément du tableau : num fact
		}
		return factures;
	}

	
	private prepare(where:string):string {	// préparation de la requête avec ou sans restriction (WHERE)
		let sql : string;
		sql	= "SELECT num_fact, date_fact, comment_fact, taux_remise_fact, id_cli, id_forfait ";
		sql += " FROM facture";
		if (where !== "")
		{
			sql	+= " WHERE " +where;
		}
		return sql;
	}

	all() : TFactures {	// renvoie le tableau d’objets contenant toutes les factures
		return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
	}

	
	byNumFact (num_fact : string) : UneFacture	{ // renvoie l’objet correspondant à la facture num_fact
		let facture = new UneFacture;
		const factures : TFactures = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_fact=?"),[num_fact]));
		const lesCles: string[] = Object.keys(factures);
		// affecte les clés du tableau associatif « factures » dans le tableau de chaines « lesCles »
		if ( lesCles.length > 0) {
			facture = factures[lesCles[0]];	// récupérer le 1er élément du tableau associatif « factures »
		}
		return facture;
	}

	toArray(factures : TFactures) : APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
	//	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
		let T:APIsql.TdataSet = [];
		for (let id in factures) {
			T.push(factures[id].toArray());
        }	 
		return T;			 
	}

    delete(num_fact : string):boolean {	// requête de suppression d’une facture dans la table
		let sql : string;
		sql	= "DELETE	FROM	facture		WHERE	num_fact = ?";
		return APIsql.sqlWeb.SQLexec(sql,[num_fact]);		// requête de manipulation : utiliser SQLexec
	}

	insert(facture : UneFacture):boolean {		// requête d’ajout d’une facture dans la table
		let sql : string; 						// requête de manipulation : utiliser SQLexec
		sql	= "INSERT INTO facture(num_fact, date_fact,	comment_fact, taux_remise_fact, id_cli, id_forfait ) VALUES	(?, ?, ?, ?, ?, ?)";
		return APIsql.sqlWeb.SQLexec(sql,[facture.numFact, this.dateStringToSql(facture.dateFact), facture.commentFact, facture.tauxRemiseFact, facture.idCli, facture.idForfait]); 	
	}

	update(facture : UneFacture):boolean {		// requête de modification d’une facture dans la table
		let sql : string;
		sql	= "UPDATE facture SET date_fact = ?, comment_fact = ?, taux_remise_fact = ?, id_cli = ?, id_forfait = ? ";
		sql += " WHERE	 num_fact	= ?"; 	// requête de manipulation : utiliser SQLexec
		return APIsql.sqlWeb.SQLexec(sql,[this.dateStringToSql(facture.dateFact), facture.commentFact, facture.tauxRemiseFact, facture.idCli, facture.idForfait, facture.numFact]); 	
	}

	numDerniereFacture(listeFactures: TFactures): number {
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

	dateDuJour(): string {
		//Renvoies la date du jour au format jj/mm/aaaa
		const dateDuJour = new Date();

		const jour = dateDuJour.getDate(); //Obtiens le jour du mois (1-31)
		const mois = dateDuJour.getMonth() + 1; //Obtiens le mois (0-11) donc on y ajoute 1
		const annee = dateDuJour.getFullYear(); //obtiens l'année complète (aaaa)

		//Formatage de la date du jour
		const dateFormatee = `${jour < 10 ? '0' : ''}${jour}/${mois < 10 ? '0' : ''}${mois}/${annee}`;

		return dateFormatee;
	}

	dateStringToSql(string: string): string {
		//Convertit une date au format jj/mm/aaaa en date au format aaaa-mm-jj (erreur qui enlève 1 jour à la date)
		const parties = string.split('/');

		//Analyse de la date
		const jour = parseInt(parties[0]);
		const mois = parseInt(parties[1]);
		const annee = parseInt(parties[2]);
		
		//Création d'un objet Date à partir des parties de la date
		const date = new Date(annee, mois -1, jour); //mois -1 car les mois commencent à 0 dans les objets Date

		//Ajouter un jour à la date
		date.setDate(date.getDate()+1); //+1 car sinon cela enlève un jour

		//Récupération de la date au format aaaa-mm-jj
		const sql = date.toISOString().split('T')[0];

		return sql;
	}

	dateSqlToString(sql: string): string {
		//Convertit une date au format aaaa-mm-jj en date au format jj/mm/aaaa

		// Diviser la chaîne de date en parties (année, mois, jour) en utilisant le séparateur "-"
		const parties: string[] = sql.split('-');

		// Réorganiser les parties dans le bon ordre pour obtenir le format "jj/mm/aaaa"
		const jour: string = parties[2];
		const mois: string = parties[1];
		const annee: string = parties[0];

		// Formatage de la date au format "jj/mm/aaaa"
		const string: string = `${jour}/${mois}/${annee}`;

		return string;
	}
}

export {connexion}
export {UneFacture}
export {LesFactures}
export {TFactures}