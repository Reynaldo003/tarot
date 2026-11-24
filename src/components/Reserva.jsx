import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clipboard, Clock3, LockKeyhole, MessageCircle, Sparkles } from 'lucide-react';
import { negocio, servicios } from '../config/negocio';
import { BOTON_PRIMARIO, DISPLAY } from './Compartidos';

const HORAS_SUGERIDAS = ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00'];
const ZONA_HORARIA = 'America/Mexico_City';
const SEMANA_MAXIMA = 7;
const ESTILO_CAMPO = 'w-full min-w-0 rounded-sm border border-[#cbb89e] bg-[#fffaf0]/60 px-3 py-2.5 text-xs text-[#3a2828] outline-offset-2 placeholder:text-[#8f7b71] focus:border-[#8e503e] focus:outline-[#8e503e]';
const ESTILO_ETIQUETA = 'flex items-center gap-1.5 pt-1 text-[11px] font-bold text-[#5d4338]';

function obtenerAhoraNegocio() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA_HORARIA, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const valores = Object.fromEntries(partes.map(({ type, value }) => [type, value]));
  return { fecha: `${valores.year}-${valores.month}-${valores.day}`, hora: `${valores.hour}:${valores.minute}` };
}

function sumarDias(fecha, cantidad) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return new Date(Date.UTC(anio, mes - 1, dia + cantidad)).toISOString().slice(0, 10);
}

function formatearFecha(fecha, opciones) {
  return new Intl.DateTimeFormat('es-MX', { timeZone: 'UTC', ...opciones }).format(new Date(`${fecha}T12:00:00Z`));
}

function obtenerHorarios(fecha, ahora) {
  if (!fecha || fecha < ahora.fecha || negocio.fechasCerradas?.includes(fecha)) return [];
  const diaSemana = new Date(`${fecha}T12:00:00Z`).getUTCDay();
  const horarios = negocio.horariosPorDia?.[diaSemana] ?? HORAS_SUGERIDAS;
  const bloqueados = negocio.horariosBloqueados?.[fecha] ?? [];
  return horarios.filter((hora) => !bloqueados.includes(hora) && (fecha > ahora.fecha || hora > ahora.hora));
}

