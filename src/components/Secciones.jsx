import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Compass, Heart, Instagram, MapPin, MessageCircle, Moon, Sparkles, Star, Sun } from 'lucide-react';
import { negocio, preguntas, servicios } from '../config/negocio';
import { BOTON_PRIMARIO, BOTON_SECUNDARIO, CONTENEDOR, DISPLAY, TITULO, EncabezadoSeccion, EnlaceFlecha, FasesLunares, Kicker, SolAstral } from './Compartidos';
import { Reserva } from './Reserva';

const fotos = '/images/';
const TEXTO_CLARO = 'text-[#dac9c2]';

function IconoServicio({ icono, size = 25 }) {
  if (icono === 'corazon') return <Heart size={size} strokeWidth={1.2} />;
  if (icono === 'estrella') return <Star size={size} strokeWidth={1.2} />;
  if (icono === 'luna') return <Moon size={size} strokeWidth={1.2} />;
  if (icono === 'manos') return <Sparkles size={size} strokeWidth={1.2} />;
  return <Sun size={size} strokeWidth={1.2} />;
}


export function Hero({ servicioSeleccionado }) {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-hero"
      className="relative isolate flex min-h-[850px] scroll-mt-20 flex-col overflow-hidden bg-[#150c10] pt-[90px] text-[#f0e4d2] md:pt-[120px]"
    >
      {/* VIDEO DE FONDO */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[750px] overflow-hidden lg:inset-0 lg:h-full"
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-tarot.webp"
          className="h-full w-full object-cover object-[20%_top] opacity-80 lg:object-center"
        >
          <source
            src="/videos/casa_astral_hero_cinemagrafico.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* DEGRADADO ADAPTADO A MÓVILES */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(21,12,16,0.08)_0px,rgba(21,12,16,0.15)_250px,rgba(21,12,16,0.75)_520px,#150c10_780px)] lg:bg-[linear-gradient(90deg,rgba(16,9,12,.03)_0%,rgba(19,10,15,.44)_35%,rgba(16,10,13,.86)_75%,rgba(16,10,13,.94)),linear-gradient(0deg,#150c10_0%,transparent_35%)]"
        aria-hidden="true"
      />

      {/* DECORACIÓN */}
      <div
        className="pointer-events-none absolute -left-28 -top-24 -z-10 hidden size-[720px] rounded-full border border-[#d5ab72]/20 shadow-[0_0_0_100px_rgba(199,144,89,.025),0_0_0_170px_rgba(199,144,89,.02)] lg:block"
        aria-hidden="true"
        data-parallax
      />

      <span className="pointer-events-none absolute left-5 top-[41%] hidden rotate-180 text-xs tracking-[0.33em] text-[#d5ae82] opacity-80 [writing-mode:vertical-rl] xl:block">
        EL ARTE DE MIRAR HACIA DENTRO — ESTÁ EN EL PRESENTE
      </span>

      {/* CONTENIDO */}
      <div
        className={`${CONTENEDOR} relative grid flex-1 items-center gap-9 pb-12 pt-[320px] sm:pt-[380px] lg:grid-cols-[minmax(0,1fr)_minmax(340px,600px)] lg:gap-[clamp(24px,3vw,75px)] lg:pl-[clamp(150px,14vw,245px)] lg:pt-8`}
      >
        {/* TEXTOS */}
        <div className="flex min-h-[410px] flex-col items-start justify-end pb-3 md:min-h-[470px] lg:min-h-0 lg:justify-center">
          <p
            data-hero-entrada
            className="flex items-center gap-3 text-[13px] font-bold tracking-[0.2em] text-[#f2cf9b]"
          >
            <span className="size-2 shrink-0 rotate-45 bg-[#d5ab72]" />
            LECTURAS DE TAROT EN CÓRDOBA, VER.
          </p>

          <h1
            id="titulo-hero"
            data-hero-entrada
            className={`${DISPLAY} my-7 text-[clamp(4.7rem,13vw,7.5rem)] font-medium leading-[0.78] tracking-[-0.06em] text-[#f3e3d0] lg:text-[clamp(5rem,6.5vw,8.5rem)]`}
          >
            Escucha
            <br />
            <em className="font-normal">lo que tu</em>
            <br />
            intuición
            <br />
            <span className="text-[#d5ab72]">susurra.</span>
          </h1>

          <p
            data-hero-entrada
            className="max-w-[390px] text-[15px] leading-[1.85] text-[#e2d2ca]"
          >
            Un encuentro contigo, una pregunta a la vez.
            Lecturas de tarot para explorar tu presente
            con calma, claridad y sensibilidad.
          </p>

          <a
            href="#enfoque"
            data-hero-entrada
            className="group mt-7 inline-flex items-center gap-4 border-b border-[#d5ab72]/60 pb-3 text-[11px] font-semibold tracking-[0.18em] text-[#ead1aa] transition-all duration-300 hover:gap-7"
          >
            <span>DESCUBRE LA EXPERIENCIA</span>
            <ArrowDown
              size={17}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>

        {/* FORMULARIO */}
        <div className="mx-auto w-full max-w-[520px] lg:max-w-none">
          <Reserva servicioSeleccionado={servicioSeleccionado} />
        </div>
      </div>

      {/* PIE DEL HERO */}
      <div
        className={`${CONTENEDOR} flex items-center justify-between gap-4 border-t border-[#eed2a6]/25 py-5 text-[11px] tracking-[0.18em] text-[#dbba95]`}
      >
        <span>
          <span className="mr-3 text-[#ffddad]">✶</span>
          UNA NUEVA PERSPECTIVA COMIENZA AQUÍ
        </span>

        <FasesLunares className="hidden text-[#d5ab72] sm:flex" />
      </div>
    </section>
  );
}

