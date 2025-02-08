import { ClientError } from "../modele/errors.js";
import { UnClient } from "../modele/data_client.js";
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts";

Deno.test("init idCli", () => { const e = new UnClient(); assertEquals(e.idCli, ""); });
Deno.test("idCli est un entier positif", () => { const e = new UnClient(); e.idCli = "1234"; assertEquals(e.idCli, "1234"); });
Deno.test("idCli entier négatif", () => { const e = new UnClient(); assertThrows(() => { e.idCli = "-12"; }, ClientError, "L'ID du client doit être un entier supérieur à 0");});
Deno.test("idCli nombre à virgule", () => { const client = new UnClient(); assertThrows(() => { client.idCli = "1,5"; }, ClientError, "L'ID du client doit être un entier supérieur à 0"); });
Deno.test("idCli nombre à virgule négatif", () => { const client = new UnClient(); assertThrows(() => { client.idCli = "-2,7"; }, ClientError, "L'ID du client doit être un entier supérieur à 0"); });
Deno.test("idCli est un entier égal à 0 ", () => { const client = new UnClient(); assertThrows(() => { client.idCli = "0"; }, ClientError, "L'ID du client doit être un entier supérieur à 0"); });
Deno.test("idCli n'est pas un nombre ", () => { const client = new UnClient(); assertThrows(() => { client.idCli = "abc"; }, ClientError, "L'ID du client doit être un entier supérieur à 0");});

Deno.test("init civCli", () => { const e = new UnClient(); assertEquals(e.civCli, "");});
Deno.test("civCli M.", () => {const e = new UnClient(); e.civCli = "M."; assertEquals(e.civCli, "M."); });
Deno.test("civCli Mme", () => { const e = new UnClient(); e.civCli = "Mme"; assertEquals(e.civCli, "Mme"); });
Deno.test("civCli erreur", () => { const e = new UnClient(); assertThrows(() => { e.civCli = "Mr."; }, ClientError, "La civilité du client doit être \"M.\" ou \"Mme\""); });


Deno.test("init nomCli", () => { const e = new UnClient(); assertEquals(e.nomCli, ""); });
Deno.test("nomCli contient 2 caractères alphabétiques ou plus", () => { const e = new UnClient(); e.nomCli = "ABS"; console.log(e.nomCli); });
Deno.test("nomCli contient seulement 2 caractères alphabétiques", () => { const e = new UnClient(); e.nomCli = "CT"; console.log(e.nomCli); });
Deno.test("nomCli contient moins de 2 caractères alphabétiques", () => { const e = new UnClient(); assertThrows( () => { e.nomCli = "b"; },ClientError, "Le nom du client doit être une chaine contenant au moins 2 caractères alphabétiques" );});
Deno.test("nomCli contient 1 seul caractère et non alphabétique", () => { const e = new UnClient(); assertThrows( () => { e.nomCli = "7"; }, ClientError, "Le nom du client doit être une chaine contenant au moins 2 caractères alphabétiques");});
Deno.test("nomCli contient 2 caractères non alphabétiques", () => { const e = new UnClient(); assertThrows( () => { e.nomCli = "00"; }, ClientError, "Le nom du client doit être une chaine contenant au moins 2 caractères alphabétiques");});
Deno.test("nomCli contient plus de 2 caractères, mais aucun alphabétique", () => { const e = new UnClient(); assertThrows( () => { e.nomCli = "57000"; }, ClientError, "Le nom du client doit être une chaine contenant au moins 2 caractères alphabétiques" ); });


Deno.test("init prenomCli", () => { const e = new UnClient(); assertEquals(e.prenomCli, ""); });
Deno.test("prenomCli contient 2 caractères alphabétiques ou plus", () => { const e = new UnClient(); e.prenomCli = "Said"; console.log(e.prenomCli); });
Deno.test("prenomCli contient seulement 2 caractères alphabétiques", () => { const e = new UnClient(); e.prenomCli = "Ct"; console.log(e.prenomCli); });
Deno.test("prenomCli contient moins de 2 caractères alphabétiques", () => { const e = new UnClient(); assertThrows( () => { e.prenomCli = "m"; },ClientError, "Le prénom du client doit être une chaine contenant au moins 2 caractères alphabétiques" ); });
Deno.test("prenomCli contient 1 seul caractère et non alphabétique", () => { const e = new UnClient(); assertThrows( () => {  e.prenomCli = "$"; }, ClientError, "Le prénom du client doit être une chaine contenant au moins 2 caractères alphabétiques"); });
Deno.test("prenomCli contient 2 caractères non alphabétiques", () => { const e = new UnClient(); assertThrows( () => {  e.prenomCli = "$$"; }, ClientError, "Le prénom du client doit être une chaine contenant au moins 2 caractères alphabétiques"); });
Deno.test("prenomCli contient plus de 2 caractères, mais aucun alphabétique", () => { const e = new UnClient(); assertThrows( () => { e.prenomCli = "$$124."; }, ClientError, "Le prénom du client doit être une chaine contenant au moins 2 caractères alphabétiques" ); });


