



// "use client"

// import { useContext, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//     Frown, Meh, Smile, Sun, CloudRain, ShieldCheck,
//     Loader2, ArrowRight, ChevronLeft, X, BrainCircuit, CheckCircle2,
//     AlertTriangle,
//     LayoutDashboard,
//     Home
// } from "lucide-react";
// import Link from "next/link";
// import { Layer1Response } from "@/Context/Layer1Response";
// import { useRouter } from "next/navigation";

// const Checkin = () => {
//     const [step, setStep] = useState(1);
//     const [submitted, setSubmitted] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [aiAnalyzing, setAiAnalyzing] = useState(false);
//     const [analysisComplete, setAnalysisComplete] = useState(false);
//     const [form2, setform2] = useState(false)
//     const [error, seterror] = useState(false);
//     const router = useRouter()
//     const { setlayer1data, setform1Id } = useContext(Layer1Response);
//     // console.log(layer1data)
//     const [formData, setFormData] = useState({
//         age: "",
//         gender: "male",
//         bedtime: "22:00",
//         wakeUpTime: "07:00",
//         sleepQuality: 3,
//         activityLevel: 3,
//         steps: "",
//         foodQuality: 3,
//         waterIntake: 4,
//         stresslevel: 3,
//         mood: 3,
//         energylevel: 3,
//         healthDescription: ""
//     });

//     // --- Requirement 1: Validation Logic ---
//     const canMoveToStep2 = formData.age !== "" && formData.gender !== "" && formData.bedtime !== "" && formData.wakeUpTime !== "";
//     const canMoveToStep3 = formData.steps !== "";
//     const canSubmit = formData.healthDescription.trim().length > 5;

//     const handleChange = (field, value) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         const payload = {
//             age: Number(formData.age),
//             gender: String(formData.gender),
//             bedtime: String(formData.bedtime),
//             wakeUpTime: String(formData.wakeUpTime),
//             sleepQuality: Number(formData.sleepQuality),
//             activityLevel: Number(formData.activityLevel),
//             steps: Number(formData.steps),
//             foodQuality: Number(formData.foodQuality),
//             waterIntake: Number(formData.waterIntake),
//             stresslevel: Number(formData.stresslevel),
//             mood: Number(formData.mood),
//             energylevel: Number(formData.energylevel),
//             healthDescription: String(formData.healthDescription)
//         };

//         try {
//             const res = await fetch("/api/Form1", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload)
//             });

//             if (res.status === 200) {
//                 // const data = await res.json();
//                 // setform1Id(data.form1Id);

//                 // --- Requirement 2: Start AI Analysis Sequence ---
//                 setAiAnalyzing(true);
//                 await Ailayer1();
//             }
//         } catch (err) {
//             console.error("Submission Error:", err.message);
//             setIsSubmitting(false);
//         }
//     };

//     const Ailayer1 = async () => {
//         try {
//             const res = await fetch("/api/Layer1", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" },
//                 // body: JSON.stringify({ form1Id: id }),
//             });

//             const data = await res.json();
//             setlayer1data(data.systemResponse);
//             setform2(data.systemResponse?.form2Required)

//             // Success Phase
//             setAnalysisComplete(true);
//             setTimeout(() => {
//                 setAiAnalyzing(false);
//                 setSubmitted(true);
//             }, 2000);

//         } catch (err) {
//             console.error("AI Error:", err.message);
//             seterror(true);
//         }
//     };


//     const backtohome = async () => {

//         try {
//             await fetch("/api/DeleteIds", {
//                 methods: "GET",
//                 credentials: "include",
//                 headers: { "Content-Type": "application/json" }
//             })

//             router.push("/HomePage")
//         } catch (err) {
//             console.log(err.message)
//             // return NextResponse.json({ error: err.message }, { status: 401 })
//         }

//     }

//     // --- AI LOADING OVERLAY ---
//     if (aiAnalyzing) {
//         return (
//             <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6">
//                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[3rem] border border-[#DCE4E1] shadow-xl text-center max-w-sm w-full">
//                     <div className="flex justify-center mb-6">
//                         {analysisComplete ? (
//                             <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
//                                 <CheckCircle2 size={48} className="animate-bounce" />
//                             </div>
//                         ) : (
//                             <div className="relative">
//                                 <BrainCircuit size={64} className="text-[#4A675D] animate-pulse" />
//                                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border-2 border-dashed border-[#4A675D]/30 rounded-full" />
//                             </div>
//                         )}
//                     </div>
//                     <h2 className="font-serif text-2xl text-[#2D3331] mb-2">
//                         {analysisComplete ? "Analysis Successful" : "AI Neural Processing"}
//                     </h2>
//                     <p className="text-[#8B7E66] text-sm italic">
//                         {analysisComplete ? "Layer 1 analysis completed successfully." : "Synthesizing your biometric markers for Layer 1 detection..."}
//                     </p>
//                 </motion.div>
//             </div>
//         );
//     }

