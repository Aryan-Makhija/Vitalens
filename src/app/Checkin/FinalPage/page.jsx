// "use client";
// import { useContext, useEffect, useState } from "react";
// import { Layer1Response } from "@/Context/Layer1Response";
// import { motion, AnimatePresence, positionalKeys } from "framer-motion";
// import {
//     Activity, ShieldCheck, Zap, AlertTriangle,
//     Calendar, CheckCircle2, Brain, ChevronRight, FileText
// } from "lucide-react";
// import Link from "next/link";

// export default function FinalReportPage() {
//     const { layer2Id } = useContext(Layer1Response);

//     const [loading, setLoading] = useState(true);
//     const [statusMsg, setStatusMsg] = useState("Initializing Final Synthesis...");
//     const [reportData, setReportData] = useState(null);

//     const [concern, setconcern] = useState([]);
//     const [postivesignals, setpositivesignals] = useState([]);
//     const [suggestions, setsuggestions] = useState([]);

//     useEffect(() => {
//         if (layer2Id) runFinalAnalysis();
//     }, [layer2Id]);

//     const fetchSubTable = async (url, key) => {
//         try {
//             const res = await fetch(url, {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },

//             });
//             const data = await res.json();

//             // Extracting from the nested 'result' object as per your backend
//             return data.result || {};
//         } catch (err) {
//             console.error(`Error fetching ${key}:`, err);
//             return [];
//         }
//     };

//     const runFinalAnalysis = async () => {
//         try {
//             setStatusMsg("Performing Multi-Layer Clinical Synthesis...");
//             const res = await fetch("/api/FinalLayer", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ layer2ReportId: layer2Id })
//             });
//             const mainData = await res.json();

//             // Extracting main report from 'finalResult' object
//             const finalResult = mainData.finalResult;
//             setReportData(finalResult);

//             if (finalResult) {
//                 setStatusMsg("Refining physiological data points...");



//                 // Parallel fetching only if booleans are true
//                 const tasks = [];
//                 if (finalResult.showConcerns) {
//                     tasks.push(fetchSubTable("/api/Concerns", "concerns").then(res => setconcern([res])));
//                 }
//                 if (finalResult.showPositives) {
//                     tasks.push(fetchSubTable("/api/PositiveSignals", "signals").then(res => setpositivesignals([res])));
//                 }
//                 if (finalResult.showSuggestions) {
//                     tasks.push(fetchSubTable("/api/Suggestions", "suggestions").then(res => setsuggestions([res])));
//                 }

//                 await Promise.all(tasks);

//             }

//             setTimeout(() => setLoading(false), 2000);
//         } catch (err) {
//             console.error("Report Generation Error:", err);
//         }
//     };

//     if (loading || !reportData) return <LoadingOverlay message={statusMsg} />;

//     return (
//         <div className="min-h-screen bg-[#FAF9F6] py-12 px-6">
//             <div className="max-w-4xl mx-auto space-y-8">

//                 {/* --- CLINICAL HEADER --- */}
//                 <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DCE4E1] pb-8 gap-4">
//                     <div>
//                         <div className="flex items-center gap-2 text-[#4A675D] font-bold text-[10px] uppercase tracking-widest mb-2">
//                             <ShieldCheck size={14} /> Official Health Assessment
//                         </div>
//                         <h1 className="font-serif text-4xl text-[#2D3331]">{reportData.statusHeadline}</h1>
//                         <p className="text-[#5C6361] mt-2 max-w-xl italic">{reportData.statusSummary}</p>
//                     </div>
//                     <div className="bg-white px-8 py-4 rounded-[2rem] border border-[#DCE4E1] shadow-sm text-center">
//                         <span className="block text-[10px] uppercase text-[#8B7E66] font-bold tracking-wider mb-1">Escalation Level</span>
//                         <span className="text-2xl font-serif text-[#4A675D]">{reportData.escalationLevel}</span>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     <div className="md:col-span-2 space-y-8">
//                         {/* 1. Concerns Section */}
//                         {reportData.showConcerns && concern.length > 0 && (
//                             <ReportSection title="Identified Concerns" icon={<AlertTriangle className="text-amber-600" />}>
//                                 {concern.map((item, i) => (
//                                     <div key={i} className="mb-4 p-5 bg-amber-50/30 rounded-2xl border border-amber-100/50">
//                                         <div className="flex justify-between items-start mb-2">
//                                             <h4 className="font-bold text-[#2D3331] text-lg">{item.area}</h4>
//                                             <span className="text-[10px] px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full uppercase font-bold tracking-tighter border border-amber-200">
//                                                 {item.severity}
//                                             </span>
//                                         </div>
//                                         <p className="text-sm text-[#5C6361] leading-relaxed">
//                                             <span className="font-semibold text-[#8B7E66]">Possible Driver:</span> {item.possibleDrivers}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </ReportSection>
//                         )}

