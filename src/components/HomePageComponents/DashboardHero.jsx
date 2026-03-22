// "use client"
// import { motion } from "framer-motion";
// import { ArrowRight, Sparkles } from "lucide-react";
// import FloatingBlobs from "../LandingPageComponenets/FloatingBlobs";


// const DashboardHero = () => (
//   <section className="relative overflow-hidden py-16 md:py-24">
//     <div className="absolute inset-0  hero-background " />
//     <FloatingBlobs />

//     <div className="container mx-auto px-6 relative z-10">
//       <div className="grid md:grid-cols-2 gap-12 items-center">
//         {/* Left - Welcome */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-6">
//             <Sparkles className="w-3.5 h-3.5 text-primary" />
//             <span className="text-xs font-medium text-muted-foreground">First Visit</span>
//           </div>

//           <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
//             Welcome.{" "}
//             <span className="text-gradient">Let's begin your health journey.</span>
//           </h1>

//           <p className="text-muted-foreground/90 text-lg leading-relaxed mb-8 max-w-lg">
//             This is your first check-in. We'll start with a short daily assessment to understand your current state — it only takes 2–3 minutes.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <button className="gradient-cta text-white px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-elevated flex items-center gap-2 group">
//               Start Form 1 – Daily Check-In
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
//             <a href="#how-it-works" className="px-6 py-4 rounded-xl text-base font-semibold text-foreground border border-border hover:bg-secondary transition-colors text-center">
//               How It Works
//             </a>
//           </div>
//         </motion.div>

//         {/* Right - Illustration */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="relative flex items-center justify-center"
//         >
//           {/* Layered AI spheres */}
//           <div className="relative w-72 h-72 md:w-96 md:h-96">
//             <motion.div
//               animate={{ y: [0, -15, 0] }}
//               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute inset-8 rounded-full bg-teal-light/30 border border-primary/15 backdrop-blur-sm flex items-center justify-center"
//             >
//               <motion.div
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//                 className="w-3/4 h-3/4 rounded-full bg-teal-light/20 border border-accent/15 flex items-center justify-center"
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.08, 1] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                   className="w-3/4 h-3/4 rounded-full gradient-cta opacity-30 blur-[1px] flex items-center justify-center"
//                 >
//                   <div className="text-center text-primary-foreground">
//                     <div className="font-display text-lg font-bold opacity-80">AI</div>
//                     <div className="text-xs opacity-60">Ready</div>
//                   </div>
//                   <motion.div
//                     className="absolute top-4 right-6 w-2.5 h-2.5 rounded-full bg-primary/25"
//                     animate={{ y: [0, -10, 0] }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                   />
//                 </motion.div>
//               </motion.div>
//             </motion.div>

//             {/* Orbiting dots */}
//             {[0, 1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-3 h-3 rounded-full bg-teal/30 shadow-soft"
//                 style={{ top: `${20 + i * 25}%`, right: `${5 + i * 10}%` }}
//                 animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
//                 transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
//               />
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   </section>
// );

// export default DashboardHero;

"use client"

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import Link from "next/link";

const DashboardHero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#FAF9F6]">

      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8F3EE] rounded-full blur-[120px] opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F2F5F3] rounded-full blur-[100px] opacity-60 -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE – WELCOME TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* First Visit Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE4E1] mb-8 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#4A675D]" />
              <span className="text-[10px] font-bold text-[#4A675D] uppercase tracking-[0.2em]">
                Personalized Onboarding
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl md:text-6xl font-medium leading-tight mb-6 text-[#2D3331]">
              Welcome. <br />
              <span className="italic text-[#4A675D]">Let’s begin your journey.</span>
            </h1>

            {/* Description */}
            <p className="text-[#5C6361] text-lg leading-relaxed mb-10 max-w-lg font-light">
              This is your first clinical-grade check-in. Our AI will build your initial
              baseline to detect risks before they arise. It takes just <span className="font-semibold text-[#4A675D]">3 minutes</span>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5">

              <Link href="/Checkin">

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#3D564D" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#4A675D] text-white px-8 py-4 rounded-2xl text-base font-bold shadow-[0_15px_30px_-10px_rgba(74,103,93,0.3)] flex items-center justify-center gap-3 group transition-all"
                >
                  Start Daily Check-In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <button className="px-8 py-4 rounded-2xl text-base font-bold text-[#4A675D] border border-[#DCE4E1] bg-white/50 backdrop-blur-sm hover:bg-white transition-all">
                View Methodology
              </button>
            </div>
          </motion.div>


          {/* RIGHT SIDE – SOPHISTICATED AI SPHERE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">

              {/* OUTER LAYER - Bio-Teal */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[3rem] border border-[#4A675D]/10 bg-[#E8F3EE]/40 backdrop-blur-xl"
              />

              {/* MIDDLE LAYER - Floating Soft Sage */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 rounded-[2.5rem] border border-[#DCE4E1] bg-white/40 shadow-inner"
              />

              {/* INNER CORE - The "Health-Core" Green */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-32 rounded-3xl bg-[#4A675D] shadow-2xl flex items-center justify-center text-center p-4"
              >
                <div className="text-white">
                  <Activity className="w-8 h-8 mb-2 mx-auto opacity-90" />
                  <div className="font-serif text-lg font-bold">VitaAI</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Listening
                  </div>
                </div>
              </motion.div>

              {/* Organic Floating Data Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#4A675D]/40"
                  style={{
                    top: `${30 + i * 15}%`,
                    left: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DashboardHero;