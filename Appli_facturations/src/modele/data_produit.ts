import {connexion, APIsql} from "./connexion.js"
import { UneFacture } from "./data_facture.js";
import { ProduitError, ProduitByFactureError } from "./errors.js";
class UnProduit {
	private _codeProd: string;
	private _libProd: string;
	private _type: string;
	private _origine: string;
	private _conditionnement: string;
	private _tarifHt: string;

	constructor(code_prod = "", lib_prod = "" , type = "", origine = "", conditionnement = "", tarif_ht = "") 
	{	// initialisation à l’instanciation
		this._codeProd = code_prod;
		this._libProd = lib_prod;
		this._type = type;
		this._origine = origine;
		this._conditionnement = conditionnement;
		this._tarifHt = tarif_ht;
	}
	// définition des « getters » et des « setters » pour les attributs privés de la classe
	get codeProd(): string { return this._codeProd; }
	set codeProd(code_prod: string) { 
		if (code_prod.length >= 3 && code_prod.length <= 8) {
			this._codeProd = code_prod;
		} else {
			throw new ProduitError("Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long");
		}
	}
	get libProd(): string { return this._libProd;	}
	set libProd(lib_prod: string) { 
		if (lib_prod.length >= 4) {
			this._libProd = lib_prod;
		} else {
			throw new ProduitError("Le libellé du produit doit être une chaine qui fait au moins 4 caractères de long");
		}
	}
	get type(): string { return this._type; }
	set type(type: string) { 
		if (type === "plate" || type === "pétillante") {
			this._type = type;
		} else {
			throw new ProduitError("Le type doit etre \"plate\" ou \"pétillante\"");
		}
	}
	get origine(): string { return this._origine; }
	set origine(origine: string) { 
		if (origine.length >= 3) {
			this._origine = origine; 
		} else {
			throw new ProduitError("L'origine du produit doit être une chaine qui fait au moins 3 caractères de long");
		}
	}
	get conditionnement(): string { return this._conditionnement; }
	set conditionnement(conditionnement: string) { 
		const conditionnement_number = Number(conditionnement);
		if (conditionnement_number >= 25 && conditionnement_number <= 200 && Number.isInteger(conditionnement_number)) {
			this._conditionnement = conditionnement; 
		} else {
			throw new ProduitError("Le conditionnement doit etre un entier compris entre 25 et 200");
		}
	}
	get tarifHt(): string { return this._tarifHt; }
	set tarifHt(tarif_ht: string) { 
		const tarif_ht_number = Number(tarif_ht);
		if (tarif_ht_number > 0) {
			this._tarifHt = tarif_ht;
		} else {
			throw new ProduitError("Le tarif HT doit etre un réel supérieur à 0");
		}
	}
	
	toArray():APIsql.TtabAsso
	{
	// renvoie l’objet sous la forme d’un tableau associatif 
	// pour un affichage dans une ligne d’un tableau HTML
		let tableau : APIsql.TtabAsso = {'codeProd':this._codeProd, 'libProd':this._libProd, 'type':this._type, 'origine':this._origine, 'conditionnement':this._conditionnement, 'tarifHt':this._tarifHt};
		return tableau;
	}

	getMontantProduit(produit: UnProduitByFacture): number {
		// renvoie le montant à payer pour un produit par rapport à son tarif HT et sa qte
		const montantProduit = produit.qteProd * Number(produit.unProduit.tarifHt);
		return montantProduit;
	}
}

type TProduits = {[key: string]: UnProduit };	// tableau d’objets UnProduit
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesProduits {	// définition de la classe gérant les données de la table produit			 
	constructor() {
		// rien
	}

	private load(result : APIsql.TdataSet) : TProduits		{
	// à partir d’un TdataSet, conversion en tableau d’objets UnProduit
		let produits : TProduits = {};
		for (let i=0; i<result.length; i++) {
			const item:APIsql.TtabAsso = result[i];
			const produit = new UnProduit(item['code_prod'], item['lib_prod'],  item['type'],  item['origine'],  item['conditionnement'],  item['tarif_ht']);
			produits[produit.codeProd] = produit;	// clé d’un élément du tableau : code prod
		}
		return produits;
	}

	private prepare(where:string):string {	// préparation de la requête avec ou sans restriction (WHERE)
		let sql : string;
		sql	= "SELECT code_prod, lib_prod, type, origine, conditionnement, tarif_ht";
		sql += " FROM	produit"
		if (where.trim() !== "")
		{
			sql	+= " WHERE " +where;
		}
		sql	+= " ORDER BY lib_prod ASC "; 
		return sql;
	}

	all() : TProduits {	// renvoie le tableau d’objets contenant tous les produits
		return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));							
	}

	byCodeProd(code_prod: string) : UnProduit {	// renvoie l’objet correspondant au produit code_prod
		let produit = new UnProduit;
		const produits : TProduits = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("code_prod = ?"),[code_prod]));
		const lesCles: string[] = Object.keys(produits);				
		// affecte les clés du tableau associatif « produits » dans le tableau de chaines « lesCles »
		if ( lesCles.length > 0) {
			produit = produits[lesCles[0]];	// récupérer le 1er élément du tableau associatif « produits »
		}
		return produit;			 
	}

	toArray(produits : TProduits) : APIsql.TdataSet {	// renvoie le tableau d’objets sous la forme 
	//	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
		let T:APIsql.TdataSet = [];
		for (let id in produits) {
			T.push(produits[id].toArray());
		}	 
		return T;			 
	}
}

