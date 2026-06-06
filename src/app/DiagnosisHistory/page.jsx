"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    FileText,
    ChevronRight,
    ArrowLeft,
    Loader2,
    AlertCircle,
    Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DiagnosisHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Helper to determine color based on status text
    const getStatusStyles = (status) => {
        // const s = status?.toLowerCase() || "";
        if (status.includes("RED")) {
            return { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500", border: "border-red-200" };
        }
        if (status.includes("YELLOW")) {
            return { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500", border: "border-amber-200" };
        }
        return { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500", border: "border-emerald-200" };
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch("/api/DiagnosisHistory", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                    const data = await response.json();
                    setHistory(data.Allhistory || []);
                } else {
                    throw new Error("Failed to fetch history");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-6"
            >
                <Loader2 className="text-[#4A675D]" size={48} />
            </motion.div>
            <h2 className="text-xl font-serif text-[#2D3331] animate-pulse">
                Fetching your diagnosis history...
            </h2>
            <p className="text-[#8B7E66] text-sm mt-2">Securing your medical archives</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F6] pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-[#DCE4E1] sticky top-0 z-10 px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <Link href="/HomePage">
                        <button
                            className="flex items-center gap-2 text-[#4A675D] mb-4 hover:opacity-70 transition-all"
                        >
                            <ArrowLeft size={18} />
                            <span className="text-sm font-medium">Back</span>
                        </button>
                    </Link>
                    <h1 className="text-4xl font-serif text-[#1A1F1E] mb-2">Diagnosis History</h1>
                    <p className="text-[#8B7E66] text-sm italic">Accessing your journey toward optimal health.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-10">
                {error ? (
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center gap-4 text-red-700">
                        <AlertCircle size={24} />
                        <p>{error}</p>
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-[#DCE4E1] border-dashed">
                        <FileText size={48} className="mx-auto text-[#DCE4E1] mb-4" />
                        <p className="text-gray-500 font-serif text-xl">No prior records found.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {history.map((report, index) => {
                            const styles = getStatusStyles(report.finalStatus);
                            const date = report.createdAt ? new Date(report.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }) : "Unknown Date";

                            return (
                                <motion.div
                                    key={report.id || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -4 }}
                                    className="bg-white border border-[#DCE4E1] rounded-[1.5rem] p-6 cursor-pointer hover:shadow-2xl hover:shadow-[#4A675D]/5 transition-all group relative"
                                    onClick={() => router.push(`/ReportDetail?id=${report.finalResultsId}`)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex-1">
                                            {/* Meta Data & Pulsating Bulb */}
                                            <div className="flex items-center flex-wrap gap-4 mb-4">
                                                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#8B7E66] font-bold">
                                                    <Calendar size={14} className="text-[#4A675D]" />
                                                    {date}
                                                </div>

                                                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border} text-[10px] font-bold uppercase tracking-widest`}>
                                                    <span className="relative flex h-2 w-2">
                                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${styles.dot} opacity-75`}></span>
                                                        <span className={`relative inline-flex rounded-full h-2 w-2 ${styles.dot}`}></span>
                                                    </span>
                                                    {report.finalStatus || "Analyzed"}
                                                </div>
                                            </div>

                                            {/* Headline */}
                                            <h3 className="text-2xl font-serif text-[#1A1F1E] mb-3 group-hover:text-[#4A675D] transition-colors leading-tight">
                                                {report.statusHeadline}
                                            </h3>

                                            {/* Summary */}
                                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 italic">
                                                {report.statusSummary.substring(0, 120)}
                                                <span className="text-[#4A675D] font-black not-italic ml-1">...</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center self-end md:self-center">
                                            <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] flex items-center justify-center text-[#4A675D] group-hover:bg-[#4A675D] group-hover:text-white transition-all shadow-sm">
                                                <ChevronRight size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}