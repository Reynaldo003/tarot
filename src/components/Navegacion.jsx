import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, Instagram, MapPin, Menu, X } from 'lucide-react';
import { negocio } from '../config/negocio';
import { CONTENEDOR, DISPLAY, SolAstral } from './Compartidos';

const enlaces = [
  { texto: 'Inicio', destino: '#inicio' },
  { texto: 'Mi enfoque', destino: '#enfoque' },
  { texto: 'Lecturas', destino: '#lecturas' },
  { texto: 'El espacio', destino: '#espacio' },
  { texto: 'Ubicación', destino: '#ubicacion' },
  { texto: 'Contacto', destino: '#contacto' },
];

function Marca({ pie = false }) {
  return (
    <a href="#inicio" aria-label="Casa Astral, volver al inicio" className="inline-flex shrink-0 items-center gap-2.5 leading-[0.9] text-[#ead3b1]">
      <SolAstral className="shrink-0 text-[#d8b379]" pequeno />
      <span>
        <strong className={`${DISPLAY} block whitespace-nowrap text-[35px] font-medium tracking-[-0.055em] sm:text-[40px] ${pie ? 'sm:text-[40px]' : ''}`}>{negocio.nombre}</strong>
        <small className="mt-2 block whitespace-nowrap text-[12px] font-bold tracking-[0.17em] text-[#c9a279] sm:tracking-[0.27em]">{negocio.marca}</small>
      </span>
    </a>
  );
}

export function Navegacion() {
  const [abierto, setAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);
  const [activo, setActivo] = useState('#inicio');

  useEffect(() => {
    const actualizar = () => setDesplazado(window.scrollY > 18);
    actualizar();
    window.addEventListener('scroll', actualizar, { passive: true });
    return () => window.removeEventListener('scroll', actualizar);
  }, []);

  useEffect(() => {
    const observador = new IntersectionObserver((entradas) => {
      const visibles = entradas.filter((entrada) => entrada.isIntersecting);
      if (visibles.length) setActivo(`#${visibles[visibles.length - 1].target.id}`);
    }, { rootMargin: '-35% 0px -55% 0px' });
    enlaces.forEach(({ destino }) => {
      const seccion = document.querySelector(destino);
      if (seccion) observador.observe(seccion);
    });
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', abierto);
    const escapar = (evento) => { if (evento.key === 'Escape') setAbierto(false); };
    document.addEventListener('keydown', escapar);
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', escapar);
    };
  }, [abierto]);

  return (
    <header className={`fixed inset-x-0 top-0 z-[200] border-b transition-all duration-500 ${desplazado || abierto ? 'border-[#d5ab72]/20 bg-[#140c10]/95 shadow-2xl shadow-black/20 backdrop-blur-xl' : 'border-transparent bg-gradient-to-b from-[#100a0d]/95 to-transparent'}`}>
      <div className={`${CONTENEDOR} relative flex h-[75px] items-center gap-5 lg:h-[91px] lg:gap-8`}>
        <Marca />
        <nav className="ml-auto hidden items-center gap-[clamp(12px,1.6vw,30px)] lg:flex" aria-label="Navegación principal">
          {enlaces.map((enlace) => (
            <a key={enlace.destino} href={enlace.destino} aria-current={activo === enlace.destino ? 'location' : undefined} className={`relative whitespace-nowrap py-4 text-sm transition-colors duration-300 after:absolute after:bottom-2 after:left-0 after:h-px after:bg-[#d5ab72] after:transition-[width] after:duration-300 ${activo === enlace.destino ? 'text-[#f0d3a3] after:w-full' : 'text-[#f0e3d5] after:w-0 hover:text-[#d5ab72] hover:after:w-full'}`}>{enlace.texto}</a>
          ))}
        </nav>
        <a href="#reservar" className="ml-auto hidden shrink-0 items-center gap-2 rounded-full bg-[#e1bc87] px-5 py-3 text-xs font-bold text-[#201418] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0d8af] md:inline-flex lg:ml-0"><CalendarDays size={16} />Agendar cita</a>
        <button type="button" onClick={() => setAbierto((valor) => !valor)} aria-expanded={abierto} aria-controls="menu-movil" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} className="ml-auto inline-flex items-center justify-center rounded-full border border-[#d5ab72]/40 p-2.5 text-[#d5ab72] transition-colors hover:bg-[#d5ab72]/10 md:ml-0 lg:hidden">
          {abierto ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <nav id="menu-movil" aria-label="Navegación móvil" inert={!abierto} className={`absolute inset-x-0 top-full flex h-[calc(100dvh-75px)] flex-col overflow-y-auto bg-[#1b1017] px-7 py-9 transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${abierto ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-full opacity-0'}`}>
        {enlaces.map((enlace, indice) => (
          <a key={enlace.destino} href={enlace.destino} onClick={() => setAbierto(false)} className={`group flex items-center gap-6 border-b border-[#d5ab72]/20 py-3.5 ${DISPLAY} text-[clamp(29px,7vw,48px)] text-[#f1e5d3] transition-colors hover:text-[#d5ab72]`}>
            <span className="font-sans text-[11px] text-[#d5ab72]">0{indice + 1}</span>{enlace.texto}<ArrowUpRight className="ml-auto opacity-0 transition-all group-hover:opacity-100" size={20} />
          </a>
        ))}
        <a href="#reservar" onClick={() => setAbierto(false)} className="mt-8 flex items-center justify-between bg-[#daba8e] p-4 text-base font-bold text-[#2a161c]">Solicitar una lectura <ArrowUpRight size={20} /></a>
      </nav>
      <div data-progreso-scroll className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left scale-x-0 bg-[#d5ab72]" aria-hidden="true" />
    </header>
  );
}

