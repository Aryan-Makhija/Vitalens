// "use client"

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { ShieldCheck, AlertTriangle, Lock } from "lucide-react";

// const items = [
//   { icon: ShieldCheck, text: "AI-Assisted, Not a Replacement for Doctors" },
//   { icon: AlertTriangle, text: "Escalation System for Critical Signals" },
//   { icon: Lock, text: "Your Data is Secure & Private" },
// ];

// const TrustSafetyPanel = () => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <section className="py-16" ref={ref}>
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="max-w-2xl mx-auto gradient-card rounded-2xl border border-border shadow-soft p-8"
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse-soft">
//               <ShieldCheck className="w-5 h-5 text-primary" />
//             </div>
//             <h3 className="font-display text-lg font-bold text-foreground">Trust & Safety</h3>
//           </div>

//           <div className="space-y-4">
//             {items.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={inView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
//                 className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/40"
//               >
//                 <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
//                 <span className="text-sm font-medium text-foreground">{item.text}</span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default TrustSafetyPanel;


"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, AlertTriangle, Lock, HeartPulse } from "lucide-react";

const items = [
  { 
    icon: HeartPulse, 
    text: "AI-Assisted Analysis", 
    sub: "Designed to support, not replace, professional medical consultation.",
    color: "text-[#4A675D]" 
  },
  { 
    icon: AlertTriangle, 
    text: "Clinical Escalation", 
    sub: "Automated triggers flag critical signals for immediate professional review.",
    color: "text-[#8B7E66]" 
  },
  { 
    icon: Lock, 
    text: "Enterprise Encryption", 
    sub: "Your health data is decentralized and strictly private.",
    color: "text-[#4A675D]" 
  },
];

const TrustSafetyPanel = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 bg-[#FAF9F6]" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto bg-[#F7F3E9] rounded-[2.5rem] border border-[#DCE4E1] shadow-[0_30px_60px_-20px_rgba(139,126,102,0.15)] p-10 md:p-14 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#DCE4E1] flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#4A675D]" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#2D3331]">Protocols & Safety</h3>
              <p className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-[0.3em] mt-1">Our Ethical AI Framework</p>
            </div>
          </div>

          {/* Safety Items */}
          <div className="grid gap-6 relative z-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="flex gap-5 p-6 rounded-2xl bg-white/60 border border-white hover:bg-white transition-all duration-300 group"
              >
                <item.icon className={`w-6 h-6 ${item.color} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                <div>
                  <h4 className="font-bold text-[#2D3331] text-sm md:text-base mb-1">{item.text}</h4>
                  <p className="text-xs md:text-sm text-[#5C6361] font-light leading-relaxed">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Warning */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center border-t border-[#DCE4E1] pt-8"
          >
            <p className="text-[10px] text-[#8B7E66] italic leading-loose uppercase tracking-widest max-w-lg mx-auto">
              VitaLens is an educational and analytical tool. If you are experiencing a medical emergency, please contact local emergency services immediately.
            </p>
          </motion.div>

          {/* Artistic background grain */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/p6.png")` }} />
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSafetyPanel;
