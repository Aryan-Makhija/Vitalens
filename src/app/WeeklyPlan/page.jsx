// // "use client"

// // import { Button } from '@/components/ui/button'
// // import React, { useState } from 'react'

// // const WeeklyPlan = () => {

// //     const [plan, setplan] = useState("")

// //     const getplan = async () => {
// //         const response = await fetch("/api/WeeklyPlan", {
// //             method: "PUT",
// //             headers: { "Content-Type": "application/json" }
// //         })

// //         if (response.ok) {
// //             setplan("user Enrolled Successfully")
// //         }

// //     }




// //     return (
// //         <div>


// //             <Button onClick={getplan}>Enroll to the plan</Button>
// //             <p>User is :{plan}</p>
// //         </div>
// //     )
// // }

// // export default WeeklyPlan


// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//     CheckCircle2, Clock, Zap, Shield, Target,
//     BarChart3, ChevronRight, ArrowLeft, Trophy,
//     Info
// } from "lucide-react";
// import Link from "next/link";

// export default function WeeklyPlanPage() {
//     const [planData, setPlanData] = useState({
//         planType: "Neuromuscular Recovery",
//         goalFocus: "Cortisol Regulation & Clarity",
//         difficultyLevel: "Intermediate",
//         safetyLevel: "High - Non-Invasive",
//         currentDay: 4, // Day 4 of 7
//         todayTask: {
//             title: "Zone 2 Low-Impact Oxygenation",
//             description: "Engage in 20 minutes of rhythmic breathing paired with light movement to flush metabolic byproducts and stabilize heart rate.",
//             duration: "25 mins",
//             intensity: "Low",
//             category: "Recovery"
//         }
//     });

//     const days = [1, 2, 3, 4, 5, 6, 7];
//     const [weeklyplan, setweeklyplan] = useState({})


//     console.log(weeklyplan);
//     const getplan = async () => {


//         try {
//             const response = await fetch("/api/WeeklyPlan/EnrollDetails", {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             })
//             const data = await response.json()


//             setweeklyplan(data.isEnrolled)

//         } catch (err) {
//             console.log(err.message);
//         }
//     }



//     // useEffect(() => {
//     //     getplan()
//     // }, [])





//     return (
//         <div className="min-h-screen bg-[#F8F9F7] py-8 px-4 md:px-6 font-sans text-[#2D3331]">
//             <div className="max-w-5xl mx-auto">
//                 {/* 1. TOP NAVIGATION & HEADER */}
//                 <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
//                     <div>
//                         <Link href="/HomePage" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#4A675D] mb-4 hover:opacity-70">
//                             <ArrowLeft size={14} /> Back
//                         </Link>
//                         <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-[#8B7E66] mb-2">Active Protocol</h1>
//                         <h2 className="text-4xl font-serif text-[#1A1F1E]">{planData.planType}</h2>
//                     </div>

//                     {/* Meta Stats Tags */}
//                     <div className="flex flex-wrap gap-3">
//                         <div className="px-4 py-2 bg-white border border-[#DCE4E1] rounded-lg shadow-sm flex items-center gap-2">
//                             <Target size={16} className="text-[#4A675D]" />
//                             <span className="text-[11px] font-bold uppercase text-gray-500">Goal: <span className="text-[#1A1F1E]">{planData.goalFocus}</span></span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* DYNAMIC PROGRESS TRACKER */}
//                 <div className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E9E7] mb-10 overflow-hidden relative">
//                     <div className="flex justify-between items-center mb-10">
//                         <div className="flex items-center gap-2">
//                             <div className="p-2 bg-[#4A675D]/10 rounded-lg">
//                                 <Trophy size={18} className="text-[#4A675D]" />
//                             </div>
//                             <div>
//                                 <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Phase</h3>
//                                 <p className="text-sm font-bold text-[#1A1F1E]">Day {planData.currentDay} of 7</p>
//                             </div>
//                         </div>
//                         <span className="text-xs font-mono font-bold text-[#4A675D] bg-[#F0F4F2] px-4 py-1.5 rounded-full border border-[#DCE4E1]">
//                             PROGRESS: {Math.round((planData.currentDay / 7) * 100)}%
//                         </span>
//                     </div>

