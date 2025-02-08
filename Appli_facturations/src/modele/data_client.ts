import { connexion, APIsql } from "./connexion.js";
import { ClientError } from "./errors.js";
class UnClient {
    // définition de la classe gérant les données d’un client
    private _idCli: string;
    private _civCli: string;
    private _nomCli: string;
    private _prenomCli: string;
    private _telCli: string;
    private _melCli: string;
    private _adrCli: string;
    private _cpCli: string;
    private _communeCli: string;
    private _tauxMaxRemiseCli: string;

    constructor(id_cli = "", civ_cli = "", nom_cli = "", prenom_cli = "", tel_cli = "", mel_cli = "", adr_cli = "", cp_cli = "", commune_cli = "", tauxmax_remise_cli = "") {
        // initialisation à l’instanciation
        this._idCli = id_cli;
        this._civCli = civ_cli;
        this._nomCli = nom_cli;
        this._prenomCli = prenom_cli;
        this._telCli = tel_cli;
        this._melCli = mel_cli;
        this._adrCli = adr_cli;
        this._cpCli = cp_cli;
        this._communeCli = commune_cli;
        this._tauxMaxRemiseCli = tauxmax_remise_cli;
    }
    // définition des « getters » et des « setters » pour la lecture/écriture des attributs privés de la classe
    get idCli(): string {
        return this._idCli;
    }
    set idCli(id_cli: string) {
        const id_cli_number = Number(id_cli);
        if (Number.isInteger(id_cli_number) && id_cli_number > 0) {
            this._idCli = id_cli;
        } else {
            throw new ClientError("L'ID du client doit être un entier supérieur à 0");
        }
    }
    get civCli(): string {
        return this._civCli;
    }
    set civCli(civ_cli: string) {
        if (civ_cli === "M." || civ_cli === "Mme") {
            this._civCli = civ_cli;
        } else {
            throw new ClientError("La civilité du client doit être \"M.\" ou \"Mme\"");
        }
    }
    get nomCli(): string {
        return this._nomCli;
    }
    set nomCli(nom_cli: string) {
        let nbCaracAlphabétiques = 0;
        for (let i = 0; i < nom_cli.length; i++) {
            if ((nom_cli[i]>= "a" && nom_cli[i] <= "z") || (nom_cli[i]>= "A" && nom_cli[i] <= "Z")) {
                nbCaracAlphabétiques += 1;
            }
        }
        if (nbCaracAlphabétiques >= 2) {
            this._nomCli = nom_cli;
        } else {
            throw new ClientError("Le nom du client doit être une chaine contenant au moins 2 caractères alphabétiques");
        }
    }
    get prenomCli(): string {
        return this._prenomCli;
    }
    set prenomCli(prenom_cli: string) {
        let nbCaracAlphabétiques = 0;
        for (let i = 0; i < prenom_cli.length; i++) {
            if ((prenom_cli[i]>= "a" && prenom_cli[i] <= "z") || (prenom_cli[i]>= "A" && prenom_cli[i] <= "Z")) {
                nbCaracAlphabétiques += 1;
            }
        }
        if (nbCaracAlphabétiques >= 2) {
            this._prenomCli = prenom_cli;
        } else {
            throw new ClientError("Le prénom du client doit être une chaine contenant au moins 2 caractères alphabétiques");
        }
    }
    get telCli(): string {
        return this._telCli;
    }
    set telCli(tel_cli: string) {
        this._telCli = tel_cli;
    }
    get melCli(): string {
        return this._melCli;
    }
    set melCli(mel_cli: string) {
        let nbArobase = 0;
        for (let i = 0; i < mel_cli.length; i++) {
            if (mel_cli[i] === "@") {
                nbArobase += 1;
            }
        }
        if (nbArobase >= 1) {
            this._melCli = mel_cli;
        } else {
            throw new ClientError("Le mel du client doit être une chaine contenant au moins 1 Arobase \"@\"");
        }
    }
    get adrCli(): string {
        return this._adrCli;
    }
    set adrcli(adr_cli: string) {
        if (adr_cli.length >= 15) {
            this._adrCli = adr_cli;
        } else {
            throw new ClientError("L'adresse du client doit être une chaine qui fait au moins 15 caractères de long");
        }
    }
    get cpCli(): string {
        return this._cpCli;
    }
    set cpCli(cp_cli: string) {
        this._cpCli = cp_cli;
    }
    get communeCli(): string {
        return this._communeCli;
    }
    set communeCli(commune_cli: string) {
        if (commune_cli.length >= 2) {
            this._communeCli = commune_cli;
        } else {
            throw new ClientError("La commune du client doit être une chaine qui fait au moins 2 caractères de long");
        }
    }
    get tauxMaxRemiseCli(): string {
        return this._tauxMaxRemiseCli;
    }
    set tauxMaxRemiseCli(tauxmax_remise_cli: string) {
        const tauxmax_remise_cli_number = Number(tauxmax_remise_cli);
        if (tauxmax_remise_cli_number >= 0 && tauxmax_remise_cli_number <= 100) {
            this._tauxMaxRemiseCli = tauxmax_remise_cli;
        } else {
            throw new ClientError("Le taux maximum de remise accordé au client doit être compris entre 0 et 100");
        }
    }

    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
          idCli: this.idCli,
          civCli: this.civCli,
          nomCli: this.nomCli,
          prenomCli: this.prenomCli,
          telCli: this.telCli,
          melCli: this.melCli,
          adrCli: this.adrCli,
          cpCli: this.cpCli,
          communeCli: this.communeCli,
          tauxMaxRemiseCli: this.tauxMaxRemiseCli,
        };
        return tableau;
      }
}

