import { FactureError } from "../modele/errors.js";
import { UneFacture, LesFactures } from "../modele/data_facture.js";
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts";

Deno.test("init numFact", () => { const e = new UneFacture(); assertEquals(e.numFact, ""); });
Deno.test("numFact est un entier positif", () => { const e = new UneFacture(); e.numFact = "123"; assertEquals(e.numFact, "123"); });
Deno.test("numFact est un entier négatif", () => { const e = new UneFacture(); assertThrows(() => { e.numFact = "-57"; }, FactureError, "Le numéro de facture doit etre un entier supérieur à 0"); });
Deno.test("numFact est un nombre à virgule", () => { const e = new UneFacture(); assertThrows(() => { e.numFact = "5,3"; }, FactureError, "Le numéro de facture doit etre un entier supérieur à 0"); });
Deno.test("numFact est un nombre à virgule négatif", () => { const e = new UneFacture(); assertThrows(() => { e.numFact = "-5,3"; }, FactureError, "Le numéro de facture doit etre un entier supérieur à 0"); });
Deno.test("numFact est un entier égal à 0", () => { const e = new UneFacture(); assertThrows(() => { e.numFact = "0"; }, FactureError, "Le numéro de facture doit etre un entier supérieur à 0"); });
Deno.test("numFact n'est pas un nombre", () => { const e = new UneFacture(); assertThrows(() => { e.numFact = "$abc"; }, FactureError, "Le numéro de facture doit etre un entier supérieur à 0"); });

Deno.test("init dateFact", () => { const e = new UneFacture(); assertEquals(e.dateFact, ""); });
Deno.test("dateFact accepte une date valide (JJ/MM/AAAA)", () => { const e = new UneFacture(); e.dateFact = "16/05/2023"; assertEquals(e.dateFact, "16/05/2023"); });
Deno.test("dateFact date au format incorrect (JJ/AAAA/MM)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "24/2005/04"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (AAAA/JJ/MM", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "2005/24/04"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (AAAA/MM/JJ)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "2005/04/24"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (MM/JJ/AAAA)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "04/24/2005"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (MM/AAAA/JJ)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "04/2005/24"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (JJ-AAAA-MM)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "24-2005-04"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (AAAA-JJ-MM)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "2005-24-04"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (AAAA-MM-JJ)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "2005-04-24"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (MM-JJ-AAAA)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "04-24-2005"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (MM-AAAA-JJ)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "04-2005-24"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date au format incorrect (JJ-MM-AAAA)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "04-24-2005"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date impossible (31 Février)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "31/02/2025"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date impossible (0 Janvier)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "00/01/2000"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact accepte une date bissextile existante (29 Février 2024)", () => { const e = new UneFacture(); e.dateFact = "29/02/2024"; assertEquals(e.dateFact, "29/02/2024"); });
Deno.test("dateFact date bissextile inexistante (29 Février 2023)", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "29/02/2023"; }, FactureError, "La date est invalide"); });
Deno.test("dateFact chaîne vide", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = ""; }, FactureError, "La date est invalide"); });
Deno.test("dateFact date avec des caractères non numériques", () => { const e = new UneFacture(); assertThrows(() => { e.dateFact = "24 Avril 2005"; }, FactureError, "La date est invalide"); });

Deno.test("init commentFact", () => { const e = new UneFacture(); assertEquals(e.commentFact, ""); });
Deno.test("comment_fact", () => { const e = new UneFacture(); assertEquals(e.commentFact, ""); });

