// "use client"

// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef } from "react";
// import { ClipboardList, Layers, AlertTriangle, FileText, Sparkles, TrendingUp, ShieldCheck, Activity } from "lucide-react";
// const features = [
//     {
//         icon: ClipboardList,
//         title: "Smart Health Forms",
//         description: "Guided questionnaires that adapt to your responses, capturing lifestyle habits, symptoms, and medical history with clinical precision.",
//         color: "bg-emerald-650",
//         iconColor: "text-emerald-800",
//     },
//     {
//         icon: Layers,
//         title: "Multi-Layer AI Analysis",
//         description: "Our AI processes your data through multiple analytical layers — pattern recognition, risk correlation, and contextual health modeling.",
//         color: "bg-teal-light",
//         iconColor: "text-accent",
//     },
//     {
//         icon: AlertTriangle,
//         title: "Risk Detection Engine",
//         description: "Early warning system that identifies potential health concerns before they escalate, with clear risk levels and recommended actions.",
//         color: "bg-red-200",
//         iconColor: "text-red-100",
//     },
//     {
//         icon: FileText,
//         title: "Personalized Reports",
//         description: "Comprehensive health reports translated into clear, actionable language — no medical jargon, just insights you can understand and act on.",
//         color: "bg-sage-light",
//         iconColor: "text-primary",
//     },
//     {
//         icon: Sparkles,
//         title: "AI-Powered Insights",
//         description: "Continuous learning from your data patterns to provide increasingly accurate and personalized health recommendations over time.",
//         color: "bg-teal-light",
//         iconColor: "text-accent",
//     },
//     {
//         icon: TrendingUp,
//         title: "Progress Tracking",
//         description: "Visual dashboards showing your health journey, improvements, and areas that need attention — all at a glance.",
//         color: "bg-warm",
//         iconColor: "text-foreground",
//     },
// ];

// const FeatureCard = ({ feature, index }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true, margin: "-50px" });

//     return (
//         <motion.div
//             ref={ref}
//             initial={{ opacity: 0, y: 40 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             whileHover={{ y: -6, transition: { duration: 0.3 } }}
//             className="group relative p-8 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-elevated transition-shadow cursor-pointer"
//         >
//             <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
//                 <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
//             </div>
//             <h3 className="font-display font-bold text-lg text-foreground mb-3">{feature.title}</h3>
//             <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>

//             {/* Subtle hover glow */}
//             <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none " />
//         </motion.div>
//     );
// };

// export const FeaturesSection = () => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true, margin: "-100px" });
//     return (
//         <section id="features" className="py-24 md:py-32 relative">
//             <div className="container mx-auto px-6">
//                 <motion.div
//                     ref={ref}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.6 }}
//                     className="text-center max-w-2xl mx-auto mb-16"
//                 >
//                     <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
//                     <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-5">
//                         Every Layer, <span className="bg-gradient-to-r from-green-300 via-green-500 to-green-600 bg-clip-text text-transparent">
//                             Designed to Protect
//                         </span>
//                     </h2>
//                     <p className="text-emerald-800 text-lg">
//                         From intelligent forms to AI-driven risk engines, every component works together to give you a complete picture of your health.
//                     </p>
//                 </motion.div>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {features.map((feature, i) => (
//                         <FeatureCard key={feature.title} feature={feature} index={i} />
//                     ))}
//                 </div>
//             </div>
//         </section>

     
//     )
// }


"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  ClipboardList, 
  Layers, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  TrendingUp 
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Smart Health Forms",
    description: "Guided questionnaires that adapt to your responses, capturing lifestyle habits and medical history with clinical precision.",
    iconBg: "bg-[#E8F3EE]",
    iconColor: "text-[#4A675D]",
  },
  {
    icon: Layers,
    title: "Multi-Layer AI Analysis",
    description: "Our AI processes data through multiple analytical layers—pattern recognition, risk correlation, and contextual modeling.",
    iconBg: "bg-[#F7F3E9]",
    iconColor: "text-[#8B7E66]",
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection Engine",
    description: "An early warning system identifying potential health concerns before they escalate, with clear, actionable risk levels.",
    iconBg: "bg-[#FDECEC]", // Subtle soft red for awareness
    iconColor: "text-[#C2410C]",
  },
  {
    icon: FileText,
    title: "Personalized Reports",
    description: "Comprehensive health reports translated into clear, actionable language—no medical jargon, just insights you can act on.",
    iconBg: "bg-[#E8F3EE]",
    iconColor: "text-[#4A675D]",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Continuous learning from your data patterns to provide increasingly accurate health recommendations over time.",
    iconBg: "bg-[#F7F3E9]",
    iconColor: "text-[#8B7E66]",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visual dashboards showing your health journey and areas that need attention—all at a glance.",
    iconBg: "bg-[#E8F3EE]",
    iconColor: "text-[#4A675D]",
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative p-8 rounded-[2rem] bg-white border border-[#EBE8E0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(74,103,93,0.1)] transition-all duration-500 cursor-pointer"
    >
      <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        <feature.icon className={`w-7 h-7 ${feature.iconColor} stroke-[1.5px]`} />
      </div>
      <h3 className="font-bold text-[#2D3331] text-lg mb-3 group-hover:text-[#4A675D] transition-colors">
        {feature.title}
      </h3>
      <p className="text-[#5C6361] leading-relaxed text-sm">
        {feature.description}
      </p>

      {/* Decorative corner accent */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className={`w-2 h-2 rounded-full ${feature.iconBg}`} />
      </div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 md:py-32 bg-[#F0F4F2] relative overflow-hidden">
      {/* Organic Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#E8F3EE] rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#FAF9F6] rounded-full blur-[100px] opacity-80" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-[11px] font-bold text-[#4A675D] uppercase tracking-[0.3em] bg-white/60 px-4 py-1.5 rounded-full border border-[#DCE4E1]">
            Capabilities
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#2D3331] mt-6 mb-6">
            Every Layer, <span className="italic text-[#4A675D]">Precisely Calibrated.</span>
          </h2>
          <p className="text-[#5C6361] text-lg leading-relaxed">
            Our technology ecosystem works in harmony to transform raw data into a clear, clinical-grade picture of your wellbeing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;