//                         {/* 2. Suggestions Section */}
//                         {reportData.showSuggestions && suggestions.length > 0 && (
//                             <ReportSection title="Clinical Insights & Suggestions" icon={<FileText className="text-[#4A675D]" />}>
//                                 {suggestions.map((item, i) => (
//                                     <div key={i} className="border-b border-[#F0F0F0] last:border-0 py-6 first:pt-0">
//                                         <div className="flex items-start gap-3 mb-2">
//                                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A675D] shrink-0" />
//                                             <h4 className="font-bold text-md text-[#2D3331] leading-tight">{item.suggestion}</h4>
//                                         </div>
//                                         <p className="text-sm text-[#5C6361] ml-4.5 mb-4 italic leading-relaxed">{item.reason}</p>
//                                         <div className="flex flex-wrap gap-3 ml-4.5">
//                                             <Badge label="Type" value={item.suggestionType} />
//                                             <Badge label="Risk" value={item.riskLevel} />
//                                             {item.requireFollowUp && <Badge label="Action" value="Follow-up Required" highlight />}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </ReportSection>
//                         )}
//                     </div>

//                     <div className="space-y-8">
//                         {/* Positive Signals */}
//                         {reportData.showPositives && postivesignals.length > 0 && (
//                             <div className="bg-[#E8F3EE] p-8 rounded-[3rem] border border-[#DCE4E1]">
//                                 <div className="flex items-center gap-2 mb-6 text-[#4A675D]">
//                                     <Zap size={20} fill="currentColor" />
//                                     <h3 className="font-serif text-xl">Vital Signals</h3>
//                                 </div>
//                                 <div className="space-y-5">
//                                     {postivesignals.map((sig, i) => (
//                                         <div key={i}>
//                                             <div className="flex justify-between text-xs mb-1.5">
//                                                 <span className="font-medium text-[#2D3331]">{sig.signal}</span>
//                                                 <span className="text-[#4A675D] font-bold">{sig.strength}</span>
//                                             </div>
//                                             <div className="w-full bg-white/60 h-1.5 rounded-full overflow-hidden">
//                                                 <motion.div
//                                                     initial={{ width: 0 }}
//                                                     animate={{ width: sig.strength }}
//                                                     className="bg-[#4A675D] h-full rounded-full"
//                                                 />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Weekly Plan CTA */}
//                         {reportData.showWeeklyPlan && (
//                             <Link href="#" className="block group">
//                                 <div className="bg-[#2D3331] p-8 rounded-[3rem] text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95">
//                                     <Calendar className="mb-4 text-[#4A675D]" size={28} />
//                                     <h3 className="font-serif text-2xl mb-2">Your Weekly Protocol</h3>
//                                     <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-8 leading-loose">
//                                         Customized daily routine based on your biometric synthesis.
//                                     </p>
//                                     <div className="flex items-center justify-between font-bold text-sm bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 transition-colors">
//                                         Open Schedule
//                                         <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                                     </div>
//                                 </div>
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// const Badge = ({ label, value, highlight }) => (
//     <div className={`text-[10px] px-3 py-1 rounded-full border flex gap-1.5 ${highlight ? 'bg-[#4A675D] text-white border-[#4A675D]' : 'bg-[#FAF9F6] text-[#8B7E66] border-[#DCE4E1]'}`}>
//         <span className="font-bold uppercase opacity-60">{label}:</span>
//         <span className="font-bold">{value}</span>
//     </div>
// );

