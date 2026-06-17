export function VitaLensLogo({ className = "w-9 h-9 shadow-md rounded-lg" }) {
    return (
        <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" className="fill-[#394442]"/>
            <circle cx="16" cy="16" r="11" className="stroke-[#4A675D]/40" strokeWidth="2"/>
            <circle cx="16" cy="16" r="11" className="stroke-white" strokeWidth="2" strokeDasharray="6 22" strokeLinecap="round"/>
            <path d="M7 16H11L13.5 10L16.5 22L19 14L21 16H25" className="stroke-[#4A675D]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16.5" cy="22" r="1.5" className="fill-emerald-500"/>
        </svg>
    );
}

