import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import fondo from "../../../assets/img/fondos/inicio/fondo_inicio.jpg";

export default function Inicio() {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();

        img.src = fondo;

        img.onload = () => {
            setImageLoaded(true);
        };

        // Por si la imagen ya estaba en caché
        if (img.complete) {
            setImageLoaded(true);
        }
    }, []);

    if (!imageLoaded) {
        return (
            <section
                className="
                    min-h-screen
                    bg-[#F3EFE4]
                "
            />
        );
    }

    return (
        <motion.section
            id="inicio"
            className="
                flex flex-col items-center justify-center min-h-screen 
                bg-cover bg-center bg-no-repeat
                font-ballet text-[#6a837f]
                text-7xl
                select-none 
                mb-15 sm:mb-10 md:mb-12 lg:mb-15 xl:mb-20 2xl:mb-30 3xl:mb-50
            "
            style={{
                backgroundImage: `
                    linear-gradient(to bottom, transparent 90%, #F3EFE4 100%),    
                    url(${fondo})
                `
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.8,
                ease: "easeInOut",
            }}
        >
            <motion.div
                className="flex flex-col items-center justify-center gap-8 w-fit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                }}
            >
                <motion.p>Yeray</motion.p>
                <motion.p>&</motion.p>
                <motion.p>Laura</motion.p>
            </motion.div>
        </motion.section>
    );
}