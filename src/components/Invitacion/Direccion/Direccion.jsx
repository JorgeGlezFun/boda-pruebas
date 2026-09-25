import { motion } from "framer-motion";
import parroquia from "../../../assets/img/acuarelas/parroquia.png";
import salon from "../../../assets/img/acuarelas/adelfas.png";
export default function Direccion() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 12,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.section
            id="direccion"
            className="flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={containerVariants}
        >
            <motion.div
                className="
                grid grid-cols-2 grid-row-2 
                w-160 md:w-3xl lg:w-5xl xl:w-7xl 2xl:w-364 3xl:w-[120rem]
                text-black gap-4 py-12 px-4 
                sm:px-6 lg:px-8
                mb-10 md:mb-12 lg:mb-15 xl:mb-20 2xl:mb-30 3xl:mb-50
                "
            >
                {/* CEREMONIA */}
                <motion.div
                    className="
                        flex flex-col justify-center
                        font-baskervville
                        gap-1 sm:gap-2 text-center
                        "
                    variants={itemVariants}
                >
                    <motion.p
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-[2rem] xl:text-6xl 2xl:text-[2.6rem] 3xl:text-7xl"
                        variants={itemVariants}
                    >
                        Ceremonia
                    </motion.p>
                    <motion.p variants={itemVariants} className="font-herr-von-muellerhoff text-lg sm:text-2xl md:text-3xl lg:text-[1.5rem] xl:text-4xl 2xl:text-[2.2rem] 3xl:text-5xl">
                        Parroquia Santa María de Jesús
                    </motion.p>
                    <motion.p variants={itemVariants} className="font-baskervville text-lg sm:text-2xl md:text-3xl lg:text-[1.5rem] xl:text-4xl 2xl:text-[2.2rem] 3xl:text-5xl">
                        13:30
                    </motion.p>
                </motion.div>
                <motion.div
                    className="flex items-center justify-center h-fit rounded-xl border-[#F3EFE4] overflow-hidden"
                    variants={itemVariants}
                >
                    <motion.img 
                        src={parroquia} alt="Parroquía Santa María de Jesús" 
                        className="
                        h-full
                        bg-cover bg-center bg-no-repeat
                        [mask-image:radial-gradient(ellipse_at_center,#F3EFE4_50%,transparent_90%)]
                        "
                    />
                </motion.div>
                {/* CONVITE */}
                <motion.div
                    className="flex items-center justify-center h-fit rounded-xl border-[#F3EFE4] overflow-hidden"
                    variants={itemVariants}
                >
                    <motion.img 
                        src={salon} alt="Salón las Adelfas" 
                        className="
                        h-full
                        bg-cover bg-center bg-no-repeat
                        [mask-image:radial-gradient(ellipse_at_center,#F3EFE4_50%,transparent_90%)]
                        "
                    />
                </motion.div>
                <motion.div
                    className="
                        flex flex-col justify-center
                        font-baskervville text-center
                        gap-1 sm:gap-2
                        "
                    variants={itemVariants}
                >
                    <motion.p
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-[2rem] xl:text-6xl 2xl:text-[2.6rem] 3xl:text-7xl"
                        variants={itemVariants}
                    >
                        Celebración
                    </motion.p>
                    <motion.p variants={itemVariants} className="font-herr-von-muellerhoff text-lg sm:text-2xl md:text-3xl lg:text-[1.5rem] xl:text-4xl 2xl:text-[2.2rem] 3xl:text-5xl">
                        Salón las Adelfas
                    </motion.p>
                    <motion.p variants={itemVariants} className="font-baskervville text-lg sm:text-2xl md:text-3xl lg:text-[1.5rem] xl:text-4xl 2xl:text-[2.2rem] 3xl:text-5xl">
                        15:00
                    </motion.p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}