
"use client";

import React, { useState, useLayoutEffect, useEffect } from "react";
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
    Calendar,
    Lock
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/LandingPageComponenets/Footer";

export default function WeeklyPlanPage() {
    // =========================
    // STATE MANAGEMENT
    // =========================
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isPlanFetching, setIsPlanFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [planData, setPlanData] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // =========================
    // INITIAL LOAD VIA USELAYOUTEFFECT
    // =========================
    useEffect(() => {
        const initializePage = async () => {
            try {
                const response = await fetch("/api/WeeklyPlan/EnrollDetails", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();

                if (response.ok) {

                    setIsEnrolled(data.IsEnrolled);
                    if (data.IsEnrolled) {
                        await fetchWeeklyPlanOnLoad();
                    } else {
                        setShowModal(true);
                        setIsInitialLoading(false);
                    }
                } else {
                    console.log(response.error)
                    setIsInitialLoading(false);
                }
            } catch (err) {
                console.error("Initialization check failed:", err.message);
                setIsInitialLoading(false);
            }
        };

        initializePage();
    }, []);

    // =========================
    // TOAST TRIGGER LOGIC
    // =========================
    useEffect(() => {
        if (planData && planData.isCompleted && !planData.isFeedBackCompleted) {
            const timer = setTimeout(() => {
                setShowToast(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [planData]);

    // =========================
    // FETCH WEEKLY PLAN HANDLERS
    // =========================
    const fetchWeeklyPlanOnLoad = async () => {
        try {
            const response = await fetch("/api/WeeklyPlan", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok) {

                setPlanData(data.result);
                setIsCompleted(false);
            }

        } catch (err) {
            console.error("Plan pipeline fetching failed:", err.message);
        } finally {
            setIsInitialLoading(false);
        }
    };

    const fetchWeeklyPlan = async (day = null) => {
        try {
            setIsPlanFetching(true);
            const url = day ? `/api/WeeklyPlan?day=${day}` : "/api/WeeklyPlan";
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {

                setPlanData(data.result);
                setIsCompleted(false);
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error("Plan fetch failed:", err);
        } finally {
            setIsPlanFetching(false);
        }
    };

    // =========================
    // ENROLL USER
    // =========================
    const handleEnroll = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/WeeklyPlan", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                console.log("handle api called ")
                setIsEnrolled(true);
                setShowModal(false);
                await fetchWeeklyPlan();
            }
        } catch (err) {
            console.error("Enrollment failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // =========================
    // SKELETON UI COMPONENTS
    // =========================
    const FullPageSkeleton = () => (
        <div className="max-w-5xl mx-auto w-full space-y-8 animate-pulse p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-3 w-full md:w-1/3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-full md:w-1/4"></div>
            </div>
            <div className="h-32 bg-gray-200 rounded-2xl w-full"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-96 bg-gray-200 rounded-3xl"></div>
                <div className="h-80 bg-gray-200 rounded-3xl"></div>
            </div>
        </div>
    );

    // Dynamic Micro Skeleton Component for dark container text blocks
    const InlineSkeleton = ({ className = "h-6 w-32" }) => (
        <span className={`inline-block bg-white/10 rounded animate-pulse ${className}`} />
    );

    // Dynamic Micro Skeleton Component for sidebar/light content areas
    const LightInlineSkeleton = ({ className = "h-4 w-16" }) => (
        <span className={`inline-block bg-gray-200 rounded animate-pulse ${className}`} />
    );

    // =========================
    // INITIAL MODAL
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
                <div>
                    <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">
                        Initialize Weekly Protocol
                    </h2>

                    <p className="text-sm text-[#5C6361] leading-relaxed mb-6">
                        Welcome to your 7-Day Protocol. This structured program provides
                        one targeted task per day designed to optimize your recovery and
                        well-being.
                    </p>

                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8">
                        <div className="flex gap-3">
                            <AlertTriangle className="text-amber-600 shrink-0" size={18} />
                            <p className="text-[11px] text-amber-800 leading-tight font-medium">
                                <span className="font-bold uppercase block mb-1">Important Notice:</span>
                                Enrolling will pause diagnostic report generation for 7 days to ensure accurate monitoring.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleEnroll}
                        disabled={isLoading}
                        className="w-full py-4 bg-[#8B7E66] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#766b56] transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Processing..." : "Enroll Now"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );

    if (isInitialLoading) {
        return (
            <div className="min-h-screen bg-[#F8F9F7] flex items-center justify-center py-8">
                <FullPageSkeleton />
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

            <AnimatePresence>
                {showModal && <EnrollmentModal />}
            </AnimatePresence>

            {planData && (
                <div className={`max-w-5xl mx-auto transition-all duration-500 ${showModal ? "blur-md" : "blur-0"}`}>

                    {/* 1. TOP NAVIGATION & HEADER */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <Link href="/HomePage" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#4A675D] mb-4 hover:opacity-70">
                                <ArrowLeft size={14} /> Back
                            </Link>
                            <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-[#8B7E66] mb-2">Active Protocol</h1>
                            <h2 className="text-4xl font-serif text-[#1A1F1E] tracking-tight">{planData.plantype}</h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="px-4 py-2.5 bg-white border border-[#DCE4E1] rounded-xl shadow-sm flex items-center gap-2">
                                <Target size={16} className="text-[#4A675D]" />
                                <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider flex items-center gap-1">
                                    Plan Goal:{" "}
                                    {isPlanFetching ? (
                                        <LightInlineSkeleton className="h-3.5 w-24" />
                                    ) : (
                                        <span className="text-[#1A1F1E] font-black">{planData.goalfocus}</span>
                                    )}
                                </span>
                            </div>

                            {(() => {
                                const isComp = planData.isCompleted;
                                const isFeedComp = planData.isFeedBackCompleted;

                                if (isComp && isFeedComp) {
                                    return (
                                        <button
                                            onClick={() => window.location.href = `/FeedBackReport?id=${planData.id}`}
                                            className="px-5 py-2.5 rounded-xl bg-[#8B7E66] text-white shadow-md hover:bg-[#766b56] flex items-center gap-2 transition-all duration-300 font-bold uppercase text-[11px] tracking-widest cursor-pointer"
                                        >
                                            <ClipboardList size={16} />
                                            Feedback Report
                                        </button>
                                    );
                                }

                                return (
                                    <button
                                        disabled={!isComp}
                                        onClick={() => window.location.href = `/FeedBackForm?planid=${planData.id}?id=${planData.finalLayerId}`}
                                        className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 font-bold uppercase text-[11px] tracking-widest
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

                    {/* 2. DYNAMIC TIMELINE TRACKER (DESKTOP) & CALENDAR STRIP (MOBILE) */}
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#E5E9E7] mb-10 overflow-hidden relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-[#4A675D]/10 rounded-xl text-[#4A675D]">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Timeline Schedule</h3>
                                    <p className="text-base font-bold text-[#1A1F1E] flex items-center gap-1.5">
                                        Day {isPlanFetching ? <LightInlineSkeleton className="h-4 w-4" /> : planData.showingDay} Active View
                                    </p>
                                </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#4A675D] bg-[#F0F4F2] px-4 py-2 rounded-xl border border-[#DCE4E1] flex items-center gap-1">
                                STATUS: DAY {isPlanFetching ? <LightInlineSkeleton className="h-3 w-4 bg-[#4A675D]/10" /> : planData.currentDay} UNLOCKED
                            </span>
                        </div>

                        {/* DESKTOP TIMELINE DISPLAY */}
                        <div className="hidden md:block relative px-4 pt-4 pb-2">
                            <div className="absolute top-9 left-0 w-full h-[2px] bg-gray-100 rounded-full" />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((planData.currentDay - 1) / 6) * 100}%` }}
                                className="absolute top-9 left-0 h-[2px] bg-gradient-to-r from-[#8B7E66] to-[#4A675D] rounded-full z-10"
                            />

                            <div className="relative flex justify-between z-20">
                                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                                    const isPast = day < planData.currentDay;
                                    const isCurrent = day === planData.showingDay;
                                    const isLocked = day > planData.currentDay;

                                    return (
                                        <div key={day} className="flex flex-col items-center">
                                            <button
                                                disabled={isLocked || isPlanFetching}
                                                onClick={() => fetchWeeklyPlan(day)}
                                                className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 font-bold text-sm
                                                    ${isCurrent ? "bg-[#4A675D] border-[#4A675D] text-white shadow-[0_10px_20px_rgba(74,103,93,0.25)] scale-110" :
                                                        !isLocked ? "bg-white border-[#4A675D] text-[#4A675D] hover:bg-[#4A675D]/5" :
                                                            "bg-gray-50 border-gray-200 text-gray-300 pointer-events-none"}`}
                                            >
                                                {isPast ? <CheckCircle2 size={18} /> : <span>{day}</span>}
                                            </button>
                                            <span className={`mt-3 text-[10px] font-black uppercase tracking-wider ${isCurrent ? "text-[#4A675D]" : "text-gray-400"}`}>
                                                DAY {day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* MOBILE CALENDAR ROW STRIP */}
                        <div className="block md:hidden">
                            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
                                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                                    const isPast = day < planData.currentDay;
                                    const isCurrent = day === planData.showingDay;
                                    const isLocked = day > planData.currentDay;

                                    return (
                                        <button
                                            key={day}
                                            disabled={isLocked || isPlanFetching}
                                            onClick={() => fetchWeeklyPlan(day)}
                                            className={`flex-1 min-w-[68px] snap-center p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300
                                                ${isCurrent ? "bg-[#4A675D] border-[#4A675D] text-white shadow-lg" :
                                                    !isLocked ? "bg-white border-gray-200 text-[#4A675D]" :
                                                        "bg-gray-50/50 border-gray-100 text-gray-300 opacity-60 pointer-events-none"}`}
                                        >
                                            <span className={`text-[9px] font-black tracking-wider uppercase ${isCurrent ? "text-white/70" : "text-gray-400"}`}>
                                                Day 0{day}
                                            </span>
                                            <div className="flex items-center justify-center w-6 h-6">
                                                {isLocked ? (
                                                    <Lock size={14} className="text-gray-300" />
                                                ) : isPast ? (
                                                    <CheckCircle2 size={16} className={isCurrent ? "text-white" : "text-[#4A675D]"} />
                                                ) : (
                                                    <span className="text-sm font-black tracking-tight">{day}</span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 3. ENERGETIC SCHEDULE CONTENT & UTILITY SIDEBAR */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* SCHEDULE MAIN PANEL */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-[#2D3A36] via-[#24332E] to-[#1A2421] text-white rounded-3xl overflow-hidden shadow-xl relative border border-white/5"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />

                                <div className="p-8 md:p-12 relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md mb-8">
                                        <span className="w-2 h-2 rounded-full bg-[#A8E6CF] animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#A8E6CF]">Protocol Node Unlocked</span>
                                    </div>

                                    <h3 className="text-[11px] font-bold uppercase text-[#8B7E66] mb-3 tracking-[0.2em]">Target Activity</h3>

                                    {/* Task Title Inline Loading */}
                                    <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight tracking-tight min-h-[40px]">
                                        {isPlanFetching ? (
                                            <InlineSkeleton className="h-9 w-4/5" />
                                        ) : (
                                            planData.TodayTask?.taskTitle
                                        )}
                                    </h2>

                                    {/* Task Detail Description Inline Loading */}
                                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm mb-8 min-h-[92px]">
                                        {isPlanFetching ? (
                                            <div className="space-y-2.5">
                                                <InlineSkeleton className="h-4 w-full" />
                                                <InlineSkeleton className="h-4 w-5/6" />
                                            </div>
                                        ) : (
                                            <p className="text-[#C8D1CE] text-base md:text-lg leading-relaxed font-light italic">
                                                "{planData.TodayTask?.task}"
                                            </p>
                                        )}
                                    </div>

                                    {/* METRICS ROW CARDS */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-white/10 mb-8">
                                        <div className="flex items-center gap-3.5 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[#8B7E66]">
                                                <Clock size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Duration</p>
                                                {isPlanFetching ? (
                                                    <InlineSkeleton className="h-5 w-16 mt-0.5" />
                                                ) : (
                                                    <span className="text-base font-bold tracking-tight">{planData.TodayTask?.taskDuration}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3.5 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[#8B7E66]">
                                                <Zap size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Intensity</p>
                                                {isPlanFetching ? (
                                                    <InlineSkeleton className="h-5 w-16 mt-0.5" />
                                                ) : (
                                                    <span className="text-base font-bold uppercase tracking-tight">{planData.difficultyLevel}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3.5 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                                            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[#8B7E66]">
                                                <Goal size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Focus Area</p>
                                                {isPlanFetching ? (
                                                    <InlineSkeleton className="h-5 w-20 mt-0.5" />
                                                ) : (
                                                    <span className="text-base font-bold uppercase tracking-tight">{planData.TodayTask?.taskFocusArea}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setIsCompleted(true)}
                                        disabled={isCompleted || isPlanFetching}
                                        className={`group w-full py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl text-xs md:text-sm
                                            ${isCompleted
                                                ? "bg-emerald-500/20 text-emerald-400 cursor-default border border-emerald-500/30 shadow-none"
                                                : "bg-[#4A675D] hover:bg-[#5a7d71] text-white hover:shadow-lg shadow-[#4A675D]/10 disabled:opacity-50"
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

                        {/* UTILITY SIDEBAR SIDE PANEL */}
                        {/* <div className="space-y-6">
                            <div className="bg-white p-8 rounded-3xl border border-[#E5E9E7] shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8B7E66] mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                    <Shield size={16} /> Guidelines & Safety
                                </h4>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center border-b border-gray-50 pb-3.5">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Difficulty</span>
                                        {isPlanFetching ? (
                                            <LightInlineSkeleton className="h-5 w-14" />
                                        ) : (
                                            <span className="text-sm font-black text-[#1A1F1E]">{planData.difficultyLevel}</span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-50 pb-3.5">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Safety Level</span>
                                        {isPlanFetching ? (
                                            <LightInlineSkeleton className="h-5 w-16" />
                                        ) : (
                                            <span className="text-sm font-black text-emerald-600 uppercase italic tracking-tight">{planData.safetyLevel}</span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-50 pb-3.5">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Plan Status</span>
                                        {isPlanFetching ? (
                                            <LightInlineSkeleton className="h-5 w-20" />
                                        ) : (
                                            <span className="text-xs font-mono font-bold text-[#4A675D] bg-[#F0F4F2] px-2.5 py-1 rounded-lg border border-[#DCE4E1]">
                                                {planData.isCompleted ? "COMPLETED" : "IN PROGRESS"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="space-y-6">
                            <div className="bg-white p-6 md:p-8 rounded-sm border border-[#DCE4E1] shadow-xl relative overflow-hidden">
                                {/* Decorative subtle top edge border accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-[#4A675D]" />

                                {/* Section Title */}
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B7E66] mb-6 flex items-center gap-2 pb-4 border-b border-[#F0F2F1]">
                                    <Shield size={15} className="text-[#4A675D]" /> Guidelines & Safety
                                </h4>

                                {/* Info Rows Container */}
                                <div className="space-y-5">

                                    {/* ROW 1: START DATE */}
                                    <div className="flex justify-between items-center border-b border-[#F8F9F8] pb-3.5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                            <Calendar size={12} className="text-gray-400" /> Start Date
                                        </span>
                                        {isPlanFetching ? (
                                            <LightInlineSkeleton className="h-5 w-24" />
                                        ) : (
                                            <span className="text-xs font-mono font-bold text-[#1A1F1E]">
                                                {planData?.startedAt
                                                    ? new Date(planData.startedAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    }).toUpperCase()
                                                    : "NOT STARTED"
                                                }
                                            </span>
                                        )}
                                    </div>

                                    {/* ROW 2: DIFFICULTY */}
                                    <div className="flex justify-between items-center border-b border-[#F8F9F8] pb-3.5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Difficulty</span>
                                        {isPlanFetching ? (
                                            <LightInlineSkeleton className="h-5 w-14" />
                                        ) : (
                                            <span className="text-xs font-bold text-[#1A1F1E] bg-stone-50 border border-stone-200 px-2 py-0.5 rounded text-[11px]">
                                                {planData?.difficultyLevel || "Normal"}
                                            </span>
                                        )}
                                    </div>

                                    {/* ROW 3: SAFETY LEVEL */}
                                    <div className="flex justify-between items-center border-b border-[#F8F9F8] pb-3.5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Safety Level</span>
                                        {isPlanFetching ? (
                                            <LightInlineSkeleton className="h-5 w-16" />
                                        ) : (
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-tight bg-emerald-50/50 px-2 py-0.5 rounded border border-emerald-100 text-[10px]">
                                                {planData?.safetyLevel || "SECURE"}
                                            </span>
                                        )}
                                    </div>

                                    {/* ROW 4: PLAN STATUS */}
                                    <div className="flex justify-between items-center pb-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Plan Status</span>
                                        {isPlanFetching ? (
                                            <LightInlineSkeleton className="h-5 w-20" />
                                        ) : (
                                            <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${planData?.isCompleted
                                                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                                : "text-[#4A675D] bg-[#F0F4F2] border-[#DCE4E1]"
                                                }`}>
                                                {planData?.isCompleted ? "COMPLETED" : "IN PROGRESS"}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className="mt-10">

                <Footer></Footer>
            </div>
        </div>
    );
}