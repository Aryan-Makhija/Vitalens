"use client";

import { Layer1Response } from "@/Context/Layer1Response";
import { useContext, useState } from "react";

const WeeklyFeedbackForm = () => {




    const [formData, setFormData] = useState({
        feedbackText: "",
        energyLevel: 3,
        stressLevel: 3,
        sleepQuality: 3,
        hydrationLevel: 3,
        activityLevel: 3,
        adherenceScore: 3,
    });

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const { layer2Id } = useContext(Layer1Response);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || value }));
    };






    // const weekPlanId = weekPlan.id
    const layer2ReportId = layer2Id


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        try {
            const res = await fetch("/api/FeedBack", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, layer2ReportId }),
            });

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setResponse({ error: err.message });
        } finally {
            setLoading(false);
        }
    };

    const numericFields = [
        "energyLevel",
        "stressLevel",
        "sleepQuality",
        "hydrationLevel",
        "activityLevel",
        "adherenceScore",
    ];

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
            <h1 className="text-2xl font-bold mb-4">Weekly Feedback Form</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feedback text */}
                <div>
                    <label className="block mb-1 font-medium">Your Feedback</label>
                    <textarea
                        name="feedbackText"
                        placeholder="Share your thoughts..."
                        value={formData.feedbackText}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded h-24"
                    />
                </div>

                {/* Range sliders for numeric inputs */}
                {numericFields.map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="mb-1 font-medium">
                            {field.replace(/([A-Z])/g, " $1")}: {formData[field]}
                        </label>
                        <input
                            type="range"
                            name={field}
                            min="1"
                            max="5"
                            step="0.1"
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Submitting..." : "Submit Feedback"}
                </button>
            </form>


        </div>
    );
}



export default WeeklyFeedbackForm