
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    AlertTriangle, Calendar, Brain, ChevronRight,
    LayoutDashboard, Circle, Home, CheckCircle2, Zap
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function FinalReportPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [statusMsg, setStatusMsg] = useState("Initializing Final Synthesis...");
    const [reportData, setReportData] = useState(null);
    const [concern, setconcern] = useState([]);
    const [postivesignals, setpositivesignals] = useState([]);
    const [suggestions, setsuggestions] = useState([]);
    const [alreadyGenerated, setAlreadyGenerated] = useState(false);
    const router = useRouter();





    const hasRun = useRef(false);

    // 1. PREVENTION: Warn user before reload if process is active
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!alreadyGenerated && loading) {
                e.preventDefault();
                e.returnValue = "Analysis is in progress. Leaving now may interrupt the report.";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [alreadyGenerated, loading]);

    // 2. CORE LOGIC: Analysis Control
    useEffect(() => {
        // A. Check if a report was ALREADY generated in this session to prevent re-calls
        const isFinished = localStorage.getItem("report_generated") === "true";
        if (isFinished) {
            setAlreadyGenerated(true);
            setLoading(false);
            return;
        }

        // B. Trigger API: No ID required here as server-side handles it via cookies
        if (!hasRun.current) {
            hasRun.current = true;
            runFinalAnalysis();
        }
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

    const runFinalAnalysis = async () => {
        try {
            setError(false);
            setStatusMsg("Performing Multi-Layer Clinical Synthesis...");

            // Calling API - ID is handled server-side via cookies
            const res = await fetch("/api/FinalLayer", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });

            // If cookie is missing or server fails, res.ok will be false
            if (!res.ok) throw new Error("Synthesis Failed - Session or ID invalid");

            const mainData = await res.json();
            const finalResult = mainData.finalResult;

            setReportData(finalResult);

            // Lock the session so reload doesn't trigger the API again
            localStorage.setItem("report_generated", "true");

            if (finalResult) {
                const tasks = [];
                if (finalResult.showConcerns) tasks.push(fetchSubTable("/api/Concerns", "concerns").then(res => setconcern([res])));
                if (finalResult.showPositives) tasks.push(fetchSubTable("/api/PositiveSignals", "signals").then(res => setpositivesignals([res])));
                if (finalResult.showSuggestions) tasks.push(fetchSubTable("/api/Suggestions", "suggestions").then(res => setsuggestions([res])));
                await Promise.all(tasks);
            }

            setTimeout(() => setLoading(false), 2000);
        } catch (err) {
            console.error("Report Generation Error:", err);
            setError(true);
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        if (status === 'RED') return 'text-red-600 bg-red-600';
        if (status === 'YELLOW') return 'text-amber-500 bg-amber-500';
        return 'text-emerald-500 bg-emerald-500';
    };

    const backtohome = async () => {
        // Clear session lock if navigating away so user can start a fresh flow later
        try {

            const response = await fetch("/api/DeleteIds", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            })

            if (response.ok) {

                localStorage.removeItem("report_generated");
            localStorage.removeItem("phase2_completed")
            localStorage.removeItem("phase1AnalysisCompleted")
                router.push("/HomePage");

            }


        } catch (err) {
            console.log(err.message);
            return NextResponse.json({ message: err.message }, { status: 401 })
        }
    };


    const backtohome2 = () => {

        localStorage.removeItem("report_generated");
        router.push("/HomePage")


    }



    //     // --- RENDER 1: ALREADY GENERATED STATE ---
    if (alreadyGenerated) return (
        <div className="min-h-screen bg-[#F3F4F1] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-[#DCE4E1] text-center"
            >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">Report Already Generated</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    To maintain data integrity, the analysis protocol runs only once per session.
                    Your latest results are already secured in our clinical database.
                </p>
                <div className="flex flex-col gap-3">
                    <div onClick={backtohome2} className="flex items-center justify-center gap-2 bg-[#4A675D] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#3d554c] transition-all shadow-lg">
                        View Results in Dashboard <ChevronRight size={18} />
                    </div>
                    <div onClick={backtohome2} className="flex items-center justify-center gap-2 text-gray-400 font-bold py-2 hover:text-[#4A675D] transition-colors">
                        <Home size={18} /> Return Home
                    </div>
                </div>
            </motion.div>
        </div>
    );


    //     // --- RENDER 2: ERROR STATE ---
    if (error) return (
        <div className="min-h-screen bg-[#F3F4F1] flex items-center justify-center p-6 text-center">
            <div className="max-w-md bg-white p-10 rounded-2xl shadow-xl border border-red-100">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={32} />
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">Diagnosis Interrupted</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    We couldn't locate your clinical session data. This can happen if the page is refreshed or the connection timed out.
                    Please return home to restart the diagnosis process.
                </p>
                <div className="flex flex-col gap-3">
                    <div onClick={backtohome} className="cursor-pointer flex items-center justify-center gap-2 bg-[#4A675D] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#3d554c] transition-all">
                        <Home size={18} /> Go to Home Page
                    </div>
                    <div onClick={backtohome} className=" cursor-pointer flex items-center justify-center gap-2 text-[#4A675D] font-bold py-2 hover:underline">
                        <LayoutDashboard size={18} /> Open Dashboard
                    </div>
                </div>
            </div>
        </div>
    );


    // --- RENDER 3: LOADING STATE ---
    if (loading || !reportData) return <LoadingOverlay message={statusMsg} />;

    // --- RENDER 4: SUCCESS STATE (The Report) ---
    return (
        <div className="min-h-screen bg-[#F3F4F1] py-12 px-4 md:px-6 font-sans text-[#2D3331]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-[#8B7E66] mb-2">Patient Dossier</h1>
                        <h2 className="text-4xl font-serif text-[#1A1F1E]">Your Final Clinical Report</h2>
                    </div>
                    {/* TOP HOME BUTTON */}
                    <div onClick={backtohome2} className="cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4A675D] hover:text-[#2D3331] transition-colors pb-1 border-b border-transparent hover:border-[#2D3331]">
                        <Home size={14} /> Back to Home
                    </div>
                </div>

                {/* THE CLINICAL PAPER */}
                <div className="bg-white shadow-2xl rounded-sm border border-[#DCE4E1] min-h-[1000px] flex flex-col overflow-hidden">
                    <div className="h-2 w-full bg-[#4A675D]" />

                    <div className="p-8 md:p-16 space-y-12">
                        {/* 1. CLINICAL HEADER */}
                        <section className="border-b border-gray-100 pb-10">
                            <div className="flex flex-col md:flex-row justify-between gap-8">
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
                                        <span className="text-[11px] font-black uppercase tracking-tighter">System Status:  {reportData.finalStatus}</span>
                                    </div>
                                    <h3 className="text-3xl font-serif leading-tight">{reportData.statusHeadline}</h3>
                                    <p className="text-[#5C6361] text-sm leading-relaxed max-w-2xl italic">"{reportData.statusSummary}"</p>
                                </div>
                                <div className="w-full md:w-48 p-4 bg-gray-50 border border-gray-100 rounded-lg text-center self-start">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Escalation</p>
                                    <p className="text-2xl font-serif text-[#4A675D]">{reportData.escalationLevel}</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. CONCERNS */}
                        {reportData.showConcerns && concern.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-l-4 border-amber-500 pl-4">
                                    <h4 className="text-lg font-bold uppercase tracking-widest text-gray-800">Concern Areas</h4>
                                </div>
                                {concern.map((item, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-[#FCFAF7] rounded border border-[#F2EDE4] mb-4">
                                        <div className="md:col-span-1">
                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase block">Area</span>
                                            <p className="font-bold text-gray-900">{item.area}</p>
                                        </div>
                                        <div className="md:col-span-3">
                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase block">Observation</span>
                                            <p className="text-sm text-gray-700 leading-relaxed">{item.possibleDrivers}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}


                        {/* 3. VITAL SIGNALS SECTION */}
                        {reportData.showPositives && postivesignals.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-l-4 border-emerald-600 pl-4">
                                    <h4 className="text-lg font-bold uppercase tracking-widest text-gray-800">Biometric Signals</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {postivesignals.map((sig, i) => (
                                        <div key={i} className="bg-white border border-[#DCE4E1] p-5 rounded-lg hover:shadow-md transition-shadow">
                                            {/* Header: Signal Name & Value */}
                                            <div className="flex justify-between items-end mb-4">
                                                <div>
                                                    <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-0.5">Biomarker</span>
                                                    <span className="text-sm font-bold text-gray-900">{sig.signal}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-0.5">Strength</span>
                                                    <span className="text-xs font-mono font-bold text-emerald-600">{sig.strength}</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: sig.strength }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-emerald-500"
                                                />
                                            </div>

                                            {/* Secondary Info: Impact/Description */}
                                            <div className="pt-3 border-t border-gray-50">
                                                <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-1">Clinical Impact</span>
                                                <p className="text-[12px] text-gray-600 leading-relaxed italic">
                                                    {sig.impact || "Signal indicates optimal physiological baseline."}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 4. PROTOCOLS */}
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
                                        <button className="w-full sm:w-auto px-8 py-3 bg-[#4A675D] hover:bg-[#3d554c] text-white rounded font-bold text-sm transition-all flex items-center justify-center gap-2">
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
                        <div onClick={backtohome2} className="cursor-pointer flex items-center gap-2 text-[#4A675D] hover:text-[#2D3331] font-bold text-sm transition-colors">
                            <Home size={18} /> Home Page
                        </div>

                    </div>
                    <button onClick={() => window.print()} className="px-6 py-2 border border-[#DCE4E1] text-[#8B7E66] text-xs font-bold uppercase rounded-full bg-white hover:bg-gray-50 shadow-sm transition-all">
                        Download PDF Report
                    </button>
                </div>
            </div>
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
                <Brain size={64} className="text-[#4A675D] animate-pulse" />
            </div>
            <h2 className="font-serif text-2xl text-[#2D3331] mb-3 font-medium tracking-tight">Generating Final Report</h2>
            <p className="text-[#8B7E66] text-[11px] font-bold uppercase tracking-[0.3em] opacity-80">{message}</p>
        </div>
    </div>)