export function PiePagina() {
  return (
    <footer className="border-t border-[#d5ab72]/30 bg-[#130c11] pb-8 pt-16 text-[#f1e5d3]">
      <div className={`${CONTENEDOR} grid gap-10 border-b border-[#d5ab72]/20 pb-14 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12`}>
        <div><Marca pie /><p className="mt-6 max-w-[270px] text-base leading-7 text-white">Un lugar para escucharte, mirar hacia dentro y volver a tu propia voz.</p></div>
        <div className="grid grid-cols-2 content-start gap-x-6 gap-y-3">
          <span className="col-span-2 mb-2 text-[14px] font-semibold tracking-[0.22em] text-[#caa779]">EXPLORA</span>
          {enlaces.map((enlace) => <a key={enlace.destino} href={enlace.destino} className="text-base text-white transition-colors hover:text-[#f3c992]">{enlace.texto}</a>)}
        </div>
        <div className="flex flex-col items-start gap-3">
          <span className="mb-2 text-[14px] font-semibold tracking-[0.22em] text-[#caa779]">ENCUÉNTRANOS</span>
          <p className="flex items-center gap-2 text-base text-white"><MapPin size={17} className="text-[#d5ad79]" />{negocio.ciudad}</p>
          {negocio.instagram ? <a href={negocio.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-base text-white hover:text-[#f3c992]"><Instagram size={17} />Instagram <ArrowUpRight size={15} /></a> : <span className="text-[14px] text-[#a38c91]">Instagram por configurar</span>}
          <a href="#reservar" className="flex items-center gap-2 text-base text-white hover:text-[#f3c992]"><CalendarDays size={17} />Solicitar una cita <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div className={`${CONTENEDOR} flex flex-col mb-10 justify-between gap-3 pt-6 text-[14px] tracking-wide text-white md:flex-row`}>
        <span>© {new Date().getFullYear()} {negocio.nombre}.</span>
        <span className="tracking-[0.15em]">ENCUENTRA CLARIDAD EN LA VIDA <span className="text-[#d5ab72]">✦</span></span>
      </div>
    </footer>
  );
}

export function CitaMovil() {
  return <a href="#reservar" className="fixed inset-x-3 bottom-[calc(10px+env(safe-area-inset-bottom))] z-[190] flex min-h-12 items-center justify-center gap-2 bg-[#e5bd84] p-3 text-[13px] font-bold text-[#24141a] shadow-2xl shadow-black/40 md:hidden"><CalendarDays size={18} /> Agendar mi lectura <ArrowUpRight size={17} /></a>;
}
