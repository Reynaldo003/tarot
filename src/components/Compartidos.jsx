import { ArrowUpRight } from 'lucide-react';

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
  return (
    <div className={`fases-lunares ${className}`} aria-hidden="true">
      <span>☾</span><span>◖</span><span>●</span><span>◗</span><span>☽</span>
    </div>
  );
}

export function EncabezadoSeccion({ kicker, titulo, claro = false, className = '' }) {
  return (
    <div className={className} data-revelar>
      <div className={`kicker ${claro ? 'kicker-oscuro' : ''}`}><span />{kicker}</div>
      <h2 className="titulo-seccion">{titulo}</h2>
    </div>
  );
}

export function EnlaceFlecha({ href, children, claro = false, onClick, className = '' }) {
  return (
    <a href={href} onClick={onClick} className={`enlace-flecha ${claro ? 'enlace-flecha-claro' : ''} ${className}`}>
      <span>{children}</span><ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
