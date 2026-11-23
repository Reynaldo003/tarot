import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, Instagram, MapPin, Menu, X } from 'lucide-react';
import { negocio } from '../config/negocio';
import { SolAstral } from './Compartidos';

const enlaces = [
  { texto: 'Inicio', destino: '#inicio' },
  { texto: 'Lecturas', destino: '#lecturas' },
  { texto: 'Mi enfoque', destino: '#enfoque' },
  { texto: 'El espacio', destino: '#espacio' },
  { texto: 'Ubicación', destino: '#ubicacion' },
  { texto: 'Contacto', destino: '#contacto' },
];

function Marca({ pie = false }) {
  return (
    <a className={`marca ${pie ? 'marca-pie' : ''}`} href="#inicio" aria-label="Casa Astral, volver al inicio">
      <SolAstral className="marca-simbolo" pequeno />
      <span><strong>{negocio.nombre}</strong><small>{negocio.marca}</small></span>
    </a>
  );
}

export function Navegacion() {
  const [abierto, setAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);

  useEffect(() => {
    const actualizar = () => setDesplazado(window.scrollY > 18);
    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
    return () => window.removeEventListener('scroll', actualizar);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-abierto', abierto);
    const cerrarConEscape = (evento) => {
      if (evento.key === 'Escape') setAbierto(false);
    };
    document.addEventListener('keydown', cerrarConEscape);
    return () => {
      document.body.classList.remove('menu-abierto');
      document.removeEventListener('keydown', cerrarConEscape);
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <header className={`navegacion ${desplazado ? 'navegacion-solida' : ''}`}>
      <div className="contenedor navegacion-interior">
        <Marca />
        <nav className="navegacion-escritorio" aria-label="Navegación principal">
          {enlaces.map((enlace) => <a key={enlace.destino} href={enlace.destino}>{enlace.texto}</a>)}
        </nav>
        <a href="#reservar" className="boton-reserva-nav"><CalendarDays size={15} />Agendar cita</a>
        <button className="boton-menu" type="button" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-controls="menu-movil" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}>
          {abierto ? <X /> : <Menu />}
        </button>
      </div>
      <nav id="menu-movil" className={`menu-movil ${abierto ? 'menu-movil-visible' : ''}`} aria-label="Navegación móvil" inert={!abierto}>
        {enlaces.map((enlace, indice) => <a key={enlace.destino} href={enlace.destino} onClick={cerrar}><span>0{indice + 1}</span>{enlace.texto}</a>)}
        <a href="#reservar" onClick={cerrar} className="menu-movil-cita">Solicitar una lectura <ArrowUpRight size={21} /></a>
      </nav>
    </header>
  );
}

export function PiePagina() {
  return (
    <footer className="pie-pagina">
      <div className="contenedor pie-principal">
        <div>
          <Marca pie />
          <p>Un lugar para escucharte, mirar hacia dentro y volver a tu propia voz.</p>
        </div>
        <div className="pie-enlaces">
          <span className="pie-etiqueta">EXPLORA</span>
          {enlaces.map((enlace) => <a href={enlace.destino} key={enlace.destino}>{enlace.texto}</a>)}
        </div>
        <div className="pie-contacto">
          <span className="pie-etiqueta">ENCUÉNTRANOS</span>
          <p><MapPin size={16} />{negocio.ciudad}</p>
          {negocio.instagram ? <a href={negocio.instagram} target="_blank" rel="noreferrer"><Instagram size={16} />Instagram <ArrowUpRight size={15} /></a> : <span className="dato-pendiente">Instagram: pendiente de configurar</span>}
          <a href="#reservar"><CalendarDays size={16} />Solicitar una cita <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div className="contenedor pie-inferior">
        <span>© {new Date().getFullYear()} {negocio.nombre}. Concepto visual de demostración.</span>
        <span>HECHO PARA ENCONTRAR CLARIDAD <span aria-hidden="true">✦</span></span>
      </div>
    </footer>
  );
}

export function CitaMovil() {
  return (
    <a className="cita-fija-movil" href="#reservar"><CalendarDays size={18} /> Agendar mi lectura <ArrowUpRight size={17} /></a>
  );
}
