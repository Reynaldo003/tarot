import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function reducirMovimiento() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Una sola función para animar TODOS los enlaces internos y los CTA.

export function desplazarA(destino, actualizarUrl = true) {
  const elemento = document.querySelector(destino);

  if (!elemento) return;

  const altoMenu = window.innerWidth < 1024 ? 75 : 91;

  const posicion = Math.max(
    0,
    window.scrollY + elemento.getBoundingClientRect().top - altoMenu - 14,
  );

  const distancia = Math.abs(posicion - window.scrollY);

  // Duración mínima: 3 segundos.
  // Duración máxima: 6 segundos.
  const duracion = Math.min(6, Math.max(3, distancia / 45));

  // Detener desplazamientos anteriores.
  gsap.killTweensOf(window, "scrollTo");

  if (reducirMovimiento()) {
    window.scrollTo({
      top: posicion,
      behavior: "instant",
    });
  } else {
    gsap.to(window, {
      duration: duracion,
      ease: "sine.inOut",
      scrollTo: {
        y: posicion,
        autoKill: true,
      },
      overwrite: "auto",
    });
  }

  if (actualizarUrl && window.location.hash !== destino) {
    window.history.pushState(null, "", destino);
  }
}

export function useAnimaciones(referencia) {
  useGSAP(
    () => {
      const raiz = referencia.current;
      const medios = gsap.matchMedia();

      // Delegación de eventos: también funciona con los enlaces del menú móvil y el footer.
      function navegar(evento) {
        if (
          evento.defaultPrevented ||
          evento.button !== 0 ||
          evento.metaKey ||
          evento.ctrlKey ||
          evento.shiftKey ||
          evento.altKey
        )
          return;
        const enlace = evento.target.closest('a[href^="#"]');
        if (!enlace || !raiz.contains(enlace)) return;
        const destino = enlace.getAttribute("href");
        if (!destino || destino === "#" || !document.querySelector(destino))
          return;
        evento.preventDefault();
        // El siguiente frame permite cerrar el menú móvil antes de empezar el scroll.
        requestAnimationFrame(() => desplazarA(destino));
      }
      raiz.addEventListener("click", navegar);

      medios.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-entrada]", {
          y: 42,
          autoAlpha: 0,
          duration: 1.05,
          stagger: 0.13,
          ease: "power3.out",
          delay: 0.12,
          clearProps: "transform,opacity,visibility",
        });

        gsap.utils.toArray("[data-revelar]").forEach((elemento) => {
          gsap.from(elemento, {
            y: 45,
            autoAlpha: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: elemento, start: "top 90%", once: true },
            clearProps: "transform,opacity,visibility",
          });
        });

        gsap.utils.toArray("[data-imagen]").forEach((elemento) => {
          gsap.from(elemento, {
            scale: 1.09,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: { trigger: elemento, start: "top 90%", once: true },
            clearProps: "transform",
          });
        });
      });

      medios.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray("[data-parallax]").forEach((imagen) => {
            gsap.fromTo(
              imagen,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: imagen.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              },
            );
          });
        },
      );

      const progreso = raiz.querySelector("[data-progreso-scroll]");
      if (progreso) {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (instancia) =>
            gsap.set(progreso, { scaleX: instancia.progress }),
        });
      }

      // Refrescar las posiciones de ScrollTrigger cuando terminan de cargar las imágenes.
      const actualizar = () => ScrollTrigger.refresh();
      window.addEventListener("load", actualizar, { once: true });
      document.fonts?.ready.then(actualizar);

      return () => {
        raiz.removeEventListener("click", navegar);
        window.removeEventListener("load", actualizar);
        medios.revert();
      };
    },
    { scope: referencia },
  );
}
