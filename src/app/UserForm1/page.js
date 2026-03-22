"use client";

import AILayer2 from "@/components/AI_layers/AILayer2";
import FinalLayer from "@/components/AI_layers/FinalLayer";
import { Button } from "@/components/ui/button";
import { Layer1Response } from "@/Context/Layer1Response";
import { useContext, useState } from "react";

export default function Form1Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const { setlayer1data, layer1data, form1Id, setform1Id } = useContext(Layer1Response)

  console.log("layer1data", layer1data)
  console.log("form1result", form1Id)


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      age: Number(formData.get("age")),
      gender: formData.get("gender"),
      bedtime: formData.get("bedtime"),
      wakeUpTime: formData.get("wakeUpTime"),
      sleepQuality: Number(formData.get("sleepQuality")),
      activityLevel: Number(formData.get("activityLevel")),
      steps: Number(formData.get("steps")),
      foodQuality: Number(formData.get("foodQuality")),
      waterIntake: Number(formData.get("waterIntake")),
      stresslevel: Number(formData.get("stresslevel")),
      mood: Number(formData.get("mood")),
      energylevel: Number(formData.get("energylevel")),
      healthDescription: formData.get("healthDescription")
    };

    try {
      const res = await fetch("/api/Form1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await res.json();



      setform1Id(data.form1Id)

      console.log("Form 1 saved:", data);

      // You can redirect to Layer 1 analysis here
      // router.push(`/analyze/${data.form1Id}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const Ailayer1 = async () => {
    try {
      const res = await fetch("/api/Layer1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form1Id: form1Id,
        }),
      })

      const data = await res.json()
      console.log("AI RESPONSE", data)
      setlayer1data(data.systemResponse)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Daily Health Check-In
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Age & Gender */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="input"
            required
          />

          <select name="gender" className="input" required>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Sleep */}
        <div className="grid grid-cols-2 gap-4">
          <input name="bedtime" type="time" className="input" required />
          <input name="wakeUpTime" type="time" className="input" required />
        </div>

        {/* Sliders */}
        {[
          ["sleepQuality", "Sleep Quality"],
          ["activityLevel", "Activity Level"],
          ["foodQuality", "Food Quality"],
          ["stresslevel", "Stress Level"],
          ["mood", "Mood"],
          ["energylevel", "Energy Level"]
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-sm mb-1">{label} (1–5)</label>
            <input
              name={name}
              type="range"
              min="1"
              max="5"
              className="w-full"
              required
            />
          </div>
        ))}

        {/* Steps & Water */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="steps"
            type="number"
            placeholder="Steps today"
            className="input"
            required
          />
          <input
            name="waterIntake"
            type="number"
            step="0.1"
            placeholder="Water intake (L)"
            className="input"
            required
          />
        </div>

        {/* Free text */}
        <textarea
          name="healthDescription"
          placeholder="How are you feeling right now?"
          className="input h-24"
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Submit Check-In"}
        </button>
      </form>


      <Button onClick={() => Ailayer1()} className="m-10 w-80"> Ai analysis </Button>
      <AILayer2></AILayer2>
      <FinalLayer></FinalLayer>

    </div>
  );
}