export function Enfoque() {
  return (
    <section id="enfoque" aria-labelledby="titulo-enfoque" className="relative scroll-mt-16 overflow-hidden bg-[#f0e4d2] py-20 text-[#342323] md:py-28">
      <div className={`${CONTENEDOR} relative grid items-center gap-12 md:grid-cols-[43%_57%] md:gap-0`}>
        <div className="relative w-[86%] max-w-[550px] aspect-[4/4.1] md:w-[88%]" data-revelar>
          <div className="h-full w-full overflow-hidden [clip-path:polygon(0_0,100%_0,100%_86%,88%_100%,0_100%)]">
            <img src={`${fotos}altar-velas.webp`} width="435" height="261" loading="lazy" decoding="async" alt="Altar conceptual con velas encendidas y cartas de tarot" data-imagen className="h-full w-full object-cover saturate-[.8] transition-transform duration-700 hover:scale-105" />
          </div>
          <span className="pointer-events-none absolute -right-7 -top-7 size-[145px] rounded-full border border-[#d3b586]/70 md:size-[230px]" aria-hidden="true" />
          <small className="absolute bottom-5 left-5 text-[11px] tracking-[0.2em] text-[#fff1db]">EL RITUAL DE DETENERSE</small>
        </div>
        <div className="relative md:pr-[8%]" data-revelar>
          <Kicker oscuro>NUESTRO ENFOQUE</Kicker>
          <h2 id="titulo-enfoque" className={`${TITULO} max-w-[690px]`}>Más que una lectura, <em className="font-normal">un espacio para escucharte.</em></h2>
          <div className="mt-10 grid gap-4 border-t border-[#bd9f83] pt-6 md:grid-cols-[75px_1fr] md:gap-7">
            <span className="text-5xl font-normal text-[#927255]" aria-hidden="true">✳</span>
            <div className="max-w-[500px]">
              <p className="mb-3 text-sm leading-[1.9] text-[#5f4b43]">A veces, lo que necesitamos no es una respuesta inmediata. Es una nueva manera de mirar lo que estamos viviendo.</p>
              <p className="mb-3 text-sm leading-[1.9] text-[#5f4b43]">En Casa Astral, el tarot se presenta como una experiencia simbólica de introspección, conversación y conexión con tu propia intuición.</p>
              <EnlaceFlecha href="#proceso" claro>Conoce la experiencia</EnlaceFlecha>
            </div>
          </div>
        </div>
        <SolAstral className="pointer-events-none absolute -bottom-20 -right-8 hidden scale-[2.4] text-[#a78c71]/30 lg:block" />
      </div>
    </section>
  );
}

