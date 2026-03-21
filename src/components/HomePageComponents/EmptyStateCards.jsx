// "use client"

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { Calendar, BarChart3, TrendingUp, Lock } from "lucide-react";

// const modules = [
//   {
//     icon: Calendar,
//     title: "Weekly Plan",
//     description: "Personalized weekly health goals and habits",
//     status: "Available after first analysis",
//   },
//   {
//     icon: BarChart3,
//     title: "Insights Dashboard",
//     description: "Detailed health patterns and AI observations",
//     status: "No data yet",
//   },
//   {
//     icon: TrendingUp,
//     title: "Progress Tracking",
//     description: "Monitor your improvement over time",
//     status: "Starts after first check-in",
//   },
// ];

// const EmptyStateCards = () => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <section className="py-16" ref={ref}>
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           className="text-center mb-10"
//         >
//           <h2 className="font-display text-2xl font-bold text-foreground mb-2">Coming Up Next</h2>
//           <p className="text-muted-foreground text-sm">Complete your first check-in to unlock these features</p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//           {modules.map((mod, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: i * 0.12 }}
//               className="gradient-card rounded-2xl border border-border/60 p-6 shadow-soft opacity-60 relative overflow-hidden"
//             >
//               <div className="absolute top-3 right-3">
//                 <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
//               </div>
//               <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-4">
//                 <mod.icon className="w-5 h-5 text-muted-foreground" />
//               </div>
//               <h3 className="font-display font-semibold text-foreground mb-1">{mod.title}</h3>
//               <p className="text-sm text-muted-foreground mb-3">{mod.description}</p>
//               <span className="text-[11px] px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
//                 {mod.status}
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EmptyStateCards;



"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, BarChart3, TrendingUp, Lock, Sparkles } from "lucide-react";

const modules = [
  {
    icon: Calendar,
    title: "Weekly Plan",
    description: "Personalized health goals and daily habit tracking.",
    status: "Awaiting Analysis",
  },
  {
    icon: BarChart3,
    title: "Insights Dashboard",
    description: "Detailed health patterns and AI-driven observations.",
    status: "No Data Yet",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your physiological improvements over time.",
    status: "Unlocks at Step 3",
  },
];

const EmptyStateCards = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-[#FAF9F6]" ref={ref}>
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#8B7E66] opacity-50" />
            <h2 className="font-serif text-3xl font-medium text-[#2D3331]">Future Insights</h2>
          </div>
          <p className="text-[#5C6361] text-sm font-light max-w-md mx-auto">
            Complete your first clinical check-in to unlock these personalized
            health management modules.
          </p>
        </motion.div>

        {/* Locked Modules Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-white/40 border border-[#DCE4E1] rounded-[2rem] p-8 transition-all duration-500 hover:bg-white/60"
            >
              {/* Lock Indicator */}
              <div className="absolute top-6 right-6">
                <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#DCE4E1] flex items-center justify-center shadow-sm">
                  <Lock className="w-3 h-3 text-[#8B7E66] opacity-40" />
                </div>
              </div>

              {/* Icon - Desaturated Sage */}
              <div className="w-14 h-14 rounded-2xl bg-[#F0F4F2] border border-[#DCE4E1] flex items-center justify-center mb-8 group-hover:bg-[#E8F3EE] transition-colors duration-300">
                <mod.icon className="w-6 h-6 text-[#8B7E66] opacity-60 group-hover:text-[#4A675D] transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-medium text-[#2D3331] mb-3 group-hover:text-[#4A675D] transition-colors">
                {mod.title}
              </h3>
              <p className="text-sm text-[#5C6361] leading-relaxed mb-8 font-light italic">
                {mod.description}
              </p>

              {/* Status Tag */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#DCE4E1]" />
                <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-[0.15em]">
                  {mod.status}
                </span>
              </div>

              {/* Locked Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF9F6]/10 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-[0.25em] opacity-60">
            Powered by VitaLens Intelligence Engine v3.2
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EmptyStateCards;
