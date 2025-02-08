import { ProduitError, ProduitByFactureError } from "../modele/errors.js";
import { UnProduit, UnProduitByFacture } from "../modele/data_produit.js";
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts";

Deno.test("init codeProd", () => { const e = new UnProduit(); assertEquals(e.codeProd, ""); });
Deno.test("codeProd de 3 caractères", () => { const e = new UnProduit(); e.codeProd = "ABC"; assertEquals(e.codeProd, "ABC"); });
Deno.test("codeProd de 4 caractères", () => { const e = new UnProduit(); e.codeProd = "ABCD"; assertEquals(e.codeProd, "ABCD"); });
Deno.test("codeProd de 5 caractères", () => { const e = new UnProduit(); e.codeProd = "ABCDE"; assertEquals(e.codeProd, "ABCDE"); });
Deno.test("codeProd de 6 caractères", () => { const e = new UnProduit(); e.codeProd = "ABCDEF"; assertEquals(e.codeProd, "ABCDEF"); });
Deno.test("codeProd de 7 caractères", () => { const e = new UnProduit(); e.codeProd = "ABCDEFG"; assertEquals(e.codeProd, "ABCDEFG"); });
Deno.test("codeProd de 8 caractères", () => { const e = new UnProduit(); e.codeProd = "ABCDEFGH"; assertEquals(e.codeProd, "ABCDEFGH"); });
Deno.test("codeProd de 9 caractères", () => { const e = new UnProduit(); assertThrows(() => { e.codeProd = "ABCDEFGHI"; }, ProduitError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("codeProd plus de 9 caractères", () => { const e = new UnProduit(); assertThrows(() => { e.codeProd = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; }, ProduitError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("codeProd moins de 3 caractères", () => { const e = new UnProduit(); assertThrows(() => { e.codeProd = "AB"; }, ProduitError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("codeProd de 1 caractères", () => { const e = new UnProduit(); assertThrows(() => { e.codeProd = "1"; }, ProduitError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("codeProd chaine vide", () => { const e = new UnProduit(); assertThrows(() => { e.codeProd = ""; }, ProduitError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });

Deno.test("init libProd", () => { const e = new UnProduit(); assertEquals(e.libProd, ""); });
Deno.test("libProd de 4 caractères", () => { const e = new UnProduit(); e.libProd = "ABCD"; assertEquals(e.libProd, "ABCD"); });
Deno.test("libProd de 5 caractères", () => { const e = new UnProduit(); e.libProd = "ABCDE"; assertEquals(e.libProd, "ABCDE"); });
Deno.test("libProd de 6 caractères", () => { const e = new UnProduit(); e.libProd = "ABCDEF"; assertEquals(e.libProd, "ABCDEF"); });
Deno.test("libProd plus de 6 caractères", () => { const e = new UnProduit(); e.libProd = "ProduitABCD"; assertEquals(e.libProd, "ProduitABCD"); });
Deno.test("libProd de moins de 4 caractères", () => { const e = new UnProduit(); assertThrows(() => { e.libProd = "ABS"; }, ProduitError, "Le libellé du produit doit être une chaine qui fait au moins 4 caractères de long"); });
Deno.test("libProd de 2 caractères", () => { const e = new UnProduit(); assertThrows(() => { e.libProd = "CT"; }, ProduitError, "Le libellé du produit doit être une chaine qui fait au moins 4 caractères de long"); });
Deno.test("libProd de 1 caractère", () => { const e = new UnProduit(); assertThrows(() => { e.libProd = "C"; }, ProduitError, "Le libellé du produit doit être une chaine qui fait au moins 4 caractères de long"); });
Deno.test("libProd chaine vide", () => { const e = new UnProduit(); assertThrows(() => { e.libProd = ""; }, ProduitError, "Le libellé du produit doit être une chaine qui fait au moins 4 caractères de long"); });

Deno.test("init type", () => { const e = new UnProduit(); assertEquals(e.type, ""); });
Deno.test("type \"plate\"", () => { const e = new UnProduit(); e.type = "plate"; assertEquals(e.type, "plate"); });
Deno.test("type \"pétillante\"", () => { const e = new UnProduit(); e.type = "pétillante"; assertEquals(e.type, "pétillante"); });
Deno.test("type type incorrect", () => { const e = new UnProduit(); assertThrows(() => { e.type = "minérale"; }, ProduitError, "Le type doit etre \"plate\" ou \"pétillante\""); });
Deno.test("type type incorrect", () => { const e = new UnProduit(); assertThrows(() => { e.type = "gazeuse"; }, ProduitError, "Le type doit etre \"plate\" ou \"pétillante\""); });
Deno.test("type vide", () => { const e = new UnProduit(); assertThrows(() => { e.type = ""; }, ProduitError, "Le type doit etre \"plate\" ou \"pétillante\""); });
Deno.test("type lance une erreur pour une valeur non reconnue", () => { const e = new UnProduit(); assertThrows(() => { e.type = "dz215"; }, ProduitError, "Le type doit etre \"plate\" ou \"pétillante\""); });

Deno.test("init origine", () => { const e = new UnProduit(); assertEquals(e.origine, ""); });
Deno.test("origine de 3 caractères", () => { const e = new UnProduit(); e.origine = "dzz"; assertEquals(e.origine, "dzz"); });
Deno.test("origine de 4 caractères", () => { const e = new UnProduit(); e.origine = "ABCD"; assertEquals(e.origine, "ABCD"); });
Deno.test("origine de plus de 3 caractères", () => { const e = new UnProduit(); e.origine = "France"; assertEquals(e.origine, "France"); });
Deno.test("origine de moins de 3 caractères", () => { const e = new UnProduit(); assertThrows(() => { e.origine = "AB"; }, ProduitError, "L'origine du produit doit être une chaine qui fait au moins 3 caractères de long"); });
Deno.test("origine de 1 caractère", () => { const e = new UnProduit(); assertThrows(() => { e.origine = "A"; }, ProduitError, "L'origine du produit doit être une chaine qui fait au moins 3 caractères de long"); });
Deno.test("origine vide", () => { const e = new UnProduit(); assertThrows(() => { e.origine = ""; }, ProduitError, "L'origine du produit doit être une chaine qui fait au moins 3 caractères de long"); });

Deno.test("init conditionnement", () => { const e = new UnProduit(); assertEquals(e.conditionnement, ""); });
Deno.test("conditionnement entier entre 25 et 200", () => { const e = new UnProduit(); e.conditionnement = "50"; assertEquals(e.conditionnement, "50"); });
Deno.test("conditionnement entier 25", () => { const e = new UnProduit(); e.conditionnement = "25"; assertEquals(e.conditionnement, "25"); });
Deno.test("conditionnement entier 200", () => { const e = new UnProduit(); e.conditionnement = "200"; assertEquals(e.conditionnement, "200"); });
Deno.test("conditionnement entier inférieur à 25", () => { const e = new UnProduit(); assertThrows(() => { e.conditionnement = "5"; }, ProduitError, "Le conditionnement doit etre un entier compris entre 25 et 200"); });
Deno.test("conditionnement entier supérieur à 200", () => { const e = new UnProduit(); assertThrows(() => { e.conditionnement = "201"; }, ProduitError, "Le conditionnement doit etre un entier compris entre 25 et 200"); });
Deno.test("conditionnement nombre à virgule", () => { const e = new UnProduit(); assertThrows(() => { e.conditionnement = "50.2"; }, ProduitError, "Le conditionnement doit etre un entier compris entre 25 et 200"); });
Deno.test("conditionnement non numérique", () => { const e = new UnProduit(); assertThrows(() => { e.conditionnement = "deux"; }, ProduitError, "Le conditionnement doit etre un entier compris entre 25 et 200"); });
Deno.test("conditionnement chaine vide", () => { const e = new UnProduit(); assertThrows(() => { e.conditionnement = ""; }, ProduitError, "Le conditionnement doit etre un entier compris entre 25 et 200"); });

Deno.test("init tarifHt", () => { const e = new UnProduit(); assertEquals(e.tarifHt, ""); });
Deno.test("tarifHt réel supérieur à 0", () => { const e = new UnProduit(); e.tarifHt = "25.5"; assertEquals(e.tarifHt, "25.5"); });
Deno.test("tarifHt réel négatif", () => { const e = new UnProduit(); assertThrows(() => { e.tarifHt = "-7.25"; }, ProduitError, "Le tarif HT doit etre un réel supérieur à 0"); });
Deno.test("tarifHt de 0", () => { const e = new UnProduit(); assertThrows(() => { e.tarifHt = "0"; }, ProduitError, "Le tarif HT doit etre un réel supérieur à 0"); });
Deno.test("tarifHt non numérique", () => { const e = new UnProduit(); assertThrows(() => { e.tarifHt = "troisvirguledeux"; }, ProduitError, "Le tarif HT doit etre un réel supérieur à 0"); });
Deno.test("tarifHt vide", () => { const e = new UnProduit(); assertThrows(() => { e.tarifHt = ""; }, ProduitError, "Le tarif HT doit etre un réel supérieur à 0"); });

Deno.test("init qteProd", () => { const e = new UnProduitByFacture(); assertEquals(e.qteProd, 1); });
Deno.test("qteProd est un entier supérieur à 0", () => { const e = new UnProduitByFacture(); e.qteProd = 123; assertEquals(e.qteProd, 123); });
Deno.test("qteProd est un entier égal à 0", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.qteProd = 0; }, ProduitByFactureError, "La quantité du produit doit etre un entier supérieur à 0"); });
Deno.test("qteProd est un entier inférieur à 0", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.qteProd = -57; }, ProduitByFactureError, "La quantité du produit doit etre un entier supérieur à 0"); });
Deno.test("qteProd est un nombre à virgule supérieur à 0", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.qteProd = 5.3; }, ProduitByFactureError, "La quantité du produit doit etre un entier supérieur à 0"); });
Deno.test("qteProd est un nombre à virgule inférieur à 0", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.qteProd = -5.3; }, ProduitByFactureError, "La quantité du produit doit etre un entier supérieur à 0"); });

Deno.test("init unProduit", () => { const e = new UnProduitByFacture(); assertEquals(e.unProduit, null); });
Deno.test("unProduit de 3 caractères", () => { const e = new UnProduitByFacture(); e.unProduit = {codeProd: "ABC"}; assertEquals(e.unProduit.codeProd, "ABC"); });
Deno.test("unProduit de 4 caractères", () => { const e = new UnProduitByFacture(); e.unProduit = {codeProd: "ABCD"}; assertEquals(e.unProduit.codeProd, "ABCD"); });
Deno.test("unProduit de 5 caractères", () => { const e = new UnProduitByFacture(); e.unProduit = {codeProd: "ABCDE"}; assertEquals(e.unProduit.codeProd, "ABCDE"); });
Deno.test("unProduit de 6 caractères", () => { const e = new UnProduitByFacture(); e.unProduit = {codeProd: "ABCDEF"}; assertEquals(e.unProduit.codeProd, "ABCDEF"); });
Deno.test("unProduit de 7 caractères", () => { const e = new UnProduitByFacture(); e.unProduit = {codeProd: "ABCDEFG"}; assertEquals(e.unProduit.codeProd, "ABCDEFG"); });
Deno.test("unProduit de 8 caractères", () => { const e = new UnProduitByFacture(); e.unProduit = {codeProd: "ABCDEFGH"}; assertEquals(e.unProduit.codeProd, "ABCDEFGH"); });
Deno.test("unProduit de 9 caractères", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.unProduit = {codeProd: "ABCDEFGHI"}; }, ProduitByFactureError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("unProduit plus de 8 caractères", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.unProduit = {codeProd: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}; }, ProduitByFactureError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("unProduit moins de 3 caractères", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.unProduit = {codeProd: "AB"}; }, ProduitByFactureError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("unProduit de 1 caractères", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.unProduit = {codeProd: "1"}; }, ProduitByFactureError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
Deno.test("unProduit chaine vide", () => { const e = new UnProduitByFacture(); assertThrows(() => { e.unProduit = {codeProd: ""}; }, ProduitByFactureError, "Le code du produit doit être une chaine qui fait entre 3 et 8 caractères de long"); });
