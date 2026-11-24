import { useRef, useState } from 'react';
import { CitaMovil, Navegacion, PiePagina } from './components/Navegacion';
import { Contacto, Enfoque, Espacio, Hero, PreguntasFrecuentes, Proceso, Servicios, SobreMi, Ubicacion } from './components/Secciones';
import { desplazarA, useAnimaciones } from './hooks/useAnimaciones';

export default function App() {
  const contenedor = useRef(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');

  useAnimaciones(contenedor);

  function elegirServicio(id) {
    setServicioSeleccionado(id);
    requestAnimationFrame(() => desplazarA('#reservar'));
  }

  return (
    <div ref={contenedor} className="min-h-screen overflow-x-clip bg-[#130d10] font-['DM_Sans',sans-serif] text-[#f1e5d3] antialiased selection:bg-[#bc8d64] selection:text-[#1a1012]">
      <a href="#contenido" className="fixed -top-28 left-4 z-[300] bg-[#f0e4d2] px-5 py-3 text-sm text-[#1a1012] focus:top-4">Saltar al contenido</a>
      <Navegacion />
      <main id="contenido" tabIndex={-1}>
        <Hero servicioSeleccionado={servicioSeleccionado} />
        <Enfoque />
        <Servicios onElegirServicio={elegirServicio} />
        <Proceso />
        <SobreMi />
        <Espacio />
        <PreguntasFrecuentes />
        <Ubicacion />
        <Contacto />
      </main>
      <PiePagina />
      <CitaMovil />
    </div>
  );
}
