import { useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Compass,
  Heart, Instagram, MapPin, MessageCircle, Moon, Sparkles, Star, Sun, Video,
} from 'lucide-react';
import { negocio, preguntas, servicios } from '../config/negocio';
import { EncabezadoSeccion, EnlaceFlecha, FasesLunares, SolAstral } from './Compartidos';
import { Reserva } from './Reserva';

const fotos = '/images/';

function IconoServicio({ icono, size = 25 }) {
  if (icono === 'corazon') return <Heart size={size} strokeWidth={1.2} />;
  if (icono === 'estrella') return <Star size={size} strokeWidth={1.2} />;
  if (icono === 'luna') return <Moon size={size} strokeWidth={1.2} />;
  if (icono === 'manos') return <Sparkles size={size} strokeWidth={1.2} />;
  return <Sun size={size} strokeWidth={1.2} />;
}

export function Hero({ servicioSeleccionado }) {
  return (
    <section id="inicio" className="hero seccion-oscura" aria-labelledby="titulo-hero">
      <div className="hero-fotografia" aria-hidden="true">
        <img src={`${fotos}hero-tarot.webp`} alt="" width="1672" height="941" fetchPriority="high" />
      </div>
      <div className="hero-textura" aria-hidden="true" />
      <div className="hero-halo" aria-hidden="true" />
      <span className="hero-vertical" aria-hidden="true">EL ARTE DE MIRAR HACIA DENTRO — EST. EN EL PRESENTE</span>

      <div className="contenedor hero-contenido">
        <div className="hero-titulares">
          <div className="hero-subtitulo" data-hero-entrada><span className="punto-dorado" />LECTURAS DE TAROT EN CÓRDOBA, VER.</div>
          <h1 id="titulo-hero" data-hero-entrada>
            Escucha<br />
            <em>lo que tu</em><br />
            intuición<br />
            <span>susurra.</span>
          </h1>
          <p data-hero-entrada>Un encuentro contigo, una pregunta a la vez. Lecturas de tarot para explorar tu presente con calma, claridad y sensibilidad.</p>
          <a href="#enfoque" className="hero-descubrir" data-hero-entrada><span>DESCUBRE LA EXPERIENCIA</span><ArrowDown size={15} /></a>
        </div>
        <div className="hero-formulario"><Reserva servicioSeleccionado={servicioSeleccionado} /></div>
      </div>
    </section>
  );
}

export function Enfoque() {
  return (
    <section id="enfoque" className="seccion-enfoque seccion-papel" aria-labelledby="titulo-enfoque">
      <div className="contenedor enfoque-cuadricula">
        <div className="enfoque-imagen" data-revelar>
          <img src={`${fotos}altar-velas.webp`} width="435" height="261" loading="lazy" decoding="async" alt="Altar conceptual con velas encendidas, esfera de cristal y cartas de tarot" />
          <span className="marco-circular" aria-hidden="true" />
          <small>EL RITUAL DE DETENERSE</small>
        </div>
        <div className="enfoque-contenido">
          <div className="kicker kicker-oscuro" data-revelar><span /> NUESTRO ENFOQUE</div>
          <h2 id="titulo-enfoque" className="titulo-grande" data-revelar>Más que una lectura, <em>un espacio para escucharte.</em></h2>
          <div className="enfoque-cuerpo" data-revelar>
            <span className="enfoque-estrella" aria-hidden="true">✳</span>
            <div>
              <p>A veces, lo que necesitamos no es una respuesta inmediata. Es una nueva manera de mirar lo que estamos viviendo.</p>
              <p>En Casa Astral, el tarot se presenta como una experiencia simbólica de introspección, conversación y conexión con tu propia intuición.</p>
              <EnlaceFlecha href="#proceso" claro>Conoce la experiencia</EnlaceFlecha>
            </div>
          </div>
        </div>
        <div className="enfoque-sol" aria-hidden="true"><SolAstral /></div>
      </div>
    </section>
  );
}

