"use client";

import { Layer1Response } from "@/Context/Layer1Response";
import { useContext, useState } from "react";

export default function Form2Page() {

    const { layer1data, form1Id, form2Id, setform2Id } = useContext(Layer1Response)

    // const { requiredContextModules } = layer1data;

    const requiredContextModules = layer1data?.requiredContextModules || {};
    if (!layer1data) {
        return <div>Loading...</div>;
    }
    // console.log("form2Id", form2Id)
    // Initial state for each module
    const [formState, setFormState] = useState({
        generalHealthSafety: {
            ongoingCondition: "",
            details: [],
            conditionOtherText: ""
        },

        painPhysicalLimitation: { painLevel: "", painLocation: [], painAffectsMovement: null },
        stressMentalLoad: { stressType: "", duration: "" },
        medicalLifestyle: { recoveringIllness: false, medicationAffectingSleep: false, chronicCondition: false, preferNotToSayMedical: false },
    });




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
        /* ─────────────────────────────
           MODULE 1: General Health Safety
           ───────────────────────────── */
        if (requiredContextModules.GENERAL_HEALTH_SAFETY) {
            const m1 = formState.generalHealthSafety;

            if (!m1.ongoingCondition) {
                return {
                    isValid: false,
                    message: "Please tell us whether you have any ongoing injury or health condition."
                };
            }

            if (m1.ongoingCondition === "Yes" && m1.details.length === 0) {
                return {
                    isValid: false,
                    message: "Please select at least one condition you are currently dealing with."
                };
            }

            if (
                m1.ongoingCondition === "Yes" &&
                m1.details.includes("Other") &&
                !m1.conditionOtherText?.trim()
            ) {
                return {
                    isValid: false,
                    message: "Please describe the condition you selected as 'Other'."
                };
            }
        }

        /* ─────────────────────────────
           MODULE 2: Pain & Physical Limitation
           ───────────────────────────── */
        if (requiredContextModules.PAIN_PHYSICAL_LIMITATION) {
            const m2 = formState.painPhysicalLimitation;

            if (!m2.painLevel) {
                return {
                    isValid: false,
                    message: "Please select whether you are experiencing any physical pain."
                };
            }

            if (m2.painLevel !== "No" && m2.painLocation.length === 0) {
                return {
                    isValid: false,
                    message: "Please select at least one location where you are experiencing pain."
                };
            }

            if (
                m2.painLevel !== "No" &&
                (m2.painAffectsMovement === null ||
                    m2.painAffectsMovement === undefined)
            ) {
                return {
                    isValid: false,
                    message: "Please tell us whether this pain limits your movement."
                };
            }
        }

        /* ─────────────────────────────
           MODULE 3: Stress & Mental Load
           ───────────────────────────── */
        if (requiredContextModules.STRESS_MENTAL_LOAD) {
            const m3 = formState.stressMentalLoad;

            if (!m3.stressType) {
                return {
                    isValid: false,
                    message: "Please select the type of stress you are experiencing."
                };
            }

            if (!m3.duration) {
                return {
                    isValid: false,
                    message: "Please select how long you have been experiencing this stress."
                };
            }
        }

        /* ─────────────────────────────
           MODULE 4: Medical / Lifestyle Context
           ───────────────────────────── */
        if (requiredContextModules.MEDICAL_LIFESTYLE) {
            const m4 = formState.medicalLifestyle;

            if (m4.preferNotToSayMedical === undefined) {
                return {
                    isValid: false,
                    message: "Please let us know if you are comfortable sharing medical details."
                };
            }

            if (m4.preferNotToSayMedical === false) {
                if (
                    m4.recoveringIllness === undefined ||
                    m4.medicationAffectingSleep === undefined ||
                    m4.chronicCondition === undefined
                ) {
                    return {
                        isValid: false,
                        message: "Please complete the medical and lifestyle information section."
                    };
                }
            }
        }

        return {
            isValid: true,
            message: null
        };
    };

    const form2data = async (e) => {
        e.preventDefault();
        const validation = validateForm2();

        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        const payload = {
            form1Id,

            /* ─────────────────────────────
               MODULE 1: General Health Safety
               ───────────────────────────── */
            hasOngoingCondition:
                formState.generalHealthSafety.ongoingCondition === "Yes",

            conditionTypes:
                formState.generalHealthSafety.ongoingCondition === "Yes"
                    ? formState.generalHealthSafety.details
                    : null,

            conditionOtherText:
                formState.generalHealthSafety.details?.includes("Other")
                    ? formState.generalHealthSafety.conditionOtherText
                    : null,

            /* ─────────────────────────────
               MODULE 2: Pain & Physical Limitation
               ───────────────────────────── */
            painSeverity:
                formState.painPhysicalLimitation.painLevel || null,

            painLocations:
                formState.painPhysicalLimitation.painLevel !== "No"
                    ? formState.painPhysicalLimitation.painLocation
                    : null,

            painAffectsMovement:
                formState.painPhysicalLimitation.painLevel !== "No"
                    ? formState.painPhysicalLimitation.painAffectsMovement
                    : null,

            /* ─────────────────────────────
               MODULE 3: Stress & Mental Load
               ───────────────────────────── */
            stressType:
                formState.stressMentalLoad.stressType || null,

            stressDuration:
                formState.stressMentalLoad.duration || null,

            /* ─────────────────────────────
               MODULE 4: Medical / Lifestyle Context
               ───────────────────────────── */
            recoveringFromIllness:
                formState.medicalLifestyle.preferNotToSayMedical
                    ? null
                    : formState.medicalLifestyle.recoveringIllness,

            onMedicationAffectingEnergy:
                formState.medicalLifestyle.preferNotToSayMedical
                    ? null
                    : formState.medicalLifestyle.medicationAffectingSleep,

            managingLongTermCondition:
                formState.medicalLifestyle.preferNotToSayMedical
                    ? null
                    : formState.medicalLifestyle.chronicCondition,

            preferNotToSayMedical:
                formState.medicalLifestyle.preferNotToSayMedical
        };

        const response = await fetch("/api/Form2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            setError("Something went wrong while submitting Form 2. Please try again.");
            return;
        }

        const data = await response.json();
        // console.log("Form2 resposne", data)
        setform2Id(data.form2Id)

    };



    // const submitForm = async (e) => {
    //     e.preventDefault();
    //     await form2data();

    // };

    // console.log(formState)
    return (
        <form onSubmit={form2data} className="max-w-3xl mx-auto p-6 space-y-6">
            {/* Module 1: General Health Safety */}
            {requiredContextModules.GENERAL_HEALTH_SAFETY && (
                <div className="p-4 border rounded-lg">
                    <h2 className="font-bold mb-2">General Health Safety</h2>
                    <label className="block mb-1">Do you have any ongoing injury or health condition?</label>
                    <select
                        className="border p-2 rounded w-full mb-2"
                        value={formState.generalHealthSafety.ongoingCondition}
                        onChange={e => handleChange("generalHealthSafety", "ongoingCondition", e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>

                    {formState.generalHealthSafety.ongoingCondition === "Yes" && (
                        <div className="mb-2">
                            <label className="block mb-1">Select conditions:</label>
                            {["Joint pain", "Muscle injury", "Back/neck issues", "Chronic condition", "Recent illness", "Other"].map(opt => (
                                <label key={opt} className="block">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={formState.generalHealthSafety.details.includes(opt)}
                                        onChange={() => handleCheckboxChange("generalHealthSafety", "details", opt)}
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    )}
                    {formState.generalHealthSafety.details.includes("Other") && (
                        <div className="mt-2">
                            <label className="block mb-1">
                                Please describe the condition:
                            </label>
                            <input
                                type="text"
                                className="border p-2 rounded w-full"
                                value={formState.generalHealthSafety.conditionOtherText || ""}
                                onChange={e =>
                                    handleChange(
                                        "generalHealthSafety",
                                        "conditionOtherText",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                    )}

                </div>
            )}

            {/* Module 2: Pain & Physical Limitation */}
            {requiredContextModules.PAIN_PHYSICAL_LIMITATION && (
                <div className="p-4 border rounded-lg">
                    <h2 className="font-bold mb-2">Pain & Physical Limitation</h2>
                    <label className="block mb-1">Are you experiencing physical pain currently?</label>
                    <select
                        className="border p-2 rounded w-full mb-2"
                        value={formState.painPhysicalLimitation.painLevel}
                        onChange={e => handleChange("painPhysicalLimitation", "painLevel", e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="No">No</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                    </select>

                    {formState.painPhysicalLimitation.painLevel && formState.painPhysicalLimitation.painLevel !== "No" && (
                        <div className="mb-2">
                            <label className="block mb-1">Pain location(s):</label>
                            {["Lower back", "Knees", "Shoulders", "Neck", "Other"].map(loc => (
                                <label key={loc} className="block">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={formState.painPhysicalLimitation.painLocation.includes(loc)}
                                        onChange={() => handleCheckboxChange("painPhysicalLimitation", "painLocation", loc)}
                                    />
                                    {loc}
                                </label>
                            ))}
                        </div>
                    )}

                    {formState.painPhysicalLimitation.painLevel &&
                        formState.painPhysicalLimitation.painLevel !== "No" && (
                            <div className="mt-3">
                                <label className="block mb-1">
                                    Does this pain limit your movement?
                                </label>
                                <select
                                    className="border p-2 rounded w-full"
                                    value={formState.painPhysicalLimitation.painAffectsMovement ?? ""}
                                    onChange={e =>
                                        handleChange(
                                            "painPhysicalLimitation",
                                            "painAffectsMovement",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        )}

                </div>
            )}

            {/* Module 3: Stress & Mental Load */}
            {requiredContextModules.STRESS_MENTAL_LOAD && (
                <div className="p-4 border rounded-lg">
                    <h2 className="font-bold mb-2">Stress & Mental Load</h2>
                    <label className="block mb-1">Stress type:</label>
                    <select
                        className="border p-2 rounded w-full mb-2"
                        value={formState.stressMentalLoad.stressType}
                        onChange={e => handleChange("stressMentalLoad", "stressType", e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Mental">Mental</option>
                        <option value="Emotional">Emotional</option>
                        <option value="Physical">Physical</option>
                    </select>

                    <label className="block mb-1">Duration:</label>
                    <select
                        className="border p-2 rounded w-full"
                        value={formState.stressMentalLoad.duration}
                        onChange={e => handleChange("stressMentalLoad", "duration", e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="<1 week">&lt; 1 week</option>
                        <option value="1-4 weeks">1–4 weeks</option>
                        <option value=">1 month">&gt; 1 month</option>
                    </select>
                </div>
            )}

            {/* Module 4: Medical / Lifestyle Context */}
            {requiredContextModules.MEDICAL_LIFESTYLE && (
                <div className="p-4 border rounded-lg">
                    <h2 className="font-bold mb-2">Medical / Lifestyle Context</h2>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            checked={formState.medicalLifestyle.recoveringIllness}
                            onChange={e => handleChange("medicalLifestyle", "recoveringIllness", e.target.checked)}
                            className="mr-2"
                        />
                        Recovering from illness
                    </label>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            checked={formState.medicalLifestyle.medicationAffectingSleep}
                            onChange={e => handleChange("medicalLifestyle", "medicationAffectingSleep", e.target.checked)}
                            className="mr-2"
                        />
                        Medication affecting sleep/energy
                    </label>
                    <label className="block mb-2">
                        <input
                            type="checkbox"
                            checked={formState.medicalLifestyle.chronicCondition}
                            onChange={e => handleChange("medicalLifestyle", "chronicCondition", e.target.checked)}
                            className="mr-2"
                        />
                        Long-term condition
                    </label>

                    <label className="block mt-4 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={formState.medicalLifestyle.preferNotToSayMedical}
                            onChange={e =>
                                handleChange(
                                    "medicalLifestyle",
                                    "preferNotToSayMedical",
                                    e.target.checked
                                )
                            }
                            className="mr-2"
                        />
                        I prefer not to share medical details
                    </label>

                </div>
            )}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit Form 2
            </button>
        </form>
    );
}
// {
//     error && (
//         <div className="text-red-600 text-sm mb-4">
//             {error}
//         </div>
//     )
// }
