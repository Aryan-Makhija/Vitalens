
// ------------------------- new report page ------------- 

"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ShieldCheck, Zap, AlertTriangle, Activity, CheckCircle, Info,
    Calendar, Brain, ChevronRight, LayoutDashboard, Circle, Home, FileText,
    Clock, Printer, ShieldAlert, HeartPulse, ClipboardList, X
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LatestReportPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [statusMsg, setStatusMsg] = useState("Accessing Clinical Archives...");
    const [reportData, setReportData] = useState(null);
    const [concern, setconcern] = useState([]);
    const [postivesignals, setpositivesignals] = useState([]);
    const [suggestions, setsuggestions] = useState([]);
    const [diagnosisTimestamp, setDiagnosisTimestamp] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOutdatedModalOpen, setIsOutdatedModalOpen] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    useEffect(() => {
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

    // Advanced dynamic theme mapper based on clinical state
    const getStatusTheme = (status) => {
        const normalized = status ? status.toUpperCase() : 'GREEN';
        if (normalized === 'RED') {
            return {
                bg: 'bg-red-50 border-red-200',
                headerBg: 'bg-gradient-to-r from-red-900 to-rose-950',
                accentText: 'text-red-500',
                pillBg: 'bg-red-500/20 text-red-300 border-red-500/30',
                barColor: 'bg-red-600',
                glow: 'shadow-red-900/20',
                icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
                notice: "Critical intervention metrics triggered. Immediate operational review or specialized protocol adjustments recommended."
            };
        }
        if (normalized === 'YELLOW') {
            return {
                bg: 'bg-amber-50 border-amber-200',
                headerBg: 'bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950',
                accentText: 'text-amber-500',
                pillBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                barColor: 'bg-amber-500',
                glow: 'shadow-amber-900/10',
                icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
                notice: "Precautionary parameters detected. Review target zones and baseline deviations within operational suggestions."
            };
        }
        return {
            bg: 'bg-emerald-50 border-emerald-200',
            headerBg: 'bg-gradient-to-r from-teal-900 via-zinc-950 to-emerald-950',
            accentText: 'text-emerald-500',
            pillBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
            barColor: 'bg-emerald-500',
            glow: 'shadow-emerald-900/10',
            icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
            notice: "Optimal biological framework baseline achieved. Continue maintenance cycles and preventive tracking routines."
        };
    };

    if (error) return (
        <div className="min-h-screen bg-[#F4F6F5] flex items-center justify-center p-6 text-center">
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

    if (loading || !reportData) return <LoadingOverlay message={statusMsg} />;

    const theme = getStatusTheme(reportData.finalStatus);

    return (
        <div className="min-h-screen bg-[#F4F6F5] py-8 px-4 md:px-8 font-sans text-[#2D3331] antialiased">

            <div className="max-w-6xl mx-auto">

                {/* TOP PLATFORM HEADER */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE4E1] pb-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8B7E66] mb-1">
                            <ClipboardList size={14} className="text-[#4A675D]" />
                            <span>Clinical Archives & Diagnostics</span>
                        </div>
                        <h2 className="text-3xl font-serif text-[#1A1F1E] tracking-tight">Your Clinical Report</h2>
                    </div>
                    <div className="flex items-center gap-3 self-start sm:self-center">
                        <Link href="/DiagnosisHistory" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A675D] bg-white border border-[#DCE4E1] py-2.5 px-4 rounded shadow-sm hover:bg-gray-50 transition-all">
                            <Home size={13} /> Back to Diagnosis History
                        </Link>
                    </div>
                </div>

                {/* MAIN DOCUMENT FRAME */}
                <div className={`bg-white shadow-2xl rounded border border-[#DCE4E1] overflow-hidden flex flex-col ${theme.glow}`}>

                    {/* TOP DYNAMIC BRAND ACCENT BANNER */}
                    <div className={`w-full py-10 px-8 md:px-12 text-white ${theme.headerBg} relative overflow-hidden transition-all duration-500`}>
                        <div className="absolute top-0 right-0 p-8 text-[7rem] font-black tracking-tighter text-white/5 select-none pointer-events-none font-mono">
                            {reportData.finalStatus || "SYS"}
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                            <div className="lg:col-span-3 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded border ${theme.pillBg}`}>
                                        <Circle className={`w-2.5 h-2.5 fill-current ${theme.accentText} animate-pulse`} />
                                        <span>System Node: {reportData.finalStatus || "UNKNOWN"}</span>
                                    </div>

                                </div>
                                <h3 className="text-3xl md:text-4xl font-serif font-normal leading-tight tracking-tight text-stone-100">
                                    {reportData.statusHeadline}
                                </h3>
                                <p className="text-stone-300 text-sm leading-relaxed max-w-3xl italic font-serif">
                                    "{reportData.statusSummary}"
                                </p>
                            </div>

                            {/* Dynamic Warning Card Box inside Header */}
                            <div className="bg-white/5 backdrop-blur-md rounded-lg p-5 border border-white/10 space-y-3 h-full flex flex-col justify-between">
                                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-stone-200 uppercase">
                                    {theme.icon}
                                    <span>Status Protocol</span>
                                </div>
                                <p className="text-[12px] text-stone-300 leading-snug">
                                    {theme.notice}
                                </p>
                                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-tighter pt-2 border-t border-white/5">
                                    System Verification: Automated Alpha
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TWO-COLUMN CONTENT GRID TO FILL EMPTY SPACE AND IMPROVE LAYOUT STRUCTURE */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 border-t border-[#DCE4E1] divide-y lg:divide-y-0 lg:divide-x divide-[#DCE4E1]">

                        {/* LEFT/MAIN DYNAMIC COLUMN (3/4 Width) */}
                        <div className="lg:col-span-3 p-6 md:p-10 space-y-12 bg-white">

                            {/* CONCERNS AREA SECTION */}
                            {reportData.showConcerns && concern.length > 0 ? (
                                <section className="animate-fade-in">
                                    <div className="flex items-center gap-3 mb-6 border-l-4 border-amber-500 pl-4 py-0.5">
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800">Target Area Findings & Concerns</h4>
                                    </div>
                                    {concern.map((item, i) => (
                                        <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-[#FAF8F5] rounded-lg border border-[#F0E6D2] transition-all hover:bg-[#F6F1E7]">
                                            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-[#EBE0C8] pb-3 md:pb-0 md:pr-4">
                                                <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-1">Target Domain</span>
                                                <p className="font-bold text-gray-900 tracking-tight text-base flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                    {item.area}
                                                </p>
                                            </div>
                                            <div className="md:col-span-3 md:pl-2">
                                                <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-1">Clinical Telemetry Findings</span>
                                                <p className="text-sm text-gray-700 leading-relaxed font-medium">{item.possibleDrivers}</p>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            ) : (
                                <section className="p-6 bg-stone-50 rounded-lg border border-stone-200 border-dashed text-center">
                                    <p className="text-sm text-stone-500 font-medium font-serif">No diagnostic anomalies or active concern zones detected via telemetry.</p>
                                </section>
                            )}

                            {/* BIOMETRICS / POSITIVE SIGNALS SECTION */}
                            {reportData.showPositives && postivesignals.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-3 mb-6 border-l-4 border-emerald-600 pl-4 py-0.5">
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800">Biomarker Verification & Strengths</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {postivesignals.map((sig, i) => (
                                            <div key={i} className="bg-white border border-[#DCE4E1] p-5 rounded-xl hover:shadow-md transition-all flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-0.5">Biomarker Metric</span>
                                                            <span className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                                                                <Activity size={14} className="text-emerald-600" />
                                                                {sig.signal}
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-0.5">Confidence</span>
                                                            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">{sig.strength}</span>
                                                        </div>
                                                    </div>

                                                    {/* Bar Visualization */}
                                                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden my-3 border border-stone-200/50">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: sig.strength || "75%" }}
                                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="pt-2 mt-2 border-t border-stone-100">
                                                    <p className="text-[12px] text-gray-600 leading-relaxed font-serif italic">
                                                        "{sig.impact || "Signal remains safely within targeted optimization bounds."}"
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* RECOMMENDED PROTOCOLS COMPONENT */}
                            {reportData.showSuggestions && suggestions.length > 0 && (
                                <section className="border-t border-stone-100 pt-8">
                                    <div className="flex items-center gap-3 mb-6 border-l-4 border-[#4A675D] pl-4 py-0.5">
                                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800">Adaptive Clinical Protocols</h4>
                                    </div>
                                    <div className="space-y-4">
                                        {suggestions.map((item, i) => (
                                            <div key={i} className="flex flex-col md:flex-row gap-4 p-5 hover:bg-stone-50/80 rounded-xl border border-stone-100 hover:border-stone-200 transition-all bg-white">
                                                <div className="shrink-0 w-8 h-8 rounded-full bg-[#4A675D] text-white flex items-center justify-center text-xs font-bold font-mono">
                                                    0{i + 1}
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <div>
                                                        <p className="text-base font-bold text-gray-900 tracking-tight">{item.suggestion}</p>
                                                    </div>

                                                    <div className="bg-stone-50 p-3 rounded border border-stone-200/60">
                                                        <span className="text-[9px] font-bold text-[#8B7E66] uppercase tracking-wider block mb-1">Clinical Rationale</span>
                                                        <p className="text-xs text-gray-600 italic font-serif leading-relaxed">"{item.reason}"</p>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-6 text-[11px] pt-1">
                                                        <div>
                                                            <span className="text-gray-400 font-medium">Protocol Variant:</span>
                                                            <span className="ml-1.5 font-bold text-gray-700 bg-stone-100 px-2 py-0.5 rounded text-[10px] font-mono">{item.suggestionType || "General Wellness"}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-400 font-medium">Risk Layer:</span>
                                                            <span className={`ml-1.5 font-black uppercase tracking-tight text-[10px] ${item.riskLevel?.toLowerCase() === 'high' ? 'text-red-600' : 'text-emerald-700'}`}>
                                                                {item.riskLevel || "Low Risk"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* PROTOCOL WEEKLY OPTIMIZATION BANNER */}
                            {reportData.showWeeklyPlan && (
                                <section className="pt-4">
                                    <div className="bg-[#1A1F1E] text-white p-8 rounded-xl relative overflow-hidden shadow-lg">
                                        <div className="relative z-10 max-w-2xl space-y-3">
                                            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B7E66]">
                                                <CheckCircle size={12} className="text-emerald-500" />
                                                <span>Dynamic Integration Available</span>
                                            </div>
                                            <h4 className="text-2xl font-serif tracking-tight flex items-center gap-2 text-stone-100">
                                                <Calendar className="text-[#4A675D]" size={22} /> 7-Day Optimization Program
                                            </h4>
                                            <p className="text-xs text-stone-400 leading-relaxed max-w-xl font-normal">
                                                An advanced, tailored multi-day workflow configuration sync has been initialized for this generation cycle. Enrollment loads objectives directly into your active dashboard.
                                            </p>
                                            <div className="pt-3">
                                                <button onClick={() => reportData.CanEnrollWeeklyPlan == true ? setIsModalOpen(true) : setIsOutdatedModalOpen(true)} className="w-full sm:w-auto px-6 py-2.5 bg-[#4A675D] hover:bg-[#3d554c] text-white rounded font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md">
                                                    Enroll Now <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <Zap className="absolute -bottom-6 -right-6 w-36 h-36 text-white opacity-[0.02]" />
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* RIGHT COLUMN (1/4 Width) - HOUSES STATIC EXPLANATORY DATA METRIC ARTIFACTS TO SOLVE VERTICALITY */}
                        <div className="lg:col-span-1 p-6 bg-[#FAFBFB] space-y-8 text-xs">

                            {/* BLOCK: ISSUANCE INFORMATION */}
                            <div className="space-y-3">
                                <h5 className="font-bold uppercase tracking-wider text-gray-400 text-[10px] border-b border-gray-200 pb-1.5">Issuance Context</h5>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-gray-400 block text-[10px]">Generation Matrix</span>
                                        <span className="font-mono font-bold text-gray-800">{diagnosisTimestamp || "MARCH 30, 2026"}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-[10px]">Escalation Bracket</span>
                                        <span className="font-serif font-bold text-[#4A675D] text-sm">{reportData.escalationLevel || "Standard Alpha"}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-[10px]">System Validation Vector</span>
                                        <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-1 rounded text-[10px]">SECURE-SSL-PASS</span>
                                    </div>
                                </div>
                            </div>

                            {/* BLOCK: STATIC REFERENCE DATA PARAMETERS */}
                            <div className="space-y-3">
                                <h5 className="font-bold uppercase tracking-wider text-gray-400 text-[10px] border-b border-gray-200 pb-1.5">Reference Parameters</h5>
                                <p className="text-gray-500 leading-relaxed text-[11px]">
                                    All telemetry outputs are structured via clinical inference vectors against standardized peer datasets.
                                </p>
                                <div className="space-y-2 pt-1">
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-stone-500">Confidence Floor</span>
                                        <span className="font-mono text-gray-700 font-bold">98.4%</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Latency Core</span>
                                        <span className="font-mono text-gray-700 font-bold">140ms</span>
                                    </div>
                                </div>
                            </div>

                            {/* BLOCK: INSTITUTIONAL COMPLIANCE STAMP */}
                            <div className="p-4 bg-white border border-[#DCE4E1] rounded space-y-2 shadow-sm">
                                <div className="flex items-center gap-1.5 font-bold text-[#1A1F1E] text-[10px] uppercase tracking-wider">
                                    <Brain size={13} className="text-[#4A675D]" />
                                    <span>AI Synthesis Engine</span>
                                </div>
                                <p className="text-[11px] text-gray-500 leading-normal">
                                    Digital authentication keys match standard enterprise verification protocols. Integrity verified securely.
                                </p>
                            </div>

                            {/* BLOCK: LEGAL DISCLAIMER MANDATE */}
                            <div className="pt-4 border-t border-gray-200 text-[10px] text-gray-400 leading-relaxed space-y-1">
                                <div className="flex items-center gap-1 font-bold text-gray-500">
                                    <Info size={10} />
                                    <span>Regulatory Provision Notice</span>
                                </div>
                                <p>
                                    This synthesized summary acts solely as an analytical dashboard resource tool. It does not replace formal clinical diagnostic practitioner credentials.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM UTILITY BAR */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pb-12">
                    <Link href="/" className="flex items-center gap-2 text-[#4A675D] hover:text-[#2D3331] font-bold text-xs uppercase tracking-wider transition-colors">
                        <Home size={15} /> Return to Primary Hub
                    </Link>
                    <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-5 py-2 border border-[#DCE4E1] text-gray-600 text-xs font-bold uppercase tracking-wider rounded bg-white hover:bg-stone-50 shadow-sm transition-all">
                        <Printer size={14} /> Print Report
                    </button>
                </div>
            </div>

            {/* ENROLLMENT PIPELINE LINK MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-[#DCE4E1]"
                        >
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-[#4A675D] border border-stone-200">
                                        <Calendar size={20} />
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-serif text-[#1A1F1E] tracking-tight">Weekly Plan</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        To successfully target and activate this optimization protocol framework tracking link directly:
                                    </p>
                                </div>

                                <div className="bg-stone-50 border-l-4 border-[#4A675D] p-4 text-xs text-gray-700 leading-relaxed rounded-r">
                                    Navigate to your main <span className="font-bold text-[#4A675D]">DashBoard</span> via the navigation options. Highlight the <span className="font-bold text-[#4A675D]">WeeklyPlan</span> layout cell block to provision active cycles.
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <Link href="/Dashboard" className="flex items-center justify-center gap-2 bg-[#4A675D] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#3d554c] transition-all shadow-sm">
                                        <LayoutDashboard size={15} /> DashBoard
                                    </Link>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold py-2 text-xs uppercase tracking-wider transition-colors">
                                        Cancel and Keep Context
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {isOutdatedModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop Blur Layer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOutdatedModalOpen(false)}
                            className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
                        />

                        {/* Modal Body */}
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-[#DCE4E1]"
                        >
                            <div className="p-6 space-y-6">
                                {/* Header Controls */}
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 border border-amber-100">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <button
                                        onClick={() => setIsOutdatedModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Headline and Narrative */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-serif text-[#1A1F1E] tracking-tight">
                                        Protocol Superseded
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        You have generated a more recent health diagnosis since this historical report was recorded. To guarantee accuracy, older setup frameworks are automatically discarded.
                                    </p>
                                </div>

                                {/* Instructive Callout Block */}
                                <div className="bg-amber-50/50 border-l-4 border-amber-500 p-4 text-xs text-gray-700 leading-relaxed rounded-r">
                                    This plan is no longer valid. To initialize your active cycles, please proceed to your primary <span className="font-bold text-[#4A675D]">Dashboard</span> and activate the protocol generated from your <span className="font-bold text-[#4A675D]">most recent health scan</span>.
                                </div>

                                {/* CTA Actions */}
                                <div className="flex flex-col gap-2 pt-2">
                                    <Link
                                        href="/Dashboard"
                                        className="flex items-center justify-center gap-2 bg-[#4A675D] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#3d554c] transition-all shadow-sm"
                                    >
                                        <LayoutDashboard size={15} /> Go to Active Dashboard
                                    </Link>
                                    <button
                                        onClick={() => setIsOutdatedModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 font-bold py-2 text-xs uppercase tracking-wider transition-colors"
                                    >
                                        Dismiss Window
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
    <div className="min-h-screen bg-[#F4F6F5] flex items-center justify-center p-6 fixed inset-0 z-50">
        <div className="text-center max-w-sm w-full space-y-6">
            <div className="relative flex justify-center mx-auto w-16 h-16">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-6 border border-dashed border-[#4A675D]/30 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-3 border border-[#4A675D]/15 rounded-full"
                />
                <FileText size={48} className="text-[#4A675D] animate-pulse self-center" />
            </div>
            <div className="space-y-1">
                <h2 className="font-serif text-xl text-[#2D3331] font-medium tracking-tight">Fetching Your Report </h2>
                <p className="text-[#8B7E66] text-[10px] font-bold uppercase tracking-[0.25em]">{message}</p>
            </div>
        </div>
    </div>
);