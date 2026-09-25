import { motion } from "framer-motion";
import {
    Search,
    Music2,
    LoaderCircle,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import fondo from "../../../assets/img/fondos/confirmacion/fondo_confirmacion.png";


/*
=========================================================
SPOTIFY
=========================================================

Este endpoint será el backend/proxy que hablará con Spotify.

Ejemplo:

https://tu-backend.com/api/spotify/search

IMPORTANTE:
No ponemos aquí el Client Secret.
*/

const SPOTIFY_SEARCH_PROXY =
    import.meta.env.VITE_SPOTIFY_SEARCH_PROXY ||
    "/api/spotify/search";

const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdh57ra7XwsMsv_0ApOzvMQaglRI_bvJhdphWfPaK0qVqRu0A/formResponse";
    
const GOOGLE_FORM_ENTRIES = {
    nombre: "entry.158825025",
    apellidos: "entry.1420539871",
    vieneAcompanado: "entry.315436987",
    numeroAcompanantes: "entry.228551616",

    acompanantes: [
        "entry.448849586",
        "entry.1888470802",
        "entry.1444322539",
        "entry.2107794726",
        "entry.428736803",
        "entry.437001047",
    ],

    cancion: "entry.289723491",
    menu: "entry.1550229420",
    autobus: "entry.1568797014",
    informacion: "entry.2092404499",
};

/* =========================================================
   SPOTIFY - BÚSQUEDA
========================================================= */

async function searchSpotifyTracks(query) {
    const params = new URLSearchParams({
        q: query,
    });

    const response = await fetch(
        `${SPOTIFY_SEARCH_PROXY}?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            "No se pudieron buscar las canciones."
        );
    }

    const data = await response.json();

    return data.tracks?.items || [];
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function Confirmacion() {
    const [vieneAcompanado, setVieneAcompanado] =
        useState("");

    const [numeroAcompanantes, setNumeroAcompanantes] =
        useState("");

    const [acompanantes, setAcompanantes] =
        useState([]);

    /* ---------------- Spotify ---------------- */

    const [spotifyQuery, setSpotifyQuery] =
        useState("");

    const [spotifyResults, setSpotifyResults] =
        useState([]);

    const [spotifyLoading, setSpotifyLoading] =
        useState(false);

    const [spotifyError, setSpotifyError] =
        useState("");

    const [selectedSong, setSelectedSong] =
        useState(null);

    /* ---------------- Envío ---------------- */

    const [enviando, setEnviando] =
        useState(false);

    const [enviado, setEnviado] =
        useState(false);

    /* =====================================================
       ACOMPAÑANTES
    ===================================================== */

    useEffect(() => {
        if (
            vieneAcompanado !== "si" ||
            !numeroAcompanantes
        ) {
            setAcompanantes([]);
            return;
        }

        const cantidad =
            Number(numeroAcompanantes);

        setAcompanantes((prev) =>
            Array.from(
                { length: cantidad },
                (_, index) => ({
                    nombre:
                        prev[index]?.nombre || "",
                    apellidos:
                        prev[index]?.apellidos || "",
                })
            )
        );
    }, [
        numeroAcompanantes,
        vieneAcompanado,
    ]);

    function handleAcompananteChange(
        index,
        field,
        value
    ) {
        setAcompanantes((prev) => {
            const updated = [...prev];

            updated[index] = {
                ...updated[index],
                [field]: value,
            };

            return updated;
        });
    }

    /* =====================================================
       BUSCADOR SPOTIFY
    ===================================================== */

    useEffect(() => {
        if (!spotifyQuery.trim()) {
            setSpotifyResults([]);
            setSpotifyError("");
            setSpotifyLoading(false);
            return;
        }

        const timeout = setTimeout(
            async () => {
                try {
                    setSpotifyLoading(true);
                    setSpotifyError("");

                    const results =
                        await searchSpotifyTracks(
                            spotifyQuery
                        );

                    setSpotifyResults(results);
                } catch (error) {
                    console.error(
                        "Spotify:",
                        error
                    );

                    setSpotifyError(
                        "No se pudieron cargar las canciones."
                    );

                    setSpotifyResults([]);
                } finally {
                    setSpotifyLoading(false);
                }
            },
            500
        );

        return () =>
            clearTimeout(timeout);
    }, [spotifyQuery]);

    /* =====================================================
       SELECCIONAR CANCIÓN
    ===================================================== */

    function handleSongSelect(track) {
        setSelectedSong({
            id: track.id,
            name: track.name,
            artist: track.artists
                .map(
                    (artist) =>
                        artist.name
                )
                .join(", "),
            url:
                track.external_urls
                    ?.spotify || "",
            image:
                track.album?.images?.[1]
                    ?.url ||
                track.album?.images?.[0]
                    ?.url ||
                null,
        });

        setSpotifyQuery("");
        setSpotifyResults([]);
        setSpotifyError("");
    }

    /* =====================================================
       QUITAR CANCIÓN
    ===================================================== */

    function clearSelectedSong() {
        setSelectedSong(null);
        setSpotifyQuery("");
        setSpotifyResults([]);
        setSpotifyError("");
    }

    /* =====================================================
       SUBMIT
    ===================================================== */

    function handleSubmit(event) {
        event.preventDefault();

        if (enviando) {
            return;
        }

        setEnviando(true);

        /*
        -----------------------------------------------------
        Convertimos los valores del formulario a los textos
        exactos que utiliza Google Forms.
        -----------------------------------------------------
        */

        const menuValues = {
            "": "Sin preferencia",
            vegetariano: "Vegetariano",
            vegano: "Vegano",
            sin_gluten: "Sin gluten",
            infantil: "Infantil",
        };

        const busValue =
            event.target.bus.value === "si"
                ? "Sí"
                : "No";

        /*
        -----------------------------------------------------
        Creamos un formulario temporal que se enviará al
        endpoint formResponse de Google Forms.
        -----------------------------------------------------
        */

        const googleForm =
            document.createElement("form");

        googleForm.method = "POST";
        googleForm.action = GOOGLE_FORM_URL;
        googleForm.target =
            "google-form-hidden-iframe";

        googleForm.style.display = "none";

        /*
        -----------------------------------------------------
        DATOS PRINCIPALES
        -----------------------------------------------------
        */

        const formData = {
            [GOOGLE_FORM_ENTRIES.nombre]:
                event.target.nombre.value,

            [GOOGLE_FORM_ENTRIES.apellidos]:
                event.target.apellidos.value,

            [GOOGLE_FORM_ENTRIES.vieneAcompanado]:
                vieneAcompanado === "si"
                    ? "Sí"
                    : "No",

            [GOOGLE_FORM_ENTRIES.numeroAcompanantes]:
                vieneAcompanado === "si"
                    ? numeroAcompanantes
                    : "",

            [GOOGLE_FORM_ENTRIES.cancion]:
                selectedSong
                    ? `${selectedSong.name} — ${selectedSong.artist}`
                    : "",

            [GOOGLE_FORM_ENTRIES.menu]:
                menuValues[
                    event.target.menu.value
                ] || "Sin preferencia",

            [GOOGLE_FORM_ENTRIES.autobus]:
                busValue,

            [GOOGLE_FORM_ENTRIES.informacion]:
                event.target.informacion.value,
        };

        /*
        -----------------------------------------------------
        Añadimos los datos principales.
        -----------------------------------------------------
        */

        Object.entries(formData).forEach(
            ([name, value]) => {
                const input =
                    document.createElement(
                        "input"
                    );

                input.type = "hidden";
                input.name = name;
                input.value = value;

                googleForm.appendChild(input);
            }
        );

        /*
        -----------------------------------------------------
        ACOMPAÑANTES 1-6
        -----------------------------------------------------

        Cada acompañante se envía como:

        Nombre Apellidos

        Si hay menos de 6, los restantes se envían vacíos.
        -----------------------------------------------------
        */

        GOOGLE_FORM_ENTRIES.acompanantes.forEach(
            (entryName, index) => {
                const acompanante =
                    acompanantes[index];

                let nombreCompleto = "";

                if (
                    vieneAcompanado === "si" &&
                    acompanante
                ) {
                    nombreCompleto =
                        `${acompanante.nombre || ""} ${
                            acompanante.apellidos || ""
                        }`.trim();
                }

                const input =
                    document.createElement(
                        "input"
                    );

                input.type = "hidden";
                input.name = entryName;
                input.value = nombreCompleto;

                googleForm.appendChild(input);
            }
        );

        /*
        -----------------------------------------------------
        Añadimos el formulario temporal al DOM.
        -----------------------------------------------------
        */

        document.body.appendChild(
            googleForm
        );

        /*
        -----------------------------------------------------
        Enviamos a Google Forms.
        -----------------------------------------------------
        */

        googleForm.submit();

        /*
        -----------------------------------------------------
        Google Forms recibe el formulario en segundo plano
        mediante el iframe oculto.

        Esperamos un poco antes de eliminar el formulario
        temporal y mostramos el mensaje de confirmación.
        -----------------------------------------------------
        */

        setTimeout(() => {
            googleForm.remove();

            setEnviando(false);
            setEnviado(true);
        }, 1000);
    }

    return (
        <motion.section
            className="
                flex flex-col items-center justify-center min-h-screen
                h-fit py-10
                text-4xl
                font-herr-von-muellerhoff
                text-black
                bg-cover bg-center bg-no-repeat
            "
            style = {{ backgroundImage: `
                linear-gradient(to top, transparent 90%, #F3EFE4 100%),    
                url(${fondo})
                ` }}
        >
            <motion.p 
                className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                }}
            >
                Confirmación
            </motion.p>

            <motion.div
                className="
                    flex flex-col items-center justify-center
                    w-88 sm:w-xl md:w-2xl lg:w-3xl xl:w-5xl 2xl:w-7xl
                    p-5 sm:p-10 mt-5
                    bg-[#F3EFE4]/80 backdrop-blur-md
                    rounded-3xl
                    border border-[#4b6756]
                    text-[#4b6756]
                    font-baskervville
                    text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl
                "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                }}
            >
                {!enviado ? (
                    <form
                        onSubmit={handleSubmit}
                        className="
                            flex
                            flex-col
                            gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14
                            w-full                          
                        "
                        
                    >
                        {/* =================================================
                            NOMBRE / APELLIDOS
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-row
                                gap-4
                                w-full
                            "
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                    w-full
                                "
                            >
                                <label
                                    htmlFor="nombre"
                                    className="
                                        uppercase
                                        tracking-widest
                                    "
                                >
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    required
                                    placeholder="Tu nombre"
                                    className="
                                        border
                                        border-[#4b6756]
                                        rounded-md
                                        p-3
                                        w-full
                                        bg-transparent
                                        outline-none
                                        placeholder:text-[#4b6756]/40
                                        focus:border-[#233129]
                                    "
                                />
                            </div>

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                    w-full
                                "
                            >
                                <label
                                    htmlFor="apellidos"
                                    className="
                                        uppercase
                                        tracking-widest
                                    "
                                >
                                    Apellidos
                                </label>

                                <input
                                    type="text"
                                    id="apellidos"
                                    name="apellidos"
                                    required
                                    placeholder="Tus apellidos"
                                    className="
                                        border
                                        border-[#4b6756]
                                        rounded-md
                                        p-3
                                        w-full
                                        bg-transparent
                                        outline-none
                                        placeholder:text-[#4b6756]/40
                                        focus:border-[#233129]
                                    "
                                />
                            </div>
                        </div>

                        {/* =================================================
                            ¿VIENES ACOMPAÑADO?
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-3
                                w-full
                            "
                        >
                            <label
                                className="
                                    uppercase
                                    tracking-widest
                                "
                            >
                                ¿Vienes acompañado?
                            </label>

                            <div
                                className="
                                    flex
                                    flex-row
                                    gap-4
                                    w-full
                                "
                            >
                                {/* SI */}

                                <div className="flex w-full">
                                    <input
                                        type="radio"
                                        id="acompanantes-si"
                                        name="acompanantes"
                                        value="si"
                                        checked={
                                            vieneAcompanado ===
                                            "si"
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setVieneAcompanado(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                                            peer
                                            hidden
                                        "
                                    />

                                    <label
                                        htmlFor="acompanantes-si"
                                        className="
                                            cursor-pointer
                                            w-full
                                            rounded-lg
                                            border
                                            border-[#4b6756]
                                            px-6
                                            py-3
                                            text-center
                                            transition-all
                                            duration-200
                                            hover:border-[#233129]
                                            peer-checked:bg-[#4b6756]
                                            peer-checked:text-white
                                        "
                                    >
                                        Sí
                                    </label>
                                </div>

                                {/* NO */}

                                <div className="flex w-full">
                                    <input
                                        type="radio"
                                        id="acompanantes-no"
                                        name="acompanantes"
                                        value="no"
                                        checked={
                                            vieneAcompanado ===
                                            "no"
                                        }
                                        onChange={(
                                            event
                                        ) => {
                                            setVieneAcompanado(
                                                event
                                                    .target
                                                    .value
                                            );

                                            setNumeroAcompanantes(
                                                ""
                                            );

                                            setAcompanantes(
                                                []
                                            );
                                        }}
                                        className="
                                            peer
                                            hidden
                                        "
                                    />

                                    <label
                                        htmlFor="acompanantes-no"
                                        className="
                                            cursor-pointer
                                            w-full
                                            rounded-lg
                                            border
                                            border-[#4b6756]
                                            px-6
                                            py-3
                                            text-center
                                            transition-all
                                            duration-200
                                            hover:border-[#233129]
                                            peer-checked:bg-[#4b6756]
                                            peer-checked:text-white
                                        "
                                    >
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            NÚMERO DE ACOMPAÑANTES
                        ================================================= */}

                        {vieneAcompanado === "si" && (
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                    w-full
                                "
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                            >
                                <label
                                    htmlFor="numeroAcompanantes"
                                    className="
                                        uppercase
                                        tracking-widest
                                    "
                                >
                                    Número de acompañantes
                                </label>

                                <select
                                    id="numeroAcompanantes"
                                    name="numeroAcompanantes"
                                    value={
                                        numeroAcompanantes
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setNumeroAcompanantes(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    required
                                    className="
                                        border
                                        border-[#4b6756]
                                        rounded-md
                                        p-3
                                        w-full
                                        bg-transparent
                                        outline-none
                                    "
                                >
                                    <option value="">
                                        Selecciona el número
                                    </option>

                                    {[1, 2, 3, 4, 5, 6].map(
                                        (numero) => (
                                            <option
                                                key={
                                                    numero
                                                }
                                                value={
                                                    numero
                                                }
                                            >
                                                {numero}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        )}

                        {/* =================================================
                            DATOS ACOMPAÑANTES
                        ================================================= */}

                        {acompanantes.length > 0 && (
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-5
                                "
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                            >
                                {acompanantes.map(
                                    (
                                        acompanante,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="
                                                flex
                                                flex-col
                                                gap-3
                                                p-5
                                                
                                                border-b
                                                border-[#4b6756]/40
                                            "
                                        >
                                            <p
                                                className="
                                                    uppercase
                                                    tracking-widest
                                                "
                                            >
                                                Acompañante{" "}
                                                {index + 1}
                                            </p>

                                            <div
                                                className="
                                                    flex
                                                    flex-row
                                                    gap-4
                                                "
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="Nombre"
                                                    value={
                                                        acompanante.nombre
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleAcompananteChange(
                                                            index,
                                                            "nombre",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    required
                                                    className="
                                                        border
                                                        border-[#4b6756]
                                                        rounded-md
                                                        p-3
                                                        w-full
                                                        bg-transparent
                                                        outline-none
                                                        placeholder:text-[#4b6756]/40
                                                    "
                                                />

                                                <input
                                                    type="text"
                                                    placeholder="Apellidos"
                                                    value={
                                                        acompanante.apellidos
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleAcompananteChange(
                                                            index,
                                                            "apellidos",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    required
                                                    className="
                                                        border
                                                        border-[#4b6756]
                                                        rounded-md
                                                        p-3
                                                        w-full
                                                        bg-transparent
                                                        outline-none
                                                        placeholder:text-[#4b6756]/40
                                                    "
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* =================================================
                            SPOTIFY
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                                w-full
                            "
                        >
                            <label
                                htmlFor="cancion"
                                className="
                                    uppercase
                                    tracking-widest
                                "
                            >
                                Canción que quieres que suene
                            </label>

                            {!selectedSong && (
                                <div className="relative">
                                    <Search
                                        size={20}
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            opacity-50
                                        "
                                    />

                                    <input
                                        type="text"
                                        id="cancion"
                                        autoComplete="off"
                                        value={
                                            spotifyQuery
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setSpotifyQuery(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="Escribe el título de la canción"
                                        className="
                                            border
                                            border-[#4b6756]
                                            rounded-md
                                            p-3
                                            pl-10
                                            w-full
                                            bg-transparent
                                            outline-none
                                            placeholder:text-[#4b6756]/40
                                        "
                                    />

                                    {(spotifyLoading ||
                                        spotifyResults.length >
                                            0) && (
                                        <div
                                            className="
                                                absolute
                                                z-50
                                                left-0
                                                right-0
                                                mt-2
                                                max-h-80
                                                overflow-y-auto
                                                rounded-xl
                                                border
                                                border-[#4b6756]/40
                                                bg-[#F3EFE4]
                                                shadow-lg
                                            "
                                        >
                                            {spotifyLoading && (
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        p-4
                                                    "
                                                >
                                                    <LoaderCircle
                                                        size={
                                                            18
                                                        }
                                                        className="
                                                            animate-spin
                                                        "
                                                    />

                                                    <span>
                                                        Buscando canciones...
                                                    </span>
                                                </div>
                                            )}

                                            {!spotifyLoading &&
                                                spotifyResults.map(
                                                    (
                                                        track
                                                    ) => (
                                                        <button
                                                            key={
                                                                track.id
                                                            }
                                                            type="button"
                                                            onClick={() =>
                                                                handleSongSelect(
                                                                    track
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                w-full
                                                                p-3
                                                                text-left
                                                                hover:bg-[#4b6756]/10
                                                                transition-colors
                                                            "
                                                        >
                                                            {track
                                                                .album
                                                                ?.images
                                                                ?.length >
                                                            0 ? (
                                                                <img
                                                                    src={
                                                                        track
                                                                            .album
                                                                            .images[2]
                                                                            ?.url ||
                                                                        track
                                                                            .album
                                                                            .images[0]
                                                                            ?.url
                                                                    }
                                                                    alt=""
                                                                    className="
                                                                        w-12
                                                                        h-12
                                                                        rounded-md
                                                                        object-cover
                                                                        shrink-0
                                                                    "
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="
                                                                        w-12
                                                                        h-12
                                                                        rounded-md
                                                                        border
                                                                        border-[#4b6756]
                                                                        flex
                                                                        items-center
                                                                        justify-center
                                                                        shrink-0
                                                                    "
                                                                >
                                                                    <Music2
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </div>
                                                            )}

                                                            <div className="min-w-0">
                                                                <p
                                                                    className="
                                                                        truncate
                                                                        font-medium
                                                                    "
                                                                >
                                                                    {
                                                                        track.name
                                                                    }
                                                                </p>

                                                                <p
                                                                    className="
                                                                        truncate
                                                                        opacity-60
                                                                    "
                                                                >
                                                                    {track.artists
                                                                        .map(
                                                                            (
                                                                                artist
                                                                            ) =>
                                                                                artist.name
                                                                        )
                                                                        .join(
                                                                            ", "
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    )
                                                )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* =================================================
                                CANCIÓN SELECCIONADA
                            ================================================= */}

                            {selectedSong && (
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        p-3
                                        rounded-lg
                                        border
                                        border-[#4b6756]
                                    "
                                >
                                    {selectedSong.image && (
                                        <img
                                            src={
                                                selectedSong.image
                                            }
                                            alt=""
                                            className="
                                                w-14
                                                h-14
                                                rounded-md
                                                object-cover
                                            "
                                        />
                                    )}

                                    <div
                                        className="
                                            flex-1
                                            min-w-0
                                        "
                                    >
                                        <p
                                            className="
                                                font-medium
                                                truncate
                                            "
                                        >
                                            {
                                                selectedSong.name
                                            }
                                        </p>

                                        <p
                                            className="
                                                text-sm
                                                opacity-60
                                                truncate
                                            "
                                        >
                                            {
                                                selectedSong.artist
                                            }
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            clearSelectedSong
                                        }
                                        className="
                                            p-2
                                            rounded-full
                                            hover:bg-[#4b6756]/10
                                        "
                                        aria-label="
                                            Cambiar canción
                                        "
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}

                            {spotifyError && (
                                <p
                                    className="
                                        text-red-700
                                        text-sm
                                    "
                                >
                                    {spotifyError}
                                </p>
                            )}
                        </div>

                        {/* =================================================
                            MENÚ / AUTOBÚS
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-row
                                gap-2 sm:gap-6
                                w-full
                            "
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-6 sm:gap-2
                                    w-full
                                "
                            >
                                <label
                                    htmlFor="menu"
                                    className="
                                        uppercase
                                        tracking-widest
                                    "
                                >
                                    Menú especial
                                </label>

                                <select
                                    id="menu"
                                    name="menu"
                                    className="
                                        border
                                        border-[#4b6756]
                                        rounded-md
                                        p-3
                                        w-full
                                        bg-transparent
                                        outline-none
                                    "
                                >
                                    <option value="Sin preferencia">
                                        Sin preferencia
                                    </option>

                                    <option value="vegetariano">
                                        Vegetariano
                                    </option>

                                    <option value="vegano">
                                        Vegano
                                    </option>

                                    <option value="sin_gluten">
                                        Sin gluten
                                    </option>

                                    <option value="infantil">
                                        Menú infantil
                                    </option>
                                </select>
                            </div>

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                    w-full
                                "
                            >
                                <label
                                    className="
                                        uppercase
                                        tracking-widest
                                    "
                                >
                                    ¿Necesitas autobús?
                                </label>

                                <div
                                    className="
                                        flex
                                        flex-row
                                        gap-4
                                    "
                                >
                                    <div className="flex w-full">
                                        <input
                                            type="radio"
                                            id="bus-si"
                                            name="bus"
                                            value="si"
                                            required
                                            className="
                                                peer
                                                hidden
                                            "
                                        />

                                        <label
                                            htmlFor="bus-si"
                                            className="
                                                cursor-pointer
                                                w-full
                                                rounded-lg
                                                border
                                                border-[#4b6756]
                                                px-6
                                                py-3
                                                text-center
                                                transition-all
                                                peer-checked:bg-[#4b6756]
                                                peer-checked:text-white
                                            "
                                        >
                                            Sí
                                        </label>
                                    </div>

                                    <div className="flex w-full">
                                        <input
                                            type="radio"
                                            id="bus-no"
                                            name="bus"
                                            value="no"
                                            className="
                                                peer
                                                hidden
                                            "
                                        />

                                        <label
                                            htmlFor="bus-no"
                                            className="
                                                cursor-pointer
                                                w-full
                                                rounded-lg
                                                border
                                                border-[#4b6756]
                                                px-6
                                                py-3
                                                text-center
                                                transition-all
                                                peer-checked:bg-[#4b6756]
                                                peer-checked:text-white
                                            "
                                        >
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            INFORMACIÓN
                        ================================================= */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                            "
                        >
                            <label
                                htmlFor="informacion"
                                className="
                                    uppercase
                                    tracking-widest
                                "
                            >
                                Información importante
                            </label>

                            <textarea
                                id="informacion"
                                name="informacion"
                                rows="4"
                                placeholder="Alergias, intolerancias o temas de salud que deba saber el catering"
                                className="
                                    border border-[#4b6756]
                                    rounded-md
                                    w-full p-3
                                    bg-transparent
                                    outline-none
                                    resize-none
                                    placeholder:text-[#4b6756]/40
                                "
                            />
                        </div>

                        {/* =================================================
                            BOTÓN
                        ================================================= */}

                        <button
                            type="submit"
                            disabled={enviando}
                            className="
                                bg-[#4b6756]
                                p-3
                                mt-4
                                border
                                border-[#4b6756]
                                rounded-full
                                text-[#F3EFE4]
                                uppercase
                                tracking-widest
                                transition-all
                                duration-200
                                ease-in-out
                                hover:bg-[#F3EFE4]
                                hover:text-[#4b6756]
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {enviando
                                ? "Enviando..."
                                : "Confirmar asistencia"}
                        </button>
                    </form>
                ) : (
                    <motion.div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            gap-4
                            py-10
                        "
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <p
                            className="
                                text-3xl
                                font-herr-von-muellerhoff
                            "
                        >
                            ¡Gracias!
                        </p>

                        <p
                            className="
                                text-base
                                font-baskervville
                            "
                        >
                            Hemos recibido vuestra
                            confirmación.
                        </p>
                    </motion.div>
                )}
            </motion.div>

            {/* =====================================================
                IFRAME OCULTO PARA GOOGLE FORMS
            ===================================================== */}

            <iframe
                name="google-form-hidden-iframe"
                title="Google Forms"
                style={{
                    display: "none",
                }}
            />
        </motion.section>
    );
}

// Meter bordes difusos entre imagenes.
// Ajustar fondos de los componentes
// Cambiar orden de componentes
// Comprobar version de producción
// Ajustar animaciones que se hayan olvidado de añadir