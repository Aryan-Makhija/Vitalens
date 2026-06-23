
"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Activity, FileText, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardHero = ({hasCompletedFirstDiagnosis,isLoading}) => {

  const { user } = useUser();
  const name = user?.firstName;


  // MODERN SHIMMER SKELETON REPLACEMENT
  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-[#FAF9F6] min-h-[85vh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Stack Skeleton */}
            <div className="space-y-6 animate-pulse">
              <div className="w-36 h-7 bg-gray-200/80 rounded-full" />
              <div className="space-y-3">
                <div className="w-3/4 h-10 sm:h-12 bg-gray-200 rounded-2xl" />
                <div className="w-1/2 h-10 sm:h-12 bg-gray-200 rounded-2xl" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="w-full h-4 bg-gray-200/70 rounded-md" />
                <div className="w-5/6 h-4 bg-gray-200/70 rounded-md" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="w-full sm:w-44 h-12 bg-gray-200 rounded-2xl" />
                <div className="w-full sm:w-44 h-12 bg-gray-200 rounded-2xl" />
              </div>
            </div>
            {/* Visual Orb Container Skeleton */}
            <div className="flex items-center justify-center animate-pulse">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] bg-gray-200/60 rounded-[3rem]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 md:py-28 bg-[#FAF9F6] min-h-[calc(100vh-80px)] flex items-center">
      {/* Background Ambience Accents */}
      <div className="absolute top-0 right-0 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-[#E8F3EE] rounded-full blur-[80px] sm:blur-[120px] opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-[#F2F5F3] rounded-full blur-[60px] sm:blur-[100px] opacity-60 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Action Copy Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left order-1 lg:order-1"
          >
            {/* Dynamic Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE4E1] mb-6 sm:mb-8 shadow-sm">
              {!hasCompletedFirstDiagnosis ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#4A675D]" />
                  <span className="text-[10px] font-bold text-[#4A675D] uppercase tracking-[0.2em]">Personalized Onboarding</span>
                </>
              ) : (
                <>
                  <Activity className="w-3.5 h-3.5 text-[#4A675D]" />
                  <span className="text-[10px] font-bold text-[#4A675D] uppercase tracking-[0.2em]">Account Active</span>
                </>
              )}
            </div>

            {/* Typography Heading Stack */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-medium leading-[1.15] mb-4 sm:mb-6 text-[#2D3331]">
              {!hasCompletedFirstDiagnosis ? (
                <>Welcome. <br className="hidden sm:inline" /><span className="italic text-[#4A675D]">Let’s begin your journey.</span></>
              ) : (
                <>Welcome back, <br className="hidden sm:inline" /><span className="italic text-[#4A675D]">{name}.</span></>
              )}
            </h1>

            {/* Description Subtext */}
            <p className="text-[#5C6361] text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0 font-light">
              {!hasCompletedFirstDiagnosis
                ? "This is your first clinical-grade check-in. Our AI will build your initial baseline to detect health risks before they arise."
                : "Your baseline is established. You can now perform a new scan to update your vitals or review your latest clinical report below."}
            </p>

            {/* Dual Action Grid Layout */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-flex-start gap-4 max-w-sm mx-auto lg:max-w-none lg:mx-0">
              <Link href="/Checkin" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#3D564D" }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#4A675D] text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-lg shadow-[#4A675D]/10 flex items-center justify-center gap-3 group transition-all w-full"
                >
                  {!hasCompletedFirstDiagnosis ? "Start Daily Check-In" : "New Diagnosis Scan"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              {!hasCompletedFirstDiagnosis ? (
                <button className="px-8 py-4 rounded-2xl text-sm font-bold text-[#4A675D] border border-[#DCE4E1] bg-white/50 backdrop-blur-sm hover:bg-white transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                  <PlayCircle size={18} /> View Methodology
                </button>
              ) : (
                <Link href="/LatestReport" className="w-full sm:w-auto">
                  <button className="w-full px-8 py-4 rounded-2xl text-sm font-bold text-[#4A675D] border border-[#4A675D] bg-white hover:bg-[#E8F3EE] transition-all flex items-center justify-center gap-2">
                    <FileText size={18} /> Latest Report
                  </button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* AI VitaAI Node Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center order-2 lg:order-2 w-full"
          >
            {/* Scalable Outer Box Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] aspect-square flex items-center justify-center">

              {/* OUTER CANVAS - Dynamic Rotation Accent */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] border border-[#4A675D]/10 bg-[#E8F3EE]/40 backdrop-blur-xl"
              />

              {/* MIDDLE CANVAS - Node Ring */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 sm:inset-14 rounded-[2rem] sm:rounded-[2.5rem] border border-[#DCE4E1] bg-white/40 shadow-inner"
              />

              {/* INNER CORE CONTAINER */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-20 sm:inset-28 rounded-2xl sm:rounded-3xl bg-[#4A675D] shadow-xl flex items-center justify-center text-center p-3 sm:p-4 z-10"
              >
                <div className="text-white">
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 mx-auto opacity-90" />
                  <div className="font-serif text-base sm:text-xl font-bold">VitaAI</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 mt-0.5">
                    Listening
                  </div>
                </div>
              </motion.div>

              {/* Floating Data Micro Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4A675D]/40 z-20"
                  style={{
                    top: `${25 + i * 18}%`,
                    left: `${15 + i * 22}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 3.5 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
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