function crearMensaje(datos) {
  const fecha = formatearFecha(datos.fecha, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const servicio = servicios.find((elemento) => elemento.id === datos.servicio)?.titulo || 'Lectura de tarot';
  return [
    `Hola, me gustaría solicitar una cita en ${negocio.nombre}.`, '',
    `Nombre: ${datos.nombre.trim()}`,
    `WhatsApp: ${datos.telefono.trim()}`,
    `Lectura: ${servicio}`,
    `Modalidad: ${datos.modalidad}`,
    `Fecha preferida: ${fecha}`,
    `Hora preferida: ${datos.hora} (hora de Córdoba, Veracruz)`,
    datos.mensaje.trim() ? `Comentario: ${datos.mensaje.trim()}` : '', '',
    '¿Me podrían confirmar si ese horario está disponible? Gracias.',
  ].filter(Boolean).join('\n');
}

export function Reserva({ servicioSeleccionado }) {
  const [datos, setDatos] = useState({ nombre: '', telefono: '', servicio: '', modalidad: 'Presencial', fecha: '', hora: '', mensaje: '' });
  const [semana, setSemana] = useState(0);
  const [errorAgenda, setErrorAgenda] = useState('');
  const [mensajePreparado, setMensajePreparado] = useState('');
  const [copiado, setCopiado] = useState(false);
  const ahora = obtenerAhoraNegocio();
  const dias = Array.from({ length: 7 }, (_, indice) => sumarDias(ahora.fecha, semana * 7 + indice));
  const horarios = obtenerHorarios(datos.fecha, ahora);

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
    setSemana((actual) => Math.min(SEMANA_MAXIMA, Math.max(0, actual + direccion)));
    setDatos((actual) => ({ ...actual, fecha: '', hora: '' }));
    setErrorAgenda('');
    setMensajePreparado('');
  }

  function seleccionarDia(fecha) {
    setDatos((actual) => ({ ...actual, fecha, hora: '' }));
    setMensajePreparado('');
    setCopiado(false);
    setErrorAgenda('');
  }

  function seleccionarHora(hora) {
    actualizar('hora', hora);
    setErrorAgenda('');
  }

  function solicitarCita(evento) {
    evento.preventDefault();
    const telefono = datos.telefono.replace(/\D/g, '');
    if (telefono.length !== 10) {
      evento.currentTarget.elements.telefono.setCustomValidity('Escribe un número mexicano de 10 dígitos.');
      evento.currentTarget.reportValidity();
      return;
    }
    if (!datos.fecha || !datos.hora) {
      setErrorAgenda('Selecciona un día y un horario para continuar.');
      return;
    }
    if (!obtenerHorarios(datos.fecha, obtenerAhoraNegocio()).includes(datos.hora)) {
      setErrorAgenda('El horario elegido ya no está disponible para solicitar. Elige otro.');
      actualizar('hora', '');
      return;
    }

    const mensaje = crearMensaje(datos);
    const telefonoNegocio = (negocio.whatsapp || '').replace(/\D/g, '');
    // Dejamos una copia visible como alternativa si el navegador bloquea la pestaña.
    setMensajePreparado(mensaje);
    if (telefonoNegocio) {
      window.open(`https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
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
    <div id="reservar" data-hero-entrada className="relative isolate w-full scroll-mt-28 rounded-[3px] bg-[linear-gradient(148deg,#f6e9d5,#e7d4b9)] px-5 pb-6 pt-8 text-[#2c1a1c] shadow-[0_20px_90px_rgba(0,0,0,0.3)] before:pointer-events-none before:absolute before:inset-2 before:border before:border-[#7a4e33]/25 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-[repeating-linear-gradient(0deg,rgba(102,72,56,0.012)_0,rgba(102,72,56,0.012)_1px,transparent_1px,transparent_4px)] sm:px-7 sm:pb-8">
      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[30px] text-[#d5ab72] drop-shadow-xl" aria-hidden="true">✶</span>
      <div className="mb-5 border-b border-[#54342b]/20 pb-4 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.13em] text-[#8d654b]"><Sparkles size={14} /> TU MOMENTO COMIENZA AQUÍ</span>
        <h2 className={`${DISPLAY} mt-2 text-[clamp(3rem,4vw,4.3rem)] font-medium leading-[0.9] tracking-[-0.045em]`}>Agenda tu <em className="font-normal">lectura</em></h2>
        <p className="mt-3 text-xs leading-relaxed text-[#725b50]">Elige el momento en que prefieres vivir esta experiencia.</p>
      </div>

      <form className="grid gap-2.5" onSubmit={solicitarCita}>
        <label htmlFor="nombre" className={ESTILO_ETIQUETA}>Tu nombre</label>
        <input id="nombre" name="nombre" className={ESTILO_CAMPO} value={datos.nombre} onChange={(e) => actualizar('nombre', e.target.value)} required minLength={2} maxLength={70} autoComplete="name" placeholder="¿Cómo te llamas?" />
        <label htmlFor="telefono" className={ESTILO_ETIQUETA}>WhatsApp de contacto</label>
        <input id="telefono" name="telefono" className={ESTILO_CAMPO} value={datos.telefono} onChange={(e) => { e.target.setCustomValidity(''); actualizar('telefono', e.target.value); }} required inputMode="tel" type="tel" autoComplete="tel-national" placeholder="10 dígitos" />

        <div className="grid grid-cols-2 gap-2.5">
          <div className="grid min-w-0 content-start gap-1.5"><label htmlFor="servicio" className={ESTILO_ETIQUETA}>Tipo de lectura</label>
            <select id="servicio" name="servicio" className={ESTILO_CAMPO} value={datos.servicio} onChange={(e) => actualizar('servicio', e.target.value)} required>
              <option value="">Seleccionar</option>
              {servicios.map((servicio) => <option value={servicio.id} key={servicio.id}>{servicio.titulo}</option>)}
            </select>
          </div>
          <div className="grid min-w-0 content-start gap-1.5"><label htmlFor="modalidad" className={ESTILO_ETIQUETA}>Modalidad</label>
            <select id="modalidad" name="modalidad" className={ESTILO_CAMPO} value={datos.modalidad} onChange={(e) => actualizar('modalidad', e.target.value)}>
              <option value="Presencial">Presencial</option><option value="En línea">En línea</option>
            </select>
          </div>
        </div>

        <fieldset className="mt-3 min-w-0 rounded-sm border border-[#b89d81]/60 bg-[#fff8e8]/35 p-3 sm:p-4">
          <legend className="flex items-center gap-2 px-1 text-xs font-bold text-[#5d4338]"><CalendarDays size={15} /> Fecha preferida</legend>
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-medium capitalize text-[#61493f]">{formatearFecha(dias[0], { day: 'numeric', month: 'short' })} — {formatearFecha(dias[6], { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => cambiarSemana(-1)} disabled={semana === 0} aria-label="Semana anterior" className="grid size-8 place-items-center border border-[#b99f84] text-[#694f41] transition-colors hover:bg-[#d9bf9f] disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft size={17} /></button>
              <button type="button" onClick={() => cambiarSemana(1)} disabled={semana === SEMANA_MAXIMA} aria-label="Semana siguiente" className="grid size-8 place-items-center border border-[#b99f84] text-[#694f41] transition-colors hover:bg-[#d9bf9f] disabled:cursor-not-allowed disabled:opacity-35"><ChevronRight size={17} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {dias.map((fecha) => {
              const seleccionable = obtenerHorarios(fecha, ahora).length > 0;
              const seleccionado = datos.fecha === fecha;
              return (
                <button type="button" key={fecha} disabled={!seleccionable} onClick={() => seleccionarDia(fecha)} aria-pressed={seleccionado} aria-label={formatearFecha(fecha, { weekday: 'long', day: 'numeric', month: 'long' })}
                  className={`flex min-w-0 flex-col items-center gap-1 border px-0.5 py-2 transition-[background,color,transform,border-color] duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 ${seleccionado ? 'border-[#6a2633] bg-[#6a2633] text-[#fff2df]' : 'border-[#cbb69b] bg-[#fffaf0]/35 text-[#5a3a34] hover:border-[#8b604c] hover:bg-[#f8ead5]'}`}>
                  <span className="text-[11px] font-medium capitalize">{fecha === ahora.fecha ? 'Hoy' : formatearFecha(fecha, { weekday: 'short' }).replace('.', '')}</span>
                  <strong className="text-lg leading-none">{Number(fecha.slice(-2))}</strong>
                  <span className={`size-1 rounded-full ${seleccionado ? 'bg-[#f1d09f]' : 'bg-[#a98260]'}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-2 min-w-0 rounded-sm border border-[#b89d81]/60 bg-[#fff8e8]/35 p-3 sm:p-4">
          <legend className="flex items-center gap-2 px-1 text-xs font-bold text-[#5d4338]"><Clock3 size={15} /> Horario preferido <span className="font-normal">(Córdoba, Ver.)</span></legend>
          {datos.fecha ? (
            <>
              <p className="mb-3 text-[11px] capitalize text-[#725b50]">{formatearFecha(datos.fecha, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {horarios.map((hora) => <button type="button" key={hora} aria-pressed={datos.hora === hora} onClick={() => seleccionarHora(hora)} className={`min-h-10 border px-1 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 ${datos.hora === hora ? 'border-[#6a2633] bg-[#6a2633] text-white' : 'border-[#c6aa8e] bg-[#fffaf0]/50 text-[#684a3c] hover:border-[#7b4b3d] hover:bg-[#f4e2c9]'}`}>{hora}</button>)}
              </div>
              {horarios.length === 0 && <p className="text-xs text-[#76584b]">Ya no quedan horarios para solicitar este día. Elige otro.</p>}
            </>
          ) : <p className="text-xs leading-5 text-[#725b50]">Selecciona primero un día para ver sus horarios.</p>}
          {errorAgenda && <p className="mt-2 text-xs font-semibold text-[#9f3036]" role="alert">{errorAgenda}</p>}
        </fieldset>

        {datos.fecha && datos.hora && <p className="mt-1 flex items-center gap-2 border-l-2 border-[#6a2633] bg-[#f5e4cd] px-3 py-2 text-xs font-semibold text-[#623f39]" role="status"><Check size={16} />Solicitar: {formatearFecha(datos.fecha, { day: 'numeric', month: 'long' })} · {datos.hora} h</p>}
        <label htmlFor="mensaje" className={ESTILO_ETIQUETA}>¿Algo que quisieras compartir? <span className="font-normal text-[#8c776a]">(opcional)</span></label>
        <textarea id="mensaje" name="mensaje" className={`${ESTILO_CAMPO} min-h-14 resize-y`} rows={2} maxLength={400} value={datos.mensaje} onChange={(e) => actualizar('mensaje', e.target.value)} placeholder="Escribe aquí..." />
        <button className={`${BOTON_PRIMARIO} mt-3 w-full justify-between`} type="submit"><span>{negocio.whatsapp ? 'Solicitar por WhatsApp' : 'Preparar mi solicitud'}</span>{negocio.whatsapp ? <MessageCircle size={19} /> : <ArrowUpRight size={19} />}</button>
      </form>
    </div>
  );
}