Deno.test("init telCli", () => { const e = new UnClient(); assertEquals(e.telCli, ""); });
Deno.test("tel_cli", () => { const e = new UnClient(); assertEquals(e.telCli, ""); });


Deno.test("init melCli", () => { const e = new UnClient(); assertEquals(e.melCli, ""); });
Deno.test("melCli contient un arobase", () => { const e = new UnClient(); e.melCli = "aitbahasaid24@gmail.com"; console.log(e.melCli); });
Deno.test("melCli contient plusieurs arobase", () => { const e = new UnClient(); e.melCli = "aitbahasaid24@@@gmail.com"; console.log(e.melCli); });
Deno.test("melCli ne contient pas d'arobase ", () => { const e = new UnClient(); assertThrows( () => { e.melCli = "aitbahasaid24gmail.com"; }, ClientError, "Le mel du client doit être une chaine contenant au moins 1 Arobase \"@\""); });
Deno.test("melCli contient autre caractère qu'un Arobase", () => { const e = new UnClient(); assertThrows( () => { e.melCli = "aitbahasaid24$gmail.com"; }, ClientError, "Le mel du client doit être une chaine contenant au moins 1 Arobase \"@\""); });
Deno.test("melCli est une chaine vide ", () => { const e = new UnClient(); assertThrows( () => { e.melCli = " "; }, ClientError, "Le mel du client doit être une chaine contenant au moins 1 Arobase \"@\""); });


Deno.test("init adrCli", () => { const e = new UnClient(); assertEquals(e.adrCli, ""); });
Deno.test("adrCli", () => { const e = new UnClient(); e.adrcli = "14 Rue de Bon Lapin"; console.log(e.adrCli); });
Deno.test("adrCli  fait plus de 15 caractères", () => { const e = new UnClient(); e.adrcli= "13665 Rue de Boulevard d'Alsace"; assertEquals(e.adrCli, "13665 Rue de Boulevard d'Alsace"); });
Deno.test("adrCli fait moi de 15 caractères", () => { const e = new UnClient(); assertThrows( () => { e.adrcli = "12 Rue M"; }, ClientError, "L'adresse du client doit être une chaine qui fait au moins 15 caractères de long"); });
Deno.test("adrCli est une chaine vide", () => { const e = new UnClient(); assertThrows( () => { e.adrcli = " "; }, ClientError, "L'adresse du client doit être une chaine qui fait au moins 15 caractères de long"); });


Deno.test("init cpCli", () => { const e = new UnClient(); assertEquals(e.cpCli, ""); });
Deno.test("cp_cli", () => { const e = new UnClient(); assertEquals(e.cpCli, ""); });


Deno.test("init communeCli", () => { const e = new UnClient(); assertEquals(e.communeCli, ""); });
Deno.test("communeCli  fait exactement 2 caractères", () => { const e = new UnClient(); e.communeCli = "CT"; assertEquals(e.communeCli, "CT"); });
Deno.test("communeCli fait plus de 2 caractères", () => { const e = new UnClient(); e.communeCli = "Metz"; assertEquals(e.communeCli, "Metz"); });
Deno.test("communeCli fait moins de 2 caractères", () => { const client = new UnClient(); assertThrows(() => { client.communeCli = "Z"; }, ClientError, "La commune du client doit être une chaine qui fait au moins 2 caractères de long"); });
Deno.test("communeCli est une chaine vide", () => { const client = new UnClient(); assertThrows(() => { client.communeCli = " "; }, ClientError, "La commune du client doit être une chaine qui fait au moins 2 caractères de long");});


Deno.test("init tauxMaxRemiseCli", () => { const e = new UnClient(); assertEquals(e.tauxMaxRemiseCli, ""); });
Deno.test("tauxMaxRemiseCli = 0", () => { const e = new UnClient(); e.tauxMaxRemiseCli = "0"; assertEquals(e.tauxMaxRemiseCli, "0"); });
Deno.test("tauxMaxRemiseCli = 100", () => { const e = new UnClient(); e.tauxMaxRemiseCli = "100"; assertEquals(e.tauxMaxRemiseCli, "100"); });
Deno.test("tauxMaxRemiseCli compris entre 0 et 100", () => { const e = new UnClient(); e.tauxMaxRemiseCli = "57"; assertEquals(e.tauxMaxRemiseCli,"57"); }); 
Deno.test("tauxMaxRemiseCli > 0", () => { const e = new UnClient(); assertThrows(() => { e.tauxMaxRemiseCli = "-1"; },ClientError,"Le taux maximum de remise accordé au client doit être compris entre 0 et 100"); });
Deno.test("tauxMaxRemiseCli < 100", () => { const e = new UnClient(); assertThrows(() => { e.tauxMaxRemiseCli = "115"; },ClientError, "Le taux maximum de remise accordé au client doit être compris entre 0 et 100"); });
Deno.test("tauxMaxRemiseCli n'est pas un nombre", () => { const e = new UnClient(); assertThrows(() => { e.tauxMaxRemiseCli = "z$d"; },ClientError,"Le taux maximum de remise accordé au client doit être compris entre 0 et 100" ); });

