
"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileInput, Cpu, BarChart3, CalendarCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: FileInput,
    step: "01",
    title: "Health Profile",
    description: "Share your lifestyle, symptoms, and history through our guided, adaptive intake forms.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Multiple AI layers identify patterns and cross-reference indicators to build your risk profile.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Insights Report",
    description: "Receive a professional health summary with risk levels and personalized action items.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Weekly Plan",
    description: "Follow a customized wellness plan that evolves based on your weekly progress.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#E8F3EE] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DCEBE5] rounded-full blur-[120px] opacity-60 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FAF9F6] rounded-full blur-[100px] opacity-40 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-[11px] font-bold text-[#4A675D] uppercase tracking-[0.3em] bg-white/50 px-4 py-1.5 rounded-full border border-[#DCE4E1]">
            Our Methodology
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#2D3331] mt-6 mb-6">
            Four steps to <span className="italic text-[#4A675D]">total clarity.</span>
          </h2>
          <p className="text-[#5C6361] text-lg leading-relaxed">
            From initial check-in to your weekly evolution—here is how we transform your data into a professional health strategy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {steps.map((step, i) => {
            const StepCard = () => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true, margin: "-50px" });

              return (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, y: 40 }}
                  animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative group"
                >
                  {/* Step Number with High Contrast */}
                  <div className="text-8xl font-serif font-bold text-[#4A675D]/5 absolute -top-8 left-0 select-none">
                    {step.step}
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="w-20 h-20 rounded-[2rem] bg-white border border-[#DCE4E1] flex items-center justify-center mb-6 shadow-[0_10px_30px_-10px_rgba(74,103,93,0.1)] group-hover:shadow-[0_20px_40px_-10px_rgba(74,103,93,0.15)] transition-all duration-500"
                    >
                      <step.icon className="w-9 h-9 text-[#4A675D] stroke-[1.25px]" />
                    </motion.div>

                    <h3 className="font-bold text-[#2D3331] text-xl mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#5C6361] text-sm leading-relaxed pr-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Elegant Connector for Desktop */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-6 w-12 z-0">
                      <ArrowRight className="text-[#4A675D]/20 w-6 h-6" />
                    </div>
                  )}
                </motion.div>
              );
            };
            return <StepCard key={step.step} />;
          })}
        </div>

        {/* Bottom Context Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-10 border-t border-[#DCE4E1]/50 text-center"
        >
          <p className="text-[#4A675D] font-bold text-[10px] uppercase tracking-[0.2em]">
            Secure • Encrypted • AI-Driven
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;