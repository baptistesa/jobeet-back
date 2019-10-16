DROP DATABASE IF EXISTS jobeet;

CREATE DATABASE IF NOT EXISTS jobeet;

USE jobeet;

source users.sql;
source offres.sql;
source entreprises.sql;
source cv.sql;
source messages.sql;
source matchs.sql;
source formations.sql;
source experience.sql;
source competences.sql;
source _user_competences.sql;
source _offre_competences.sql;

/*Insertion of users and cv*/
/*Password = Lovelace2020*/
INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path, id_entreprise) VALUES ('Joffrey', 'MARC', 'joffrey.marc@epita.fr', '+33631342623', '$2a$10$un5FEMgUZsCv5HzFQd98Tueww46Dm.vQffi1bb827N3dDNT0X6PfG', 1, 280797, true, 'placeholder_boy.jpg', null);
INSERT INTO cv(id_user, description) VALUES (1, 'Étudiant EPITA SIGL');
INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path, id_entreprise) VALUES ('Lisa', 'CASTAIGNEDE', 'lisa.castaignede@epita.fr', '+33682045274', '$2y$10$UVmJSdQjp4BuyHFQynULQu14l8QBCW//sYVI71TZD66QKu89BHumy', 1, 100297, true, 'placeholder_girl.jpg', null);
INSERT INTO cv(id_user, description) VALUES (2, 'Étudiant EPITA SIGL');
INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path, id_entreprise) VALUES ('Baptiste', 'SAINT-ANDRE', 'baptiste.saint-andre@epita.fr', '+33638614907', '$2y$10$LZ1nIZlydJTM0uXC737.neAfU0r5sN1npgWHk.0kMT/z0fM2ddFOq', 0, 161019, true, 'placeholder_boy.jpg', null);
INSERT INTO cv(id_user, description) VALUES (3, 'Étudiant EPITA SIGL');
INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path, id_entreprise) VALUES ('Bertrand', 'HA', 'bertrand.ha@epita.fr', '+33661030998', '$2y$10$B2vh.hOXD8qX9ThDFWMc6eBsZ9amk0Pnxh.qGbDFBxh5j4ZyATOg.', 0, 171019, true, 'placeholder_boy.jpg', null);
INSERT INTO cv(id_user, description) VALUES (4, 'Étudiant EPITA SIGL');
INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path, id_entreprise) VALUES ('Robin', 'DUVAL', 'robin.duval@epita.fr', '+33607080910', '$2y$10$Xp09BISVfZDyLru4Lo.Ya.E4gMu/tbQ6QEWQJLptnBMJt0VJWUWo.', 1, 345213, true, 'placeholder_boy.jpg', null);
INSERT INTO cv(id_user, description) VALUES (5, 'Professeur EPITA SIGL');
INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path, id_entreprise) VALUES ('Fernando', 'BORJA', 'fernando.borja@epita.fr', '+33603980572', '$2y$10$trLd5a4.WaOsvADLES5e9ehpud8NsSMKBD1/8cCHuw/9qojbXwSdy', 0, 984367, true, 'placeholder_boy.jpg', null);
INSERT INTO cv(id_user, description) VALUES (6, 'Étudiant EPITA SIGL');
INSERT INTO users(name, last_name, mail, phone, password, role, code, is_verified, picture_path, id_entreprise) VALUES ('Jb', 'ROLAND', 'jb.roland@epita.fr', '+33651758036', '$2y$10$kjLVcxE7cab15LCGR6WhZ.OPnwp9yaefBaNcqdGEFq/Ur7mCM3zHC', 0, 751396, true, 'placeholder_boy.jpg', null);
INSERT INTO cv(id_user, description) VALUES (7, 'Étudiant EPITA SIGL');

