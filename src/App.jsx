import { useRef, useState } from 'react';
import { CitaMovil, Navegacion, PiePagina } from './components/Navegacion';
import {
  Contacto, Enfoque, Espacio, Hero, PreguntasFrecuentes,
  Proceso, Servicios, SobreMi, Ubicacion,
} from './components/Secciones';
import { useAnimaciones } from './hooks/useAnimaciones';

export default function App() {
  const contenedor = useRef(null);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');

  useAnimaciones(contenedor);

  function elegirServicio(id) {
    setServicioSeleccionado(id);
    const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('reservar')?.scrollIntoView({
      behavior: reducirMovimiento ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  return (
    <div ref={contenedor} className="sitio-astral">
      <a href="#contenido" className="saltar-contenido">Saltar al contenido</a>
      <Navegacion />

      <main id="contenido">
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
