--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: BDweb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "BDweb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_Morocco.1252';


ALTER DATABASE "BDweb" OWNER TO postgres;

\connect "BDweb"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: acheter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.acheter (
    id_jeu integer NOT NULL,
    id_utilisateur integer NOT NULL,
    date_achat date NOT NULL
);


ALTER TABLE public.acheter OWNER TO postgres;

--
-- Name: decrire; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.decrire (
    id_jeu integer NOT NULL,
    id_genre integer NOT NULL
);


ALTER TABLE public.decrire OWNER TO postgres;

--
-- Name: editeur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.editeur (
    id_editeur integer NOT NULL,
    nom character varying NOT NULL,
    pays character varying,
    date_de_fondation date
);


ALTER TABLE public.editeur OWNER TO postgres;

--
-- Name: editeur_id_editeur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.editeur ALTER COLUMN id_editeur ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.editeur_id_editeur_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id_genre integer NOT NULL,
    nom character varying NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- Name: jeu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jeu (
    id_jeu integer NOT NULL,
    nom character varying NOT NULL,
    prix double precision NOT NULL,
    image character varying NOT NULL,
    description character varying NOT NULL,
    min_requirement character varying NOT NULL,
    max_requirement character varying,
    id_editeur integer NOT NULL,
    date_de_publication date NOT NULL,
    is_recommended boolean,
    on_sale boolean
);


ALTER TABLE public.jeu OWNER TO postgres;

--
-- Name: jeu_id_jeu_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.jeu ALTER COLUMN id_jeu ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.jeu_id_jeu_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: panier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.panier (
    id_utilisateur integer NOT NULL,
    id_jeu integer NOT NULL
);


ALTER TABLE public.panier OWNER TO postgres;

--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id_utilisateur integer NOT NULL,
    nom character varying NOT NULL,
    mot_de_passe character varying NOT NULL,
    date_de_naissance date,
    pays character varying
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.utilisateur ALTER COLUMN id_utilisateur ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.utilisateur_id_utilisateur_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: acheter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.acheter (id_jeu, id_utilisateur, date_achat) FROM stdin;
\.


--
-- Data for Name: decrire; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.decrire (id_jeu, id_genre) FROM stdin;
1	1
1	4
2	4
2	5
3	5
3	4
4	5
4	6
5	5
5	4
6	1
6	4
7	1
7	8
8	1
8	8
9	9
10	4
10	10
\.


--
-- Data for Name: editeur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.editeur (id_editeur, nom, pays, date_de_fondation) FROM stdin;
1	Rockstar Games	United States	1998-12-01
2	Ubisoft	France	1986-03-28
3	Electronic Arts	United States	1982-05-27
4	Nintendo	Japan	1889-09-23
5	Sony Interactive Entertainment	Japan	1993-11-16
6	Bethesda Softworks	United States	1986-06-28
7	Square Enix	Japan	1986-04-01
8	Capcom	Japan	1979-05-30
9	Bandai Namco Entertainment	Japan	2005-03-31
10	Activision Blizzard	United States	2008-07-09
11	SEGA	Japan	1960-06-03
12	Konami	Japan	1969-03-21
13	CD Projekt Red	Poland	1994-05-01
14	Valve Corporation	United States	1996-08-24
15	Epic Games	United States	1991-01-01
16	THQ Nordic	Austria	2011-06-01
17	Warner Bros. Interactive Entertainment	United States	1993-01-01
18	2K Games	United States	2005-01-25
19	Paradox Interactive	Sweden	1999-01-01
20	Koei Tecmo	Japan	2009-04-01
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id_genre, nom) FROM stdin;
1	Action
2	RPG
3	Adventure
4	Puzzle
5	Simulation
6	Strategy
7	Sports
8	Shooter
9	Fighting
10	Platformer
11	Racing
12	Survival
13	Horror
14	Sandbox
15	Idle
16	MMORPG
17	Rogue-like
18	Card Game
19	Trivia
20	Music/Rhythm
\.