//     if (submitted) return <SuccessView form2={form2}  ></SuccessView>







//     if (error) return (
//         <div className="min-h-screen bg-[#F3F4F1] flex items-center justify-center p-6 text-center">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-red-50"
//             >
//                 <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <AlertTriangle size={40} />
//                 </div>

//                 <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">
//                     Analysis Encountered an Issue
//                 </h2>

//                 <p className="text-sm text-gray-500 leading-relaxed mb-8">
//                     We've encountered a temporary server issue while analysing your data.
//                     Please return to the home page to retry your health check-in.
//                 </p>

//                 <button
//                     onClick={backtohome}
//                     className="w-full flex items-center justify-center gap-2 bg-[#4A675D] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#3d554c] transition-all shadow-lg active:scale-95"
//                 >
//                     <Home size={18} />
//                     Return to Home Page
//                 </button>
//             </motion.div>
//         </div>
//     );




"use client";

import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Frown, Meh, Smile, Sun, CloudRain, ShieldCheck,
    Loader2, ArrowRight, ChevronLeft, X, BrainCircuit, CheckCircle2,
    AlertTriangle,
    Home,
    RotateCcw
} from "lucide-react";
import Link from "next/link";
import { Layer1Response } from "@/Context/Layer1Response";
import { useRouter } from "next/navigation";