type TClients = { [key: string]: UnClient }; // tableau d’objets UnClient
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesClients {
    // définition de la classe gérant les données de la table client
    constructor() {
      // rien
    }

    private load(result: APIsql.TdataSet): TClients {
        // à partir d’un TdataSet, conversion en tableau d’objets UnClient
        const clients: TClients = {};
        for (let i = 0; i < result.length; i++) {
          const item: APIsql.TtabAsso = result[i];
          const client = new UnClient(
            item["id_cli"],
            item["civ_cli"],
            item["nom_cli"],
            item["prenom_cli"],
            item["tel_cli"],
            item["mel_cli"],
            item["adr_cli"],
            item["cp_cli"],
            item["commune_cli"],
            item["tauxmax_remise_cli"]
          );
          clients[client.idCli] = client; // clé d’un élément du tableau : id cli
        }
        return clients;
    }

    private prepare(where: string): string {
        // préparation de la requête avec ou sans restriction (WHERE)
        let sql: string;
        sql = "SELECT	id_cli, civ_cli, nom_cli, prenom_cli, tel_cli, mel_cli, adr_cli, cp_cli, commune_cli, tauxmax_remise_cli  FROM  client ";
        if (where !== "") {
          sql += " WHERE " + where;
        }
        return sql;
    }

    all(): TClients {
        // renvoie le tableau d’objets contenant tous les clients
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }

    byIdCli(id_cli : string) : UnClient	{ // renvoie l’objet correspondant au client id_cli
        let client = new UnClient;
        const clients : TClients =
                            this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_cli = ?"),[id_cli]));
        const lesCles: string[] = Object.keys(clients);
        // affecte les clés du tableau associatif « clients » dans le tableau de chaines « lesCles »
        if ( lesCles.length > 0) {
            client = clients[lesCles[0]];	// récupérer le 1er élément du tableau associatif « clients »
        }
        return client; 
    }

    toArray(clients : TClients) : APIsql.TdataSet {
    // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs 
    // pour un affichage dans un tableau HTML
        let T:APIsql.TdataSet = [];
        for (let id in clients) {
            T.push(clients[id].toArray());
        }	 
        return T; 
    }
}

export {connexion}
export {UnClient}
export {LesClients}
export {TClients}