// const ReportSection = ({ title, icon, children }) => (
//     <div className="bg-white p-10 rounded-[3rem] border border-[#DCE4E1] shadow-sm">
//         <div className="flex items-center gap-4 mb-8">
//             <div className="p-3 bg-[#FAF9F6] rounded-2xl">{icon}</div>
//             <h3 className="font-serif text-2xl text-[#2D3331]">{title}</h3>
//         </div>
//         {children}
//     </div>
// );

// const LoadingOverlay = ({ message }) => (
//     <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 fixed inset-0 z-50">
//         <div className="text-center max-w-sm w-full">
//             <div className="relative flex justify-center mb-10">
//                 <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//                     className="absolute -inset-10 border border-dashed border-[#4A675D]/20 rounded-full"
//                 />
//                 <motion.div
//                     animate={{ rotate: -360 }}
//                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                     className="absolute -inset-5 border border-[#4A675D]/10 rounded-full"
//                 />
//                 <Brain size={64} className="text-[#4A675D] animate-pulse" />
//             </div>
//             <h2 className="font-serif text-2xl text-[#2D3331] mb-3 font-medium tracking-tight">Generating Final Report</h2>
//             <p className="text-[#8B7E66] text-[11px] font-bold uppercase tracking-[0.3em] opacity-80">{message}</p>
//         </div>
//     </div>)








"use client";
import { useContext, useEffect, useState } from "react";
import { Layer1Response } from "@/Context/Layer1Response";
import { motion } from "framer-motion";
import {
    ShieldCheck, Zap, AlertTriangle,
    Calendar, Brain, ChevronRight, FileText, LayoutDashboard, Circle
} from "lucide-react";
import Link from "next/link";