class UnProduitByFacture {	
	private _qteProd : number;
	private _unProduit : UnProduit;

	constructor(unProduit : UnProduit = null, qteProd = 1) {
	// attributs de produit auxquels on ajoute l’attribut « qteProd » de la relation « ligne »
		this._unProduit = unProduit;  
		this._qteProd = qteProd;
	}
	// définition des « getters » et des « setters » pour les attributs privés de la classe
	get qteProd(): number {	return this._qteProd; }
	set qteProd(qte_prod: number) { 
		if (qte_prod > 0 && Number.isInteger(qte_prod)) {
			this._qteProd = qte_prod; 
		} else {
			throw new ProduitByFactureError("La quantité du produit doit etre un entier supérieur à 0");
		}
	}
	get unProduit(): UnProduit { return this._unProduit; }
    set unProduit(unProduit: UnProduit) { 
		if (unProduit.codeProd.length >= 3 && unProduit.codeProd.length <= 8) {
			this._unProduit = unProduit;
		} else {
			throw new ProduitByFactureError("Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long");
		} 
	}

	toArray():APIsql.TtabAsso	{
	// renvoie l’objet sous la forme d’un tableau associatif 
	// pour un affichage dans une ligne d’un tableau HTML
		let tableau = this.unProduit.toArray();	// appel de la méthode « toArray » de « UnProduit »
		tableau['qteProd'] = this.qteProd.toFixed(0);
		return tableau;
	}
}

type TProduitsByFacture = {[key: string]: UnProduitByFacture };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesProduitsByFacture {	 
	constructor () {
// rien
	}

    private load(result : APIsql.TdataSet): TProduitsByFacture  {
    // à partir d’un TdataSet, conversion en tableau d’objets UnProduitByFacture
        const produitsByFacture : TProduitsByFacture = {};
        const lesProduits = new LesProduits();
        for (let i=0; i<result.length; i++) {
            const item:APIsql.TtabAsso = result[i];
            const unProduit = lesProduits.byCodeProd(item['code_prod']);
            const produitByFacture = new UnProduitByFacture(unProduit, parseInt(item['qte_prod']));
            produitsByFacture[produitByFacture.unProduit.codeProd] = produitByFacture;        
        }
        return produitsByFacture;
    }

    private prepare(where:string):string {
	        let sql : string;
	        sql = "SELECT code_prod, qte_prod";
	        sql += " FROM   ligne";
	        if (where.trim() !== "")
	        {
	            sql += " WHERE " +where;
	        }
	        return sql;
	    }
		
		byNumFact(num_fact : string) : TProduitsByFacture { 
		// renvoie le tableau d’objets contenant tous les produits de la facture num fact
			return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_fact = ?"),[num_fact]));
		}
		byNumFactCodeProd(num_fact : string, code_prod : string ) : UnProduitByFacture {
		// renvoie l’objet du produit code_prod contenu dans la facture num_fact
			let produitByFacture = new UnProduitByFacture;
			let produitsByFacture : TProduitsByFacture = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_fact = ? and code_prod = ?"),[num_fact, code_prod]));
			if ( !produitsByFacture[0] === undefined) {
				produitByFacture = produitsByFacture[0];
			}
			return produitByFacture;	
		}
		toArray(produits : TProduitsByFacture) : APIsql.TdataSet {
			let T:APIsql.TdataSet = [];
			for (let id in produits) {
				T.push(produits[id].toArray());
			}	 
			return T; 
		}
		getMontantTotalProduits(produits: TProduitsByFacture): number {
		// renvoie le montant total HT à payer pour les produits d'une facture
			let montantTotal = 0;
			for (let id in produits) {
				montantTotal += produits[id].unProduit.getMontantProduit(produits[id]);
			}
			return montantTotal;
		}
		getRemiseTotalProduits(produits: TProduitsByFacture, facture: UneFacture): number {
		// renvoie le montant total de la remise pour les produits d'une facture
			const remiseTotale = this.getMontantTotalProduits(produits) * (Number(facture.tauxRemiseFact)/100);
			return remiseTotale;
		}
		getAPayer(produits: TProduitsByFacture, facture: UneFacture): number {
		// renvoie le montant total à payer pour les produits d'une facture
			const aPayer = this.getMontantTotalProduits(produits) - this.getRemiseTotalProduits(produits, facture);
			return aPayer;
		}
	
		delete(num_fact : string):boolean { // requête de suppression des équipements d’une facture dans « ligne »
			let sql : string;
			sql	= "DELETE	FROM	ligne		WHERE	num_fact = ?";
			return APIsql.sqlWeb.SQLexec(sql,[num_fact]);		// requête de manipulation : utiliser SQLexec
		}
		insert(num_fact : string,  produits : TProduitsByFacture):boolean {
			// requête d’ajout des produits avec une quantité dans « ligne » compris dans « num_fact »
			let sql : string;
			let separateur = "";
			sql	= "INSERT INTO ligne(num_fact,code_prod, qte_prod)	VALUES ";
	    	for (let cle in produits) {
	     		sql += separateur +"('" +num_fact +"','" +produits[cle].unProduit.codeProd +"','" +produits[cle].qteProd +"')"; 
	     		separateur = ",";
	     	}
			return APIsql.sqlWeb.SQLexec(sql,[]);
		}
	}
	
	export {connexion}
	export {UnProduit}
	export {LesProduits}
	export {TProduits}
	export {UnProduitByFacture}
	export {LesProduitsByFacture}
	export {TProduitsByFacture}