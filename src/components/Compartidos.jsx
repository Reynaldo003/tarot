import { ArrowUpRight } from 'lucide-react';

// Utilidades compartidas. Todas las decisiones visuales están en clases Tailwind.
export const CONTENEDOR = 'mx-auto w-[calc(100%-38px)] max-w-[1520px] sm:w-[calc(100%-64px)] xl:w-[calc(100%-100px)]';
export const DISPLAY = "font-['Cormorant_Garamond',Georgia,serif]";
export const TITULO = `${DISPLAY} text-[clamp(3.25rem,6vw,6.4rem)] font-medium leading-[0.91] tracking-[-0.045em]`;
export const BOTON_PRIMARIO = 'group inline-flex min-h-12 items-center justify-center gap-4 border border-[#6a2633] bg-[#6a2633] px-5 py-3 text-[12px] font-bold text-[#fff0dc] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8b3649] hover:bg-[#8b3649] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ab72]';
export const BOTON_SECUNDARIO = 'group inline-flex min-h-12 items-center justify-center gap-3 border border-[#d5ab72]/60 px-5 py-3 text-[12px] font-semibold text-[#f0dcbe] transition-colors duration-300 hover:bg-[#e7c18d] hover:text-[#221318] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5ab72]';

export function SolAstral({ className = '', pequeno = false }) {
  return (
    <svg className={className} width={pequeno ? 36 : 66} height={pequeno ? 36 : 66} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth=".6" opacity=".7" />
      {Array.from({ length: 16 }, (_, indice) => (
        <path key={indice} d="M40 5V15" stroke="currentColor" strokeWidth={indice % 2 ? '.8' : '1.3'} transform={`rotate(${indice * 22.5} 40 40)`} />
      ))}
      <path d="M29 40q11-15 22 0-11 15-22 0Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="40" r="4" fill="currentColor" />
    </svg>
  );
}

export function FasesLunares({ className = '' }) {
  return <div className={`flex items-center justify-center gap-3 font-serif text-xl tracking-[2px] text-[#d5ab72] ${className}`} aria-hidden="true"><span>☾</span><span>◖</span><span>●</span><span>◗</span><span>☽</span></div>;
}

export function Kicker({ children, oscuro = false, className = '' }) {
  return (
    <div className={`mb-6 flex items-center gap-3 text-[14px] font-bold uppercase tracking-[0.24em] sm:tracking-[0.32em] ${oscuro ? 'text-[#946945]' : 'text-[#d5ab72]'} ${className}`}>
      <span className="inline-block h-px w-8 shrink-0 bg-current" />{children}
    </div>
  );
}

export function EncabezadoSeccion({ kicker, titulo, claro = false, className = '' }) {
  return <div className={className} data-revelar><Kicker oscuro={claro}>{kicker}</Kicker><h2 className="font-['Cormorant_Garamond',Georgia,serif] text-[clamp(3.25rem,6vw,6.4rem)] font-medium leading-[0.91] tracking-[-0.045em]">{titulo}</h2></div>;
}

export function EnlaceFlecha({ href, children, claro = false, onClick, className = '' }) {
  return (
    <a href={href} onClick={onClick} className={`group inline-flex items-center justify-between gap-6 border-b pb-3 pt-4 text-[16px] font-semibold transition-[gap] duration-300 hover:gap-10 ${claro ? 'border-[#9b7450] text-[#64412d]' : 'border-[#c3a27c] text-[#e3bf8e]'} ${className}`}>
      <span>{children}</span><ArrowUpRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </a>
  );
}