export default function FinalReportPage() {
    const { layer2Id } = useContext(Layer1Response);
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState("Initializing Final Synthesis...");
    const [reportData, setReportData] = useState(null);
    const [concern, setconcern] = useState([]);
    const [postivesignals, setpositivesignals] = useState([]);
    const [suggestions, setsuggestions] = useState([]);

    useEffect(() => {
        if (layer2Id) runFinalAnalysis();
    }, [layer2Id]);

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
            setStatusMsg("Performing Multi-Layer Clinical Synthesis...");
            const res = await fetch("/api/FinalLayer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ layer2ReportId: layer2Id })
            });
            const mainData = await res.json();
            const finalResult = mainData.finalResult;
            setReportData(finalResult);

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
        }
    };

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s === 'RED') return 'text-red-600 bg-red-600';
        if (s === 'YELLOW') return 'text-amber-500 bg-amber-500';
        return 'text-emerald-500 bg-emerald-500';
    };

    if (loading || !reportData) return <LoadingOverlay message={statusMsg} />;

    return (
        <div className="min-h-screen bg-[#F3F4F1] py-12 px-4 md:px-6 font-sans text-[#2D3331]">
            <div className="max-w-4xl mx-auto">

                {/* --- PAGE TITLE --- */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-sm font-bold uppercase tracking-[0.4em] text-[#8B7E66] mb-2">Patient Dossier</h1>
                    <h2 className="text-4xl font-serif text-[#1A1F1E]">Your Final Clinical Report</h2>
                </div>

                {/* --- THE WHITE CLINICAL PAPER --- */}
                <div className="bg-white shadow-2xl rounded-sm border border-[#DCE4E1] min-h-[1000px] flex flex-col overflow-hidden">

                    {/* Header Watermark/Strip */}
                    <div className="h-2 w-full bg-[#4A675D]" />

                    <div className="p-8 md:p-16 space-y-12">

                        {/* 1. CLINICAL HEADER SECTION */}
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
                                        <span className="text-[11px] font-black uppercase tracking-tighter">System Status: {reportData.userStatus}</span>
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

                        {/* 2. CONCERNS SECTION */}
                        {reportData.showConcerns && concern.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-l-4 border-amber-500 pl-4">
                                    <h4 className="text-lg font-bold uppercase tracking-widest text-gray-800">Concern Areas</h4>
                                </div>
                                {concern.map((item, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-[#FCFAF7] rounded border border-[#F2EDE4]">
                                        <div className="md:col-span-1">
                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase block">Concern Area</span>
                                            <p className="font-bold text-gray-900">{item.area || "General Physiology"}</p>
                                        </div>
                                        <div className="md:col-span-3">
                                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase block">Clinical Observation</span>
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {postivesignals.map((sig, i) => (
                                        <div key={i} className="border border-gray-100 p-4 rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-semibold">{sig.signal}</span>
                                                <span className="text-xs font-mono text-emerald-600">{sig.strength}</span>
                                            </div>
                                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }} animate={{ width: sig.strength }}
                                                    className="h-full bg-emerald-600"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 4. SUGGESTIONS SECTION */}
                        {reportData.showSuggestions && suggestions.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6 border-l-4 border-[#4A675D] pl-4">
                                    <h4 className="text-lg font-bold uppercase tracking-widest text-gray-800">Recommended Protocols</h4>
                                </div>
                                <div className="space-y-4">
                                    {suggestions.map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors">
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">{i + 1}</div>
                                            <div>
                                                <p className="font-bold text-gray-900 mb-1">{item.suggestion}</p>
                                                <p className="text-sm text-gray-600 italic">" {item.reason} "</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 5. WEEKLY PLAN CTA SECTION */}
                        {reportData.showWeeklyPlan && (
                            <section className="mt-12 pt-12 border-t border-gray-100">
                                <div className="bg-[#1A1F1E] text-white p-8 rounded-xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-serif mb-4 flex items-center gap-2">
                                            <Calendar className="text-[#4A675D]" /> 7-Day Optimization Protocol
                                        </h4>
                                        <p className="text-sm text-gray-300 leading-relaxed mb-8 max-w-xl">
                                            A specialized weekly plan has been generated based on your biometric synthesis.
                                            Enrollment is optional, but highly recommended to maintain consistency and observe
                                            measurable health improvements over the next 7 days.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <button className="w-full sm:w-auto px-8 py-3 bg-[#4A675D] hover:bg-[#3d554c] text-white rounded font-bold text-sm transition-all flex items-center justify-center gap-2">
                                                Enroll in Protocol <ChevronRight size={16} />
                                            </button>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Optional Enrollment</p>
                                        </div>
                                    </div>
                                    <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-5" />
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* --- FOOTER NAVIGATION --- */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-20">
                    <Link href="/HomePage" className="flex items-center gap-2 text-[#4A675D] hover:text-[#2D3331] font-bold text-sm transition-colors">
                        <LayoutDashboard size={18} /> Return to Health Dashboard
                    </Link>
                    <div className="flex gap-4">
                        <button onClick={() => window.print()} className="px-6 py-2 border border-[#DCE4E1] text-[#8B7E66] text-xs font-bold uppercase rounded-full bg-white hover:bg-gray-50 transition-all">
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ... LoadingOverlay and other existing components ...

const Badge = ({ label, value, highlight }) => (
    <div className={`text-[10px] px-3 py-1 rounded-full border flex gap-1.5 ${highlight ? 'bg-[#4A675D] text-white border-[#4A675D]' : 'bg-[#FAF9F6] text-[#8B7E66] border-[#DCE4E1]'}`}>
        <span className="font-bold uppercase opacity-60">{label}:</span>
        <span className="font-bold">{value}</span>
    </div>
);

const ReportSection = ({ title, icon, children }) => (
    <div className="bg-white p-10 rounded-[3rem] border border-[#DCE4E1] shadow-sm">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#FAF9F6] rounded-2xl">{icon}</div>
            <h3 className="font-serif text-2xl text-[#2D3331]">{title}</h3>
        </div>
        {children}
    </div>
);

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