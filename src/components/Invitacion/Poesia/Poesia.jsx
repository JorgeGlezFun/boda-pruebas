import { motion } from "framer-motion";
                
import fondo from "../../../assets/img/fondos/poesia/fondo_poesia.jpg";
import pedida from "../../../assets/img/fotos/pedida.png";
import abrazo from "../../../assets/img/fotos/abrazo.png";
export default function Poesia() {
    return (
        <motion.section
            className="flex flex-col items-center justify-center min-h-screen sm:mb-10 md:mb-12 lg:mb-15 xl:mb-20 2xl:mb-30 3xl:mb-50
            bg-cover bg-center bg-no-repeat
            "
            style = {{ backgroundImage: `
                    linear-gradient(to top, transparent 80%, #F3EFE4 100%),    
                    linear-gradient(to bottom, transparent 90%, #F3EFE4 100%),    
                    url(${fondo})` }}
        >
            <motion.div
                className="
                grid grid-cols-3 grid-rows-[auto_auto]
                items-center justify-center
                w-90 sm:w-160 md:w-3xl lg:w-5xl xl:w-7xl 2xl:w-[96rem] 3xl:w-[120rem]
                text-black font-baskervville
                "
            >  
                <motion.div
                    className="
                    relative w-fit z-10
                    left-2 sm:left-10 xl:left-15 2xl:left-40 3xl:left-75
                    sm:top-5
                    col-start-1 row-start-1 flex flex-col items-center justify-center 
                    px-2 xl:px-4
                    pt-2 xl:pt-4
                    bg-[#F5F4EF] rotate-2 shadow-xl
                    overflow-hidden
                    "
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    >
                    <motion.img
                        src={pedida}
                        alt="Pedida de mano"
                        className="w-36 sm:w-full xl:w-96 object-cover"
                        />
                    <p className="py-2 sm:py-4 italic text-[12px] lg:text-base xl:text-xl 2xl:text-2xl">"Si, quiero"</p>
                </motion.div>
                <div className="
                    relative 
                    flex items-center justify-center rounded-full mx-6
                    backdrop-blur-md
                    top-19 sm:top-39 md:top-46 lg:top-60 xl:top-70 2xl:top-66 3xl:top-60
                    right-7.5 sm:-left-2 lg:left-2 xl:left-3 2xl:left-5 3xl:left-12
                    h-53 sm:h-70 md:h-86 lg:h-112 xl:h-144 2xl:h-172 3xl:h-200
                    w-33 sm:w-45 md:w-52 lg:w-70 xl:w-88 2xl:w-106 3xl:w-125
                    ">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 1 }}
                        className="
                        sm:h-fit 
                        px-4 sm:px-6
                        sm:py-4
                        w-full
                        text-[9px] sm:text-[12px] md:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl
                        text-center font-baskervville italic
                        "
                        >
                        "En un mundo lleno de gente que corre, <br/>
                        gracias por detenerte conmigo. <br/>
                        Por ser el punto y seguido <br/>
                        en medio de tanto punto final. <br/>
                        Que suerte que, entre todos los caminos <br/>
                        posibles, <br/>
                        tus pasos y los mios <br/>
                        decidieran inventarse uno nuevo." <br/>
                    </motion.p>
                </div>
                <motion.div 
                    className="
                    relative 
                    right-2 sm:right-9 md:right-10 xl:right-15
                    bottom-5 
                    w-fit
                    col-start-3 row-start-2 flex flex-col items-center justify-center 
                    px-2 xl:px-4
                    pt-2 xl:pt-4
                    bg-[#F5F4EF] -rotate-2 shadow-xl
                    overflow-hidden
                    "
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.25,
                    }}
                    >
                    <motion.img
                        src={abrazo}
                        alt="Abrazo de los novios"
                        className="w-36 sm:w-full xl:w-96 object-cover"
                        />
                    <p className="py-2 sm:py-4 italic text-[12px] lg:text-base xl:text-xl 2xl:text-2xl">"¡Nos casamos!"</p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}