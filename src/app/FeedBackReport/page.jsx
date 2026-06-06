"use client";

import React, { useState, useEffect } from "react";
import { 
    ArrowLeft, 
    ShieldAlert, 
    TrendingUp, 
    Heart, 
    AlertTriangle, 
    FileText, 
    Activity, 
    CheckCircle2, 
    ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function FeedbackReportPage() {
    // Unwrapping searchParams using React.use() as required in Next.js modern versions

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState(null);

    // =========================
    // FETCH REPORT DATA WITH QUERY PARAM
    // =========================
    useEffect(() => {
        const fetchReport = async () => {
            if (!id) return;
            
            try {
                setIsLoading(true);
                // Making api call passing the exact planid from searchParams
                const response = await fetch(`/api/FeedBack/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    setReportData(data.Report);
                } else {
                    console.error("Failed to load report:", data.error);
                }
            } catch (err) {
                console.error("Error fetching feedback report:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    // =========================
    // LOADING SCREEN
    // =========================
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9F7] text-xs font-bold uppercase tracking-widest text-[#4A675D] p-4 text-center">
                <div className="space-y-2">
                    <div className="w-6 h-6 border-2 border-[#4A675D] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p>Analyzing Protocol Data...</p>
                </div>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9F7] p-6 text-center">
                <p className="text-gray-500 mb-4 text-sm">No report data found for this protocol ID.</p>
                <Link href="/HomePage" className="text-sm font-bold uppercase tracking-widest text-[#4A675D] hover:underline">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9F7] py-6 px-4 sm:py-10 sm:px-6 font-sans text-[#2D3331]">
            <div className="max-w-5xl mx-auto">
                
                {/* 1. TOP NAVIGATION & HEADER */}
                <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <Link href="/WeeklyPlan" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#4A675D] mb-3 hover:opacity-70 transition-opacity">
                            <ArrowLeft size={14} /> Back to Protocol
                        </Link>
                        <h1 className="text-xs font-bold uppercase tracking-[0.3em] text-[#8B7E66] mb-1">Analysis Complete</h1>
                        <h2 className="text-2xl sm:text-4xl font-serif text-[#1A1F1E] tracking-tight">Weekly Progress Report</h2>
                    </div>

                    {/* Escalation Status Badge */}
                    <div className="flex items-center w-full sm:w-auto">
                        {reportData.escalationRequired ? (
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center justify-center sm:justify-start gap-2 shadow-sm text-[11px] font-bold uppercase tracking-wider">
                                <AlertTriangle size={16} className="text-rose-600 shrink-0" /> Escalation Advised
                            </div>
                        ) : (
                            <div className="w-full sm:w-auto px-4 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center sm:justify-start gap-2 shadow-sm text-[11px] font-bold uppercase tracking-wider">
                                <ShieldCheck size={16} className="text-emerald-600 shrink-0" /> Protocol Stable
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. OVERVIEW METRICS BLOCK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Sentiment Analysis Card */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E9E7] shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">User Sentiment</span>
                            <h3 className="text-lg sm:text-xl font-serif text-[#1A1F1E] capitalize">{reportData.sentiments || "Stable"}</h3>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-500">
                            <Heart size={14} className="text-[#4A675D]" /> Evaluated from logs
                        </div>
                    </div>

                    {/* Overall Trend Card */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E9E7] shadow-sm flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Overall Trend</span>
                            <h3 className="text-lg sm:text-xl font-serif text-[#1A1F1E] capitalize">{reportData.overallTrend || "No Shift"}</h3>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-500">
                            <TrendingUp size={14} className="text-[#4A675D]" /> Macro trajectory
                        </div>
                    </div>

                    {/* Red Flags Status Card */}
                    <div className={`p-5 sm:p-6 rounded-2xl border shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1 transition-all ${
                        reportData.redFlagDetected 
                            ? "bg-rose-50/60 border-rose-100 text-rose-900" 
                            : "bg-white border-[#E5E9E7]"
                    }`}>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Red Flags</span>
                            <h3 className={`text-lg sm:text-xl font-serif ${reportData.redFlagDetected ? "text-rose-700 font-bold" : "text-[#1A1F1E]"}`}>
                                {reportData.redFlagDetected ? "Flagged / Active" : "Clear"}
                            </h3>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100/50 flex items-center gap-2 text-xs text-gray-500">
                            <ShieldAlert size={14} className={reportData.redFlagDetected ? "text-rose-500" : "text-gray-400"} /> 
                            Automated safety audit
                        </div>
                    </div>
                </div>

                {/* 3. CORE COMPARISON MATRIX & DATA TABLES */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* THE BEFORE & AFTER EFFECT TABLE */}
                        <div className="bg-white rounded-2xl border border-[#E5E9E7] shadow-sm overflow-hidden">
                            <div className="p-5 sm:p-6 border-b border-[#E5E9E7] bg-gray-50/50">
                                <h3 className="text-xs font-black uppercase tracking-wider text-[#1A1F1E] flex items-center gap-2">
                                    <Activity size={16} className="text-[#4A675D]" /> Symptom Timeline & Shift Matrix
                                </h3>
                            </div>
                            
                            {/* Horizontal scrolling containment helper */}
                            <div className="overflow-x-auto w-full scrollbar-thin">
                                <table className="w-full text-left border-collapse min-w-[500px]">
                                    <thead>
                                        <tr className="border-b border-[#E5E9E7] text-[10px] font-black uppercase tracking-wider text-gray-400 bg-gray-50/30">
                                            <th className="py-4 px-4 sm:px-6">Metric Area</th>
                                            <th className="py-4 px-4 sm:px-6">Previous Severity (Before)</th>
                                            <th className="py-4 px-4 sm:px-6">Current State (After)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {reportData.concernComparison?.map((item, index) => (
                                            <tr key={`concern-${index}`} className="hover:bg-gray-50/50 transition-colors text-sm">
                                                <td className="py-4 px-4 sm:px-6 font-medium text-[#1A1F1E] break-words max-w-[180px]">{item.area}</td>
                                                <td className="py-4 px-4 sm:px-6">
                                                    <span className="inline-flex px-2.5 py-1 bg-amber-50 border border-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded-md">
                                                        {item.previousSeverity}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 sm:px-6">
                                                    <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider ${
                                                        item.currentState === "improving" ? "text-emerald-600" : "text-gray-600"
                                                    }`}>
                                                        {item.currentState === "improving" && <CheckCircle2 size={12} />}
                                                        {item.currentState}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}

                                        {reportData.positiveComaparison?.map((item, index) => (
                                            <tr key={`positive-${index}`} className="hover:bg-gray-50/50 transition-colors text-sm border-t border-dashed">
                                                <td className="py-4 px-4 sm:px-6 font-medium text-[#1A1F1E] break-words max-w-[180px]">{item.signal || "Wellness Signal"}</td>
                                               <td className="py-4 px-4 sm:px-6">
                                                    <span className="inline-flex px-2.5 py-1 bg-amber-50 border border-amber-100 text-amber-800 text-[10px] font-bold uppercase rounded-md">
                                                        {item.previousStrength}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 sm:px-6">
                                                    <span className="inline-flex px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-md">
                                                        {item.currentState || "Positive"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* COMPARISON REASONING / INSIGHT BLOCK */}
                        <div className="bg-gradient-to-br from-[#2D3A36] via-[#24332E] to-[#1A2421] text-white p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#A8E6CF] block mb-2">Clinical Logic & Observations</span>
                                <h4 className="text-lg sm:text-xl font-serif mb-3 text-[#F8F9F7]">Comparison Reasoning</h4>
                                <p className="text-[#C8D1CE] text-sm leading-relaxed font-light italic">
                                    "{reportData.comparisonReasoning || "No comparative anomaly noted during this programmatic lifecycle."}"
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full translate-x-10 -translate-y-10 hidden sm:block" />
                        </div>
                    </div>

                    {/* SIDEBAR STATUS ASSIGNMENTS */}
                    <div className="w-full">
                        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E5E9E7] shadow-sm">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8B7E66] mb-6 flex items-center gap-2">
                                <FileText size={16} /> Protocol Update
                            </h4>

                            <div className="space-y-6">
                                <div className="border-b border-gray-50 pb-4">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter block mb-1">New System Status</span>
                                    <span className="text-base font-black text-emerald-500  tracking-tight block capitalize">
                                        {reportData.newStatus || "Maintained"}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter block mb-2">Next Direct Action</span>
                                    <p className="text-xs text-[#5C6361] leading-relaxed">
                                        Your metrics indicate transactional structural progress. Continue historical dynamic verification profiles as assigned on your calendar grid.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}