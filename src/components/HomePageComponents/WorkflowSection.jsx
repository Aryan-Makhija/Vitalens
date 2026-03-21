// "use client"

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef } from "react";
// import { ClipboardList, Brain, ShieldCheck, Lightbulb, ChevronDown } from "lucide-react";

// const steps = [
//   {
//     icon: ClipboardList,
//     title: "Form 1 – Daily Check-In",
//     subtitle: "Quick health snapshot",
//     detail: "Answer simple questions about your sleep, energy, mood, and habits. Takes just 2–3 minutes.",
//     color: "bg-primary/10 text-primary border-primary/20",
//   },
//   {
//     icon: Brain,
//     title: "AI Layer 1 – Habit Interpretation",
//     subtitle: "Pattern recognition",
//     detail: "Our AI safely interprets your inputs to find patterns and early signals — no diagnosis, just intelligent observation.",
//     color: "bg-accent/10 text-accent border-accent/20",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Risk Engine – Safety Check",
//     subtitle: "Confidence & escalation",
//     detail: "A dedicated safety layer evaluates confidence levels. If anything needs attention, it flags for professional guidance.",
//     color: "bg-sage/20 text-forest border-sage/40",
//   },
//   {
//     icon: Lightbulb,
//     title: "Personalized Insights",
//     subtitle: "Your first report",
//     detail: "Receive a clear, structured summary — highlights, areas to watch, and actionable next steps. Like a doctor's first impression.",
//     color: "bg-warm/60 text-foreground border-warm-deep/40",
//   },
// ];

// const WorkflowSection = () => {
//   const [expanded, setExpanded] = useState(null);
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section id="how-it-works" className="py-20 relative" ref={ref}>
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-14"
//         >
//           <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
//             How Your Assessment <span className="text-gradient">Works</span>
//           </h2>
//           <p className="text-muted-foreground max-w-xl mx-auto">
//             A structured, safe process — like visiting a clinic, powered by AI.
//           </p>
//         </motion.div>

//         <div className="max-w-3xl mx-auto relative">
//           {/* Connecting line */}
//           <div className="absolute left-8 md:left-10 top-0 bottom-0 w-px bg-border" />

//           {steps.map((step, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, x: -20 }}
//               animate={inView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.5, delay: i * 0.15 }}
//               className="relative pl-20 md:pl-24 mb-6 last:mb-0"
//             >
//               {/* Icon node */}
//               <div className={`absolute left-2 md:left-4 w-12 h-12 rounded-xl ${step.color} border flex items-center justify-center z-10 bg-card`}>
//                 <step.icon className="w-5 h-5" />
//               </div>

//               {/* Card */}
//               <button
//                 onClick={() => setExpanded(expanded === i ? null : i)}
//                 className="w-full text-left gradient-card rounded-2xl p-5 border border-border shadow-soft hover:shadow-card transition-all group"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="font-display font-semibold text-foreground">{step.title}</h3>
//                     <p className="text-sm text-muted-foreground">{step.subtitle}</p>
//                   </div>
//                   <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === i ? "rotate-180" : ""}`} />
//                 </div>

//                 <AnimatePresence>
//                   {expanded === i && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden"
//                     >
//                       <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border leading-relaxed">
//                         {step.detail}
//                       </p>
//                       <div className="flex gap-3 mt-3">
//                         {["Safe & Secure", "No medical replacement", "Early detection"].map((tag) => (
//                           <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-muted-foreground font-medium">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WorkflowSection;

"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Brain, ShieldCheck, Lightbulb, ChevronDown, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Step 1 – Daily Check-In",
    subtitle: "Digital health snapshot",
    detail: "Share quick updates on sleep, energy, and habits. Our interface is designed to be low-friction, taking only 2–3 minutes.",
    iconBg: "bg-[#E8F3EE]",
    iconColor: "text-[#4A675D]",
    accent: "border-[#4A675D]/20"
  },
  {
    icon: Brain,
    title: "AI Layer – Pattern Interpretation",
    subtitle: "Predictive neural analysis",
    detail: "VitaLens AI interprets your inputs against clinical patterns to find early signals — prioritizing intelligent observation over generic data.",
    iconBg: "bg-[#F7F3E9]",
    iconColor: "text-[#8B7E66]",
    accent: "border-[#8B7E66]/20"
  },
  {
    icon: ShieldCheck,
    title: "Risk Engine – Safety Validation",
    subtitle: "Clinical confidence check",
    detail: "A dedicated safety layer cross-references findings. If a potential risk is detected, the system flags it for immediate professional guidance.",
    iconBg: "bg-[#E8F3EE]",
    iconColor: "text-[#4A675D]",
    accent: "border-[#4A675D]/20"
  },
  {
    icon: Lightbulb,
    title: "Dynamic Health Report",
    subtitle: "Actionable wellness summary",
    detail: "Receive a structured summary including biological highlights and clear next steps. It's the clarity of a clinic visit, at home.",
    iconBg: "bg-[#F7F3E9]",
    iconColor: "text-[#8B7E66]",
    accent: "border-[#8B7E66]/20"
  },
];

const WorkflowSection = () => {
  const [expanded, setExpanded] = useState(0); // Default first one open for "First Visit" feel
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 bg-[#F0F4F2] relative overflow-hidden" ref={ref}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F3EE] rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[11px] font-bold text-[#4A675D] uppercase tracking-[0.3em] bg-white px-4 py-1.5 rounded-full border border-[#DCE4E1]">
            The Methodology
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#2D3331] mt-6 mb-4">
            How Your Assessment <span className="italic text-[#4A675D]">Evolves</span>.
          </h2>
          <p className="text-[#5C6361] max-w-xl mx-auto font-light">
            A secure, multi-layered process that transforms daily inputs into clinical-grade foresight.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative px-4">
          {/* Connecting line with gradient */}
          <div className="absolute left-[3.1rem] md:left-[3.1rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#4A675D]/40 via-[#8B7E66]/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-20 md:pl-24 mb-8 last:mb-0"
            >
              {/* Icon node - Styled like a medical seal */}
              <div className={`absolute left-0 md:left-4 w-14 h-14 rounded-2xl ${step.iconBg} border ${step.accent} flex items-center justify-center z-10 shadow-sm transition-transform group-hover:scale-110`}>
                <step.icon className={`w-6 h-6 ${step.iconColor} stroke-[1.5px]`} />
              </div>

              {/* Accordion Card */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className={`w-full text-left rounded-[2rem] p-6 md:p-8 transition-all duration-500 border ${
                  expanded === i 
                  ? "bg-white border-[#DCE4E1] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]" 
                  : "bg-white/40 border-transparent hover:bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="pr-4">
                    <h3 className="font-bold text-[#2D3331] text-lg md:text-xl mb-1">{step.title}</h3>
                    <p className={`text-xs font-bold uppercase tracking-widest ${step.iconColor}`}>{step.subtitle}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${expanded === i ? "bg-[#4A675D] text-white rotate-180" : "bg-[#E8F3EE] text-[#4A675D]"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#5C6361] text-sm md:text-base mt-6 pt-6 border-t border-[#DCE4E1] leading-relaxed font-light">
                        {step.detail}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-6">
                        {["Secure & Private", "Clinical Guardrails", "AI-Powered"].map((tag) => (
                          <div key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F4F2] border border-[#DCE4E1]">
                            <CheckCircle2 className="w-3 h-3 text-[#4A675D]" />
                            <span className="text-[10px] font-bold text-[#5C6361] uppercase tracking-tighter">
                              {tag}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;