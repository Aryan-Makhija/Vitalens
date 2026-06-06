"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ShieldCheck, Zap, AlertTriangle,
    Calendar, Brain, ChevronRight, LayoutDashboard, Circle, Home, RefreshCcw, FileText,
    Clock
} from "lucide-react";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

export default function ReportDetail() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [statusMsg, setStatusMsg] = useState("Accessing Clinical Archives...");
    const [reportData, setReportData] = useState(null);
    const [concern, setconcern] = useState([]);
    const [postivesignals, setpositivesignals] = useState([]);
    const [suggestions, setsuggestions] = useState([]);
    const [diagnosisTimestamp, setDiagnosisTimestamp] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        // Trigger fetch immediately on page render
        fetchLatestReport();
    }, []);

    const fetchSubTable = async (url, key) => {
        try {
            const res = await fetch(url, { method: "GET" });
            const data = await res.json();
            return data.result || {};
        } catch (err) {
            console.error(`Error fetching ${key}:`, err);
            return {};
        }
    };

    const fetchLatestReport = async () => {
        try {
            setError(false);
            setStatusMsg("Retrieving your health synthesis Report...");

            // Using GET since we are fetching the latest existing record
            const res = await fetch(`/api/FinalLayer/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error("Could not retrieve report data");

            const mainData = await res.json();
            const finalResult = mainData.result;
            setReportData(finalResult);


            // Fetching 'updatedAt' and formatting to 12-hour AM/PM format
            if (finalResult.updatedAt) {
                const dateObj = new Date(finalResult.updatedAt);
                const formattedDate = dateObj.toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
                setDiagnosisTimestamp(formattedDate);
            }

            if (finalResult) {
                const tasks = [];
                if (finalResult.showConcerns) tasks.push(fetchSubTable(`/api/Concerns/${finalResult.layer2ReportId}`, "concerns").then(res => setconcern([res])));
                if (finalResult.showPositives) tasks.push(fetchSubTable(`/api/PositiveSignals/${finalResult.layer2ReportId}`, "signals").then(res => setpositivesignals([res])));
                if (finalResult.showSuggestions) tasks.push(fetchSubTable(`/api/Suggestions/${finalResult.layer2ReportId}`, "suggestions").then(res => setsuggestions([res])));
                await Promise.all(tasks);
            }

            // Short delay for smooth transition
            setTimeout(() => setLoading(false), 1500);
        } catch (err) {
            console.error("Report Retrieval Error:", err);
            setError(true);
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        if (status === 'RED') return 'text-red-600 bg-red-600';
        if (status === 'YELLOW') return 'text-amber-500 bg-amber-500';
        return 'text-emerald-500 bg-emerald-500';
    };

    // --- RENDER 1: ERROR STATE ---
    if (error) return (
        <div className="min-h-screen bg-[#F3F4F1] flex items-center justify-center p-6 text-center">
            <div className="max-w-md bg-white p-10 rounded-2xl shadow-xl border border-red-100">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText size={32} />
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">No Report Found</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    We couldn't find a previous diagnosis in your history. Please complete a health scan to generate your first clinical report.
                </p>
                <div className="flex flex-col gap-3">
                    <Link href="/Checkin" className="flex items-center justify-center gap-2 bg-[#4A675D] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#3d554c] transition-all">
                        <Zap size={18} /> Start New Diagnosis
                    </Link>
                    <Link href="/" className="flex items-center justify-center gap-2 text-[#4A675D] font-bold py-2 hover:underline">
                        <Home size={18} /> Return Home
                    </Link>
                </div>
            </div>
        </div>
    );

    // --- RENDER 2: LOADING STATE ---
    if (loading || !reportData) return <LoadingOverlay message={statusMsg} />;

    // --- RENDER 3: SUCCESS STATE ---
    return (
        <div className="min-h-screen bg-[#F3F4F1] py-12 px-4 md:px-6 font-sans text-[#2D3331]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-[#8B7E66] mb-2">Historical Records</h1>
                        <h2 className="text-4xl font-serif text-[#1A1F1E]">Your Clinical Synthesis</h2>
                    </div>
                    <Link href="/DiagnosisHistory" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4A675D] hover:text-[#2D3331] transition-colors pb-1 border-b border-transparent hover:border-[#2D3331]">
                        <Home size={14} /> Back to Diagnosis History
                    </Link>
                </div>

                <div className="bg-white shadow-2xl rounded-sm border border-[#DCE4E1] min-h-[1000px] flex flex-col overflow-hidden">
                    <div className="h-2 w-full bg-[#4A675D]" />

                    <div className="p-8 md:p-16 space-y-12">
                        {/* HEADER SECTION - Now includes the Timestamp for better balance */}
                        <section className="border-b border-gray-100 pb-10">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-8">

                                {/* Left Side: Main Status */}
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex items-center justify-center">
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className={`absolute w-3 h-3 rounded-full opacity-40 ${getStatusColor(reportData.finalStatus).split(' ')[1]}`}
                                            />
                                            <Circle className={`w-3 h-3 fill-current ${getStatusColor(reportData.finalStatus).split(' ')[0]}`} />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-tighter">Record Status: {reportData.finalStatus}</span>
                                    </div>
                                    <h3 className="text-3xl font-serif leading-tight">{reportData.statusHeadline}</h3>
                                    <p className="text-[#5C6361] text-sm leading-relaxed max-w-2xl italic">"{reportData.statusSummary}"</p>
                                </div>

                                {/* Right Side: Metadata (Timestamp + Risk) */}
                                <div className="flex flex-col gap-4 w-full md:w-auto">
                                    {/* Integrated Timestamp */}
                                    <div className="text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#4A675D] pl-4 md:pl-0 md:pr-4 py-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date of Issue</p>
                                        <p className="text-sm font-mono font-bold text-[#4A675D]">{diagnosisTimestamp || "MAR 30, 2026"}</p>
                                        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter mt-1">Digitally Verified</p>
                                    </div>

                                    {/* Risk Level Box */}
                                    <div className="w-full md:w-48 p-4 bg-gray-50 border border-gray-100 rounded-lg text-center">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Risk Level</p>
                                        <p className="text-2xl font-serif text-[#4A675D]">{reportData.escalationLevel}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CONCERNS */}
                        {reportData.showConcerns && concern.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-l-4 border-amber-500 pl-4">
                                    <h4 className="text-lg font-bold uppercase tracking-widest text-gray-800">Concern Areas</h4>
                                </div>
                                {concern.map((item, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-[#FCFAF7] rounded border border-[#F2EDE4] mb-4">
                                        <div className="md:col-span-1">
                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase block">Domain</span>
                                            <p className="font-bold text-gray-900">{item.area}</p>
                                        </div>
                                        <div className="md:col-span-3">
                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase block">Clinical Findings</span>
                                            <p className="text-sm text-gray-700 leading-relaxed">{item.possibleDrivers}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* BIOMETRICS */}
                        {reportData.showPositives && postivesignals.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-l-4 border-emerald-600 pl-4">
                                    <h4 className="text-lg font-bold uppercase tracking-widest text-gray-800">Positive Signals</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {postivesignals.map((sig, i) => (
                                        <div key={i} className="bg-white border border-[#DCE4E1] p-5 rounded-lg">
                                            <div className="flex justify-between items-end mb-4">
                                                <div>
                                                    <span className="text-[10px] font-bold text-[#8B7E66] uppercase block mb-0.5">Biomarker</span>
                                                    <span className="text-sm font-bold text-gray-900">{sig.signal}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold text-[#8B7E66] uppercase block mb-0.5">Strength</span>
                                                    <span className="text-xs font-mono font-bold text-emerald-600">{sig.strength}</span>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: sig.strength }}
                                                    transition={{ duration: 1 }}
                                                    className="h-full bg-emerald-500"
                                                />
                                            </div>
                                            <div className="pt-3 border-t border-gray-50">
                                                <p className="text-[12px] text-gray-600 leading-relaxed italic">
                                                    {sig.impact || "Signal remains within stable parameters."}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* PROTOCOLS */}

                        {reportData.showSuggestions && suggestions.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-l-4 border-[#4A675D] pl-4">
                                    <h4 className="text-lg font-bold uppercase tracking-widest text-gray-800">Recommended Protocols</h4>
                                </div>
                                <div className="space-y-6"> {/* Increased spacing between suggestion blocks */}
                                    {suggestions.map((item, i) => (
                                        <div key={i} className="flex gap-6 p-6 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 rounded-lg">
                                            {/* Number Indicator */}
                                            <div className="shrink-0 w-10 h-10 rounded-full bg-[#F3F4F1] flex items-center justify-center text-sm font-bold text-[#4A675D] border border-[#DCE4E1]">
                                                {i + 1}
                                            </div>

                                            <div className="flex-1">
                                                {/* Primary Suggestion Title */}
                                                <p className="text-lg font-bold text-gray-900 mb-2">{item.suggestion}</p>

                                                {/* Clinical Reason */}
                                                <div className="mb-4">
                                                    <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-1">Clinical Rationale</span>
                                                    <p className="text-sm text-gray-600 italic leading-relaxed">
                                                        "{item.reason}"
                                                    </p>
                                                </div>

                                                {/* Grid for Additional Fields */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-1">Protocol Type</span>
                                                        <div className="inline-block px-3 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-700">
                                                            {item.suggestionType || "General Wellness"}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-1">Risk Assessment</span>
                                                        <div className={`inline-block px-3 py-1 rounded text-xs font-bold ${item.riskLevel?.toLowerCase() === 'high'
                                                            ? 'bg-red-50 text-red-700'
                                                            : 'bg-emerald-50 text-emerald-700'
                                                            }`}>
                                                            {item.riskLevel || "Low Risk"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 5. WEEKLY PLAN */}
                        {reportData.showWeeklyPlan && (
                            <section className="mt-12 pt-12 border-t border-gray-100">
                                <div className="bg-[#1A1F1E] text-white p-8 rounded-xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-serif mb-4 flex items-center gap-2">
                                            <Calendar className="text-[#4A675D]" /> 7-Day Optimization Protocol
                                        </h4>
                                        <p className="text-sm text-gray-300 leading-relaxed mb-8 max-w-xl">
                                            A specialized weekly plan has been generated. Enrollment is optional, but recommended for consistent health improvements.
                                        </p>
                                        <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto px-8 py-3 bg-[#4A675D] hover:bg-[#3d554c] text-white rounded font-bold text-sm transition-all flex items-center justify-center gap-2">
                                            Enroll in Protocol <ChevronRight size={16} />
                                        </button>
                                    </div>
                                    <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-5" />
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* FOOTER NAV */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-20">
                    <div className="flex gap-8">
                        <Link href="/" className="flex items-center gap-2 text-[#4A675D] hover:text-[#2D3331] font-bold text-sm transition-colors">
                            <Home size={18} /> Home Dashboard
                        </Link>
                        <button onClick={() => window.print()} className="px-6 py-2 border border-[#DCE4E1] text-[#8B7E66] text-xs font-bold uppercase rounded-full bg-white hover:bg-gray-50 shadow-sm">
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>
            {/* ENROLLMENT MODAL COMPONENT */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-[#F3F4F1] rounded-full flex items-center justify-center text-[#4A675D]">
                                        <Calendar size={24} />
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <h3 className="text-2xl font-serif text-[#1A1F1E] mb-4">How to Enroll</h3>
                                <div className="bg-[#F8F9F8] border-l-4 border-[#4A675D] p-5 mb-8">
                                    <p className="text-[#2D3331] leading-relaxed">
                                        To enroll in the weekly plan, go to the <span className="font-bold text-[#4A675D]">dashboard</span> in the top in the navbar. Click on the <span className="font-bold text-[#4A675D]">weekly plan</span>, from there you can enroll in the plan.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/Dashboard"
                                        className="flex items-center justify-center gap-2 bg-[#4A675D] text-white py-4 rounded-xl font-bold hover:bg-[#3d554c] transition-all shadow-lg shadow-[#4A675D]/20"
                                    >
                                        <LayoutDashboard size={18} /> Go to Dashboard
                                    </Link>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 font-bold py-2 text-sm hover:text-gray-800"
                                    >
                                        Close and Stay on Report
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>




    );
}

const LoadingOverlay = ({ message }) => (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 fixed inset-0 z-50">
        <div className="text-center max-w-sm w-full">
            <div className="relative flex justify-center mb-10">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 border border-dashed border-[#4A675D]/20 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-5 border border-[#4A675D]/10 rounded-full"
                />
                <FileText size={64} className="text-[#4A675D] animate-pulse" />
            </div>
            <h2 className="font-serif text-2xl text-[#2D3331] mb-3 font-medium tracking-tight">Fetching Your Report</h2>
            <p className="text-[#8B7E66] text-[11px] font-bold uppercase tracking-[0.3em] opacity-80">{message}</p>
        </div>
    </div>
);


