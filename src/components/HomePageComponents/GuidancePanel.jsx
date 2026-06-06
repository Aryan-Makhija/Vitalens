
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Circle, MapPin, Shield } from "lucide-react";

const steps = [
  { label: "Complete your Daily Check-In", sub: "2–3 minutes", done: false },
  { label: "AI analyzes patterns safely", sub: "Automatic & Private", done: false },
  { label: "Receive your first health insight", sub: "Personalized report", done: false },
];

const GuidancePanel = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 sm:py-20 bg-[#FAF9F6]" ref={ref}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          {/* Main Container Wrapper */}
          <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-[#DCE4E1] shadow-[0_20px_50px_-20px_rgba(74,103,93,0.1)] p-5 sm:p-8 md:p-12 relative overflow-hidden">

            {/* Subtle background icon hidden on tiny screens to avoid text overlay chaos */}
            <Shield className="absolute -right-8 -top-8 w-32 h-32 sm:w-40 sm:h-40 text-[#E8F3EE] opacity-40 rotate-12 pointer-events-none hidden sm:block" />

            <div className="flex items-center gap-4 sm:gap-5 mb-8 sm:mb-10 relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#4A675D] flex items-center justify-center shrink-0 shadow-lg shadow-[#4A675D]/20">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#F7F3E9]" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2D3331]">Your Path Forward</h3>
                <p className="text-[10px] sm:text-xs font-bold text-[#8B7E66] uppercase tracking-[0.2em]">The onboarding sequence</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className={`flex items-start gap-3 sm:gap-5 p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                    i === 0
                      ? "bg-[#F0F4F2]/50 border-[#4A675D]/20 shadow-sm"
                      : "bg-white border-[#DCE4E1]/50"
                  }`}
                >
                  <motion.div
                    animate={inView ? { scale: [0.8, 1.1, 1], opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                    className="mt-0.5 sm:mt-1 shrink-0"
                  >
                    {step.done ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A675D]" />
                    ) : (
                      <Circle className={`w-5 h-5 sm:w-6 sm:h-6 ${i === 0 ? "text-[#4A675D]" : "text-[#DCE4E1]"}`} />
                    )}
                  </motion.div>

                  <div className="w-full">
                    <div className="font-bold text-[#2D3331] text-sm sm:text-base leading-tight mb-1 flex flex-col sm:flex-row sm:items-center items-start gap-1 sm:gap-0">
                      <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest sm:mr-3 font-extrabold ${i === 0 ? "text-[#4A675D]" : "text-[#8B7E66]"}`}>
                        Step {i + 1}
                      </span>
                      <span className="text-gray-800">{step.label}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C6361] font-light">{step.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#DCE4E1] text-center">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#8B7E66] uppercase tracking-[0.1em] italic leading-relaxed px-2">
                “Take your time. Your data is encrypted and used only for your health insights.”
              </p>
            </div>
          </div>

          {/* Support Micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-5 sm:mt-6 text-[#8B7E66] text-xs font-medium px-4"
          >
            Need help? Our health guides are available 24/7.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidancePanel;