export function Servicios({ onElegirServicio }) {
  const [activo, setActivo] = useState(servicios[0].id);
  const seleccionado = servicios.find((servicio) => servicio.id === activo) || servicios[0];

  return (
    <section id="lecturas" className="seccion-servicios seccion-oscura" aria-labelledby="titulo-lecturas">
      <div className="contenedor">
        <div className="servicios-cabecera">
          <div data-revelar>
            <div className="kicker"><span /> CADA PREGUNTA ABRE UN CAMINO</div>
            <h2 id="titulo-lecturas" className="titulo-seccion">Una lectura para <em>cada momento.</em></h2>
          </div>
          <p data-revelar>No hay dos historias iguales. Explora las experiencias y elige aquella que resuena contigo.</p>
        </div>
        <div className="servicios-composicion">
          <div className="servicios-lista" aria-label="Tipos de lectura">
            {servicios.map((servicio, indice) => (
              <button type="button" className={`servicio-fila ${activo === servicio.id ? 'servicio-fila-activa' : ''}`} onClick={() => setActivo(servicio.id)} key={servicio.id} aria-pressed={activo === servicio.id}>
                <span className="servicio-numero">0{indice + 1}</span>
                <span className="servicio-nombre">{servicio.titulo}</span>
                <span className="servicio-etiqueta">{servicio.etiqueta}</span>
                <span className="servicio-icono"><IconoServicio icono={servicio.icono} size={19} /></span>
              </button>
            ))}
          </div>
          <aside className="servicio-destacado" aria-live="polite">
            <div className="servicio-destacado-foto">
              <img src={`${fotos}mazo-tarot.webp`} width="313" height="242" loading="lazy" decoding="async" alt="Primer plano de una carta ilustrada de tarot junto a una vela" />
            </div>
            <div className="servicio-destacado-texto">
              <span className="mini-etiqueta">EXPERIENCIA SELECCIONADA</span>
              <div className="servicio-icono-grande"><IconoServicio icono={seleccionado.icono} size={38} /></div>
              <h3>{seleccionado.titulo}</h3>
              <p>{seleccionado.descripcion}</p>
              <p className="servicio-nota">{seleccionado.detalle}</p>
              <button type="button" className="enlace-flecha boton-texto" onClick={() => onElegirServicio(seleccionado.id)}>Solicitar esta lectura <ArrowUpRight size={18} /></button>
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
    <section id="proceso" className="seccion-proceso seccion-papel" aria-labelledby="titulo-proceso">
      <div className="contenedor">
        <div className="proceso-cabecera">
          <EncabezadoSeccion kicker="EL RECORRIDO" claro titulo={<span id="titulo-proceso">Así comienza <em>tu camino.</em></span>} />
          <FasesLunares />
        </div>
        <ol className="proceso-pasos">
          {pasos.map((paso, indice) => (
            <li key={paso.titulo} data-revelar>
              <div className="paso-numero">0{indice + 1}</div>
              <div className="paso-linea" aria-hidden="true" />
              <h3>{paso.titulo}</h3>
              <p>{paso.descripcion}</p>
              {indice < 3 && <ArrowRight className="paso-flecha" size={19} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SobreMi() {
  return (
    <section id="sobre-mi" className="seccion-sobre-mi seccion-oscura" aria-labelledby="titulo-sobre-mi">
      <div className="sobre-mi-imagen">
        <img src={`${fotos}retrato-guia.webp`} alt="Retrato editorial conceptual para ilustrar la presentación de quien ofrece las lecturas; sustituir por fotografía real" loading="lazy" decoding="async" width="850" height="909" data-parallax />
        <span className="foto-etiqueta">FOTOGRAFÍA CONCEPTUAL</span>
      </div>
      <div className="sobre-mi-contenido" data-revelar>
        <div className="kicker"><span /> DETRÁS DE LAS CARTAS</div>
        <h2 id="titulo-sobre-mi" className="titulo-seccion">Una voz que <em>te acompaña.</em></h2>
        <div className="sobre-mi-texto">
          <p>Este espacio estará dedicado a presentar a la persona que realiza las lecturas: su historia, su manera de trabajar y lo que hace especial cada encuentro.</p>
          <p>La confianza comienza al conocernos. Por eso, aquí compartiremos su nombre, fotografía real y una presentación auténtica cuando el negocio proporcione esa información.</p>
          <span className="etiqueta-provisional">BIOGRAFÍA PENDIENTE DE PERSONALIZAR</span>
        </div>
        <EnlaceFlecha href="#espacio">Descubre el espacio</EnlaceFlecha>
      </div>
      <div className="sobre-mi-dibujo" aria-hidden="true">☽</div>
    </section>
  );
}

export function Espacio() {
  return (
    <section id="espacio" className="seccion-espacio seccion-papel" aria-labelledby="titulo-espacio">
      <div className="contenedor espacio-composicion">
        <div className="espacio-encabezado" data-revelar>
          <div className="kicker kicker-oscuro"><span /> UN RINCÓN PARA TI</div>
          <h2 id="titulo-espacio" className="titulo-seccion">La magia de <em>estar presente.</em></h2>
          <p>Texturas, luz tenue y pequeños rituales para imaginar una experiencia que invita a bajar el ritmo.</p>
          <small>Imágenes conceptuales. Fotografías reales del local pendientes.</small>
        </div>
        <figure className="espacio-foto espacio-foto-principal" data-revelar>
          <img src={`${fotos}altar-velas.webp`} alt="Composición editorial de velas y una esfera de cristal en un altar" width="435" height="261" loading="lazy" decoding="async" />
          <figcaption>01 / EL AMBIENTE</figcaption>
        </figure>
        <div className="espacio-columna-fotos">
          <figure className="espacio-foto" data-revelar>
            <img src={`${fotos}ritual-cartas.webp`} alt="Cartas ilustradas de tarot sobre una mesa con velas y cristales" width="535" height="154" loading="lazy" decoding="async" />
            <figcaption>02 / LOS SÍMBOLOS</figcaption>
          </figure>
          <figure className="espacio-foto" data-revelar>
            <img src={`${fotos}mazo-tarot.webp`} alt="Detalle de una carta de tarot junto a una llama" width="313" height="242" loading="lazy" decoding="async" />
            <figcaption>03 / LOS DETALLES</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function PreguntasFrecuentes() {
  return (
    <section id="preguntas" className="seccion-preguntas seccion-oscura" aria-labelledby="titulo-preguntas">
      <div className="contenedor preguntas-cuadricula">
        <div className="preguntas-titulares" data-revelar>
          <div className="kicker"><span /> ANTES DE TU ENCUENTRO</div>
          <h2 id="titulo-preguntas" className="titulo-seccion">Preguntas que <em>merecen respuestas.</em></h2>
          <span className="preguntas-ilustracion" aria-hidden="true"><img src={`${fotos}luna-ritual.webp`} width="253" height="174" loading="lazy" alt="" /></span>
        </div>
        <div className="preguntas-lista" data-revelar>
          {preguntas.map((elemento, indice) => (
            <details key={elemento.pregunta} open={indice === 0}>
              <summary><span>{elemento.pregunta}</span><ChevronDown size={19} aria-hidden="true" /></summary>
              <p>{elemento.respuesta}</p>
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
    <section
      id="ubicacion"
      className="seccion-ubicacion seccion-papel"
      aria-labelledby="titulo-ubicacion"
    >
      <div className="contenedor ubicacion-cuadricula">

        {/* Información del negocio */}
        <div className="ubicacion-textos" data-revelar>
          <div className="kicker kicker-oscuro">
            <span />
            NOS ENCONTRAMOS EN
          </div>

          <h2 id="titulo-ubicacion" className="titulo-seccion">
            Córdoba, <em>Veracruz.</em>
          </h2>

          <p>
            Visítanos y descubre un espacio pensado para
            la tranquilidad, la conexión y la introspección.
          </p>

          <div className="ubicacion-datos">
            <div>
              <MapPin size={21} />
              <span>
                <strong>DIRECCIÓN</strong>
                {negocio.direccion || "Dirección por confirmar"}
              </span>
            </div>

            <div>
              <Compass size={21} />
              <span>
                <strong>REFERENCIAS</strong>
                {negocio.referencia || "Referencias por confirmar"}
              </span>
            </div>

            <div>
              <CalendarDays size={21} />
              <span>
                <strong>HORARIOS</strong>
                {negocio.horarios || "Horarios por confirmar"}
              </span>
            </div>
          </div>

          {googleMaps && (
            <a
              href={googleMaps}
              className="enlace-flecha enlace-flecha-claro"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar en Google Maps
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>

        {/* Google Maps */}
        <div className="mapa-google" data-revelar>
          {mapaEmbed ? (
            <iframe
              src={mapaEmbed}
              title="Ubicación del negocio en Córdoba, Veracruz"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="mapa-sin-configurar">
              <MapPin size={36} />
              <p>Mapa pendiente de configurar</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}



export function Contacto() {
  const numero = negocio.whatsapp.replace(/\D/g, '');
  const whatsappUrl = numero ? `https://wa.me/${numero}` : '#reservar';

  return (
    <section id="contacto" className="seccion-contacto seccion-oscura" aria-labelledby="titulo-contacto">
      <div className="contacto-resplandor" aria-hidden="true" />
      <div className="contenedor contacto-interior">
        <div className="contacto-marca"><Moon size={27} strokeWidth={1.1} /><span>LO QUE BUSCAS PUEDE COMENZAR CON UNA CONVERSACIÓN</span></div>
        <h2 id="titulo-contacto" data-revelar>Hay encuentros que <em>iluminan el camino.</em></h2>
        <p data-revelar>Regálate un momento para mirar hacia dentro. Tu próxima lectura comienza aquí.</p>
        <div className="contacto-botones" data-revelar>
          <a className="boton-primario" href="#reservar"><CalendarDays size={19} /> Solicitar una cita <ArrowUpRight size={19} /></a>
          <a className="boton-secundario" href={whatsappUrl} target={numero ? '_blank' : undefined} rel={numero ? 'noopener noreferrer' : undefined}><MessageCircle size={18} /> {numero ? 'Escríbenos por WhatsApp' : 'Solicita información'}</a>
        </div>
        {negocio.instagram && <a className="contacto-instagram" href={negocio.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} /> Síguenos en Instagram <ArrowUpRight size={14} /></a>}
      </div>
      <span className="contacto-luna" aria-hidden="true">☾</span>
    </section>
  );
}
