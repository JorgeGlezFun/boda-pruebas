import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
    CakeSlice,
    Church,
    Martini,
    PartyPopper,
    UtensilsCrossed,
    Wine,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import fondo from "../../../assets/img/fondos/timeline/fondo_timeline.png";

const eventIcons = {
    ceremony: Church,
    aperitif: Martini,
    banquet: UtensilsCrossed,
    cake: CakeSlice,
    party: PartyPopper,
    "open-bar": Wine,
};

const events = [
    {
        time: "12:00",
        title: "Ceremonia",
        description: "El comienzo de nuestro sí, quiero.",
        icon: "ceremony",
    },
    {
        time: "13:00",
        title: "Aperitivo",
        description: "Brindaremos juntos para celebrar.",
        icon: "aperitif",
    },
    {
        time: "14:00",
        title: "Banquete",
        description: "Una mesa compartida con quienes más queremos.",
        icon: "banquet",
    },
    {
        time: "16:00",
        title: "Tarta",
        description: "El momento más dulce de la noche.",
        icon: "cake",
    },
    {
        time: "18:00",
        title: "Fiesta",
        description: "Abrimos la pista para celebrarlo juntos.",
        icon: "party",
    },
    {
        time: "00:00",
        title: "Barra libre",
        description: "Hasta que el cuerpo aguante.",
        icon: "open-bar",
    },
];