//                     <div className="relative px-2">
//                         {/* Background Track */}
//                         <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-100 rounded-full" />

//                         {/* Animated Fill Track */}
//                         <motion.div
//                             initial={{ width: 0 }}
//                             animate={{ width: `${((planData.currentDay - 1) / 6) * 100}%` }}
//                             transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
//                             className="absolute top-5 left-0 h-[3px] bg-gradient-to-r from-[#8B7E66] to-[#4A675D] rounded-full z-10"
//                         />

//                         <div className="relative flex justify-between z-20">
//                             {days.map((day, index) => {
//                                 const isPast = day < planData.currentDay;
//                                 const isCurrent = day === planData.currentDay;

//                                 return (
//                                     <div key={day} className="flex flex-col items-center">
//                                         <motion.div
//                                             initial={{ scale: 0.8, opacity: 0 }}
//                                             animate={{ scale: 1, opacity: 1 }}
//                                             transition={{ delay: index * 0.15 }}
//                                             className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${isCurrent ? "bg-[#4A675D] border-[#4A675D] text-white shadow-[0_0_20px_rgba(74,103,93,0.3)] scale-110" :
//                                                 isPast ? "bg-white border-[#4A675D] text-[#4A675D]" :
//                                                     "bg-white border-gray-100 text-gray-300"
//                                                 }`}
//                                         >
//                                             {isPast ? <CheckCircle2 size={20} /> : <span className="text-sm font-black">{day}</span>}
//                                         </motion.div>
//                                         <motion.span
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             transition={{ delay: index * 0.15 + 0.5 }}
//                                             className={`mt-4 text-[9px] font-black uppercase tracking-tighter ${isCurrent ? "text-[#4A675D]" : "text-gray-400"}`}
//                                         >
//                                             DAY {day}
//                                         </motion.span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//                     {/* SPORTY TASK CARD */}
//                     <div className="lg:col-span-2">
//                         <motion.div
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="bg-gradient-to-br from-[#2D3A36] via-[#24332E] to-[#1A2421] text-white rounded-3xl overflow-hidden shadow-2xl relative border border-white/5"
//                         >
//                             {/* Decorative Mesh Overlay */}
//                             <div className="absolute inset-0 opacity-10 pointer-events-none"
//                                 style={{ backgroundImage: `radial-gradient(#4A675D 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

//                             <div className="p-8 md:p-12 relative z-10">
//                                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md mb-8">
//                                     <span className="w-2 h-2 rounded-full bg-[#A8E6CF] animate-pulse" />
//                                     <span className="text-[10px] font-black uppercase tracking-widest text-[#A8E6CF]">Ready to Start</span>
//                                 </div>

//                                 <h3 className="text-[11px] font-bold uppercase text-[#8B7E66] mb-3 tracking-[0.2em]">Today's Protocol</h3>
//                                 <h2 className="text-4xl font-serif mb-6 leading-[1.1]">{planData.todayTask.title}</h2>

//                                 <p className="text-[#C8D1CE] text-lg leading-relaxed mb-10 max-w-xl font-light italic">
//                                     "{planData.todayTask.description}"
//                                 </p>

//                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-white/5 mb-10">
//                                     <div className="space-y-1">
//                                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Duration</p>
//                                         <div className="flex items-center gap-2">
//                                             <Clock size={18} className="text-[#4A675D]" />
//                                             <span className="text-xl font-bold">{planData.todayTask.duration}</span>
//                                         </div>
//                                     </div>
//                                     <div className="space-y-1">
//                                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Intensity</p>
//                                         <div className="flex items-center gap-2">
//                                             <BarChart3 size={18} className="text-[#4A675D]" />
//                                             <span className="text-xl font-bold uppercase">{planData.todayTask.intensity}</span>
//                                         </div>
//                                     </div>
//                                     <div className="hidden md:block space-y-1">
//                                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Focus Area</p>
//                                         <div className="flex items-center gap-2">
//                                             <Zap size={18} className="text-[#4A675D]" />
//                                             <span className="text-xl font-bold uppercase">Recovery</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <button className="group w-full py-5 bg-[#4A675D] hover:bg-[#5a7d71] text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-4 shadow-[0_10px_30px_rgba(74,103,93,0.4)] active:scale-[0.98]">
//                                     Log Activity Completion
//                                     <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                                 </button>
//                             </div>

