
"use client";

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
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#F0F4F2] relative overflow-hidden" ref={ref}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F3EE] rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="text-[10px] sm:text-[11px] font-bold text-[#4A675D] uppercase tracking-[0.3em] bg-white px-4 py-1.5 rounded-full border border-[#DCE4E1]">
            The Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#2D3331] mt-5 mb-4 px-2">
            How Your Assessment <span className="italic text-[#4A675D]">Evolves</span>.
          </h2>
          <p className="text-[#5C6361] text-sm sm:text-base max-w-xl mx-auto font-light px-4">
            A secure, multi-layered process that transforms daily inputs into clinical-grade foresight.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative px-2 sm:px-4">
          {/* Connecting line with adaptive positioning to prevent misalignment on small displays */}
          <div className="absolute left-6 md:left-[3.1rem] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#4A675D]/40 via-[#8B7E66]/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-14 sm:pl-20 md:pl-24 mb-6 sm:mb-8 last:mb-0"
            >
              {/* Icon node - Scaled dynamically across mobile screens */}
              <div className={`absolute left-0 md:left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${step.iconBg} border ${step.accent} flex items-center justify-center z-10 shadow-sm transition-transform`}>
                <step.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.iconColor} stroke-[1.5px]`} />
              </div>

              {/* Accordion Card Container */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className={`w-full text-left rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 md:p-8 transition-all duration-500 border ${
                  expanded === i 
                    ? "bg-white border-[#DCE4E1] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]" 
                    : "bg-white/40 border-transparent hover:bg-white/60"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="pr-2">
                    <h3 className="font-bold text-[#2D3331] text-base sm:text-lg md:text-xl mb-1 leading-snug">{step.title}</h3>
                    <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${step.iconColor}`}>{step.subtitle}</p>
                  </div>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${expanded === i ? "bg-[#4A675D] text-white rotate-180" : "bg-[#E8F3EE] text-[#4A675D]"}`}>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#5C6361] text-xs sm:text-sm md:text-base mt-4 pt-4 border-t border-[#DCE4E1] leading-relaxed font-light">
                        {step.detail}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
                        {["Secure & Private", "Clinical Guardrails", "AI-Powered"].map((tag) => (
                          <div key={tag} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F4F2] border border-[#DCE4E1]">
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#4A675D]" />
                            <span className="text-[9px] sm:text-[10px] font-bold text-[#5C6361] uppercase tracking-wider whitespace-nowrap">
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