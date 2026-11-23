import { useEffect, useState } from 'react';
import {
  ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight,
  Clipboard, Clock3, LockKeyhole, MessageCircle, Sparkles,
} from 'lucide-react';
import { negocio, servicios } from '../config/negocio';

// Opciones provisionales. No representan citas confirmadas en una agenda real.
const HORAS_SUGERIDAS = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00'];
const ZONA_HORARIA = 'America/Mexico_City';
const ULTIMA_SEMANA = 7;

function obtenerAhoraNegocio() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA_HORARIA, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const valores = Object.fromEntries(partes.map(({ type, value }) => [type, value]));

  return {
    fecha: `${valores.year}-${valores.month}-${valores.day}`,
    hora: `${valores.hour}:${valores.minute}`,
  };
}

function sumarDias(fecha, cantidad) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const resultado = new Date(Date.UTC(anio, mes - 1, dia + cantidad));
  return resultado.toISOString().slice(0, 10);
}

function formatearFecha(fecha, opciones) {
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'UTC', ...opciones,
  }).format(new Date(`${fecha}T12:00:00Z`));
}

function obtenerHorarios(fecha, ahora) {
  if (!fecha || fecha < ahora.fecha) return [];
  if (negocio.fechasCerradas?.includes(fecha)) return [];

  const diaSemana = new Date(`${fecha}T12:00:00Z`).getUTCDay();
  const horarios = negocio.horariosPorDia?.[diaSemana] ?? HORAS_SUGERIDAS;
  const bloqueados = negocio.horariosBloqueados?.[fecha] ?? [];

  return horarios.filter((hora) => (
    !bloqueados.includes(hora) &&
    (fecha > ahora.fecha || hora > ahora.hora)
  ));
}

