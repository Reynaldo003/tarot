// Todos los datos que todavía no nos proporciona el negocio quedan vacíos.
// No uses teléfonos, direcciones, precios o credenciales inventados en producción.
export const negocio = {
  nombre: "Casa Astral", // Nombre provisional del mockup
  marca: "TAROT · CÓRDOBA",
  ciudad: "Córdoba, Veracruz",
  whatsapp: "522711872907",
  instagram: "https://www.instagram.com/manolo_covarrubias/",

  mapsUrl: "https://maps.app.goo.gl/1e4MA6ZsVcQYHSEk9",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60394.105470992894!2d-96.98402350317697!3d18.903418076102568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c4e513ca965a5f%3A0x23259181de6cf8dc!2sVolkswagen%20C%C3%B3rdoba%20R%26R!5e0!3m2!1ses!2smx!4v1795475680924!5m2!1ses!2smx",
  direccion: "Av. 11, Col. Centro, Córdoba, Ver.",
  referencia: "Volkswagen Córdoba R&R",
  horarios: "Atención con cita previa · horarios por confirmar",
  correo: "",
};

export const servicios = [
  {
    id: "general",
    titulo: "Lectura general",
    etiqueta: "Perspectiva",
    descripcion:
      "Una mirada amplia a tu momento presente y a las preguntas que hoy te acompañan.",
    detalle:
      "Para cuando necesitas ordenar ideas, reconocer posibilidades y explorar nuevos enfoques.",
    icono: "sol",
  },
  {
    id: "amor",
    titulo: "Amor y relaciones",
    etiqueta: "Vínculos",
    descripcion:
      "Un espacio para reflexionar sobre tus relaciones y lo que deseas construir.",
    detalle:
      "Explora dinámicas afectivas, límites y oportunidades de crecimiento personal.",
    icono: "corazon",
  },
  {
    id: "trabajo",
    titulo: "Camino profesional",
    etiqueta: "Decisiones",
    descripcion:
      "Explora tus inquietudes sobre trabajo, proyectos y cambios de rumbo.",
    detalle:
      "Una conversación para mirar opciones y enfocar las decisiones que dependen de ti.",
    icono: "estrella",
  },
  {
    id: "energia",
    titulo: "Ritual e intención",
    etiqueta: "Bienestar",
    descripcion:
      "Una experiencia simbólica para hacer una pausa y reconectar con tus intenciones.",
    detalle:
      "Actividad de carácter espiritual, sin promesas médicas o terapéuticas.",
    icono: "luna",
  },
  {
    id: "presencial",
    titulo: "Sesión presencial",
    etiqueta: "Córdoba, Ver.",
    descripcion:
      "Comparte tu lectura en un ambiente tranquilo, preparado para escucharte.",
    detalle:
      "La dirección exacta se comparte una vez que el negocio confirme la cita.",
    icono: "manos",
  },
  {
    id: "online",
    titulo: "Sesión en línea",
    etiqueta: "Desde donde estés",
    descripcion:
      "Recibe tu lectura a distancia mediante la plataforma que se acuerde contigo.",
    detalle:
      "Modalidad y horario sujetos a disponibilidad y confirmación del negocio.",
    icono: "luna",
  },
];

export const preguntas = [
  {
    pregunta: "¿Cuánto dura una lectura?",
    respuesta:
      "La duración depende del tipo de lectura. El tiempo exacto se confirmará al solicitar tu cita.",
  },
  {
    pregunta: "¿Puedo agendar una sesión presencial o en línea?",
    respuesta:
      "Puedes indicar la modalidad que prefieres al enviar tu solicitud. El negocio confirmará qué opciones están disponibles.",
  },
  {
    pregunta: "¿Tengo que preparar algo antes de mi lectura?",
    respuesta:
      "Puedes llegar con una pregunta específica o simplemente con disposición para conversar. No es necesario tener experiencia previa.",
  },
  {
    pregunta: "¿El tarot predice con certeza el futuro?",
    respuesta:
      "En Casa Astral presentamos el tarot como una práctica simbólica de reflexión e introspección, no como una garantía de resultados futuros.",
  },
];