//                             {/* Corner Glow */}
//                             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#4A675D] blur-[100px] opacity-20 pointer-events-none" />
//                         </motion.div>
//                     </div>

//                     {/* SIDEBAR */}
//                     {/* <div className="space-y-6">
//                         <div className="bg-white p-8 rounded-3xl border border-[#E5E9E7] shadow-sm">
//                             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8B7E66] mb-8 flex items-center gap-2">
//                                 <Shield size={16} /> Guidelines
//                             </h4>

//                             <div className="space-y-8">
//                                 <div className="flex justify-between items-end border-b border-gray-50 pb-4">
//                                     <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Difficulty</span>
//                                     <span className="text-sm font-black text-[#1A1F1E]">{planData.difficultyLevel}</span>
//                                 </div>
//                                 <div className="flex justify-between items-end border-b border-gray-50 pb-4">
//                                     <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Safety Level</span>
//                                     <span className="text-sm font-black text-emerald-600 uppercase italic">Stable</span>
//                                 </div>
//                                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
//                                     <span className="text-sm text-gray-500 italic">Start Date</span>
//                                     <span className="text-sm font-bold text-[#1A1F1E]">March 28, 2026</span>
//                                 </div>
//                                 <div className="pt-4">
//                                     <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Today's Motivation</p>
//                                     <p className="text-sm text-[#4A675D] font-serif leading-relaxed italic">
//                                         "Small daily actions are the compound interest of your health recovery."
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}

//                     {/* 4. SIDEBAR - PARAMETERS */}
//                     <div className="space-y-6">
//                         <div className="bg-white p-6 rounded-xl border border-[#DCE4E1] shadow-sm">
//                             <h4 className="text-xs font-black uppercase tracking-widest text-[#8B7E66] mb-6 flex items-center gap-2">
//                                 <Info size={14} /> Protocol Parameters
//                             </h4>

//                             <div className="space-y-6">
//                                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
//                                     <span className="text-sm text-gray-500 italic">Difficulty</span>
//                                     <span className="text-sm font-bold text-[#1A1F1E]">{planData.difficultyLevel}</span>
//                                 </div>
//                                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
//                                     <span className="text-sm text-gray-500 italic">Safety Tier</span>
//                                     <div className="flex items-center gap-1.5">
//                                         <Shield size={14} className="text-emerald-600" />
//                                         <span className="text-sm font-bold text-emerald-600">{planData.safetyLevel}</span>
//                                     </div>
//                                 </div>
//                                 <div className="flex justify-between items-center pb-4 border-b border-gray-50">
//                                     <span className="text-sm text-gray-500 italic">Start Date</span>
//                                     <span className="text-sm font-bold text-[#1A1F1E]">March 28, 2026</span>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Motivational Tip Box */}
//                         <div className="bg-[#4A675D]/5 p-6 rounded-xl border border-[#4A675D]/20">
//                             <Zap className="text-[#4A675D] mb-4" size={24} />
//                             <h5 className="text-sm font-bold text-[#1A1F1E] mb-2">Clinical Tip</h5>
//                             <p className="text-xs text-[#5C6361] leading-relaxed">
//                                 Maintaining consistency in the first 4 days of a recovery protocol increases long-term neuro-plasticity by up to 40%.
//                             </p>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>

//     );
// }







"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2,
    Shield,
    Target,
    ArrowLeft,
    Trophy,
    AlertTriangle,
    Clock,
    Zap,
    ChevronRight,
    Goal,
    ClipboardList,
    Bell,
    X,

} from "lucide-react";
import Link from "next/link";