Deno.test("init tauxRemiseFact", () => { const e = new UneFacture(); assertEquals(e.tauxRemiseFact, ""); });
Deno.test("tauxRemiseFact = 0", () => { const e = new UneFacture(); e.tauxRemiseFact = "0"; assertEquals(e.tauxRemiseFact, "0"); });
Deno.test("tauxRemiseFact = 100", () => { const e = new UneFacture(); e.tauxRemiseFact = "100"; assertEquals(e.tauxRemiseFact, "100"); });
Deno.test("tauxRemiseFact compris entre 0 et 100", () => { const e = new UneFacture(); e.tauxRemiseFact = "57"; assertEquals(e.tauxRemiseFact,"57"); }); 
Deno.test("tauxRemiseFact > 0", () => { const e = new UneFacture(); assertThrows(() => { e.tauxRemiseFact = "-1"; },FactureError,"Le taux de remise doit etre compris entre 0 et 100"); });
Deno.test("tauxRemiseFact < 100", () => { const e = new UneFacture(); assertThrows(() => { e.tauxRemiseFact = "115"; },FactureError, "Le taux de remise doit etre compris entre 0 et 100"); });
Deno.test("tauxRemiseFact n'est pas un nombre", () => { const e = new UneFacture(); assertThrows(() => { e.tauxRemiseFact = "z$d"; },FactureError,"Le taux de remise doit etre compris entre 0 et 100"); });

Deno.test("init idCli", () => { const e = new UneFacture(); assertEquals(e.idCli, ""); });
Deno.test("idCli est un entier positif", () => { const e = new UneFacture(); e.idCli = "1234"; assertEquals(e.idCli, "1234"); });
Deno.test("idCli entier négatif", () => { const e = new UneFacture(); assertThrows(() => { e.idCli = "-12"; }, FactureError, "L'ID du client doit être un entier supérieur à 0");});
Deno.test("idCli nombre à virgule", () => { const e = new UneFacture(); assertThrows(() => { e.idCli = "1,5"; }, FactureError, "L'ID du client doit être un entier supérieur à 0"); });
Deno.test("idCli nombre à virgule négatif", () => { const e = new UneFacture(); assertThrows(() => { e.idCli = "-2,7"; }, FactureError, "L'ID du client doit être un entier supérieur à 0"); });
Deno.test("idCli est un entier égal à 0 ", () => { const e = new UneFacture(); assertThrows(() => { e.idCli = "0"; }, FactureError, "L'ID du client doit être un entier supérieur à 0"); });
Deno.test("idCli n'est pas un nombre ", () => { const e = new UneFacture(); assertThrows(() => { e.idCli = "abc"; }, FactureError, "L'ID du client doit être un entier supérieur à 0");});

