import { ForfaitLivError } from "../modele/errors.js";
import { UnForfait } from "../modele/data_forfait.js";
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts";

Deno.test("init idForfait", () => { const e = new UnForfait(); assertEquals(e.idForfait, ""); });
Deno.test("idForfait chaîne de 3 caractères", () => { const e = new UnForfait(); e.idForfait = "ABC"; assertEquals(e.idForfait, "ABC"); });
Deno.test("idForfait chaîne de 4 caractères", () => { const e = new UnForfait(); e.idForfait = "ABCD"; assertEquals(e.idForfait, "ABCD"); });
Deno.test("idForfait chaîne de 5 caractères", () => { const e = new UnForfait(); e.idForfait = "ABCDE"; assertEquals(e.idForfait, "ABCDE"); });
Deno.test("idForfait chaîne de 6 caractères", () => { const e = new UnForfait(); e.idForfait = "ABCDEF"; assertEquals(e.idForfait, "ABCDEF"); });
Deno.test("idForfait chaine de plus de 6 caractères", () => { const e = new UnForfait(); assertThrows(() => { e.idForfait = "ABCDEFG"; }, ForfaitLivError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait chaine de moins de 3 caractères", () => { const e = new UnForfait(); assertThrows(() => { e.idForfait = "AB"; }, ForfaitLivError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait chaine de 1 caractère", () => { const e = new UnForfait(); assertThrows(() => { e.idForfait = "A"; }, ForfaitLivError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait chaine de 2 caractères", () => { const e = new UnForfait(); assertThrows(() => { e.idForfait = "AB"; }, ForfaitLivError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });
Deno.test("idForfait lance chaine vide", () => { const e = new UnForfait(); assertThrows(() => { e.idForfait = ""; }, ForfaitLivError, "L'ID du forfait livraison doit être une chaine qui fait entre 3 et 6 caractères de long"); });

Deno.test("init libForfait", () => { const e = new UnForfait(); assertEquals(e.libForfait, ""); });
Deno.test("libForfait chaine de 5 caractères", () => { const e = new UnForfait(); e.libForfait = "ABCDE"; assertEquals(e.libForfait, "ABCDE"); });
Deno.test("libForfait chaine de 6 caractères", () => { const e = new UnForfait(); e.libForfait = "ABCDEF"; assertEquals(e.libForfait, "ABCDEF"); });
Deno.test("libForfait chaine de plus de 5 caractères", () => { const e = new UnForfait(); e.libForfait = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; assertEquals(e.libForfait, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"); });
Deno.test("libForfait chaine de moins de 5 caractères", () => { const e = new UnForfait(); assertThrows(() => { e.libForfait = "ABCD"; }, ForfaitLivError, "Le libellé du forfait doit être une chaine qui fait au moins 5 caractères de long"); });
Deno.test("libForfait chaine de 4 caractères", () => { const e = new UnForfait(); assertThrows(() => { e.libForfait = "ABCD"; }, ForfaitLivError, "Le libellé du forfait doit être une chaine qui fait au moins 5 caractères de long"); });
Deno.test("libForfait chaine de 3 caractères", () => { const e = new UnForfait(); assertThrows(() => { e.libForfait = "ABC"; }, ForfaitLivError, "Le libellé du forfait doit être une chaine qui fait au moins 5 caractères de long"); });
Deno.test("libForfait chaine de 2 caractères", () => { const e = new UnForfait(); assertThrows(() => { e.libForfait = "AB"; }, ForfaitLivError, "Le libellé du forfait doit être une chaine qui fait au moins 5 caractères de long"); });
Deno.test("libForfait chaine de 1 caractère", () => { const e = new UnForfait(); assertThrows(() => { e.libForfait = "A"; }, ForfaitLivError, "Le libellé du forfait doit être une chaine qui fait au moins 5 caractères de long"); });
Deno.test("libForfait chaine vide", () => { const e = new UnForfait(); assertThrows(() => { e.libForfait = ""; }, ForfaitLivError, "Le libellé du forfait doit être une chaine qui fait au moins 5 caractères de long"); });


Deno.test("init mtForfait", () => { const e = new UnForfait(); assertEquals(e.mtForfait, ""); });
Deno.test("mtForfait réel supérieur à 0", () => { const e = new UnForfait(); e.mtForfait = "100.50"; assertEquals(e.mtForfait, "100.50"); });
Deno.test("mtForfait entier supérieur à 0 ", () => { const e = new UnForfait(); e.mtForfait = "150"; assertEquals(e.mtForfait, "150"); });
Deno.test("mtForfait  de 0", () => { const e = new UnForfait(); assertThrows(() => { e.mtForfait = "0"; }, ForfaitLivError, "Le montant du forfait livraison doit être un réel supérieur à 0"); });
Deno.test("mtForfait négatif", () => { const e = new UnForfait(); assertThrows(() => { e.mtForfait = "-50,2"; }, ForfaitLivError, "Le montant du forfait livraison doit être un réel supérieur à 0"); });
Deno.test("mtForfait non numérique", () => { const e = new UnForfait(); assertThrows(() => { e.mtForfait = "ab,c"; }, ForfaitLivError, "Le montant du forfait livraison doit être un réel supérieur à 0"); });
Deno.test("mtForfait avec des caractères spéciaux", () => { const e = new UnForfait(); assertThrows(() => { e.mtForfait = "$20,25"; }, ForfaitLivError, "Le montant du forfait livraison doit être un réel supérieur à 0"); });
Deno.test("mtForfait chaine vide", () => { const e = new UnForfait(); assertThrows(() => { e.mtForfait = ""; }, ForfaitLivError, "Le montant du forfait livraison doit être un réel supérieur à 0"); });
Deno.test("mtForfait chaîne avec espaces", () => { const e = new UnForfait(); assertThrows(() => { e.mtForfait = "  "; }, ForfaitLivError, "Le montant du forfait livraison doit être un réel supérieur à 0"); });

