/*
MySQL Backup
Source Server Version: 5.5.5
Source Database: nitschke5_bdmondomin
Date: 22/05/2023 08:55:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `client`
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id_cli` int(11) NOT NULL AUTO_INCREMENT,
  `civ_cli` varchar(3) NOT NULL,
  `nom_cli` varchar(30) NOT NULL,
  `prenom_cli` varchar(30) NOT NULL,
  `tel_cli` varchar(16) NOT NULL,
  `mel_cli` varchar(50) NOT NULL,
  `adr_cli` varchar(50) NOT NULL,
  `cp_cli` varchar(6) NOT NULL,
  `commune_cli` varchar(30) NOT NULL,
  `tauxmax_remise_cli` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_cli`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
--  Table structure for `facture`
-- ----------------------------
DROP TABLE IF EXISTS `facture`;
CREATE TABLE `facture` (
  `num_fact` int(11) NOT NULL,
  `date_fact` date NOT NULL,
  `comment_fact` varchar(200) DEFAULT NULL,
  `taux_remise_fact` tinyint(4) NOT NULL,
  `id_cli` int(11) NOT NULL,
  `id_forfait` varchar(6) NOT NULL,
  PRIMARY KEY (`num_fact`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
--  Table structure for `forfait_livraison`
-- ----------------------------
DROP TABLE IF EXISTS `forfait_livraison`;
CREATE TABLE `forfait_livraison` (
  `id_forfait` varchar(6) NOT NULL,
  `lib_forfait` varchar(50) NOT NULL,
  `mt_forfait` int(11) NOT NULL,
  PRIMARY KEY (`id_forfait`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
--  Table structure for `ligne`
-- ----------------------------
DROP TABLE IF EXISTS `ligne`;
CREATE TABLE `ligne` (
  `num_fact` int(11) NOT NULL,
  `code_prod` varchar(8) NOT NULL,
  `qte_prod` int(11) NOT NULL,
  PRIMARY KEY (`num_fact`,`code_prod`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
--  Table structure for `produit`
-- ----------------------------
DROP TABLE IF EXISTS `produit`;
CREATE TABLE `produit` (
  `code_prod` varchar(8) NOT NULL,
  `lib_prod` varchar(50) NOT NULL,
  `type` varchar(10) NOT NULL,
  `origine` varchar(20) NOT NULL,
  `conditionnement` int(11) NOT NULL,
  `tarif_ht` decimal(7,2) NOT NULL,
  PRIMARY KEY (`code_prod`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `client` VALUES ('1','M.','BOZZO','Raoul','0724567399','bozzo.raoul@gmail.com','24 rue du cirque','57000','Metz','20'), ('2','Mme','CREZINA','Albertine','0654238877','alb.crezina@free.fr','37 avenue Caranaval','54000','Nancy','30'), ('3','M.','DRAGON','Fragonard','0722304050','DragonFra@gmail.com','7 rue du Feu éteint','75000','Paris','10'), ('4','M.','FICZERSKI','Karloff','0798654321','karloff5577@bbox.fr','2a rue des Tyrans','57000','Metz','15'), ('5','Mme','TALAOUI','Amina','0678901345','talaouinon@gmail.com','14 bis avenue de Nancy','57000','Metz','10'), ('6','Mme','RICANEUR','Eloise','0633445522','ricaneuresiole@bbox.fr','98 impasse du Muguet','54000','Nancy','10'), ('7','M.','LEBRAILLARD','Phil','0750453291','phil.lebraillard@gmail.com','3 rue Principale','57100','Thionville','20');
INSERT INTO `facture` VALUES ('2','2023-10-06','paiement différé','10','1','EXPRES'), ('3','2023-05-22','','10','2','H24'), ('4','2023-05-22','','0','5','OFFERT');
INSERT INTO `forfait_livraison` VALUES ('STD','livraison standard','10'), ('STDP','livraison standard plus','15'), ('RAPIDE','livraison rapide','20'), ('EXPRES','livraison express (dans la journée)','30'), ('H24','h24 (livraison sous 4 heures, 24h/24h)','50'), ('OFFERT','livraison offerte','0');
INSERT INTO `ligne` VALUES ('4','ABATIL','12'), ('2','INSALUS','10'), ('2','VOSSB','6'), ('2','ICELGLCP','5'), ('3','ACQARMAP','10'), ('2','ACQARMAB','10'), ('4','VEENVVT','12'), ('4','VOSSP','24'), ('4','SUNAQUA','24'), ('4','SPGLLIVB','12'), ('4','TASMRAIN','12');
INSERT INTO `produit` VALUES ('HEALSIP','Healsi ','plate','Portugal','100','1.90'), ('HEALSIB','Healsi','pétillante','Portugal','100','1.90'), ('INSALUS','Insalus','plate','Pyrénées','75','1.90'), ('ACQARMAP','Acqua Armani','plate','Italie','75','7.00'), ('ACQARMAB','Acqua Armani','pétillante','Italie','75','7.00'), ('AGUBENAS','Agua De Banassal','plate','Espagne','100','3.50'), ('BORJOMI','Borjomi','pétillante','Géorgie','100','2.40'), ('CHATLDON','Chateldon','pétillante','Puy-de-Dôme','75','6.20'), ('SPGLLIVP','Speyside Glenlivet','plate','Ecosse','75','4.80'), ('SPGLLIVB','Speyside Glenlivet','pétillante','Ecosse','75','4.80'), ('HATRIDGP','Hatterrall Ridge','plate','Pays-de-Galles','75','2.70'), ('HATRIDGB','Hatterrall Ridge','pétillante','Pays-de-Galles','75','2.70'), ('ZILIA','Zilia','plate','Corse','100','4.50'), ('FIJI1','Fiji','plate','Fidji','50','2.20'), ('FIJI2','Fiji','plate','Fidji','100','3.50'), ('SOLDECP','Sole Déco','plate','Italie','75','4.00'), ('SOLDECB','Sole Déco','pétillante','Italie','75','4.00'), ('BREZP','Breeze Plate','plate','îles Canaries','50','10.00'), ('VOSSP','Voss','plate','Norvège','80','6.00'), ('VOSSB','Voss','pétillante','Norvège','80','6.00'), ('ICELGLCP','Icelandic Glacial','plate','Islande','75','4.50'), ('ICELGLCB','Icelandic Glacial','pétillante','Islande','75','4.50'), ('SANTANBI','Sant\'Anna Bio Bottle','plate','Italie','50','1.00'), ('PENACL22','Penaclara 22','plate','Espagne','82','5.00'), ('OGEUB','Ogeu','pétillante','Pyrénées','75','2.50'), ('808P','808','plate','Aix-en-Provence','75','2.80'), ('808B','808','pétillante','Aix-en-Provence','75','29.00'), ('SOLCAB','Solan de Cabras','plate','Espagne','100','4.00'), ('STANIOL','Sant Aniol','plate','Espagne','100','4.50'), ('MEHQUL','Mehrner Quelle','plate','Tyrol','100','3.50'), ('BLWATER','Black Water','plate','France','50','5.50'), ('STGERON','Saint Géron','pétillante','Auvergne','75','2.60'), ('THONON','Thonon','plate','Savoie','75','2.75'), ('FONTOR','Font d\'Or','plate','Espagne','100','1.90'), ('SMBRANP','Sembrancher','plate','Suisse','75','5.00'), ('SMBRANB','Sembrancher','pétillante','Suisse','75','5.00'), ('LASASSE','La Sasse','plate','France','74','9.90'), ('VALAISP','Valais','plate','Suisse','100','5.00'), ('VALAISB','Valais','pétillante','Suisse','100','5.00'), ('AQUAPAX','Aquapax','plate','Allemagne','50','1.65'), ('PERRIER','Perrier','pétillante','Gard','33','1.70'), ('LOFOTEN','Lofoten','plate','Norvége','88','16.50'), ('TREIGNAC','Treignac','plate','Corrèze','75','2.50'), ('LAURETAP','Lauretana','plate','Italie','100','4.00'), ('LAURETAB','Lauretana','pétillante','Italie','100','4.00'), ('ABATIL','Abatilles','plate','Arcachon','75','4.90'), ('ACQPANNA','Acqua Panna','plate','Italie','75','4.50'), ('OREZZAP','Orezza','plate','Corse','100','5.90'), ('OREZZAB','Orezza','pétillante','COrse','100','5.90'), ('STLEOM','ST Leonards Mondquelle','plate','Allemagne','100','4.00'), ('EVIANPUR','Evian Pure','plate','Evian','75','3.00'), ('LIZP','Liz','plate','Allemagne','75','6.00'), ('LIZB','Liz','pétillante','Allemagne','75','6.00'), ('KRUSKIL','Krusmolle KIlde','plate','Danemark','80','3.50'), ('CHTMERLE','Chantemerle','plate','Ardèche','100','2.75'), ('VELMNFRP','Velleminfroy','plate','Franche-Comté','100','2.20'), ('VELMNFRB','Velleminfroy','pétillante','Franche-Comté','100','2.60'), ('ESNTUKI','Essentuki','pétillante','Russie','50','3.00'), ('STGEORG','Saint Georges','plate','Corse','100','2.20'), ('ELSENHAM','Elsenham','pétillante','Angleterre','75','6.05'), ('NUMEN','Numen','plate','Espagne','75','6.20'), ('VEENP','Veen','plate','FInlande','66','4.95'), ('APOLNRIS','Apollinaris','pétillante','Allemagne','70','1.70'), ('VEENB','Veen','pétillante','Finlande','66','4.95'), ('SUNAQUA','Sun Aqua','plate','Indonésie','75','2.50'), ('BAIKAL','Baïkal','plate','Russie','75','4.50'), ('BLNGH20','Bling H20','plate','Etats-Unis','75','59.00'), ('CHOJUNG','Cho-Jung','plate','Corée du Sud','75','12.00'), ('CRYSTGE','Crystal Geyser','plate','Etats-Unis','50','3.00'), ('TASMRAIN','Tasmanian Rain','plate','Australie','75','6.00'), ('FINE','Finé','plate','Japon','75','6.00'), ('ICEBERG','Glace Rare Iceberg Water','plate','Canada','75','60.00'), ('HILDONP','Hildon','plate','Angleterre','75','2.30'), ('HILDONB','Hildon','pétillante','Angleterre','75','2.30'), ('KAROO','Karoo','plate','Afrique du Sud','75','30.00'), ('NEVIOT','Neviot','plate','Israël','50','4.00'), ('SVALBROI','Svalbaroi','plate','Svalbard','75','85.00'), ('ROI','Roi','plate','Slovénie','50','25.00'), ('KONANIG','Kona Nigari','plate','Japon','75','380.00'), ('VEENVVT','Veen Velvet','plate','Finlande','75','75.00'), ('THEONI','Theoni','plate','Grèce','75','12.00'), ('TIB5100','Tibet Spring 5100','plate','Chine','33','6.00');
