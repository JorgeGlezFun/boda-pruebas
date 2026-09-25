import { motion } from "framer-motion";
import fondo from "../../../assets/img/fondos/alojamientos/fondo_alojamientos.jpg";
const hostales = {
    hotel_1: {
        nombre: "Hotel Barrio Nuevo",
        direccion: "C. Céspedes, 3, 41740 Lebrija, Sevilla",
        link: "https://www.hotelbarrionuevo.es/",
    },
    hotel_2: {
        nombre: "LB Lebrija Hotel & Terraza",
        direccion: "Av. Juan Peña el Lebrijano, 10, 41740 Lebrija, Sevilla",
        link: "https://www.lblebrijahotel.com/",
    },
    hotel_3: {
        nombre: "Hostal Mellizo",
        direccion: "C. Tetuán, 40, 41740 Lebrija, Sevilla",
        link: "https://www.hostalmellizo.com/",
    },
    hotel_4: {
        nombre: "Hostal Fleming",
        direccion: "Av. del Dr. Fleming, 10, 41740 Lebrija, Sevilla",
        link: "https://es.hoteles.com/ho2960173504/hostal-fleming-lebrija-espana/?chkin=2027-04-24&chkout=2027-04-25&x_pwa=1&rfrr=HSR&pwa_ts=1786674225764&referrerUrl=aHR0cHM6Ly9lcy5ob3RlbGVzLmNvbS9Ib3RlbC1TZWFyY2g%3D&rffrid=sem.hcom.ES.156.003.mapresults.02.desktop-1.kwrd%3DGGMETA.92474172ESes-20270424-N-ABW%3D253-camp%3D20258787808-aud%3D-N&useRewards=false&rm1=a2&regionId=6344204&destination=Lebrija%2C+Andaluc%C3%ADa%2C+Espa%C3%B1a&destType=MARKET&selected=92474172&latLong=36.919788%2C-6.075862&mpo=EC&sort=RECOMMENDED&top_dp=70&top_cur=EUR&gclid=CjwKCAjw1vXTBhB-EiwAEKr_k1kn8NU_I66C7DC_Ilr_M1aPyiJjQm9lP3z74TmhRgOiZtGDgJvcrxoCyVUQAvD_BwE&mctc=10&userIntent=&selectedRoomType=321958295&selectedRatePlan=389918122&expediaPropertyId=92474172&searchId=27936ed2-b2c4-4b7c-a783-20e0a72cd4fb",
    },

    hotel_5: {
        nombre: "Ver mas hoteles",
        direccion: "︾",
        link: "https://www.booking.com/searchresults.es.html?aid=2440491&label=cht532js-10CAsoRkIOZ2FsbGVnb3MtaG91c2VIClgDaEaIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4Ap_77dMGwAIB0gIkNmRmMGI0ZDAtNGRmOS00ZmUzLTg2NDItMTdmNWQ5MWMxYWYz2AIB4AIB&sid=7d8e80d3c77a90a4c177f309092fc9f2&dest_id=-388959&dest_type=city&srpvid=20ab8bd0a5f200f1&chal_t=1788905568817&force_referer=",
    },
}
export default function Alojamiento() {

    return (
        <motion.section
            id="alojamiento"
            className="flex flex-col items-center justify-center py-10
            gap-8 font-herr-von-muellerhoff
            bg-cover bg-center bg-no-repeat
            mb-10 md:mb-12 lg:mb-15 xl:mb-20 2xl:mb-30 3xl:mb-50
            "
            style = {{ backgroundImage: `
                linear-gradient(to top, transparent 80%, #F3EFE4 100%),    
                linear-gradient(to bottom, transparent 90%, #F3EFE4 100%),    
                url(${fondo})` }}
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
                Alojamiento
            </motion.p>
            <div className="grid grid-cols-1 grid-rows-5 grid-flow-col place-items-center gap-4 sm:gap-6">
                {Object.values(hostales).map((hostal, index) => (
                    <motion.a 
                        className="
                            group
                            flex flex-row w-full
                            sm:gap-4 
                            sm:h-32 3xl:h-52 
                            px-4 sm:px-28 3xl:px-36
                            py-2 sm:py-0
                            font-baskervville text-[#526B5D]
                            rounded-xl bg-[#F5F4EF]/80 backdrop-blur-md overflow-hidden
                            border-2 border-[#526B5D]
                            hover:bg-[#526B5D] hover:-translate-y-3 hover:text-[#F5F4EF] transition-all duration-500
                            active:bg-[#526B5D] active:translate-y-0 active:outline-4 active:outline-[#526B5D] active:outline-offset-4 active:text-[#F5F4EF]
                        "
                        href={hostal.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{ 
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: index * 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="flex flex-col justify-center items-center w-full h-full sm:gap-2">
                            <p className="font-light text-lg sm:text-xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl">
                                {hostal.nombre}
                            </p>

                            <p className="text-[12px] sm:text-sm xl:text-xl 2xl:text-xl 3xl:text-4xl">
                                {hostal.direccion}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.section>
    );
}