function crearMensaje(datos) {
  const fecha = formatearFecha(datos.fecha, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const servicio = servicios.find((elemento) => elemento.id === datos.servicio)?.titulo || 'Lectura de tarot';

  return [
    `Hola, me gustaría solicitar una cita en ${negocio.nombre}.`,
    '',
    `Nombre: ${datos.nombre.trim()}`,
    `WhatsApp: ${datos.telefono.trim()}`,
    `Lectura: ${servicio}`,
    `Modalidad: ${datos.modalidad}`,
    `Fecha preferida: ${fecha}`,
    `Hora preferida: ${datos.hora} (hora de Córdoba, Veracruz)`,
    datos.mensaje.trim() ? `Comentario: ${datos.mensaje.trim()}` : '',
    '',
    '¿Me podrían confirmar si ese horario está disponible? Gracias.',
  ].filter(Boolean).join('\n');
}

export function Reserva({ servicioSeleccionado }) {
  const [datos, setDatos] = useState({
    nombre: '', telefono: '', servicio: '', modalidad: 'Presencial',
    fecha: '', hora: '', mensaje: '',
  });
  const [semana, setSemana] = useState(0);
  const [errorAgenda, setErrorAgenda] = useState('');
  const [mensajePreparado, setMensajePreparado] = useState('');
  const [copiado, setCopiado] = useState(false);

  // Usamos la zona horaria del establecimiento, no la del dispositivo del cliente.
  const ahora = obtenerAhoraNegocio();
  const diasVisibles = Array.from({ length: 7 }, (_, indice) => (
    sumarDias(ahora.fecha, semana * 7 + indice)
  ));
  const horariosSeleccionados = obtenerHorarios(datos.fecha, ahora);

  useEffect(() => {
    if (servicioSeleccionado) {
      setDatos((actual) => ({ ...actual, servicio: servicioSeleccionado }));
      setMensajePreparado('');
    }
  }, [servicioSeleccionado]);

  function actualizar(campo, valor) {
    setDatos((actual) => ({ ...actual, [campo]: valor }));
    setMensajePreparado('');
    setCopiado(false);
  }

  function cambiarSemana(direccion) {
    setSemana((actual) => Math.max(0, Math.min(ULTIMA_SEMANA, actual + direccion)));
    setDatos((actual) => ({ ...actual, fecha: '', hora: '' }));
    setErrorAgenda('');
    setMensajePreparado('');
    setCopiado(false);
  }

  function seleccionarDia(fecha) {
    setDatos((actual) => ({ ...actual, fecha, hora: '' }));
    setErrorAgenda('');
    setMensajePreparado('');
    setCopiado(false);
  }

  function seleccionarHora(hora) {
    actualizar('hora', hora);
    setErrorAgenda('');
  }

  function solicitarCita(evento) {
    evento.preventDefault();
    const telefono = datos.telefono.replace(/\D/g, '');
    const ahoraActual = obtenerAhoraNegocio();

    if (telefono.length !== 10) {
      evento.currentTarget.elements.telefono.setCustomValidity('Escribe un número mexicano de 10 dígitos.');
      evento.currentTarget.reportValidity();
      return;
    }

    if (!datos.fecha || !datos.hora) {
      setErrorAgenda('Selecciona un día y un horario para continuar.');
      return;
    }

    if (!obtenerHorarios(datos.fecha, ahoraActual).includes(datos.hora)) {
      setErrorAgenda('El horario elegido ya no está disponible para solicitar. Selecciona otro.');
      actualizar('hora', '');
      return;
    }

    const mensaje = crearMensaje(datos);
    const telefonoNegocio = (negocio.whatsapp || '').replace(/\D/g, '');

    if (telefonoNegocio) {
      window.open(
        `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`,
        '_blank',
        'noopener,noreferrer',
      );
    } else {
      setMensajePreparado(mensaje);
    }
  }

  async function copiarSolicitud() {
    try {
      await navigator.clipboard.writeText(mensajePreparado);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div id="reservar" className="tarjeta-reserva" data-hero-entrada>
      <div className="reserva-adorno" aria-hidden="true">✶</div>
      <div className="reserva-encabezado">
        <span className="mini-etiqueta"><Sparkles size={13} /> TU MOMENTO COMIENZA AQUÍ</span>
        <h2>Agenda tu <em>lectura</em></h2>
        <p>Elige el momento en que prefieres vivir esta experiencia.</p>
      </div>

      <form className="formulario-reserva" onSubmit={solicitarCita}>
        <label htmlFor="nombre">Tu nombre</label>
        <input id="nombre" name="nombre" value={datos.nombre} onChange={(e) => actualizar('nombre', e.target.value)} required minLength={2} maxLength={70} autoComplete="name" placeholder="¿Cómo te llamas?" />

        <label htmlFor="telefono">WhatsApp de contacto</label>
        <input id="telefono" name="telefono" value={datos.telefono} onChange={(e) => {
          e.target.setCustomValidity('');
          actualizar('telefono', e.target.value);
        }} required inputMode="tel" type="tel" autoComplete="tel-national" placeholder="10 dígitos" />

        <div className="formulario-dos-columnas">
          <div>
            <label htmlFor="servicio">Tipo de lectura</label>
            <select id="servicio" name="servicio" value={datos.servicio} onChange={(e) => actualizar('servicio', e.target.value)} required>
              <option value="">Seleccionar</option>
              {servicios.map((servicio) => <option value={servicio.id} key={servicio.id}>{servicio.titulo}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="modalidad">Modalidad</label>
            <select id="modalidad" name="modalidad" value={datos.modalidad} onChange={(e) => actualizar('modalidad', e.target.value)}>
              <option value="Presencial">Presencial</option>
              <option value="En línea">En línea</option>
            </select>
          </div>
        </div>

        <fieldset className="agenda-fechas">
          <legend className="agenda-titulo"><CalendarDays size={14} /> Fecha preferida</legend>
          <div className="agenda-barra">
            <span className="agenda-rango">
              {formatearFecha(diasVisibles[0], { day: 'numeric', month: 'short' })}
              {' — '}
              {formatearFecha(diasVisibles[6], { day: 'numeric', month: 'short' })}
            </span>
            <div className="agenda-navegacion">
              <button type="button" onClick={() => cambiarSemana(-1)} disabled={semana === 0} aria-label="Semana anterior"><ChevronLeft size={18} /></button>
              <button type="button" onClick={() => cambiarSemana(1)} disabled={semana === ULTIMA_SEMANA} aria-label="Semana siguiente"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="agenda-dias">
            {diasVisibles.map((fecha) => {
              const seleccionable = obtenerHorarios(fecha, ahora).length > 0;
              const seleccionado = datos.fecha === fecha;
              return (
                <button
                  type="button"
                  key={fecha}
                  className={`agenda-dia ${seleccionado ? 'agenda-dia-seleccionado' : ''}`}
                  onClick={() => seleccionarDia(fecha)}
                  disabled={!seleccionable}
                  aria-pressed={seleccionado}
                  aria-label={formatearFecha(fecha, { weekday: 'long', day: 'numeric', month: 'long' })}
                >
                  <span>{fecha === ahora.fecha ? 'Hoy' : formatearFecha(fecha, { weekday: 'short' }).replace('.', '')}</span>
                  <strong>{Number(fecha.slice(-2))}</strong>
                  <small>{seleccionable ? '●' : '–'}</small>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="agenda-horas">
          <legend className="agenda-titulo"><Clock3 size={14} /> Horario preferido <span>(Córdoba, Ver.)</span></legend>
          {datos.fecha ? (
            <>
              <p className="agenda-ayuda">
                {formatearFecha(datos.fecha, { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              <div className="agenda-horarios">
                {horariosSeleccionados.map((hora) => (
                  <button
                    type="button"
                    key={hora}
                    className={`agenda-hora ${datos.hora === hora ? 'agenda-hora-seleccionada' : ''}`}
                    onClick={() => seleccionarHora(hora)}
                    aria-pressed={datos.hora === hora}
                  >
                    {hora}
                  </button>
                ))}
              </div>
              {horariosSeleccionados.length === 0 && <p className="agenda-ayuda">Ya no quedan horarios para solicitar este día. Elige otro.</p>}
            </>
          ) : (
            <p className="agenda-ayuda">Selecciona primero un día para ver sus horarios.</p>
          )}
          <p className="agenda-advertencia">Horarios sugeridos, sujetos a confirmación por WhatsApp.</p>
          {errorAgenda && <p className="agenda-error" role="alert">{errorAgenda}</p>}
        </fieldset>

        {datos.fecha && datos.hora && (
          <p className="agenda-resumen">
            <Check size={15} /> Solicitar: {formatearFecha(datos.fecha, { day: 'numeric', month: 'long' })} · {datos.hora} h
          </p>
        )}

        <label htmlFor="mensaje">¿Algo que quisieras compartir? <span>(opcional)</span></label>
        <textarea id="mensaje" name="mensaje" rows={2} maxLength={400} value={datos.mensaje} onChange={(e) => actualizar('mensaje', e.target.value)} placeholder="Escribe aquí..." />

        <button className="boton-primario boton-formulario" type="submit">
          <span>{negocio.whatsapp ? 'Solicitar por WhatsApp' : 'Preparar mi solicitud'}</span>
          {negocio.whatsapp ? <MessageCircle size={18} /> : <ArrowUpRight size={18} />}
        </button>
        <p className="reserva-aclaracion"><LockKeyhole size={12} /> No es una reserva automática. El negocio confirmará tu cita.</p>
      </form>

      {mensajePreparado && (
        <div className="reserva-resultado" role="status" aria-live="polite">
          <strong>Tu solicitud está lista.</strong>
          <p>Para enviarla directamente al negocio, configura su número de WhatsApp.</p>
          <textarea readOnly rows={7} value={mensajePreparado} aria-label="Mensaje de solicitud preparado" />
          <button type="button" onClick={copiarSolicitud}>
            <Clipboard size={15} />{copiado ? <><Check size={15} /> Copiado</> : 'Copiar solicitud'}
          </button>
        </div>
      )}
    </div>
  );
}
