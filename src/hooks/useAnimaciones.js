import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

// Desplazamiento animado hacia cualquier sección.
export function desplazarA(destino, actualizarUrl = true) {
  const elemento = document.querySelector(destino);

  if (!elemento) return;

  const altoMenu = window.innerWidth < 1024 ? 75 : 91;

  const posicion = Math.max(
    0,
    window.scrollY + elemento.getBoundingClientRect().top - altoMenu - 14,
  );

  // Detener una animación anterior.
  gsap.killTweensOf(window, "scrollTo");

  // Animación forzada, independientemente de las preferencias del sistema.
  gsap.to(window, {
    duration: 2,
    ease: "sine.inOut",
    scrollTo: {
      y: posicion,
      autoKill: false,
    },
    overwrite: true,
  });

  if (actualizarUrl && window.location.hash !== destino) {
    window.history.pushState(null, "", destino);
  }
}

export function useAnimaciones(referencia) {
  useGSAP(
    () => {
      const raiz = referencia.current;
      if (!raiz) return;

      const medios = gsap.matchMedia();

      // Navegación animada entre secciones.
      function navegar(evento) {
        if (
          evento.defaultPrevented ||
          evento.button !== 0 ||
          evento.metaKey ||
          evento.ctrlKey ||
          evento.shiftKey ||
          evento.altKey
        ) {
          return;
        }

        const enlace = evento.target.closest('a[href^="#"]');
        if (!enlace || !raiz.contains(enlace)) return;

        const destino = enlace.getAttribute("href");

        if (!destino || destino === "#" || !document.querySelector(destino)) {
          return;
        }

        evento.preventDefault();
        desplazarA(destino);
      }

      raiz.addEventListener("click", navegar);

      // Fondo del Hero: movimiento continuo y cinematográfico.
      const fondoHero = raiz.querySelector("#inicio img");

      if (fondoHero) {
        gsap.fromTo(
          fondoHero,
          {
            scale: 1.04,
            xPercent: -1.5,
          },
          {
            scale: 1.13,
            xPercent: 1.5,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
        );
      }

      // Entrada inicial de textos y formulario.
      gsap.from(raiz.querySelectorAll("[data-hero-entrada]"), {
        y: 60,
        autoAlpha: 0,
        duration: 1.6,
        stagger: 0.18,
        ease: "power3.out",
        delay: 0.2,
      });

      // Aparición visible de los elementos de las secciones.
      gsap.utils
        .toArray(raiz.querySelectorAll("[data-revelar]"))
        .forEach((elemento) => {
          gsap.from(elemento, {
            y: 90,
            scale: 0.97,
            autoAlpha: 0,
            duration: 1.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elemento,
              start: "top 83%",
              toggleActions: "play none none reverse",
            },
          });
        });

      // Zoom al mostrar fotografías.
      gsap.utils
        .toArray(raiz.querySelectorAll("[data-imagen]"))
        .forEach((imagen) => {
          gsap.from(imagen, {
            scale: 1.15,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imagen,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });

      // Parallax de imágenes en escritorio.
      medios.add("(min-width: 900px)", () => {
        gsap.utils
          .toArray(raiz.querySelectorAll("[data-parallax]"))
          .forEach((imagen) => {
            gsap.fromTo(
              imagen,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: imagen.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              },
            );
          });
      });

      // Indicador de progreso del header.
      const progreso = raiz.querySelector("[data-progreso-scroll]");

      if (progreso) {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (instancia) => {
            gsap.set(progreso, {
              scaleX: instancia.progress,
            });
          },
        });
      }

      // Recalcular posiciones cuando carguen los recursos.
      const actualizar = () => ScrollTrigger.refresh();

      window.addEventListener("load", actualizar, {
        once: true,
      });

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
