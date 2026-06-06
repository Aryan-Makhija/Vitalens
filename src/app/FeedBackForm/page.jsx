"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Send,
    Loader2,
    History,
    Zap,
    Brain,
    Moon,
    Droplets,
    Activity,
    CheckCircle,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function TaskFeedbackPage({ }) {




    const searchParams = useSearchParams();
    const weeklyplanId = searchParams.get('planid');
    const finalLayerId = searchParams.get('id');
    // console.log(weeklyplanId)
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [report, setReport] = useState(null);
    const [formData, setFormData] = useState({
        feedbackText: "",
        energyLevel: 3,
        stressLevel: 3,
        sleepQuality: 3,
        hydrationLevel: 3,
        activityLevel: 3,
        adherenceScore: 3,
    });

    const formdata = {
        weeklyplanId,
        ...formData
    }

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: parseInt(value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/FeedBack", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });
            const data = await response.json();
            setReport(data.report);

            console.log(formData)
        } catch (err) {
            console.error("Submission failed", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // =========================
    // SUB-COMPONENTS
    // =========================
    const ScaleInput = ({ label, value, id, icon: Icon }) => (
        <div className="bg-white p-6 rounded-2xl border border-[#E5E9E7] shadow-sm mb-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4A675D]/5 rounded-lg text-[#4A675D]"><Icon size={18} /></div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#1A1F1E]">{label}</span>
                </div>
                <span className="text-lg font-serif text-[#8B7E66]">{value}/5</span>
            </div>
            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={value}
                onChange={(e) => handleInputChange(id, e.target.value)}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#4A675D]"
            />
            <div className="flex justify-between mt-2 px-1 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                <span>Low</span>
                <span>Optimal</span>
            </div>
        </div>
    );

    if (isSubmitting) {
        return (
            <div className="min-h-screen bg-[#F8F9F7] flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-8">
                    <Loader2 className="text-[#4A675D] animate-spin" size={64} strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity size={20} className="text-[#8B7E66] animate-pulse" />
                    </div>
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F1E] mb-3">Syncing Recovery Data</h2>
                <p className="text-[#5C6361] max-w-sm italic font-light leading-relaxed">
                    Compiling your responses and cross-referencing with baseline biomarkers to generate your stability report...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9F7] py-12 px-4 font-sans selection:bg-[#A8E6CF]">
            <div className="max-w-4xl mx-auto">

                {/* Navigation */}
                <div className="flex justify-between items-center mb-12">
                    <Link href="/WeeklyPlan" className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#4A675D] hover:opacity-60 transition-opacity">
                        <ArrowLeft size={14} /> Close Session
                    </Link>
                    <Link href={`ReportDetail?id=${finalLayerId}`}>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2D3A36] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#1A2421] transition-all shadow-lg shadow-[#2D3A36]/20">
                            <History size={14} /> Your last Report
                        </button>
                    </Link>
                </div>

                {!report ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Progress Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div>
                                <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B7E66] mb-4">Post-Task Analysis</h1>
                                <h2 className="text-4xl font-serif text-[#1A1F1E] leading-tight">Biometric Feedback</h2>
                            </div>

                            <div className="space-y-4">
                                <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${step === 1 ? 'bg-white shadow-sm border border-[#E5E9E7]' : 'opacity-40'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step === 1 ? 'bg-[#4A675D] text-white' : 'bg-gray-200'}`}>01</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Internal Vitals</span>
                                </div>
                                <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${step === 2 ? 'bg-white shadow-sm border border-[#E5E9E7]' : 'opacity-40'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step === 2 ? 'bg-[#4A675D] text-white' : 'bg-gray-200'}`}>02</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Adherence</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Area */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <ScaleInput label="Energy Level" id="energyLevel" value={formData.energyLevel} icon={Zap} />
                                        <ScaleInput label="Stress Resilience" id="stressLevel" value={formData.stressLevel} icon={Brain} />
                                        <ScaleInput label="Sleep Restoration" id="sleepQuality" value={formData.sleepQuality} icon={Moon} />
                                        <ScaleInput label="Hydration Status" id="hydrationLevel" value={formData.hydrationLevel} icon={Droplets} />

                                        <button
                                            onClick={() => setStep(2)}
                                            className="w-full py-5 bg-[#4A675D] text-white rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3d564d] transition-all"
                                        >
                                            Next Stage <ChevronRight size={18} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <ScaleInput label="Physical Activity" id="activityLevel" value={formData.activityLevel} icon={Activity} />
                                        <ScaleInput label="Protocol Adherence" id="adherenceScore" value={formData.adherenceScore} icon={CheckCircle} />

                                        <div className="bg-white p-8 rounded-3xl border border-[#E5E9E7] shadow-sm">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">Observation Notes</label>
                                            <textarea
                                                required
                                                className="w-full h-40 bg-gray-50 border-none rounded-2xl p-6 text-sm text-[#2D3331] focus:ring-1 focus:ring-[#4A675D]/20 transition-all placeholder:italic"
                                                placeholder="Share any specific qualitative changes or barriers encountered..."
                                                value={formData.feedbackText}
                                                onChange={(e) => setFormData(prev => ({ ...prev, feedbackText: e.target.value }))}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="flex-1 py-5 border-2 border-[#DCE4E1] text-[#8B7E66] rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className="flex-[2] py-5 bg-[#2D3A36] text-white rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#1A2421] transition-all shadow-xl shadow-[#2D3A36]/20"
                                            >
                                                Finalize Report <Send size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto bg-white p-12 rounded-[40px] border border-[#E5E9E7] shadow-2xl relative"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#A8E6CF]/20 text-[#4A675D] rounded-full flex items-center justify-center mb-8">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-3xl font-serif text-[#1A1F1E] mb-6">Insight Generated</h2>
                            <div className="w-full text-left bg-gray-50 p-8 rounded-3xl mb-10 text-[#5C6361] leading-relaxed italic font-light">
                                {report}
                            </div>
                            <button
                                onClick={() => { setReport(null); setStep(1); }}
                                className="w-full py-5 bg-[#4A675D] text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:opacity-90"
                            >
                                Submit Another Protocol
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div >
    );
}