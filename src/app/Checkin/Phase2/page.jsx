
"use client";

import { Layer1Response } from "@/Context/Layer1Response";
import { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldAlert, Activity, Brain, ClipboardList,
    ChevronRight, CheckCircle2, AlertCircle, Loader2, BrainCircuit,
    AlertTriangle, RefreshCw, Home
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/LandingPageComponenets/Footer";
import DashboardNavbar from "@/components/HomePageComponents/DashboardNavbar";
import { clearFormCookies } from "@/app/api/DeleteIds/route";

export default function Phase2() {
    const { layer1data } = useContext(Layer1Response);
    const router = useRouter();

    // 1. Core State Handling
    const [pageStatus, setPageStatus] = useState("loading"); // loading, idle, analyzing, completed, error
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);

    // 2. Hydration & Persistence Logic
    useEffect(() => {
        const storedStatus = localStorage.getItem("phase2_completed");

        if (storedStatus === "true") {
            setPageStatus("completed");
        } else if (storedStatus === "analyzing") {
            // User reloaded while AI was working
            setPageStatus("analyzing");
            Ailayer2(); // Resume analysis
        } else {
            // If no layer1data and not completed, it's an invalid access/reload
            if (!layer1data) {
                setPageStatus("error");
                setError("Context lost due to page reload. Please restart the analysis from the beginning.");
            } else {
                setPageStatus("idle");
            }
        }
    }, [layer1data]);

    // 3. Prevent Hard Reload during active analysis
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (pageStatus === "analyzing") {
                e.preventDefault();
                e.returnValue = "Analysis is in progress. Please wait...";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [pageStatus]);

    const [formState, setFormState] = useState({
        generalHealthSafety: { ongoingCondition: "", details: [], conditionOtherText: "" },
        painPhysicalLimitation: { painLevel: "", painLocation: [], painAffectsMovement: null },
        stressMentalLoad: { stressType: "", duration: "" },
        medicalLifestyle: { recoveringIllness: false, medicationAffectingSleep: false, chronicCondition: false, preferNotToSayMedical: false },
    });

    const requiredContextModules = layer1data?.requiredContextModules || {};

    const handleChange = (module, field, value) => {
        setFormState(prev => ({
            ...prev,
            [module]: { ...prev[module], [field]: value }
        }));
    };

    const handleCheckboxChange = (module, field, value) => {
        const prevArray = formState[module][field] || [];
        const updatedArray = prevArray.includes(value)
            ? prevArray.filter(v => v !== value)
            : [...prevArray, value];
        handleChange(module, field, updatedArray);
    };

    const validateForm2 = () => {

        if (requiredContextModules.GENERAL_HEALTH_SAFETY) {
            const m1 = formState.generalHealthSafety;
            if (!m1.ongoingCondition) return { isValid: false, message: "Please specify if you have an ongoing condition." };
            if (m1.ongoingCondition === "Yes" && m1.details.length === 0) return { isValid: false, message: "Please select your condition types." };
            if (m1.ongoingCondition === "Yes" && m1.details.includes("Other") && !m1.conditionOtherText?.trim()) return { isValid: false, message: "Please describe your condition." };
        }
        if (requiredContextModules.PAIN_PHYSICAL_LIMITATION) {
            const m2 = formState.painPhysicalLimitation;
            if (!m2.painLevel) return { isValid: false, message: "Please select a pain level." };
            if (m2.painLevel !== "No" && m2.painLocation.length === 0) return { isValid: false, message: "Please specify pain locations." };
            if (m2.painLevel !== "No" && m2.painAffectsMovement === null) return { isValid: false, message: "Please indicate if pain limits movement." };
        }
        if (requiredContextModules.STRESS_MENTAL_LOAD) {
            const m3 = formState.stressMentalLoad;
            if (!m3.stressType || !m3.duration) return { isValid: false, message: "Please complete the Stress & Mental Load section." };
        }
        if (requiredContextModules.MEDICAL_LIFESTYLE) {
            const m4 = formState.medicalLifestyle;
            if (m4.preferNotToSayMedical === false && (m4.recoveringIllness === undefined)) return { isValid: false, message: "Please complete medical context." };
        }
        return { isValid: true, message: null };

    };

    const form2data = async (e) => {
        e.preventDefault();
        setError(null);

        const validation = validateForm2();
        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        setIsSubmitting(true);
        const payload = {
            hasOngoingCondition: formState.generalHealthSafety.ongoingCondition === "Yes",
            conditionTypes: formState.generalHealthSafety.ongoingCondition === "Yes" ? formState.generalHealthSafety.details : null,
            conditionOtherText: formState.generalHealthSafety.details?.includes("Other") ? formState.generalHealthSafety.conditionOtherText : null,
            painSeverity: formState.painPhysicalLimitation.painLevel || null,
            painLocations: formState.painPhysicalLimitation.painLevel !== "No" ? formState.painPhysicalLimitation.painLocation : null,
            painAffectsMovement: formState.painPhysicalLimitation.painLevel !== "No" ? formState.painPhysicalLimitation.painAffectsMovement : null,
            stressType: formState.stressMentalLoad.stressType || null,
            stressDuration: formState.stressMentalLoad.duration || null,
            recoveringFromIllness: formState.medicalLifestyle.preferNotToSayMedical ? null : formState.medicalLifestyle.recoveringIllness,
            onMedicationAffectingEnergy: formState.medicalLifestyle.preferNotToSayMedical ? null : formState.medicalLifestyle.medicationAffectingSleep,
            managingLongTermCondition: formState.medicalLifestyle.preferNotToSayMedical ? null : formState.medicalLifestyle.chronicCondition,
            preferNotToSayMedical: formState.medicalLifestyle.preferNotToSayMedical
        };
        // Lock the page state
        localStorage.setItem("phase2_completed", "analyzing");
        setPageStatus("analyzing");

        try {
            const response = await fetch("/api/Form2", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload), // Simplified for brevity, use your payload logic
            });

            if (response.status === 200) {
                await Ailayer2();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (err) {
            localStorage.setItem("phase2_completed", "false");
            setPageStatus("idle");
            setError(err.message);
            setIsSubmitting(false);
        }
    };

    const Ailayer2 = async () => {
        try {
            const res = await fetch("/api/Layer2", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (res.status === 200) {
                localStorage.setItem("phase2_completed", "true");
                setPageStatus("completed");
                setAnalysisComplete(true);
            } else {
                throw new Error("AI Processing failed");
            }
        } catch (err) {
            setPageStatus("error");
            setError("Analysis interrupted. Please reload to try resuming.");
        }
    };

    const backtohome = async () => {
        try {
            await clearFormCookies();
            localStorage.removeItem("phase2_completed")
            localStorage.removeItem("phase1AnalysisCompleted")
            router.push("/HomePage");
        } catch (err) {
            console.error(err.message);
        }
    };

    // --- UI RENDER LOGIC ---

    if (pageStatus === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                <Loader2 className="animate-spin text-[#4A675D]" size={40} />
            </div>
        );
    }

    if (pageStatus === "error") {
        return (
            <div className="min-h-screen bg-[#F3F4F1] flex items-center justify-center p-6 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-red-50">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={40} />
                    </div>
                    <h2 className="text-2xl font-serif text-[#1A1F1E] mb-4">Phase Analysis Issue</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-8">{error}</p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full flex items-center justify-center gap-2 bg-[#4A675D] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#3d554c] transition-all"
                        >
                            <RefreshCw size={18} /> Reload Analysis
                        </button>
                        <button
                            onClick={backtohome}
                            className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 py-4 px-6 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                            <Home size={18} /> Return to Home
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (pageStatus === "analyzing") {
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
                        {analysisComplete ? "Analysis Successful" : "AI Neural Processing"}
                    </h2>
                    <p className="text-[#8B7E66] text-sm italic">
                        {analysisComplete ? "Layer 2 analysis completed successfully." : "Synthesizing your biometric markers for Layer 2 detection..."}
                    </p>
                </motion.div>
            </div>
        );
    }

    if (pageStatus === "completed") {
        return <SuccessMessage />;
    }

    // Default: Return the Form (idle state)


    return (
        <div className="min-h-screen bg-[#FAF9F6] py-16 px-6">
            <div className="max-w-3xl mx-auto mb-10">
                {/* Header */}
                <header className="mb-12 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7E66] mb-4 block">Phase 2: Depth Analysis</span>
                    <h1 className="font-serif text-4xl text-[#2D3331] mb-4">Refining Your Profile</h1>
                    <p className="text-[#5C6361] text-sm max-w-md mx-auto">
                        Our AI detected specific markers requiring clarification. This ensures your final health insights are clinically relevant.
                    </p>
                </header>

                {/* {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
                        <AlertCircle size={18} /> {error}
                    </motion.div>
                )}  */}

                <form onSubmit={form2data} className="space-y-8">

                    {/* Module 1: General Health */}
                    {requiredContextModules.GENERAL_HEALTH_SAFETY && (
                        <Section icon={<ShieldAlert size={20} />} title="General Health Safety">
                            <Question label="Do you have any ongoing injury or health condition?">
                                <SelectBox
                                    value={formState.generalHealthSafety.ongoingCondition}
                                    onChange={v => handleChange("generalHealthSafety", "ongoingCondition", v)}
                                    options={["No", "Yes"]}
                                />
                            </Question>

                            <AnimatePresence>
                                {formState.generalHealthSafety.ongoingCondition === "Yes" && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-4 space-y-4">
                                        <label className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-widest block">Select all that apply</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {["Joint pain", "Muscle injury", "Back/neck issues", "Chronic condition", "Recent illness", "Other"].map(opt => (
                                                <CheckboxCard
                                                    key={opt} label={opt}
                                                    checked={formState.generalHealthSafety.details.includes(opt)}
                                                    onChange={() => handleCheckboxChange("generalHealthSafety", "details", opt)}
                                                />
                                            ))}
                                        </div>
                                        {formState.generalHealthSafety.details.includes("Other") && (
                                            <textarea
                                                className="w-full bg-[#FAF9F6] border border-[#DCE4E1] rounded-xl p-4 h-24 outline-none text-sm focus:border-[#4A675D] transition-all"
                                                placeholder="Please describe..."
                                                value={formState.generalHealthSafety.conditionOtherText || ""}
                                                onChange={e => handleChange("generalHealthSafety", "conditionOtherText", e.target.value)}
                                            />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Section>
                    )}

                    {/* Module 2: Pain */}
                    {requiredContextModules.PAIN_PHYSICAL_LIMITATION && (
                        <Section icon={<Activity size={20} />} title="Pain & Physical Limitation">
                            <Question label="Current level of physical pain:">
                                <SelectBox
                                    value={formState.painPhysicalLimitation.painLevel}
                                    onChange={v => handleChange("painPhysicalLimitation", "painLevel", v)}
                                    options={["No", "Mild", "Moderate", "Severe"]}
                                />
                            </Question>

                            {formState.painPhysicalLimitation.painLevel && formState.painPhysicalLimitation.painLevel !== "No" && (
                                <div className="pt-6 space-y-6">
                                    <div>
                                        <label className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-widest block mb-3">Pain Location(s)</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {["Lower back", "Knees", "Shoulders", "Neck", "Other"].map(loc => (
                                                <CheckboxCard
                                                    key={loc} label={loc}
                                                    checked={formState.painPhysicalLimitation.painLocation.includes(loc)}
                                                    onChange={() => handleCheckboxChange("painPhysicalLimitation", "painLocation", loc)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Question label="Does this pain limit your daily movement?">
                                        <SelectBox
                                            value={formState.painPhysicalLimitation.painAffectsMovement}
                                            onChange={v => handleChange("painPhysicalLimitation", "painAffectsMovement", v)}
                                            options={["Yes", "No"]}
                                        />
                                    </Question>
                                </div>
                            )}
                        </Section>
                    )}

                    {/* Module 3: Stress */}
                    {requiredContextModules.STRESS_MENTAL_LOAD && (
                        <Section icon={<Brain size={20} />} title="Stress & Mental Load">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Question label="Primary Stress Type">
                                    <SelectBox
                                        value={formState.stressMentalLoad.stressType}
                                        onChange={v => handleChange("stressMentalLoad", "stressType", v)}
                                        options={["Mental", "Emotional", "Physical"]}
                                    />
                                </Question>
                                <Question label="Duration of Symptoms">
                                    <SelectBox
                                        value={formState.stressMentalLoad.duration}
                                        onChange={v => handleChange("stressMentalLoad", "duration", v)}
                                        options={["<1 week", "1-4 weeks", ">1 month"]}
                                    />
                                </Question>
                            </div>
                        </Section>
                    )}

                    {/* Module 4: Medical Lifestyle */}
                    {requiredContextModules.MEDICAL_LIFESTYLE && (
                        <Section icon={<ClipboardList size={20} />} title="Medical / Lifestyle Context">
                            <div className="space-y-4">
                                <CheckboxCard
                                    label="Recovering from recent illness"
                                    checked={formState.medicalLifestyle.recoveringIllness}
                                    onChange={e => handleChange("medicalLifestyle", "recoveringIllness", !formState.medicalLifestyle.recoveringIllness)}
                                />
                                <CheckboxCard
                                    label="On medication affecting sleep/energy"
                                    checked={formState.medicalLifestyle.medicationAffectingSleep}
                                    onChange={e => handleChange("medicalLifestyle", "medicationAffectingSleep", !formState.medicalLifestyle.medicationAffectingSleep)}
                                />
                                <CheckboxCard
                                    label="Managing a long-term condition"
                                    checked={formState.medicalLifestyle.chronicCondition}
                                    onChange={e => handleChange("medicalLifestyle", "chronicCondition", !formState.medicalLifestyle.chronicCondition)}
                                />

                                <div className="pt-4 border-t border-[#DCE4E1]">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-[#4A675D]"
                                            checked={formState.medicalLifestyle.preferNotToSayMedical}
                                            onChange={e => handleChange("medicalLifestyle", "preferNotToSayMedical", e.target.checked)}
                                        />
                                        <span className="text-[11px] font-bold text-[#8B7E66] uppercase tracking-wider group-hover:text-[#4A675D] transition-colors">
                                            I prefer not to share medical details
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </Section>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#4A675D] text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl shadow-[#4A675D]/20 hover:bg-[#3D564D] transition-all flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <>Finalize Assessment <ChevronRight size={20} /></>}
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
}

/* UI Helper Components */

const Section = ({ icon, title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[2.5rem] border border-[#DCE4E1] p-8 md:p-10 shadow-sm"
    >
        <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-[#E8F3EE] rounded-xl flex items-center justify-center text-[#4A675D]">
                {icon}
            </div>
            <h2 className="font-serif text-2xl text-[#2D3331]">{title}</h2>
        </div>
        {children}
    </motion.div>
);

const Question = ({ label, children }) => (
    <div className="space-y-3">
        <label className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-[0.15em]">{label}</label>
        {children}
    </div>
);

const SelectBox = ({ value, options, onChange }) => (
    <div className="flex flex-wrap gap-2">
        {options.map(opt => (
            <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all ${value === opt
                    ? "bg-[#4A675D] border-[#4A675D] text-white"
                    : "bg-[#FAF9F6] border-[#DCE4E1] text-[#5C6361] hover:border-[#4A675D]"
                    }`}
            >
                {opt}
            </button>
        ))}
    </div>
);

const CheckboxCard = ({ label, checked, onChange }) => (
    <div
        onClick={onChange}
        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${checked ? "bg-[#E8F3EE] border-[#4A675D]" : "bg-[#FAF9F6] border-[#DCE4E1] hover:border-[#4A675D]"
            }`}
    >
        <span className={`text-sm font-medium ${checked ? "text-[#4A675D]" : "text-[#5C6361]"}`}>{label}</span>
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${checked ? "bg-[#4A675D] border-[#4A675D]" : "bg-white border-[#DCE4E1]"
            }`}>
            {checked && <CheckCircle2 size={12} className="text-white" />}
        </div>
    </div>
);



const SuccessMessage = () => (


    <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF9F6] p-6"
    >
        <div className="bg-white p-12 rounded-[3.5rem] border border-[#DCE4E1] text-center max-w-lg shadow-2xl">
            <div className="w-20 h-20 bg-[#E8F3EE] rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="text-[#4A675D]" size={36} />
            </div>
            <h2 className="font-serif text-3xl mb-4 text-[#2D3331]">Profile Synchronized</h2>
            <p className="text-[#5C6361] text-sm mb-10 leading-relaxed">
                Information has been completed successfully. Your multi-layer assessment is now ready for final synthesis.
            </p>
            <Link

                href="/Checkin/FinalPage"
                className="block w-full bg-[#4A675D] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#4A675D]/20 hover:bg-[#3D564D] transition-all"
            >
                Synthesize Final Analysis
            </Link>
        </div>
    </motion.div>
)