--
-- Data for Name: jeu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jeu (id_jeu, nom, prix, image, description, min_requirement, max_requirement, id_editeur, date_de_publication, is_recommended, on_sale) FROM stdin;
2	Assassins Creed Valhalla	59.99	images/games/Assassins_Creed_Valhalla/0.png	An action RPG set in the Viking era, focusing on exploration, combat, and story-driven gameplay.	Systeme exploitation : Windows 10 64-Bit; CPU : Intel Core i5-4460; GPU: NVIDIA GeForce GTX 960; RAM: 8GB;	Systeme exploitation : Windows 10 64-Bit; CPU : Intel Core i7-8700K; GPU: NVIDIA GeForce RTX 2080; RAM: 16GB;	2	2020-11-10	\N	\N
3	The Witcher 3: Wild Hunt	39.99	images/games/The_Witcher_3_Wild_Hunt/0.png	An award-winning RPG with an expansive open world and captivating storytelling.	Systeme d'exploitation : Windows 7 64-Bit; CPU : Intel Core i5-2500K; GPU: NVIDIA GeForce GTX 660; RAM: 6GB;	Systeme d'exploitation : Windows 10 64-Bit; CPU : Intel Core i7-3770; GPU: NVIDIA GeForce GTX 770; RAM: 8GB;	7	2015-05-19	\N	\N
4	Cyberpunk 2077	59.99	images/games/Cyberpunk_2077/0.png	A futuristic open-world RPG with a rich narrative and immersive gameplay.	Systeme exploitation : Windows 10 64-Bit; CPU : Intel Core i5-3570K; GPU: NVIDIA GTX 780; RAM: 8GB;	Systeme exploitation : Windows 10 64-Bit; CPU : Intel Core i7-4790; GPU: NVIDIA RTX 2080; RAM: 16GB;	13	2020-12-10	\N	\N
5	Elden Ring	59.99	images/games/Elden_Ring/0.png	A fantasy action RPG set in a vast and intricately designed open world.	Systeme exploitation : Windows 10 64-Bit; CPU : Intel Core i5-8400; GPU: NVIDIA GTX 1060; RAM: 12GB;	Systeme exploitation : Windows 10 64-Bit; CPU : Intel Core i7-8700K; GPU: NVIDIA RTX 3060; RAM: 16GB;	9	2022-02-25	\N	\N
6	Red Dead Redemption 2	49.99	images/games/Red_Dead_Redemption_2/0.png	A Western-themed action-adventure game with a stunning open world.	Systeme d'exploitation : Windows 7 64-Bit; CPU : Intel Core i5-2500K; GPU: NVIDIA GTX 770; RAM: 8GB;	Systeme d'exploitation : Windows 10 64-Bit; CPU : Intel Core i7-4770K; GPU: NVIDIA RTX 2060; RAM: 12GB;	1	2018-10-26	\N	\N
7	Call of Duty: Modern Warfare	59.99	images/games/Call_of_Duty_Modern_Warfare/0.png	A realistic military shooter with fast-paced multiplayer and engaging campaigns.	Systeme d'exploitation : Windows 7 64-Bit; CPU : Intel Core i3-4340; GPU: NVIDIA GTX 670; RAM: 8GB;	Systeme d'exploitation : Windows 10 64-Bit; CPU : Intel Core i5-2500K; GPU: NVIDIA GTX 970; RAM: 12GB;	10	2019-10-25	\N	\N
8	Halo Infinite	59.99	images/games/Halo_Infinite/0.png	A first-person shooter featuring a large open-world setting and classic Halo gameplay.	Systeme d'exploitation : Windows 10 64-Bit; CPU : AMD Ryzen 5 1600; GPU: AMD RX 570; RAM: 8GB;	Systeme d'exploitation : Windows 10 64-Bit; CPU : Intel Core i7-8700; GPU: NVIDIA RTX 2070; RAM: 16GB;	10	2021-12-08	\N	\N
9	FIFA 23	49.99	images/games/FIFA_23/0.png	The latest installment of the popular soccer simulation franchise.	Systeme d'exploitation : Windows 10 64-Bit; CPU : Intel Core i5-6600K; GPU: NVIDIA GTX 1050 Ti; RAM: 8GB;	Systeme d'exploitation : Windows 10 64-Bit; CPU : Intel Core i7-6700K; GPU: NVIDIA GTX 1660; RAM: 16GB;	3	2022-09-30	\N	\N
13	Palworld	29.99	images/games/Palworld/0.png	Un jeu de survie et d'aventure où vous pouvez capturer et collectionner des créatures appelées "Pals". Combinez survie, construction et collection de monstres dans un monde ouvert unique.	Windows 10, CPU Intel Core i5-3570K, 16 GB RAM, NVIDIA GeForce GTX 1050	Windows 10, CPU Intel Core i7-8700, 32 GB RAM, NVIDIA GeForce RTX 3080	3	2024-01-19	t	f
14	Tekken 8	69.99	images/games/Tekken_8/0.png	Le dernier épisode de la légendaire série de jeux de combat. Avec des graphismes next-gen et un nouveau système de combat dynamique.	Windows 10, CPU Intel Core i5-6600, 8 GB RAM, NVIDIA GeForce GTX 1050Ti	Windows 10, CPU Intel Core i7-9700K, 16 GB RAM, NVIDIA GeForce RTX 3070	2	2024-01-26	t	f
10	Minecraft	29.99	images/games/minecraft/minecraft.png	A sandbox game that lets players explore, build, and create in a blocky open world.	Systeme d'exploitation : Windows 7 64-Bit; CPU : Intel Core i3-3210; GPU: Intel HD Graphics 4000; RAM: 4GB;	Systeme d'exploitation : Windows 10 64-Bit; CPU : Intel Core i5-4690; GPU: NVIDIA GTX 960; RAM: 8GB;	15	2011-11-18	t	f
1	Grand Theft Auto V	29.99	images/games/Grand_Theft_Auto_V/0.png	An open-world action-adventure game with an engaging story and endless gameplay possibilities.	Systeme exploitation : Windows 7 64-Bit; CPU : Intel Core 2 Quad Q6600 @ 2.40GHz; GPU: NVIDIA 9800 GT 1GB; RAM: 4GB;	Systeme exploitation : Windows 10 64-Bit; CPU : Intel Core i5 3470 @ 3.2GHz; GPU: NVIDIA GTX 660 2GB; RAM: 8GB;	1	2013-09-17	t	f
17	Prince of Persia: The Lost Crown	59.99	images/games/Prince_of_Persia_Lost_Crown/0.png	Une nouvelle aventure Prince of Persia en 2.5D. Explorez un monde mythologique inspiré de la Perse ancienne avec des mécaniques de platformer modernes.	Windows 10, CPU Intel Core i5-4460, 8 GB RAM, NVIDIA GeForce GTX 950	Windows 10, CPU Intel Core i7-7700K, 16 GB RAM, NVIDIA GeForce RTX 2060	5	2025-01-01	f	f
18	Like a Dragon: Infinite Wealth	69.99	images/games/Like_a_Dragon_Infinite_Wealth/0.png	Le nouveau chapitre de la série Yakuza/Like a Dragon. Un RPG d'action qui se déroule entre le Japon et Hawaii.	Windows 10, CPU Intel Core i5-3470, 8 GB RAM, NVIDIA GeForce GTX 960	Windows 10, CPU Intel Core i7-6700, 16 GB RAM, NVIDIA GeForce RTX 3060	2	2025-01-01	f	f
15	Diablo IV	39.99	images/games/Diablo_IV/0.png	Le quatrième volet de la série Diablo. Un RPG d'action dark fantasy où vous combattez les hordes de l'enfer dans un monde ouvert.	Windows 10, CPU Intel Core i5-4670K, 8 GB RAM, NVIDIA GeForce GTX 960	Windows 10, CPU Intel Core i7-8700K, 32 GB RAM, NVIDIA GeForce RTX 3080	1	2023-09-06	f	t
16	Starfield	45.99	images/games/Starfield/0.png	Une épopée spatiale RPG de Bethesda. Explorez des centaines de systèmes stellaires et forgez votre propre destin parmi les étoiles.	Windows 10, CPU Intel Core i7-6800K, 16 GB RAM, NVIDIA GeForce GTX 1070	Windows 10, CPU Intel Core i9-9900K, 32 GB RAM, NVIDIA GeForce RTX 4080	4	2023-09-06	f	t
19	FIFA 24	49.99	images/games/fifa/game fifa 2024.png	Le dernier opus de la série FIFA avec des graphismes améliorés, de nouvelles mécaniques de jeu et des équipes mises à jour.	Windows 10, CPU Intel Core i5-6600K, 8 GB RAM, NVIDIA GeForce GTX 1050	Windows 10, CPU Intel Core i7-8700K, 16 GB RAM, NVIDIA GeForce RTX 3060	1	2025-01-01	f	t
\.