// Utilizamos fotografías que ya existen en public/images.
const imagenesServicios = {
  general: { archivo: 'mazo-tarot.webp', alt: 'Cartas de tarot junto a una vela encendida' },
  amor: { archivo: 'ritual-cartas.webp', alt: 'Cartas de tarot, velas y cristales sobre una mesa' },
  trabajo: { archivo: 'hero-tarot.webp', alt: 'Escena editorial con cartas de tarot' },
  energia: { archivo: 'luna-ritual.webp', alt: 'Ilustración de la luna y símbolos de un ritual' },
  presencial: { archivo: 'altar-velas.webp', alt: 'Altar con velas y una esfera de cristal' },
  online: { archivo: 'retrato-guia.webp', alt: 'Retrato conceptual de una guía de tarot' },
};

export function Servicios({ onElegirServicio }) {
  const [activo, setActivo] = useState(servicios[0].id);
  const [enTransicion, setEnTransicion] = useState(false);
  const imagenRef = useRef(null);
  const textosRef = useRef(null);
  const animacionRef = useRef(null);
  const cambiandoRef = useRef(false);
  const activoAnteriorRef = useRef(activo);

  const seleccionado = servicios.find((servicio) => servicio.id === activo) || servicios[0];
  const imagen = imagenesServicios[activo] || imagenesServicios.general;

  useEffect(() => {
    // No animamos el primer render: solo los cambios de lectura.
    if (activoAnteriorRef.current === activo) return;
    activoAnteriorRef.current = activo;

    const animacion = gsap.timeline({
      onComplete: () => {
        cambiandoRef.current = false;
        setEnTransicion(false);
      },
    });

    animacion.fromTo(
      imagenRef.current,
      { autoAlpha: 0, scale: 1.13, x: 24 },
      { autoAlpha: 1, scale: 1, x: 0, duration: 1.05, ease: 'power3.out' },
      0,
    );
    animacion.fromTo(
      textosRef.current.children,
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.065, ease: 'power3.out' },
      0.13,
    );
    animacionRef.current = animacion;

    return () => animacion.kill();
  }, [activo]);

  useEffect(() => {
    return () => animacionRef.current?.kill();
  }, []);

  function cambiarLectura(id) {
    if (id === activo || cambiandoRef.current) return;

    cambiandoRef.current = true;
    setEnTransicion(true);
    animacionRef.current?.kill();

    // Primero desaparecen la fotografía y los textos anteriores.
    const animacion = gsap.timeline({ onComplete: () => setActivo(id) });
    animacion.to(
      imagenRef.current,
      { autoAlpha: 0, scale: 1.06, x: -18, duration: 0.43, ease: 'power2.inOut' },
      0,
    );
    animacion.to(
      textosRef.current.children,
      { autoAlpha: 0, y: -17, duration: 0.31, stagger: 0.035, ease: 'power2.in' },
      0,
    );
    animacionRef.current = animacion;
  }

  return (
    <section id="lecturas" aria-labelledby="titulo-lecturas" className="relative scroll-mt-16 overflow-hidden bg-[radial-gradient(ellipse_at_83%_15%,#3b202c,transparent_52%)] bg-[#21121b] py-20 text-[#f0e4d2] md:py-28">
      <span className={`${DISPLAY} pointer-events-none absolute -right-3 top-0 text-[280px] leading-none text-[#d7a577]/10`} aria-hidden="true">✧</span>
      <div className={CONTENEDOR}>
        <div className="relative mb-12 grid items-end gap-5 lg:grid-cols-[1.45fr_.55fr] lg:gap-10">
          <div data-revelar>
            <Kicker>CADA PREGUNTA ABRE UN CAMINO</Kicker>
            <h2 id="titulo-lecturas" className={`${TITULO} max-w-[750px]`}>Una lectura para <em className="font-normal">cada momento.</em></h2>
          </div>
          <p data-revelar className="mb-3 max-w-[430px] text-[14px] leading-7 text-[#cdbab7]">No hay dos historias iguales. Explora las experiencias y elige aquella que resuena contigo.</p>
        </div>

        <div className="relative grid items-start gap-9 lg:grid-cols-[1.15fr_.85fr] lg:gap-[clamp(30px,5vw,90px)]">
          <div className="border-t border-[#e5bc95]/40" aria-label="Tipos de lectura" data-revelar>
            {servicios.map((servicio, indice) => (
              <button
                type="button"
                key={servicio.id}
                onClick={() => cambiarLectura(servicio.id)}
                disabled={enTransicion}
                aria-pressed={activo === servicio.id}
                className={`group grid w-full grid-cols-[30px_minmax(0,1fr)_26px] items-center gap-2 border-b border-[#e5bc95]/25 px-1 py-5 text-left transition-[background,color,padding] duration-300 disabled:cursor-wait lg:grid-cols-[45px_minmax(0,1fr)_95px_26px] lg:gap-3 ${activo === servicio.id ? 'bg-[#d7ac74]/10 pl-4 text-[#f4cf99]' : 'text-[#e9d8cb] hover:bg-[#d7ac74]/5 hover:pl-4 hover:text-[#f4cf99]'}`}
              >
                <span className="text-base tracking-widest text-[#b18b72]">0{indice + 1}</span>
                <span className={`${DISPLAY} text-[clamp(25px,3vw,41px)] font-medium leading-none`}>{servicio.titulo}</span>
                <span className="hidden text-right text-base text-[#bda6a1] lg:block">{servicio.etiqueta}</span>
                <span className="text-[#d3ae83] transition-transform duration-300 group-hover:rotate-12"><IconoServicio icono={servicio.icono} size={20} /></span>
              </button>
            ))}
          </div>

          <aside data-revelar aria-live="polite" aria-busy={enTransicion} className="relative self-start border border-[#d6ac7a]/40 bg-[#291723]">
            <div className="h-[180px] overflow-hidden bg-[#1b1018] sm:h-[245px]">
              <img
                ref={imagenRef}
                src={`${fotos}${imagen.archivo}`}
                alt={imagen.alt}
                width="850"
                height="490"
                className="h-full w-full object-cover brightness-[.85] saturate-[.8]"
              />
            </div>
            <div ref={textosRef} className="min-h-[300px] px-6 py-7 sm:px-9 sm:py-8">
              <span className="float-right -mt-1 text-[#d5ab72]"><IconoServicio icono={seleccionado.icono} size={35} /></span>
              <h3 className={`${DISPLAY} my-4 pr-10 text-[43px] font-medium leading-none`}>{seleccionado.titulo}</h3>
              <p className={`text-sm leading-7 ${TEXTO_CLARO}`}>{seleccionado.descripcion}</p>
              <p className="mt-3 text-sm italic leading-6 text-[#ad9992]">{seleccionado.detalle}</p>
              <button type="button" disabled={enTransicion} onClick={() => onElegirServicio(seleccionado.id)} className="group mt-5 inline-flex items-center gap-5 border-b border-[#c3a27c] py-3 text-base font-semibold text-[#e3bf8e] transition-all duration-300 hover:gap-8 disabled:cursor-wait">Solicitar esta lectura <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Proceso() {
  const pasos = [
    { titulo: 'Elige tu lectura', descripcion: 'Explora las experiencias y encuentra la que conecta con tu momento.' },
    { titulo: 'Solicita tu cita', descripcion: 'Indica fecha, horario y modalidad. Te confirmaremos disponibilidad.' },
    { titulo: 'Vive la experiencia', descripcion: 'Un encuentro cercano para conversar, reflexionar y escuchar.' },
    { titulo: 'Llévate tu reflexión', descripcion: 'Quédate con aquello que te ayude a dar tu siguiente paso.' },
  ];
  return (
    <section id="proceso" aria-labelledby="titulo-proceso" className="scroll-mt-16 bg-[#eaddc9] py-20 text-[#342323] md:py-28">
      <div className={CONTENEDOR}>
        <div className="mb-12 flex items-end justify-between gap-6"><EncabezadoSeccion kicker="EL RECORRIDO" claro titulo={<span id="titulo-proceso">Así comienza <em className="font-normal">tu camino.</em></span>} /><FasesLunares className="hidden text-[#8e6d5f] md:flex" /></div>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-9 border-t border-[#815d48]/50 md:grid-cols-4 md:gap-x-8">
          {pasos.map((paso, indice) => (
            <li key={paso.titulo} data-revelar className="relative min-h-[175px] pt-6">
              <div className={`${DISPLAY} mb-7 grid size-14 place-items-center rounded-full border border-[#724d47]/60 text-2xl text-[#744451]`}>0{indice + 1}</div>
              <span className="absolute left-[58px] right-4 top-[46px] h-px bg-[#be9f8c]" aria-hidden="true" />
              <h3 className={`${DISPLAY} mb-3 text-[30px] font-semibold tracking-tight`}>{paso.titulo}</h3>
              <p className="max-w-[270px] text-base leading-6 text-[#70574a]">{paso.descripcion}</p>
              {indice < 3 && <ArrowRight size={18} aria-hidden="true" className="absolute right-5 top-[140px] hidden text-[#976b50] md:block" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}


export function SobreMi() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="titulo-sobre-mi"
      className="relative grid scroll-mt-16 overflow-hidden bg-[radial-gradient(ellipse_at_95%_50%,#432432,#20131b_65%)] text-[#f0e4d2] md:grid-cols-[44%_56%]"
    >
      <div className="relative h-[440px] overflow-hidden md:min-h-[670px] md:h-auto">
        <img
          src={`${fotos}retrato-guia.webp`}
          alt="Retrato conceptual de la lectora de tarot"
          loading="lazy"
          decoding="async"
          width="850"
          height="909"
          data-parallax
          className="h-full w-full object-cover object-[center_40%] brightness-[.8] saturate-[.78] md:h-[112%] md:object-[center_36%]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#20131b] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#20131b]/80"
          aria-hidden="true"
        />

        <span className="absolute bottom-8 left-7 border-b border-[#e8c79e]/60 pb-2 text-[11px] tracking-[0.22em] text-[#f2ddc4]">
          ELENA ARANDA · PERSONAJE FICTICIO
        </span>
      </div>

      <div
        data-revelar
        className="relative z-10 self-center px-5 pb-20 pt-8 md:max-w-[750px] md:px-[11%] md:py-24"
      >
        <Kicker>DETRÁS DE LAS CARTAS</Kicker>

        <h2
          id="titulo-sobre-mi"
          className={`${TITULO} max-w-[650px]`}
        >
          Soy Elena, <em className="font-normal">y creo que las respuestas comienzan dentro de ti.</em>
        </h2>

        <div className="mt-10 border-l border-[#cfa273]/55 pl-6">
          <p className="mb-4 text-[14px] leading-[1.95] text-[#d3bfc2]">
            Desde siempre me han fascinado los misterios de la vida,
            las coincidencias que parecen tener un significado y
            aquellas preguntas que guardamos en silencio. Mi encuentro
            con el tarot nació de esa curiosidad y se convirtió en
            una manera especial de comprender las emociones, los
            cambios y los caminos que elegimos.
          </p>

          <p className="mb-4 text-[14px] leading-[1.95] text-[#d3bfc2]">
            Para mí, cada carta es una puerta hacia una conversación
            más profunda. No creo en destinos inamovibles, sino en
            la posibilidad de descubrir nuevas perspectivas y
            reconocer aquello que nuestra intuición intenta decirnos.
          </p>

          <p className="mb-5 text-[14px] leading-[1.95] text-[#d3bfc2]">
            En Casa Astral he imaginado un refugio donde puedas
            expresarte sin juicios, detener el tiempo por un instante
            y reconectar contigo. Mi propósito no es decirte qué
            camino tomar, sino acompañarte mientras descubres
            cuál tiene sentido para ti.
          </p>
        </div>

        <EnlaceFlecha href="#espacio">
          Descubre el espacio
        </EnlaceFlecha>
      </div>

      <span
        className="pointer-events-none absolute -bottom-20 right-[5%] hidden font-serif text-[370px] leading-none text-[#d8aa74]/[.065] lg:block"
        aria-hidden="true"
      >
        ☽
      </span>
    </section>
  );
}


export function Espacio() {
  return (
    <section id="espacio" aria-labelledby="titulo-espacio" className="scroll-mt-16 bg-[#f0e4d4] py-20 text-[#342323] md:py-28">
      <div className={`${CONTENEDOR} grid grid-cols-2 items-stretch gap-3 lg:grid-cols-[29%_42%_29%] lg:gap-4`}>
        <div className="col-span-2 self-center pb-7 lg:col-span-1 lg:pr-10" data-revelar>
          <Kicker oscuro>UN RINCÓN PARA TI</Kicker>
          <h2 id="titulo-espacio" className={`${DISPLAY} text-[clamp(3.25rem,5vw,6.4rem)] text-base leading-[.92] tracking-[-.035em]`}>La magia de <em className="font-normal">estar presente.</em></h2>
          <p className="my-6 text-[15px] leading-7 text-[#5c493f]">Texturas, luz tenue y pequeños rituales para tener una experiencia que invita a bajar el ritmo.</p>
        </div>
        <figure className="group relative m-0 min-h-[290px] overflow-hidden bg-[#2a181e] sm:min-h-[350px] lg:min-h-[510px]" data-revelar>
          <img src={`${fotos}altar-velas.webp`} alt="Composición editorial de velas y una esfera de cristal en un altar" width="435" height="261" loading="lazy" decoding="async" data-imagen className="absolute inset-0 h-full w-full object-cover saturate-[.75] transition-transform duration-700 group-hover:scale-[1.06]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          <figcaption className="absolute bottom-5 left-4 z-10 text-[11px] tracking-[0.18em] text-[#fff1d7]">EL AMBIENTE</figcaption>
        </figure>
        <div className="grid grid-rows-2 gap-3 lg:gap-4">
          <figure className="group relative m-0 min-h-[140px] overflow-hidden bg-[#2a181e] sm:min-h-[170px]" data-revelar>
            <img src={`${fotos}ritual-cartas.webp`} alt="Cartas ilustradas de tarot sobre una mesa con velas y cristales" width="535" height="154" loading="lazy" decoding="async" data-imagen className="absolute inset-0 h-full w-full object-cover saturate-[.75] transition-transform duration-700 group-hover:scale-[1.06]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" /><figcaption className="absolute bottom-4 left-3 z-10 text-[11px] tracking-wider text-[#fff1d7]">LOS SÍMBOLOS</figcaption>
          </figure>
          <figure className="group relative m-0 min-h-[140px] overflow-hidden bg-[#2a181e] sm:min-h-[170px]" data-revelar>
            <img src={`${fotos}mazo-tarot.webp`} alt="Detalle de una carta de tarot junto a una llama" width="313" height="242" loading="lazy" decoding="async" data-imagen className="absolute inset-0 h-full w-full object-cover saturate-[.75] transition-transform duration-700 group-hover:scale-[1.06]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" /><figcaption className="absolute bottom-4 left-3 z-10 text-[11px] tracking-wider text-[#fff1d7]">LOS DETALLES</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function PreguntasFrecuentes() {
  return (
    <section id="preguntas" aria-labelledby="titulo-preguntas" className="scroll-mt-16 bg-[radial-gradient(ellipse_at_5%_90%,#412531,transparent_45%)] bg-[#1a1119] py-20 text-[#f0e4d2] md:py-28">
      <div className={`${CONTENEDOR} grid gap-9 lg:grid-cols-[38%_62%] lg:gap-12`}>
        <div data-revelar><Kicker>ANTES DE TU ENCUENTRO</Kicker><h2 id="titulo-preguntas" className={`${TITULO} max-w-[450px]`}>Preguntas que <em className="font-normal">merecen respuestas.</em></h2>
          <div className="mt-10 hidden pl-10 opacity-40 lg:block" aria-hidden="true"><img src={`${fotos}luna-ritual.webp`} width="253" height="174" loading="lazy" alt="" className="h-[185px] w-[245px] rounded-t-full border border-[#cba470]/50 object-cover" /></div>
        </div>
        <div data-revelar className="lg:pr-12">
          {preguntas.map((elemento, indice) => (
            <details key={elemento.pregunta} open={indice === 0} className="group border-b border-[#dbb18a]/30 first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg leading-6 text-[#f1dfd0] [&::-webkit-details-marker]:hidden">
                <span>{elemento.pregunta}</span><ChevronDown size={20} aria-hidden="true" className="shrink-0 text-[#d5ab72] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="max-w-[550px] pb-6 pr-2 text-base leading-7 text-[#c3aaac]">{elemento.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Ubicacion() {
  const googleMaps = negocio.mapsUrl;
  const mapaEmbed = negocio.mapsEmbedUrl;

  return (
    <section id="ubicacion" aria-labelledby="titulo-ubicacion" className="scroll-mt-16 bg-[#eaddc9] py-20 text-[#342323] md:py-28">
      <div className={`${CONTENEDOR} grid items-center gap-10 lg:grid-cols-[46%_minmax(0,54%)] lg:gap-12`}>
        <div data-revelar className="lg:pr-8">
          <Kicker oscuro>NOS ENCONTRAMOS EN</Kicker>
          <h2 id="titulo-ubicacion" className={`${TITULO} max-w-[580px]`}>Córdoba, <em className="font-normal">Veracruz.</em></h2>
          <p className="my-7 max-w-[470px] text-[16px] leading-7 text-[#695448]">Visítanos y descubre un espacio pensado para la tranquilidad, la conexión y la introspección.</p>
          <div className="mb-6 grid gap-5">
            <div className="grid grid-cols-[30px_1fr] items-start gap-2 text-base text-[#674e43]"><MapPin size={21} className="text-[#895c4b]" /><span><strong className="mb-1 block text-[14px] tracking-[0.13em] text-[#48312d]">DIRECCIÓN</strong>{negocio.direccion || 'Dirección por confirmar'}</span></div>
            <div className="grid grid-cols-[30px_1fr] items-start gap-2 text-base text-[#674e43]"><Compass size={21} className="text-[#895c4b]" /><span><strong className="mb-1 block text-[14px] tracking-[0.13em] text-[#48312d]">REFERENCIAS</strong>{negocio.referencia || 'Referencias por confirmar'}</span></div>
            <div className="grid grid-cols-[30px_1fr] items-start gap-2 text-base text-[#674e43]"><CalendarDays size={21} className="text-[#895c4b]" /><span><strong className="mb-1 block text-[14px] tracking-[0.13em] text-[#48312d]">HORARIOS</strong>{negocio.horarios || 'Horarios por confirmar'}</span></div>
          </div>
          {googleMaps && <a href={googleMaps} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between gap-6 border-b border-[#9b7450] py-3 text-xs font-semibold text-[#64412d] transition-all hover:gap-10">Cómo llegar en Google Maps <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>}
        </div>
        <div data-revelar className="relative h-[320px] w-full min-w-0 overflow-hidden border border-[#62402e]/20 bg-[#d8c8b5] sm:h-[400px] lg:h-[460px]">
          {mapaEmbed ? (
            <iframe src={mapaEmbed} title="Ubicación del negocio en Córdoba, Veracruz" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="block h-full w-full border-0" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center text-[#765548]"><MapPin size={36} /><p className="text-sm">Mapa pendiente de configurar</p></div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Contacto() {
  const numero = (negocio.whatsapp || '').replace(/\D/g, '');
  const whatsappUrl = numero ? `https://wa.me/${numero}` : '#reservar';
  return (
    <section id="contacto" aria-labelledby="titulo-contacto" className="relative scroll-mt-16 overflow-hidden bg-[radial-gradient(ellipse_at_50%_140%,#8b374d,transparent_61%)] bg-[#3a1725] py-24 text-center text-[#f0e4d2] md:py-32">
      <div className="pointer-events-none absolute -inset-x-[15%] -top-1/2 bottom-0 rounded-[50%] border border-[#edc58c]/10" aria-hidden="true" />
      <span className="pointer-events-none absolute -left-5 -top-52 hidden font-serif text-[480px] leading-none text-[#d3ac6f]/[.055] lg:block" aria-hidden="true">☾</span>
      <div className={`${CONTENEDOR} relative z-10`}>
        <div className="mb-7 flex items-center justify-center gap-3 text-[11px] tracking-[0.2em] text-[#d5ab72]"><Moon size={27} strokeWidth={1.1} /><span>LO QUE BUSCAS PUEDE COMENZAR CON UNA CONVERSACIÓN</span></div>
        <h2 id="titulo-contacto" data-revelar className={`${DISPLAY} mx-auto mb-7 max-w-[950px] text-[clamp(4rem,8vw,8.5rem)] font-medium leading-[.86] tracking-[-.05em]`}>Hay encuentros que <em className="font-normal text-[#efc695]">iluminan el camino.</em></h2>
        <p data-revelar className="mx-auto max-w-[550px] text-[13px] leading-7 text-[#e3c7c8]">Regálate un momento para mirar hacia dentro. Tu próxima lectura comienza aquí.</p>
        <div data-revelar className="mx-auto mt-9 flex max-w-[700px] flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <a href="#reservar" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#e1bc87] px-6 py-3 text-[16px] font-bold text-[#2a161c] transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5dcb6]">
            <CalendarDays size={19} />Solicitar una cita <ArrowUpRight size={19} />
          </a>
          <a href={whatsappUrl} target={numero ? '_blank' : undefined} rel={numero ? 'noopener noreferrer' : undefined} className="group inline-flex min-h-12 items-center justify-center gap-3 border border-[#d5ab72]/60 rounded-full px-5 py-3 text-[12px] font-semibold text-[#f0dcbe] transition-colors duration-300 hover:bg-[#e7c18d] hover:text-[#221318] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ab72]"><MessageCircle size={19} />{numero ? 'Escríbenos por WhatsApp' : 'Solicita información'}</a>
        </div>
        {negocio.instagram && <a className="mt-8 inline-flex items-center gap-2 text-xs text-[#e9c5ab] hover:text-[#f5dcb6]" href={negocio.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} /> Síguenos en Instagram <ArrowUpRight size={14} /></a>}
      </div>
    </section >
  );
}