export default function WeeklyPlanPage() {
    // =========================
    // STATE
    // =========================
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [planData, setPlanData] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [showToast, setShowToast] = useState(false); // New Toast State



    // =========================
    // TOAST TRIGGER LOGIC
    // =========================
    useEffect(() => {
        // Trigger toast only when planData is loaded, plan is completed, and feedback isn't done
        if (planData && planData.isCompleted && !planData.isFeedBackCompleted) {
            const timer = setTimeout(() => {
                setShowToast(true);
            }, 1500); // 1.5s delay after plan appears for better UX
            return () => clearTimeout(timer);
        }
    }, [planData]);
    // =========================
    // CHECK ENROLLMENT STATUS
    // =========================
    const checkEnrollment = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(
                "/api/WeeklyPlan/EnrollDetails", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })


            const data = await response.json();

            if (response.ok) {
                setIsEnrolled(data.IsEnrolled);
            }
        } catch (err) {
            console.error("Enrollment check failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // =========================
    // FETCH WEEKLY PLAN
    // =========================
    const fetchWeeklyPlan = async (day = null) => {
        try {
            setIsLoading(true);

            const url = day
                ? `/api/WeeklyPlan?day=${day}`
                : "/api/WeeklyPlan";

            const response = await fetch(url);

            const data = await response.json();
            // console.log(data.result)
            if (response.ok) {
                setPlanData(data.result);
                setShowModal(false);
                setIsCompleted(false); // Reset for the new day view
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Plan fetch failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {
        checkEnrollment();
    }, []);

    // =========================
    // ENROLL USER
    // =========================
    const handleEnroll = async () => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/WeeklyPlan", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            })

            if (response.ok) {
                setIsEnrolled(true);

                // Fetch latest unlocked task
                await fetchWeeklyPlan();
            }
        } catch (err) {
            console.error("Enrollment failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // =========================
    // CONTINUE PLAN
    // =========================
    const handleContinue = async () => {
        await fetchWeeklyPlan();
    };

    // =========================
    // MODAL
    // =========================
    const EnrollmentModal = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#DCE4E1]"
            >
                {isEnrolled ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-[#4A675D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Trophy
                                className="text-[#4A675D]"
                                size={32}
                            />
                        </div>

                        <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">
                            Welcome Back
                        </h2>

                        <p className="text-[#5C6361] mb-8 italic">
                            "Success is the sum of small efforts,
                            repeated day in and day out."
                        </p>

                        <button
                            onClick={handleContinue}
                            disabled={isLoading}
                            className="w-full py-4 bg-[#4A675D] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#3d564d] transition-colors disabled:opacity-50"
                        >
                            {isLoading
                                ? "Loading..."
                                : "Continue Plan"}
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">
                            Initialize Weekly Protocol
                        </h2>

                        <p className="text-sm text-[#5C6361] leading-relaxed mb-6">
                            Welcome to your 7-Day Protocol.
                            This structured program provides
                            one targeted task per day designed
                            to optimize your recovery and
                            well-being.
                        </p>

                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8">
                            <div className="flex gap-3">
                                <AlertTriangle
                                    className="text-amber-600 shrink-0"
                                    size={18}
                                />

                                <p className="text-[11px] text-amber-800 leading-tight font-medium">
                                    <span className="font-bold uppercase block mb-1">
                                        Important Notice:
                                    </span>

                                    Enrolling will pause
                                    diagnostic report generation
                                    for 7 days to ensure accurate
                                    monitoring.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleEnroll}
                            disabled={isLoading}
                            className="w-full py-4 bg-[#8B7E66] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#766b56] transition-all disabled:opacity-50"
                        >
                            {isLoading
                                ? "Processing..."
                                : "Enroll Now"}
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );

    // =========================
    // LOADING SCREEN
    // =========================
    if (isLoading && !planData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Protocol...
            </div>
        );
    }



    return (
        <div className="relative min-h-screen bg-[#F8F9F7] py-8 px-4 md:px-6 font-sans text-[#2D3331]">







            {/* TOAST NOTIFICATION */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="fixed top-6 right-6 z-[110] max-w-sm w-full"
                    >
                        <div className="bg-white border-l-4 border-[#4A675D] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl p-5 relative overflow-hidden">
                            <div className="flex gap-4">
                                <div className="bg-[#4A675D]/10 p-2 rounded-full h-fit">
                                    <Bell size={20} className="text-[#4A675D]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#1A1F1E] mb-1">Weekly Plan Complete!</h4>
                                    <p className="text-[12px] text-[#5C6361] leading-relaxed">
                                        Please fill the feedback form so that we can track your progress and compare your health from the past report.
                                    </p>
                                    <button
                                        onClick={() => window.location.href = '/weekly-feedback'}
                                        className="mt-3 text-[11px] font-black uppercase tracking-wider text-[#4A675D] hover:underline"
                                    >
                                        Go to Feedback →
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowToast(false)}
                                    className="text-gray-300 hover:text-gray-500 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            {/* Visual Progress bar on toast (Optional) */}
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 8, ease: "linear" }}
                                onAnimationComplete={() => setShowToast(false)}
                                className="absolute bottom-0 left-0 h-1 bg-[#4A675D]/20"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* ========================= */}
            {/* MODAL */}
            {/* ========================= */}

            <AnimatePresence>
                {showModal && <EnrollmentModal />}
            </AnimatePresence>

            {/* ========================= */}
            {/* MAIN CONTENT */}
            {/* ========================= */}

            {planData && (
                <div className={`max-w-5xl mx-auto transition-all duration-500 ${showModal ? "blur-md" : "blur-0"}`}>
                    {/* 1. TOP NAVIGATION & HEADER */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <Link href="/HomePage" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#4A675D] mb-4 hover:opacity-70">
                                <ArrowLeft size={14} /> Back
                            </Link>
                            <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-[#8B7E66] mb-2">Active Protocol</h1>
                            <h2 className="text-4xl font-serif text-[#1A1F1E]">{planData.plantype}</h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {/* Plan Goal Indicator */}
                            <div className="px-4 py-2 bg-white border border-[#DCE4E1] rounded-lg shadow-sm flex items-center gap-2">
                                <Target size={16} className="text-[#4A675D]" />
                                <span className="text-[11px] font-bold uppercase text-gray-500">
                                    Plan Goal: <span className="text-[#1A1F1E]">{planData.goalfocus}</span>
                                </span>
                            </div>

                            {/* Feedback Form Button */}
  
                            {(() => {
                                const isComp = planData.isCompleted;
                                const isFeedComp = planData.isFeedBackCompleted;

                                // State 3: Both are true -> Show Feedback Report Link
                                if (isComp && isFeedComp) {
                                    return (
                                        <button
                                            onClick={() => window.location.href = `/FeedBackReport?id=${planData.id}`} // Adjust to your actual report route
                                            className="px-4 py-2 rounded-lg bg-[#8B7E66] text-white shadow-md hover:bg-[#766b56] flex items-center gap-2 transition-all duration-300 font-bold uppercase text-[11px] tracking-wider cursor-pointer"
                                        >
                                            <ClipboardList size={16} />
                                            Feedback Report
                                        </button>
                                    );
                                }

                                // State 1 & 2: Base Feedback Form (Active or Disabled)
                                return (
                                    <button
                                        disabled={!isComp}
                                        onClick={() => window.location.href = `/FeedBackForm?planid=${planData.id}?id=${planData.finalLayerId}`}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 font-bold uppercase text-[11px] tracking-wider
                ${isComp
                                                ? "bg-[#4A675D] text-white shadow-md hover:bg-[#3d564d] cursor-pointer"
                                                : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60 shadow-none"
                                            }`}
                                    >
                                        <ClipboardList size={16} />
                                        Feedback Form
                                    </button>
                                );
                            })()}



                        </div>
                    </div>


                    {/* 2. DYNAMIC PROGRESS TRACKER */}
                    <div className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#E5E9E7] mb-10 overflow-hidden relative">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-[#4A675D]/10 rounded-lg">
                                    <Trophy size={18} className="text-[#4A675D]" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current Phase</h3>
                                    <p className="text-sm font-bold text-[#1A1F1E]">Day {planData.showingDay} Profile</p>
                                </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#4A675D] bg-[#F0F4F2] px-4 py-1.5 rounded-full border border-[#DCE4E1]">
                                STATUS: DAY {planData.currentDay} UNLOCKED
                            </span>
                        </div>

                        <div className="relative px-2">
                            {/* Background Track */}
                            <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-100 rounded-full" />

                            {/* Animated Fill Track */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((planData.currentDay - 1) / 6) * 100}%` }}
                                className="absolute top-5 left-0 h-[3px] bg-gradient-to-r from-[#8B7E66] to-[#4A675D] rounded-full z-10"
                            />

                            <div className="relative flex justify-between z-20">
                                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                                    const isPast = day < planData.currentDay;
                                    const isCurrent = day === planData.showingDay;
                                    const isLocked = day > planData.currentDay;

                                    return (
                                        <div key={day} className="flex flex-col items-center">
                                            <button
                                                disabled={isLocked}
                                                onClick={() => fetchWeeklyPlan(day)}
                                                className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all duration-300 
                                                    ${isCurrent ? "bg-[#4A675D] border-[#4A675D] text-white shadow-[0_0_20px_rgba(74,103,93,0.3)] scale-110" :
                                                        !isLocked ? "bg-white border-[#4A675D] text-[#4A675D]" :
                                                            "bg-white border-gray-100 text-gray-300 pointer-events-none"}`}
                                            >
                                                {isPast ? <CheckCircle2 size={20} /> : <span className="text-sm font-black">{day}</span>}
                                            </button>
                                            <span className={`mt-4 text-[9px] font-black uppercase tracking-tighter ${isCurrent ? "text-[#4A675D]" : "text-gray-400"}`}>
                                                DAY {day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 3. TASK & SIDEBAR */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gradient-to-br from-[#2D3A36] via-[#24332E] to-[#1A2421] text-white rounded-3xl overflow-hidden shadow-2xl relative border border-white/5"
                            >
                                <div className="p-8 md:p-12 relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md mb-8">
                                        <span className="w-2 h-2 rounded-full bg-[#A8E6CF] animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#A8E6CF]">Ready to Start</span>
                                    </div>

                                    <h3 className="text-[11px] font-bold uppercase text-[#8B7E66] mb-3 tracking-[0.2em]">Today's Protocol</h3>
                                    <h2 className="text-4xl font-serif mb-6 leading-[1.1]">{planData.TodayTask?.taskTitle}</h2>

                                    <p className="text-[#C8D1CE] text-lg leading-relaxed mb-10 max-w-xl font-light italic">
                                        "{planData.TodayTask?.task}"
                                    </p>

                                    <div className="flex flex-wrap gap-10 py-8 border-y border-white/10 mb-10">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10"><Clock size={18} className="text-[#8B7E66]" /></div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-0.5">Duration</p>
                                                <span className="text-lg font-bold">{planData.TodayTask?.taskDuration}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10"><Zap size={18} className="text-[#8B7E66]" /></div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-0.5">Intensity</p>
                                                <span className="text-lg font-bold uppercase">{planData.difficultyLevel}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10"><Goal size={18} className="text-[#8B7E66]" /></div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-0.5">Focus Area</p>
                                                <span className="text-lg font-bold uppercase">{planData.TodayTask?.taskFocusArea}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <button className="group w-full py-5 bg-[#4A675D] hover:bg-[#5a7d71] text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#4A675D]/20">
                                        Complete Activity
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button> */}
                                    {/* Modify the button section in your return */}
                                    <button
                                        onClick={() => setIsCompleted(true)}
                                        disabled={isCompleted}
                                        className={`group w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl 
        ${isCompleted
                                                ? "bg-emerald-500/20 text-emerald-500 cursor-default border border-emerald-500/30 shadow-none"
                                                : "bg-[#4A675D] hover:bg-[#5a7d71] text-white shadow-[#4A675D]/20"
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <>
                                                Activity Completed <CheckCircle2 size={18} />
                                            </>
                                        ) : (
                                            <>
                                                Complete Activity
                                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-3xl border border-[#E5E9E7] shadow-sm">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8B7E66] mb-8 flex items-center gap-2">
                                    <Shield size={16} /> Guidelines
                                </h4>

                                <div className="space-y-8">
                                    <div className="flex justify-between items-end border-b border-gray-50 pb-4">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Difficulty</span>
                                        <span className="text-sm font-black text-[#1A1F1E]">{planData.difficultyLevel}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-gray-50 pb-4">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Safety Level</span>

                                        <span className="text-sm font-black text-emerald-600 uppercase italic">{planData.safetyLevel}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-50"                       >              <span className="text-sm text-gray-500 italic">Start Date</span>
                                        <span className="text-sm font-bold text-[#1A1F1E]"> {new Date(planData.startedAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}</span>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Today's Motivation</p>
                                        <p className="text-sm text-[#4A675D] font-serif leading-relaxed italic">
                                            "Small daily actions are the compound interest of your health recovery."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            )}
        </div>
    )
}