--
-- Data for Name: panier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.panier (id_utilisateur, id_jeu) FROM stdin;
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (id_utilisateur, nom, mot_de_passe, date_de_naissance, pays) FROM stdin;
0	Abderrahim Benali	Abderrahim	2004-05-19	Maroc
\.


--
-- Name: editeur_id_editeur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.editeur_id_editeur_seq', 1, false);


--
-- Name: jeu_id_jeu_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jeu_id_jeu_seq', 51, true);


--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_utilisateur_seq', 1, false);


--
-- Name: acheter Acheter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acheter
    ADD CONSTRAINT "Acheter_pkey" PRIMARY KEY (id_jeu, id_utilisateur);


--
-- Name: utilisateur UTILISATEUR_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT "UTILISATEUR_pkey" PRIMARY KEY (id_utilisateur);


--
-- Name: decrire decrire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decrire
    ADD CONSTRAINT decrire_pkey PRIMARY KEY (id_jeu, id_genre);


--
-- Name: editeur editeur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.editeur
    ADD CONSTRAINT editeur_pkey PRIMARY KEY (id_editeur);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id_genre);


--
-- Name: jeu jeu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jeu
    ADD CONSTRAINT jeu_pkey PRIMARY KEY (id_jeu);


--
-- Name: panier panier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_pkey PRIMARY KEY (id_utilisateur, id_jeu);


--
-- Name: acheter Acheter_id_jeu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acheter
    ADD CONSTRAINT "Acheter_id_jeu_fkey" FOREIGN KEY (id_jeu) REFERENCES public.jeu(id_jeu);


--
-- Name: acheter Acheter_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acheter
    ADD CONSTRAINT "Acheter_id_utilisateur_fkey" FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur);


--
-- Name: jeu id_editeur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jeu
    ADD CONSTRAINT id_editeur FOREIGN KEY (id_editeur) REFERENCES public.editeur(id_editeur);


--
-- Name: decrire id_genre; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decrire
    ADD CONSTRAINT id_genre FOREIGN KEY (id_genre) REFERENCES public.genre(id_genre);


--
-- Name: decrire id_jeu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decrire
    ADD CONSTRAINT id_jeu FOREIGN KEY (id_jeu) REFERENCES public.jeu(id_jeu);


--
-- Name: panier panier_id_jeu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_id_jeu_fkey FOREIGN KEY (id_jeu) REFERENCES public.jeu(id_jeu);


--
-- Name: panier panier_id_utilisateur_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.panier
    ADD CONSTRAINT panier_id_utilisateur_fkey FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur);


--
-- PostgreSQL database dump complete
--

