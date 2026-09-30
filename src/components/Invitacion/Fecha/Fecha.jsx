import { motion } from "framer-motion";

export default function Fecha() {
    return (
        <motion.section
            id="fecha"
            className="flex items-center justify-center h-fit pb-30 sm:py-10"
        >
            <motion.div
                className="
                    flex flex-row items-center justify-center gap-2
                    px-8 md:px-10 lg:px-24 xl:px-32 2xl:px-40 3xl:px-48
                    py-4
                    rounded-full
                    bg-[#526B5D]
                    font-baskervville text-4xl sm:text-4xl
                    overflow-hidden
                    text-white
                "
                initial={{ width: 0 }}
                whileInView={{ width: "fit-content" }}
                viewport={{ once: true }}
                transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <motion.div
                    className="flex flex-col items-center justify-center px-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <span className="w-full py-[0.05rem] bg-white" />
                    <p>Abril</p>
                    <span className="w-full py-[0.05rem] bg-white" />
                </motion.div>

                <motion.p
                    className="text-6xl font-libre-baskerville "
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    24
                </motion.p>

                <motion.div
                    className="flex flex-col items-center justify-center px-2 font-libre-baskerville"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <span className=" w-full py-[0.05rem] bg-white" />
                    <p>2027</p>
                    <span className=" w-full py-[0.05rem] bg-white" />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}