/*Insertion of entreprises*/
INSERT INTO entreprises(name, description) VALUES ('Cristal', "Formée d'étudiants volontaires, Cristal, l'Association Entreprise de l'école EPITA (École d'ingénieurs en informatique du pôle technologique IONIS), a pour vocation de compléter la formation des étudiants de l'école en leur faisant gagner de l'expérience professionnelle. Au service et à l'écoute de nos clients depuis 1989, nous fournissons des services de qualité adaptés à leurs besoins, et ce dans tous les domaines relatifs à l'informatique : conseil, conception et réalisation.");
INSERT INTO entreprises(name, description) VALUES ('HPE', "En octobre 2014, Hewlett-Packard annonce la scission de ses activités entre d'une part ses activités d'assembleurs de PC et de fabricants d'imprimantes sous le nom de HP Inc. et d'autre part ses activités dans les serveurs et dans les services informatiques sous le nom de Hewlett Packard Enterprise. HP annonce en parallèle la suppression de 5 000 postes3.
En avril 2015, acquisition de la société Aruba Network pour 2,7 milliards de dollars4.En septembre 2015, la firme annonce la suppression de 25 000 à 30 000 postes dans sa division de services aux entreprises5.La séparation entre Hewlett-Packard et Hewlett Packard Enterprise est effective au 1er novembre 2015. Seuls les revenus liés aux activités de serveurs et stockage ont progressé, alors que ceux provenant des PC et imprimantes ont baissé de 14%6.");
INSERT INTO entreprises(name, description) VALUES ('Airbus', "Airbus Commercial Aircraft, connu sous le nom Airbus est un constructeur aéronautique européen dont le siège social se trouve à Blagnac, dans la banlieue de Toulouse, en France. Division détenue à 100 % par le groupe industriel du même nom, l'entreprise fabrique plus de la moitié des avions de lignes produits dans le monde, et est le principal concurrent de Boeing.
Airbus fut fondé en tant que consortium par des fabricants européens à la fin des années 1960. Airbus Industrie est devenue une société par actions simplifiée (SAS) en 2001, filiale d’EADS renommé Airbus Group en 2014 puis Airbus en 2017. BAE Systems détenait 20 % d’Airbus entre 2001 et 2006.Ainsi en 2010, 62 751 personnes sont employées sur 18 sites d'Airbus situés en France, en Allemagne, au Royaume-Uni, en Belgique (SABCA) et en Espagne. Même si les pièces des avions Airbus sont essentiellement fabriquées en Europe certaines proviennent du monde entier. Mais les chaînes d'assemblage final (FAL) se trouvent à Toulouse (France), Hambourg (Allemagne), Séville (Espagne), Tianjin (Chine) et Mobile (États-Unis). Des filiales d'Airbus se trouvent aussi aux États-Unis, en Chine, au Japon et en Inde.Airbus a produit son premier avion, l'A300, en 1972, et propose une gamme d'avions commerciaux allant de l'A318 à l'A380, ainsi que des avions de fret et des avions pour hommes et femmes d'affaires. Airbus a été le premier constructeur à installer un système de commandes de vol électriques sur l'A320. En 2013, Airbus a produit 626 avions et décroché 1 503 commandes nettes1. Il s'agit du plus beau résultat commercial de l'histoire de l'aéronautique. Début 2017, Airbus annonce avoir battu son propre record de livraisons avec la production de 688 avions cette année, il devient ainsi no 12. Le 15 novembre 2017, Airbus décroche la plus importante commande de l'histoire de l'aéronautique en vendant au loueur Américain Indigo un total de 430 moyen-courriers A320neo, pour une valeur catalogue évaluée à près de 50 milliards de dollars US");
INSERT INTO entreprises(name, description) VALUES ('Airbnb', "Airbnb est une plateforme communautaire payante de location et de réservation de logements de particuliers fondée en 2008 par les Américains Brian Chesky, Joe Gebbia et Nathan Blecharczyk. Le site Internet contient en 2015 plus de 1,5 million d'annonces1 dans 34 000 villes2 et 192 pays3. Établie à San Francisco, la société est détenue et exploitée par Airbnb Inc4.En juillet 2011, l'entreprise lève 119,8 millions de dollars5. En mars 2015, Airbnb lève une nouvelle ronde de financement qui valorise l'entreprise à 20 milliards de dollars6. En mars 2017, à la suite de nouvelles levées de fonds, sa valorisation est portée à 31 milliards de dollars7.
En Europe l'activité est exercée par Airbnb Ireland Private Unlimited Company Dublin, société de droit Irlandais8.");
INSERT INTO entreprises(name, description) VALUES ('Apple', "Apple [ˈæpəl]10 Écouter (litt. « Pomme » en anglais) est une entreprise multinationale américaine qui conçoit et commercialise des produits électroniques grand public, des ordinateurs personnels et des logiciels informatiques. Parmi les produits les plus connus de l'entreprise se trouvent les ordinateurs Macintosh, l'iPod, l'iPhone et l'iPad, la montre Apple Watch, le lecteur multimédia iTunes, la suite bureautique iWork, la suite multimédia iLife ou des logiciels à destination des professionnels tels que Final Cut Pro et Logic Pro. En 2017, l'entreprise emploie 116 000 employés et exploite 499 Apple Stores répartis dans 22 pays11,12 et une boutique en ligne où sont vendus les appareils et logiciels d'Apple mais aussi de tiers. Son bénéfice annuel pour l'année 2017 est de 45,2 milliards de dollars.
Apple est créée le 1er avril 1976 dans le garage de la maison d'enfance de Steve Jobs à Los Altos en Californie par Steve Jobs, Steve Wozniak et Ronald Wayne13, puis constituée sous forme de société le 3 janvier 1977 à l'origine sous le nom d'Apple Computer, mais pour ses 30 ans et pour refléter la diversification de ses produits, le mot « computer » est retiré le 9 janvier 200714. En raison de sa philosophie industrielle de l'intégration verticale, de son approche marketing fondée sur l'innovation, l'ergonomie et l'esthétique de ses produits appréciée des consommateurs, de ses campagnes publicitaires originales et des clients qui s'identifient à l'entreprise et à la marque15, Apple s'est forgé une réputation singulière dans l'industrie électronique grand public.
Selon un classement du magazine Fortune, Apple est la société la plus admirée dans le monde en 2006, 2007, 2008, 2009, 201016, 2011, 2012 et 201317. Elle est, à partir de 2011 et au gré des fluctuations du marché, la première capitalisation boursière de la planète18 et devient également le 2 août 2018 la première entreprise privée de l'histoire à atteindre une valeur de 1 000 milliards de dollars en Bourse19,20.
");
INSERT INTO entreprises(name, description) VALUES ('Deloitte', "Deloitte est un des quatre plus importants cabinets d'audit et de conseil mondiaux. Son chiffre d'affaires mondial était de 36,8 milliards en 2016 (Deloitte redevient le plus grand cabinet d'audit et de conseil au monde devant Pwc). Il s'agit également du plus grand cabinet d'audit au monde en effectifs avec 244 000 employés, et du plus ancien du Big Four. Depuis 2009, Deloitte est aussi le premier cabinet d'audit en France1.
Les acteurs du Big Four dont Deloitte sont critiqués dans les années 2010 pour leur rôle dans l'optimisation et l'évasion fiscales de grandes entreprises ainsi que pour leur influence sur la rédaction des lois fiscales européennes.");
INSERT INTO entreprises(name, description) VALUES ('KPMG', "KPMG est un réseau international de cabinets d’audit et de conseil exerçant dans 150 pays. En 2018, KPMG emploie près de 210 000 personnes dans le monde et a généré un chiffre d’affaires combiné de 29 milliards de dollars US. KPMG est l’un des quatre plus grands cabinets d'audit et de conseil (Big Four) avec Deloitte, PwC, et EY.
En France, KPMG est un des cabinets leader1,2,3 de l'audit, du conseil et de l’expertise comptable et emploie 9 600 personnes4[réf. nécessaire]. KPMG est le commissaire aux comptes de grandes entreprises françaises comme : Carrefour, Compagnie de Saint-Gobain, Kering, Orange, Renault, Sodexo, Total, Veolia Environnement ou bien Vinci4.");
INSERT INTO entreprises(name, description) VALUES ('Travelers Insurance', "Travelers est fondée en 1864 à Hartford. En 1995, l'entreprise est acquise par l'entreprise Primerica, un conglomérat qui se concentrait déjà sur l'assurance-vie, et dirigé par Sanford I. Weill. La nouvelle entreprise prit le nom de The Travelers Group, et fonctionna selon une stratégie de cross-selling, c'est-à-dire que chaque entité de la compagnie-mère vendait ses services aux autres filiales[réf. nécessaire].
En 1998, l'entreprise, alors sous le nom de Travelers Group fusionne avec Citicorp, une des plus importantes banques américaines. Mais la fusion ne permet pas les gains escomptés, en 2002, la filiale Travelers Property and Casualty est scindée du groupe. En 2005, Travelers Life & Annuity est vendu à MetLife. À la même époque, l'entreprise St. Paul et celle de Travelers Companies fusionnent et deviennent St. Paul Travelers qui est renommé en 2007, The Travelers Companies.");
INSERT INTO entreprises(name, description) VALUES ('Winamax', "Winamax est un site web français de poker et de pari sportif en ligne.
La société Table 14 qui opère le site Winamax.fr a reçu un agrément de l'Autorité de régulation des jeux en ligne (ARJEL) le 8 juin 20101.");
INSERT INTO entreprises(name, description) VALUES ('Nvidia', "Nvidia Corporation est une entreprise spécialisée dans la conception de processeurs graphiques, de cartes graphiques et de puces graphiques pour PC et consoles de jeux (Xbox, PlayStation 3, Nintendo Switch). Son siège est à Santa Clara en Californie aux États-Unis. Nvidia est une société de type « fabless », c'est-à-dire qu'elle conçoit ses puces dans ses centres de recherches, mais qu'elle sous-traite leur production à d'autres sociétés de semi-conducteursNote 1.
Nvidia conçoit principalement des circuits graphiques allant du modèle pour netbook (Ion) aux puissants modèles destinés aux joueurs (GeForce), et même au monde professionnel (Quadro et autres). Ses principaux concurrents sont AMD (anciennement ATI)4, Intel Corporation et Qualcomm.");
INSERT INTO entreprises(name, description) VALUES ('Google', "Google LLC /ˈguːgəl/8 est une entreprise américaine de services technologiques fondée en 1998 dans la Silicon Valley, en Californie, par Larry Page et Sergey Brin, créateurs du moteur de recherche Google.
C'est une filiale de la société Alphabet depuis août 2015. L'entreprise s'est principalement fait connaître à travers la situation monopolistique de son moteur de recherche, concurrencé historiquement par AltaVista puis par Yahoo! et Bing. Elle a ensuite procédé à de nombreuses acquisitions et développements et détient aujourd'hui de nombreux logiciels et sites web notables parmi lesquels YouTube, le système d'exploitation pour téléphones mobiles Android, ainsi que d'autres services tels que Gmail, Google Earth, Google Maps ou Google Play. Google s'est donné comme mission « d'organiser l'information à l'échelle mondiale et de la rendre universellement accessible et utile »9. Cela dit, le moteur de recherche protège également les propriétés intellectuelles en désindexant10 les sites qui tentent de violer les droits d'auteurs. Après Larry Page et Eric Schmidt, son DG est, depuis 2015, Pichai Sundararajan11. Google est devenu l'une des premières entreprises américaines et mondiales par sa valorisation boursière, quelques années après une entrée en bourse originale. Début 2008, elle valait 176 milliards de dollars à Wall Street12. Le 1er février 2016, sa capitalisation boursière dépasse celle d'Apple et devient la première des États-Unis, avec un total de 550 milliards de dollars dispersés dans ses différentes catégories d'actions13. En 2014, le classement Best Global Brands d'Interbrand positionne la marque Google en seconde position mondiale, derrière la marque Apple, avec une estimation de sa valeur à 107,43 milliards de dollars (+15 % par rapport à 2013), dépassant la barre des cent milliards de dollars pour la première fois depuis la création de ce classement en 197414. En 2016, le classement Brand Z Top 100 place Google en première position devant Apple15. La société compte environ 50 000 employés. La plupart travaillent au siège mondial : le Googleplex, à Mountain View en Californie.
Google est l'une des plus imposantes entreprises du marché d'Internet et fait partie, avec Apple, Facebook et Amazon.com, du « Big Four » (les « quatre gros », aussi appelés GAFA) des entreprises de technologie16,17,18,19. En 2011, Google possédait un parc de plus de 900 000 serveurs20, contre 400 000 en 200621, ce qui en fait le parc de serveurs le plus important au monde (2 % du nombre total de machines), avec des appareils répartis sur 32 sites. Parallèlement, le moteur de recherche Google a indexé plus de 1 000 milliards de pages web en 200822.");

/*Insertion of offres*/
INSERT INTO offres(title, description, id_author,id_entreprise) VALUES( 'Prestataire', "Vous deverez développer la solution d'une problématique d'entreprise", 1, 1);