// "use client"

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { CheckCircle2, Circle } from "lucide-react";

// const steps = [
//   { label: "Complete your Daily Check-In", sub: "2–3 minutes", done: false },
//   { label: "AI analyzes patterns safely", sub: "Automatic", done: false },
//   { label: "Receive your first health insight", sub: "Personalized report", done: false },
// ];

// const GuidancePanel = () => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <section className="py-16" ref={ref}>
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="max-w-2xl mx-auto"
//         >
//           <div className="gradient-card rounded-2xl border border-border shadow-card p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center">
//                 <span className="text-primary-foreground text-lg">📍</span>
//               </div>
//               <div>
//                 <h3 className="font-display text-xl font-bold text-foreground">Where to Start</h3>
//                 <p className="text-sm text-muted-foreground">Your first three steps</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {steps.map((step, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -15 }}
//                   animate={inView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
//                   className="flex items-start gap-4 p-4 rounded-xl bg-background/60 border border-border/50"
//                 >
//                   <motion.div
//                     animate={inView ? { scale: [0, 1.2, 1] } : {}}
//                     transition={{ duration: 0.4, delay: 0.5 + i * 0.2 }}
//                   >
//                     {step.done ? (
//                       <CheckCircle2 className="w-6 h-6 text-primary mt-0.5" />
//                     ) : (
//                       <Circle className="w-6 h-6 text-border mt-0.5" />
//                     )}
//                   </motion.div>
//                   <div>
//                     <p className="font-medium text-foreground">
//                       <span className="text-primary font-bold mr-2">Step {i + 1}:</span>
//                       {step.label}
//                     </p>
//                     <p className="text-sm text-muted-foreground">{step.sub}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             <p className="text-xs text-muted-foreground mt-6 text-center italic">
//               Take your time — there's no rush. Your data stays private and secure.
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default GuidancePanel;

"use client"

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
    <section className="py-20 bg-[#FAF9F6]" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          {/* Main Container */}
          <div className="bg-white rounded-[2.5rem] border border-[#DCE4E1] shadow-[0_20px_50px_-20px_rgba(74,103,93,0.1)] p-8 md:p-12 relative overflow-hidden">

            {/* Subtle background icon */}
            <Shield className="absolute -right-8 -top-8 w-40 h-40 text-[#E8F3EE] opacity-40 rotate-12" />

            <div className="flex items-center gap-5 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#4A675D] flex items-center justify-center shadow-lg shadow-[#4A675D]/20">
                <MapPin className="w-6 h-6 text-[#F7F3E9]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#2D3331]">Your Path Forward</h3>
                <p className="text-xs font-bold text-[#8B7E66] uppercase tracking-[0.2em]">The onboarding sequence</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className={`flex items-start gap-5 p-5 rounded-2xl border transition-all duration-300 ${i === 0
                      ? "bg-[#F0F4F2]/50 border-[#4A675D]/20 shadow-sm"
                      : "bg-white border-[#DCE4E1]/50"
                    }`}
                >
                  <motion.div
                    animate={inView ? { scale: [0.8, 1.1, 1], opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
                    className="mt-1"
                  >
                    {step.done ? (
                      <CheckCircle2 className="w-6 h-6 text-[#4A675D]" />
                    ) : (
                      <Circle className={`w-6 h-6 ${i === 0 ? "text-[#4A675D]" : "text-[#DCE4E1]"}`} />
                    )}
                  </motion.div>

                  <div>
                    <p className="font-bold text-[#2D3331] leading-tight mb-1">
                      <span className={`text-[10px] uppercase tracking-widest mr-3 ${i === 0 ? "text-[#4A675D]" : "text-[#8B7E66]"}`}>
                        Step {i + 1}
                      </span>
                      {step.label}
                    </p>
                    <p className="text-sm text-[#5C6361] font-light">{step.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#DCE4E1] text-center">
              <p className="text-[11px] font-bold text-[#8B7E66] uppercase tracking-[0.1em] italic">
                “Take your time. Your data is encrypted and used only for your health insights.”
              </p>
            </div>
          </div>

          {/* Support Micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-[#8B7E66] text-xs font-medium"
          >
            Need help? Our health guides are available 24/7.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidancePanel;
