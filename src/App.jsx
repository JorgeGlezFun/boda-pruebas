import Inicio from "./components/Invitacion/Inicio/Inicio";
import Fecha from "./components/Invitacion/Fecha/Fecha";
import Poesia from "./components/Invitacion/Poesia/Poesia";
import Direccion from "./components/Invitacion/Direccion/Direccion";
import Timeline from "./components/Invitacion/Timeline/Timeline";
import Alojamiento from "./components/Invitacion/Alojamiento/Alojamiento";
import Dresscode from "./components/Invitacion/Dresscode/Dresscode";
import Confirmacion from "./components/Invitacion/Confirmacion/Confirmacion";

// <Header />
function App() {
    
    return (
        <main className="bg-[#F3EFE4] overflow-hidden">   
            <div>
                <Inicio />
                <Poesia />
                <Fecha />
                <Direccion />
                <Timeline />
                <Dresscode />
                <Alojamiento />
                <Confirmacion />
            </div>
        </main>
    );
}

export default App;