export default function Timeline() {
    const timelineRef = useRef(null);
    const firstIconRef = useRef(null);
    const lastIconRef = useRef(null);

    const [linePosition, setLinePosition] = useState({
        top: 0,
        height: 0,
    });

    useEffect(() => {
        const updateLinePosition = () => {
            if (
                !timelineRef.current ||
                !firstIconRef.current ||
                !lastIconRef.current
            ) {
                return;
            }

            const timelineRect = timelineRef.current.getBoundingClientRect();
            const firstIconRect = firstIconRef.current.getBoundingClientRect();
            const lastIconRect = lastIconRef.current.getBoundingClientRect();

            const firstCenter =
                firstIconRect.top +
                firstIconRect.height / 2 -
                timelineRect.top;

            const lastCenter =
                lastIconRect.top +
                lastIconRect.height / 2 -
                timelineRect.top;

            setLinePosition({
                top: firstCenter,
                height: lastCenter - firstCenter,
            });
        };

        updateLinePosition();

        window.addEventListener("resize", updateLinePosition);

        return () => {
            window.removeEventListener("resize", updateLinePosition);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 75%", "end 35%"],
    });

    // Guardamos el mayor progreso alcanzado.
    // Así la línea nunca retrocede al hacer scroll hacia arriba.
    const [maxProgress, setMaxProgress] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setMaxProgress((current) => {
            return Math.max(current, latest);
        });
    });

    const [visibleEvents, setVisibleEvents] = useState([]);

    const showEvent = (index) => {
        setVisibleEvents((current) => {
            if (current.includes(index)) {
                return current;
            }

            return [...current, index];
        });
    };

    return (
        <motion.section
            className="
                flex h-fit flex-col items-center justify-center py-10 
                text-4xl font-herr-von-muellerhoff text-black
                bg-cover bg-center bg-no-repeat
                mb-10 md:mb-12 lg:mb-15 xl:mb-20 2xl:mb-30 3xl:mb-50
                "
            style = {{ backgroundImage: `
                linear-gradient(to top, transparent 90%, #F3EFE4 100%),    
                linear-gradient(to bottom, transparent 90%, #F3EFE4 100%),    
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
                Timeline
            </motion.p>

            {/* CONTENEDOR DE TODA LA TIMELINE */}
            <div
                ref={timelineRef}
                className="
                    relative
                    w-full
                    h-fit
                    px-10
                    py-10
                    font-baskervville
                "
            >
                {/* LÍNEA BASE */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        z-0
                        w-0.5
                        -translate-x-1/2
                        bg-[#F3EFE4]
                    "
                    style={{
                        top: linePosition.top,
                        height: linePosition.height,
                    }}
                />

                {/* LÍNEA VERDE ANIMADA */}
                <motion.div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        z-0
                        w-1
                        -translate-x-1/2
                        origin-top
                        bg-[#526B5D]
                    "
                    style={{
                        top: linePosition.top,
                        height: linePosition.height,
                        scaleY: maxProgress,
                    }}
                />

                <ol className="relative z-10">
                    {events.map((event, index) => {
                        const isLeft = index % 2 === 0;
                        const isVisible = visibleEvents.includes(index);
                        const IconComponent = eventIcons[event.icon];

                        return (
                            <motion.li
                                key={`${event.time}-${event.title}`}
                                data-timeline-item
                                data-side={isLeft ? "left" : "right"}
                                className="
                                    relative
                                    grid
                                    min-h-48
                                    grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)]
                                    items-center
                                    sm:min-h-52
                                    sm:grid-cols-[minmax(0,1fr)_4.25rem_minmax(0,1fr)]
                                    md:min-h-56
                                    md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)]
                                    lg:min-h-60
                                    lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)]
                                    xl:min-h-64
                                    xl:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)]
                                    2xl:min-h-72
                                    2xl:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)]
                                    3xl:min-h-80
                                    3xl:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)]
                                "
                                onViewportEnter={() => showEvent(index)}
                                viewport={{
                                    once: true,
                                    amount: 0.35,
                                }}
                            >
                                {/* TEXTO */}
                                <motion.div
                                    className={
                                        isLeft
                                            ? "col-start-1 row-start-1 pr-2 text-right sm:pr-4 md:pr-6 lg:pr-8 xl:pr-10 2xl:pr-12 3xl:pr-16"
                                            : "col-start-3 row-start-1 pl-2 text-left sm:pl-4 md:pl-6 lg:pl-8 xl:pl-10 2xl:pl-12 3xl:pl-16"
                                    }
                                    initial={{
                                        opacity: 0,
                                        x: isLeft ? -40 : 40,
                                    }}
                                    animate={{
                                        opacity: isVisible ? 1 : 0,
                                        x: isVisible
                                            ? 0
                                            : isLeft
                                                ? -40
                                                : 40,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        ease: "easeOut",
                                    }}
                                >
                                    <time className="block text-base italic text-[#526B5D]/75 sm:text-base md:text-lg lg:text-xl xl:text-[1.35rem] 2xl:text-2xl 3xl:text-[1.65rem]">
                                        {event.time}
                                    </time>

                                    <h2 className="mt-1 text-3xl font-normal font-herr-von-muellerhoff leading-tight text-[#526B5D] sm:text-4xl md:text-5xl lg:text-[2rem] xl:text-6xl 2xl:text-[2.6rem] 3xl:text-7xl">
                                        {event.title}
                                    </h2>

                                    {event.description && (
                                        <p className="sm:mt-2 text-xs sm:leading-relaxed text-[#526B5D]/75 sm:text-sm md:text-base lg:mt-3 lg:text-lg xl:text-xl 2xl:text-[1.35rem] 3xl:text-2xl">
                                            {event.description}
                                        </p>
                                    )}
                                </motion.div>

                                {/* ICONO CENTRAL */}
                                <motion.div
                                    ref={
                                        index === 0
                                            ? firstIconRef
                                            : index === events.length - 1
                                                ? lastIconRef
                                                : null
                                    }
                                    className="
                                        col-start-2
                                        row-start-1
                                        z-10
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        justify-self-center
                                        rounded-full
                                        border-2
                                        border-[#526B5D]
                                        bg-[#F3EFE4]
                                        text-[#526B5D]
                                    "
                                    initial={{
                                        opacity: 0,
                                        scale: 0.5,
                                    }}
                                    animate={{
                                        opacity: isVisible ? 1 : 0,
                                        scale: isVisible ? 1 : 0.5,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.15,
                                        ease: "easeOut",
                                    }}
                                >
                                    <IconComponent size={25} />
                                </motion.div>
                            </motion.li>
                        );
                    })}
                </ol>
            </div>
        </motion.section>
    );
}