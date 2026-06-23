


"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Lock, Award, BookOpen } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Clinically Informed",
    description: "Our AI models are built on established medical guidelines and updated with the latest research.",
    iconBg: "bg-[#E8F3EE]",
    iconColor: "text-[#4A675D]",
    accent: "border-[#4A675D]/20"
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "End-to-end encryption and HIPAA compliance. Your health data is yours—always.",
    iconBg: "bg-[#F7F3E9]",
    iconColor: "text-[#8B7E66]", // Muted Gold/Brown for security/trust
    accent: "border-[#8B7E66]/20"
  },
  {
    icon: Award,
    title: "Validated Accuracy",
    description: "Our risk detection engine is validated against clinical datasets with high precision scores.",
    iconBg: "bg-[#E8F3EE]",
    iconColor: "text-[#4A675D]",
    accent: "border-[#4A675D]/20"
  },
  {
    icon: BookOpen,
    title: "Transparent Logic",
    description: "Every recommendation comes with clear reasoning. We show you the 'Why,' not just the 'What.'",
    iconBg: "bg-[#F7F3E9]",
    iconColor: "text-[#8B7E66]",
    accent: "border-[#8B7E66]/20"
  },
];

const TrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trust" className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
      {/* Decorative Organic Shapes */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#E8F3EE] rounded-full blur-[120px] opacity-40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-[11px] font-bold text-[#4A675D] uppercase tracking-[0.3em] bg-[#E8F3EE] px-4 py-1.5 rounded-full">
            Integrity First
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#2D3331] mt-6 mb-6">
            Built on <span className="italic">Trust & Transparency.</span>
          </h2>
          <p className="text-[#5C6361] text-lg leading-relaxed">
            Your health data deserves the highest standards of protection. Here is how we deliver medical-grade reliability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {trustItems.map((item, i) => {
            const ItemCard = () => {
              const cardRef = useRef(null);
              const cardInView = useInView(cardRef, { once: true, margin: "-50px" });
              return (
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`group flex gap-6 p-8 rounded-[2rem] bg-white border ${item.accent} shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(74,103,93,0.08)] transition-all duration-500`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className={`w-7 h-7 ${item.iconColor} stroke-[1.5px]`} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-[#2D3331] text-lg mb-2 group-hover:text-[#4A675D] transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-[#5C6361] text-sm leading-relaxed">
                        {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            };
            return <ItemCard key={item.title} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;