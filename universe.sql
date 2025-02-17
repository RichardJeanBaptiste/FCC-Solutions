--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    name character varying(60) NOT NULL,
    description text,
    distance_from_earth numeric,
    is_spherical boolean,
    discovery_year integer,
    age_in_millions_of_years integer,
    asteroid_id integer NOT NULL
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_a_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_a_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_a_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_a_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_a_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    name character varying(60) NOT NULL,
    description text,
    distance_from_earth numeric,
    is_spherical boolean,
    galaxy_id integer NOT NULL,
    discovery_year integer,
    age_in_millions_of_years integer
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_a_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_a_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_a_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_a_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_a_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    name character varying(60) NOT NULL,
    description text,
    distance_from_earth numeric,
    is_spherical boolean,
    discovery_year integer,
    age_in_millions_of_years integer,
    moon_id integer NOT NULL,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_a_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_a_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_a_id_seq OWNER TO freecodecamp;

--
-- Name: moon_a_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_a_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    name character varying(60) NOT NULL,
    description text,
    distance_from_earth numeric,
    is_spherical boolean,
    discovery_year integer,
    age_in_millions_of_years integer,
    planet_id integer NOT NULL,
    star integer,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_a_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_a_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_a_id_seq OWNER TO freecodecamp;

--
-- Name: planet_a_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_a_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    name character varying(60) NOT NULL,
    description text,
    distance_from_earth numeric,
    is_spherical boolean,
    discovery_year integer,
    age_in_millions_of_years integer,
    star_id integer NOT NULL,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_a_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_a_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_a_id_seq OWNER TO freecodecamp;

