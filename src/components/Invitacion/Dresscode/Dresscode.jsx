import { motion } from "framer-motion";
import fondo from "../../../assets/img/fondos/dresscode/fondo_dresscode.png";
export default function Dresscode() {

    return (
        <section
            className="flex flex-col items-center justify-center"
        >
            <motion.div
                className="
                flex flex-col items-center justify-center
                w-90 sm:w-160 md:w-3xl lg:w-5xl xl:w-7xl 2xl:w-384 3xl:w-480
                min-h-screen 
                sm:py-10 gap-2
                text-4xl font-herr-von-muellerhoff text-black
                bg-cover bg-center bg-no-repeat
                sm:mb-10 md:mb-12 lg:mb-15 xl:mb-20 2xl:mb-30 3xl:mb-50
                "
                style = {{ backgroundImage: `
                    linear-gradient(to top, transparent 90%, #F3EFE4 100%),    
                    linear-gradient(to bottom, transparent 90%, #F3EFE4 100%),    
                    url(${fondo})
                    ` }}
            >
                <motion.p
                    className="
                    mb-2 md:mb-4 lg:mb-0 
                    lg:pb-12 2xl:pb-16 3xl:pb-20
                    text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl
                    "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.9,
                        ease: "easeInOut",
                    }}
                >
                    Dresscode
                </motion.p>
                <motion.div
                    className="
                    flex flex-col items-center justify-center
                    sm:h-fit
                    w-50 sm:w-80 md:w-96 lg:w-102 xl:w-126 2xl:w-148 3xl:w-3xl
                    mb-9 sm:mb-0
                    "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.9,
                        ease: "easeInOut",
                    }}
                >
                    <motion.p 
                        className="
                        text-justify font-baskervville 
                        text-[12px] sm:text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl
                        px-2 md:px-4 lg:px-8 xl:px-8 3xl:px-10
                        py-2 sm:py-6 md:py-10 lg:py-10 xl:py-14 2xl:py-16 3xl:py-12
                        sm:mx-8 md:mx-10 lg:mx-0
                        sm:mb-10 md:mb-8 lg:mb-16 xl:mb-18 2xl:mb-22 3xl:mb-28
                        leading-5 sm:leading-none lg-leading-relaxed
                        bg-[#F5F4EF]/35 backdrop-blur-md
                        "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: "easeInOut",
                        }}
                    >
                        Queremos que vengáis como más cómodos y vosotros mismos os sintáis. <br/><br/>
                        No hay un dress code estricto: elegid el look que más os guste y 
                        con el que disfrutéis de este día. <br/> <br/>
                        Solo tenemos una pequeña petición… dejemos el blanco para la novia. <br/> <br/>
                        El resto, ¡libertad absoluta para vestir, combinar y disfrutar!
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    );
}

// bg-[#F5F4EF]/75