const Checkin = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [aiAnalyzing, setAiAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [form2, setform2] = useState(false);
    const [error, seterror] = useState(false);
    const router = useRouter();
    const { setlayer1data } = useContext(Layer1Response);

    const [formData, setFormData] = useState({
        age: "",
        gender: "male",
        bedtime: "22:00",
        wakeUpTime: "07:00",
        sleepQuality: 3,
        activityLevel: 3,
        steps: "",
        foodQuality: 3,
        waterIntake: 4,
        stresslevel: 3,
        mood: 3,
        energylevel: 3,
        healthDescription: ""
    });

    // --- REQUIREMENT 2: Prevent Hard Reload during analysis ---
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (aiAnalyzing && !analysisComplete) {
                e.preventDefault();
                e.returnValue = "Analysis is in progress. Please wait for completion to avoid data loss.";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [aiAnalyzing, analysisComplete]);

    // Initialize localStorage flag on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("phase1AnalysisCompleted", "false");
        }
    }, []);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- REQUIREMENT 1: Local Storage Check ---
        const isCompleted = localStorage.getItem("phase1AnalysisCompleted") === "true";
        if (isCompleted) {
            console.warn("Phase analysis already completed.");
            return;
        }

        setIsSubmitting(true);
        const payload = {
            age: Number(formData.age),
            gender: String(formData.gender),
            bedtime: String(formData.bedtime),
            wakeUpTime: String(formData.wakeUpTime),
            sleepQuality: Number(formData.sleepQuality),
            activityLevel: Number(formData.activityLevel),
            steps: Number(formData.steps),
            foodQuality: Number(formData.foodQuality),
            waterIntake: Number(formData.waterIntake),
            stresslevel: Number(formData.stresslevel),
            mood: Number(formData.mood),
            energylevel: Number(formData.energylevel),
            healthDescription: String(formData.healthDescription)
        };

        try {
            const res = await fetch("/api/Form1", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.status === 200) {
                setAiAnalyzing(true);
                await Ailayer1();
            } else {
                seterror(true);
            }
        } catch (err) {
            console.error("Submission Error:", err.message);
            seterror(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const Ailayer1 = async () => {
        try {
            const res = await fetch("/api/Layer1", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            // --- REQUIREMENT 3: Check for 200 Response ---
            if (res.status !== 200) {
                throw new Error("Server failed to complete phase analysis");
            }

            const data = await res.json();
            setlayer1data(data.systemResponse);
            setform2(data.systemResponse?.form2Required);

            // Mark as completed in storage
            localStorage.setItem("phase1AnalysisCompleted", "true");

            setAnalysisComplete(true);
            setTimeout(() => {
                setAiAnalyzing(false);
                setSubmitted(true);
            }, 2000);

        } catch (err) {
            console.error("AI Error:", err.message);
            seterror(true);
            setAiAnalyzing(false);
        }
    };

    const handleReload = () => {
        window.location.reload();
    };

    const backtohome = async () => {
        try {
            await fetch("/api/DeleteIds", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            });
            localStorage.removeItem("phase1AnalysisCompleted");
            router.push("/HomePage");
        } catch (err) {
            console.log(err.message);
            router.push("/HomePage");
        }
    };

    // Validation Logic
    const canMoveToStep2 = formData.age !== "" && formData.gender !== "" && formData.bedtime !== "" && formData.wakeUpTime !== "";
    const canMoveToStep3 = formData.steps !== "";
    const canSubmit = formData.healthDescription.trim().length > 5;

    // --- REQUIREMENT 3: Error Message Block ---
    if (error) return (
        <div className="min-h-screen bg-[#F3F4F1] flex items-center justify-center p-6 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-red-50">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} />
                </div>
                <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">Phase Analysis Problem</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    There is a problem in the phase analysis. Please either reload the page or restart the analysis from the beginning.
                </p>
                <div className="flex flex-col gap-3">
                    <button onClick={handleReload} className="w-full flex items-center justify-center gap-2 bg-[#4A675D] text-white py-4 rounded-xl font-bold hover:bg-[#3d554c] transition-all">
                        <RotateCcw size={18} /> Reload Analysis
                    </button>
                    <button onClick={backtohome} className="w-full flex items-center justify-center gap-2 border border-[#DCE4E1] text-[#5C6361] py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                        <Home size={18} /> Back to Home
                    </button>
                </div>
            </motion.div>
        </div>
    );

    // AI Loading Overlay (Now handles Re-entry block)
    if (aiAnalyzing) {
        return (
            <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[3rem] border border-[#DCE4E1] shadow-xl text-center max-w-sm w-full">
                    <div className="flex justify-center mb-6">
                        {analysisComplete ? (
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                <CheckCircle2 size={48} className="animate-bounce" />
                            </div>
                        ) : (
                            <div className="relative">
                                <BrainCircuit size={64} className="text-[#4A675D] animate-pulse" />
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border-2 border-dashed border-[#4A675D]/30 rounded-full" />
                            </div>
                        )}
                    </div>
                    <h2 className="font-serif text-2xl text-[#2D3331] mb-2">
                        {analysisComplete ? "Analysis Successful" : "Analysis Under Progress"}
                    </h2>
                    <p className="text-[#8B7E66] text-sm italic">
                        {analysisComplete ? "Layer 1 analysis completed successfully." : "Please wait for the analysis to complete. Do not refresh the page."}
                    </p>
                </motion.div>
            </div>
        );
    }

    if (submitted) return <SuccessView form2={form2} />;




    return (
        <div className="min-h-screen bg-[#FAF9F6] py-12 px-6">
            <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <Link href="/HomePage" className="flex items-center gap-2 text-[#8B7E66] hover:text-[#4A675D] transition-colors group">
                        <X size={18} className="group-hover:rotate-90 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Cancel Assesment</span>
                    </Link>
                    <div className="flex gap-1.5">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= i ? "bg-[#4A675D]" : "bg-[#DCE4E1]"}`} />
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-[#DCE4E1] p-8 md:p-12 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8F3EE] rounded-bl-[5rem] -mr-16 -mt-16 opacity-50" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6 relative z-10">
                                <h2 className="font-serif text-3xl text-[#2D3331]">Biometric Vitals</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Age" type="number" value={formData.age} onChange={(v) => handleChange('age', v)} />
                                    <Select label="Gender" value={formData.gender} options={['Male', 'Female', 'Other']} onChange={(v) => handleChange('gender', v)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Bedtime" type="time" value={formData.bedtime} onChange={(v) => handleChange('bedtime', v)} />
                                    <Input label="Wake Up" type="time" value={formData.wakeUpTime} onChange={(v) => handleChange('wakeUpTime', v)} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!canMoveToStep2}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${canMoveToStep2 ? "bg-[#4A675D] text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                                >
                                    Next Step <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8 relative z-10">
                                <h2 className="font-serif text-3xl text-[#2D3331]">Lifestyle Markers</h2>
                                <div className="space-y-6">
                                    <Slider label="Sleep Quality" value={formData.sleepQuality} onChange={(v) => handleChange('sleepQuality', v)} />
                                    <Slider label="Energy Level" value={formData.energylevel} onChange={(v) => handleChange('energylevel', v)} />
                                    <Slider label="Food Quality" value={formData.foodQuality} onChange={(v) => handleChange('foodQuality', v)} />
                                    <Input label="Daily Steps" type="number" value={formData.steps} onChange={(v) => handleChange('steps', v)} />
                                </div>
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-[#DCE4E1] text-[#5C6361] rounded-xl font-bold flex items-center justify-center gap-2"><ChevronLeft size={18} /> Back</button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        disabled={!canMoveToStep3}
                                        className={`flex-1 py-4 rounded-xl font-bold transition-all ${canMoveToStep3 ? "bg-[#4A675D] text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="s3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8 relative z-10">
                                <h2 className="font-serif text-3xl text-[#2D3331]">Neuro-Balance</h2>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider">Current Mood State</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {[{ val: 1, label: "Low", icon: Frown, color: "hover:text-red-500" },
                                        { val: 2, label: "Down", icon: CloudRain, color: "hover:text-blue-500" },
                                        { val: 3, label: "Neutral", icon: Meh, color: "hover:text-gray-500" },
                                        { val: 4, label: "Good", icon: Smile, color: "hover:text-[#4A675D]" },
                                        { val: 5, label: "Excellent", icon: Sun, color: "hover:text-yellow-500" }
                                        ].map((m) => (
                                            <button
                                                key={m.val}
                                                type="button"
                                                onClick={() => handleChange('mood', m.val)}
                                                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${formData.mood === m.val
                                                    ? "bg-[#E8F3EE] border-[#4A675D] text-[#4A675D] shadow-sm scale-105"
                                                    : "bg-[#FAF9F6] border-[#DCE4E1] text-[#8B7E66] opacity-60 hover:opacity-100"
                                                    }`}
                                            >
                                                <m.icon size={24} className={`mb-1 ${m.color}`} />
                                                <span className="text-[8px] font-bold uppercase tracking-tighter">{m.label}</span>
                                            </button>))}
                                    </div>
                                </div>

                                <Slider label="Stress Level" value={formData.stresslevel} onChange={(v) => handleChange('stresslevel', v)} />
                                <textarea
                                    value={formData.healthDescription}
                                    onChange={(e) => handleChange('healthDescription', e.target.value)}
                                    className="w-full bg-[#FAF9F6] border border-[#DCE4E1] rounded-xl p-4 h-28 outline-none text-sm focus:border-[#4A675D]"
                                    placeholder="Describe any symptoms..."
                                />
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 border border-[#DCE4E1] text-[#5C6361] rounded-xl font-bold flex items-center justify-center gap-2"><ChevronLeft size={18} /> Back</button>
                                    <button
                                        type="submit"
                                        disabled={!canSubmit || isSubmitting}
                                        className={`flex-[2] py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all ${canSubmit ? "bg-[#4A675D] text-white shadow-lg shadow-[#4A675D]/20" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={18} /> Analyze</>}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
};

// --- RESTORED SUB-COMPONENTS (Handles the Undefined Error) ---

const Input = ({ label, type, value, onChange }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#DCE4E1] rounded-xl px-4 py-3 focus:border-[#4A675D] outline-none text-sm transition-colors"
            required
        />
    </div>
);

const Select = ({ label, value, options, onChange }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#DCE4E1] rounded-xl px-4 py-3 outline-none text-sm cursor-pointer"
        >
            {options.map(o => <option key={o} value={o.toLowerCase()}>{o}</option>)}
        </select>
    </div>
);

const Slider = ({ label, value, onChange }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-wider">{label}</label>
            <span className="text-[#4A675D] font-bold text-[10px]">Level {value}/5</span>
        </div>
        <input
            type="range" min="1" max="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#DCE4E1] rounded-lg appearance-none cursor-pointer accent-[#4A675D]"
        />
    </div>
);

const SuccessView = ({ form2 }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-6">
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-[#DCE4E1] text-center max-w-lg shadow-xl"
        >
            <div className="w-24 h-24 bg-[#E8F3EE] rounded-3xl flex items-center justify-center mx-auto mb-8">
                <ShieldCheck className="text-[#4A675D] w-12 h-12" />
            </div>

            <h2 className="font-serif text-3xl mb-4 text-[#2D3331]">
                {form2 ? "Further Insight Required" : "Assessment Complete"}
            </h2>

            <div className="text-[#5C6361] text-sm mb-10 leading-relaxed max-w-xs mx-auto space-y-4">
                <p>Your biological and lifestyle data has been successfully processed.</p>

                {form2 ? (
                    <p className="font-medium text-[#4A675D]">
                        Based on the initial analysis, our system has identified specific physiological markers that require more detailed input to ensure diagnostic accuracy.
                    </p>
                ) : (
                    <p>
                        Your comprehensive health report is now ready. You can review the AI-generated insights in your personal console.
                    </p>
                )}
            </div>

            {form2 ? (
                <Link
                    href="/Checkin/Phase2"
                    className="block w-full bg-[#4A675D] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#4A675D]/20 hover:bg-[#3D564D] transition-all"
                >
                    Complete Phase 2 Assessment
                </Link>
            ) : (
                <Link
                    href="/HomePage"
                    className="block w-full bg-[#4A675D] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#4A675D]/20 hover:bg-[#3D564D] transition-all"
                >
                    Access Health Dashboard
                </Link>
            )}
        </motion.div>
    </div>
);

export default Checkin;