--
-- Name: star_a_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_a_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_a_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_a_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_a_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_a_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_a_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES ('Ceres', 'The largest object in the asteroid belt and classified as a dwarf planet.', 414, true, 1801, 4500, 1);
INSERT INTO public.asteroid VALUES ('Vesta', 'The second-largest asteroid in the asteroid belt, with a differentiated interior.', 353, false, 1807, 4500, 2);
INSERT INTO public.asteroid VALUES ('Pallas', 'A large and highly inclined asteroid in the main belt.', 414, false, 1802, 4500, 3);
INSERT INTO public.asteroid VALUES ('Hygiea', 'A dark, carbon-rich asteroid in the outer asteroid belt.', 470, true, 1849, 4500, 4);
INSERT INTO public.asteroid VALUES ('Eros', 'A near-Earth asteroid with an elongated shape and visited by the NEAR Shoemaker spacecraft.', 22, false, 1898, 4500, 5);
INSERT INTO public.asteroid VALUES ('Apophis', 'A near-Earth asteroid with a small chance of impacting Earth in the future.', 31600, false, 2004, 4500, 6);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES ('Milky Way', 'Our home galaxy, a barred spiral containing our home galaxy', 0, true, 1, 0, 13000);
INSERT INTO public.galaxy VALUES ('Andromeda Galaxy', 'The nearest spiral galaxy to the milky way, on a collision course with it', 2500000, false, 2, 1924, 10000);
INSERT INTO public.galaxy VALUES ('Triangulum Galaxy', 'A member of the Local Group, known for its face on spiral structure', 3000000, false, 3, 1654, 13000);
INSERT INTO public.galaxy VALUES ('Sombrero Galaxy', 'Named for its resemblence to a sombrero hat, featuring a prominent central bulge and dust lane', 31000000, false, 4, 1781, 13000);
INSERT INTO public.galaxy VALUES ('Firefly Sparkle', 'A young galaxy offering insights into early galaxy formation', 13400000, false, 5, 2024, 600);
INSERT INTO public.galaxy VALUES ('JADES-GS-z14-0', 'One of the most distant known galaxies, observed as it was shortly after the Big Bang', 13400000, false, 6, 2024, 300);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES ('Moon', 'Earths only satellite affecting tides and stabilizing the planets axial tilt', 0.384, true, 0, 4500, 1, 3);
INSERT INTO public.moon VALUES ('Phobos (Mars)', 'The larger and closer of Mars two moons, with a heavily cratered surface', 54.6, false, 1877, 4300, 2, 4);
INSERT INTO public.moon VALUES ('Diemos (Mars)', 'The smaller outer moon of Mars with a smoother surface than Phobos', 54.6, false, 1877, 4300, 3, 4);
INSERT INTO public.moon VALUES ('Io (Jupiter)', 'The most volcanically active body in the solar system', 628, true, 1610, 4500, 4, 5);
INSERT INTO public.moon VALUES ('Europa (Jupiter)', 'An icy moon with a subsurface ocean that may harbor life', 628, true, 1610, 4500, 5, 5);
INSERT INTO public.moon VALUES ('Ganymede (Jupiter)', 'The largest moon in the solar system larger than mercury', 628, true, 1610, 4500, 6, 5);
INSERT INTO public.moon VALUES ('Callisto (Jupiter)', 'A heavily cratered moon with a possible subsurface ocean.', 628, true, 1610, 4500, 7, 5);
INSERT INTO public.moon VALUES ('Titan (Saturn)', 'The second-largest moon in the solar system, with a thick atmosphere and liquid methane lakes.', 1200, true, 1655, 4500, 8, 7);
INSERT INTO public.moon VALUES ('Enceladus (Saturn)', 'An icy moon with geysers that hint at an underground ocean.', 1200, true, 1789, 4500, 9, 7);
INSERT INTO public.moon VALUES ('Mimas (Saturn)', 'A moon with a massive crater, resembling the Death Star.', 1200, true, 1789, 4500, 10, 7);
INSERT INTO public.moon VALUES ('Triton (Neptune)', 'Neptune’s lagest moon, orbiting in a retrograde motion.', 4300, true, 1846, 4500, 11, 6);
INSERT INTO public.moon VALUES ('Oberon (Uranus)', 'The second-largest moon of Uranus, with an icy, cratered surface.', 2600, true, 1787, 4500, 13, 8);
INSERT INTO public.moon VALUES ('Titania (Uranus)', 'The largest moon of Uranus, with signs of past geological activity.', 2600, true, 1787, 4500, 14, 8);
INSERT INTO public.moon VALUES ('Miranda (Uranus)', 'A small moon with dramatic cliffs and canyons.', 2600, true, 1948, 4500, 15, 8);
INSERT INTO public.moon VALUES ('Rhea (Saturn)', 'Saturn’s second-largest moon, with a thin atmosphere.', 1200, true, 1672, 4500, 16, 7);
INSERT INTO public.moon VALUES ('Iapetus (Saturn)', 'A two-toned moon with a mysterious equatorial ridge.', 1200, true, 1671, 4500, 17, 7);
INSERT INTO public.moon VALUES ('Dione (Saturn)', 'A moon with bright surface features and a possible subsurface ocean.', 1200, true, 1684, 4500, 18, 7);
INSERT INTO public.moon VALUES ('Charon (Pluto)', 'The largest moon of Pluto, forming a binary system with it.', 5900, true, 1978, 4000, 12, 1);
INSERT INTO public.moon VALUES ('Kepler-1625b I', 'A possible exomoon orbiting an exoplanet, potentially Neptune-sized.', 0, true, 2018, 8000, 19, 1);
INSERT INTO public.moon VALUES ('Candidate Moon of WASP-49b', 'A potential exomoon orbiting a hot Jupiter exoplanet.', 0, true, 2020, 6000, 20, 1);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES ('Mercury', 'The smallest and innermost planet in the solar system', 77, true, 0, 4500, 1, NULL, 1);
INSERT INTO public.planet VALUES ('Venus', 'A rocky planet with a thick, toxic atmosphere', 38, true, 0, 4500, 2, NULL, 1);
INSERT INTO public.planet VALUES ('Earth', 'The only known planet with life', 0, true, 0, 4540, 3, NULL, 1);
INSERT INTO public.planet VALUES ('Mars', 'A cold, desert like planet with a thin atmosphere', 54.6, true, 0, 4500, 4, NULL, 1);
INSERT INTO public.planet VALUES ('Jupiter', 'The largest gas giant in the solar system', 588, true, 0, 4500, 5, NULL, 1);
INSERT INTO public.planet VALUES ('Neptune', 'The farthest known planet in our solar system, a gas giant', 4300, true, 1846, 4500, 6, NULL, 1);
INSERT INTO public.planet VALUES ('Saturn', 'is a gas giant known for its extensive and stunning ring system', 1200, true, 0, 4500, 7, NULL, 1);
INSERT INTO public.planet VALUES ('Uranus', 'is an ice giant with a pale blue-green color due to methane in its atmosphere', 2600, true, 1781, 4500, 8, NULL, 1);
INSERT INTO public.planet VALUES ('Proxima Centauri b', 'A potentially habitable exoplanet orbiting the closest star to the Sun.', 40000000, true, 2016, 4850, 9, NULL, 2);
INSERT INTO public.planet VALUES ('Kepler-22b', 'A super-Earth in the habitable zone of its star.', 5676000, true, 2011, 6000, 10, NULL, 2);
INSERT INTO public.planet VALUES ('Gliese 581g', 'A controversial exoplanet once considered habitable', 189200, true, 2010, 7000, 11, NULL, 2);
INSERT INTO public.planet VALUES ('HD 209458 b (Osiris)', 'A hot Jupiter with atmospheric evaporation.', 1504140, true, 1999, 6000, 12, NULL, 2);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES ('Sirius', 'Also known as Dog Star, Sirius is the brightest star in earths night sky, located in the constellation Canis Major', 8.6, true, 1862, 300, 1, 1);
INSERT INTO public.star VALUES ('Aldebaran', 'The brightest star in the constellation Taurus, often called "Eye of Taurus"; an orange giant', 65, true, 0, 6600, 6, 1);
INSERT INTO public.star VALUES ('Polaris', 'Commonly know as the North Star, it is the brightest star in the constellation Ursa Minor', 433, true, 0, 70, 5, 1);
INSERT INTO public.star VALUES ('Vega', 'a bright star in the constellation Lyra; served as the northern pole star around 12,000 BCE and will do so again around 13,727 CE', 25, true, 0, 455, 4, 1);
INSERT INTO public.star VALUES ('Proxima Centauri', 'The closest known star to the Sun, part of the Alpha Centauri star system; a red dwarf', 4.24, true, 1915, 4850, 3, 1);
INSERT INTO public.star VALUES ('Betelgues', 'A red supergiant star forming the shoulder of the constellation Orion; known for its distinct reddish hue', 642.5, true, 0, 10, 2, 1);


--
-- Name: asteroid_a_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_a_id_seq', 6, true);


--
-- Name: galaxy_a_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_a_id_seq', 6, true);


--
-- Name: moon_a_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_a_id_seq', 20, true);


--
-- Name: planet_a_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_a_id_seq', 12, true);


--
-- Name: star_a_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_a_id_seq', 7, true);


--
-- Name: asteroid asteroid_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_key UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star galaxy_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT galaxy_id FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- Name: moon planet_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT planet_id FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet star_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT star_id FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- PostgreSQL database dump complete
--

