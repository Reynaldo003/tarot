import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// useGSAP limpia las animaciones y los ScrollTrigger al desmontar App.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useAnimaciones(referencia) {
  useGSAP(() => {
    const medios = gsap.matchMedia();

    medios.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-hero-entrada]', {
        y: 35,
        opacity: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.15,
      });

      gsap.utils.toArray('[data-revelar]').forEach((elemento) => {
        gsap.from(elemento, {
          y: 42,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elemento,
            start: 'top 88%',
            once: true,
          },
        });
      });
    });

    medios.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-parallax]').forEach((elemento) => {
        gsap.fromTo(elemento, { yPercent: -7 }, {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: elemento.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });
    });

    return () => medios.revert();
  }, { scope: referencia });
}