Deno.test("init idForfait", () => { const e = new UneFacture(); assertEquals(e.idForfait, ""); });
Deno.test("idForfait chaîne de 3 caractères", () => { const e = new UneFacture(); e.idForfait = "ABC"; assertEquals(e.idForfait, "ABC"); });
Deno.test("idForfait chaîne de 4 caractères", () => { const e = new UneFacture(); e.idForfait = "ABCD"; assertEquals(e.idForfait, "ABCD"); });
Deno.test("idForfait chaîne de 5 caractères", () => { const e = new UneFacture(); e.idForfait = "ABCDE"; assertEquals(e.idForfait, "ABCDE"); });
Deno.test("idForfait chaîne de 6 caractères", () => { const e = new UneFacture(); e.idForfait = "ABCDEF"; assertEquals(e.idForfait, "ABCDEF"); });
Deno.test("idForfait chaine de plus de 6 caractères", () => { const e = new UneFacture(); assertThrows(() => { e.idForfait = "ABCDEFG"; }, FactureError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait chaine de moins de 3 caractères", () => { const e = new UneFacture(); assertThrows(() => { e.idForfait = "AB"; }, FactureError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait chaine de 1 caractère", () => { const e = new UneFacture(); assertThrows(() => { e.idForfait = "A"; }, FactureError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait chaine de 2 caractères", () => { const e = new UneFacture(); assertThrows(() => { e.idForfait = "AB"; }, FactureError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait lance chaine vide", () => { const e = new UneFacture(); assertThrows(() => { e.idForfait = ""; }, FactureError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });

Deno.test("estDateValide accepte une date valide (JJ/MM/AAAA)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("16/05/2023"), true); });
Deno.test("estDateValide date au format incorrect (JJ/AAAA/MM)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("16/2023/05"), false); });
Deno.test("estDateValide date au format incorrect (AAAA/JJ/MM", () => { const e = new UneFacture(); assertEquals(e.estDateValide("2023/16/05"), false); });
Deno.test("estDateValide date au format incorrect (AAAA/MM/JJ)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("2023/05/16"), false); });
Deno.test("estDateValide date au format incorrect (MM/JJ/AAAA)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("05/16/2023"), false); });
Deno.test("estDateValide date au format incorrect (MM/AAAA/JJ)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("05/2023/16"), false); });
Deno.test("estDateValide date au format incorrect (JJ-AAAA-MM)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("16-2023-05"), false); });
Deno.test("estDateValide date au format incorrect (AAAA-JJ-MM)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("2023-16-05"), false); });
Deno.test("estDateValide date au format incorrect (AAAA-MM-JJ)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("2023-05-16"), false); });
Deno.test("estDateValide date au format incorrect (MM-JJ-AAAA)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("05-16-2023"), false); });
Deno.test("estDateValide date au format incorrect (MM-AAAA-JJ)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("05-2023-16"), false); });
Deno.test("estDateValide date au format incorrect (JJ-MM-AAAA)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("16-05-2023"), false); });
Deno.test("estDateValide date impossible (31 Février)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("31/02/2023"), false); });
Deno.test("estDateValide date impossible (0 Janvier)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("0/01/2023"), false); });
Deno.test("estDateValide date bissextile existante (29 Février 2024)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("29/02/2024"), true); });
Deno.test("estDateValide date bissextile inexistante (29 Février 2023)", () => { const e = new UneFacture(); assertEquals(e.estDateValide("29/02/2023"), false); });
Deno.test("estDateValide chaîne vide", () => { const e = new UneFacture(); assertEquals(e.estDateValide(""), false); });
Deno.test("estDateValide date avec des caractères non numériques", () => { const e = new UneFacture(); assertEquals(e.estDateValide("24 Avril 2005"), false); });

Deno.test("dateStringToSql - 1", () => { assertEquals(new LesFactures().dateStringToSql("01/01/2024"), "2024-01-01"); });
Deno.test("dateStringToSql - 2", () => { assertEquals(new LesFactures().dateStringToSql("31/12/2024"), "2024-12-31"); });
Deno.test("dateStringToSql - 3", () => { assertEquals(new LesFactures().dateStringToSql("29/02/2020"), "2020-02-29"); });
Deno.test("dateStringToSql - 4", () => { assertEquals(new LesFactures().dateStringToSql("16/05/1870"), "1870-05-16"); });
Deno.test("dateStringToSql - 5", () => { assertEquals(new LesFactures().dateStringToSql("02/08/0720"), "0720-08-02"); });

Deno.test("dateSqlToString - 1", () => { assertEquals(new LesFactures().dateSqlToString("2025-02-01"), "01/02/2025"); });
Deno.test("dateSqlToString - 2", () => { assertEquals(new LesFactures().dateSqlToString("2020-02-29"), "29/02/2020"); });
Deno.test("dateSqlToString - 3", () => { assertEquals(new LesFactures().dateSqlToString("2024-02-29"), "29/02/2024"); });
Deno.test("dateSqlToString - 4", () => { assertEquals(new LesFactures().dateSqlToString("2025-03-01"), "01/03/2025"); });
Deno.test("dateSqlToString - 5", () => { assertEquals(new LesFactures().dateSqlToString("1870-05-16"), "16/05/1870"); });
Deno.test("dateSqlToString - 6", () => { assertEquals(new LesFactures().dateSqlToString("0720-08-02"), "02/08/0720"); });
