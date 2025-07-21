--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 17.2

-- Started on 2025-07-21 14:01:04

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
-- TOC entry 216 (class 1259 OID 98332)
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    "productName" character varying(50) NOT NULL,
    sku text NOT NULL,
    "productDescription" text,
    "productTypeId" integer NOT NULL,
    "marketedAt" timestamp(3) without time zone DEFAULT (now() - '7 days'::interval) NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 98342)
-- Name: ProductType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductType" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."ProductType" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 98341)
-- Name: ProductType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductType_id_seq" OWNER TO postgres;

--
-- TOC entry 4805 (class 0 OID 0)
-- Dependencies: 217
-- Name: ProductType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductType_id_seq" OWNED BY public."ProductType".id;


--
-- TOC entry 215 (class 1259 OID 98331)
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- TOC entry 4807 (class 0 OID 0)
-- Dependencies: 215
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- TOC entry 4642 (class 2604 OID 98335)
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- TOC entry 4644 (class 2604 OID 98345)
-- Name: ProductType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductType" ALTER COLUMN id SET DEFAULT nextval('public."ProductType_id_seq"'::regclass);


--
-- TOC entry 4794 (class 0 OID 98332)
-- Dependencies: 216
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, "productName", sku, "productDescription", "productTypeId", "marketedAt") FROM stdin;
1	שלום	123456789987989789	שלוםשלוםשלוםשלוםשלוםשלוםשלוםשלום	1	2025-07-14 00:00:00
2	שלום 2 	123451231513215132156413215	דגכדגכדגכגדכדגכדגכדגכדג גכדכלך צ ףפחןךמנג דגכןחיןם	2	2025-07-14 00:00:00
3	בדיקה שינוי תאריך 	232323254543323434534242133424	דגכגדכג\nגדכדגכדגכ\nדגכדגגדכדגכגכגכ גדכדגכקרד דקכדכדגכ	2	2025-07-21 00:00:00
4	בידה שם מוצר -------------------------------------	541231553125	בידה שם מוצר -------------------------------------	3	2025-07-23 00:00:00
5	TEST	43343441111	דשגדג	2	2025-07-30 00:00:00
6	שלום בדיקה לחיפוש 	123456789	שלום בדיקה לחיפוש שלום בדיקה לחיפוש שלום בדיקה לחיפוש 	3	2025-07-17 00:00:00
7	עוד בדיקה שלום לחיפוש 	854512623	15468123582	2	2025-07-22 00:00:00
8	בדיקה לצורך דיפקופ 	856963	בדיקה לצורך דיפקופ 	2	2025-07-14 00:00:00
9	בדיקה לצורך דיפקוף2	574236	בדיקה לצורך דיפקוף2\nבדיקה לצורך דיפקוף2\nבדיקה לצורך דיפקוף2	2	2025-07-14 00:00:00
10	בדיקה לצורך דיפקוף 3 	558533274	בדיקה לצורך דיפקוף 3 \nבדיקה לצורך דיפקוף 3 \nבדיקה לצורך דיפקוף 3 \nבדיקה לצורך דיפקוף 3 	3	2025-07-14 00:00:00
11	בדיקה לצורך דיפקוף 4	234367676	בדיקה לצורך דיפקוף 3 	1	2025-07-14 00:00:00
12	בדיקה לצורך דיפקוף 5	8565642184781	בדיקה לצורך דיפקוף 3 בדיקה לצורך דיפקוף 3  בדיקה לצורך דיפקוף 3 	2	2025-07-14 00:00:00
13	בדיקה לצורך דיפקוף 5	8562551	בדיקה לצורך דיפקוף 3 בדיקה לצורך דיפקוף 4	3	2025-07-14 00:00:00
14	בדיקה לצורך דיפקוף 6	1	בדיקה לצורך דיפקוף 3 	2	2025-07-14 00:00:00
15	בדיקה לצורך דיפקוף 7	58	בדיקה לצורך דיפקוף 8	1	2025-07-14 00:00:00
16	בדיקה לתצוגת אידיקציה למשתמש 	5851484125	בדיקה לתצוגת אידיקציה למשתמש  בדיקה לתצוגת אידיקציה למשתמש 	2	2025-08-01 00:00:00
\.


--
-- TOC entry 4796 (class 0 OID 98342)
-- Dependencies: 218
-- Data for Name: ProductType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductType" (id, name) FROM stdin;
1	ירק
2	פרי
3	גידולי שדה
\.


--
-- TOC entry 4809 (class 0 OID 0)
-- Dependencies: 217
-- Name: ProductType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductType_id_seq"', 3, true);


--
-- TOC entry 4810 (class 0 OID 0)
-- Dependencies: 215
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 16, true);


--
-- TOC entry 4649 (class 2606 OID 98349)
-- Name: ProductType ProductType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductType"
    ADD CONSTRAINT "ProductType_pkey" PRIMARY KEY (id);


--
-- TOC entry 4646 (class 2606 OID 98340)
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- TOC entry 4647 (class 1259 OID 98350)
-- Name: ProductType_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProductType_name_key" ON public."ProductType" USING btree (name);


--
-- TOC entry 4802 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO store_usr_db;


--
-- TOC entry 4803 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE "Product"; Type: ACL; Schema: public; Owner: postgres
--

REVOKE SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."Product" FROM postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."Product" TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."Product" TO store_usr_db WITH GRANT OPTION;


--
-- TOC entry 4804 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE "ProductType"; Type: ACL; Schema: public; Owner: postgres
--

REVOKE SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."ProductType" FROM postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."ProductType" TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."ProductType" TO store_usr_db WITH GRANT OPTION;


--
-- TOC entry 4806 (class 0 OID 0)
-- Dependencies: 217
-- Name: SEQUENCE "ProductType_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."ProductType_id_seq" TO store_usr_db;


--
-- TOC entry 4808 (class 0 OID 0)
-- Dependencies: 215
-- Name: SEQUENCE "Product_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."Product_id_seq" TO store_usr_db;


--
-- TOC entry 2045 (class 826 OID 90117)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO store_usr_db;


--
-- TOC entry 2044 (class 826 OID 90116)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO store_usr_db;


--
-- TOC entry 2043 (class 826 OID 90115)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres REVOKE SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES FROM postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres WITH GRANT OPTION;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO store_usr_db WITH GRANT OPTION;


-- Completed on 2025-07-21 14:01:04

--
-- PostgreSQL database dump complete
--

