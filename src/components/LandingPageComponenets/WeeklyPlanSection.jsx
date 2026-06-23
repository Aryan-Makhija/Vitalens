
"use client"

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Circle, TrendingUp, Droplets, Moon, Apple, Footprints } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const planItems = [
    { icon: Droplets, label: "Hydration Goal", detail: "8 glasses of water", done: true },
    { icon: Footprints, label: "Activity Target", detail: "30 min walk", done: true },
    { icon: Apple, label: "Nutrition Focus", detail: "Add leafy greens", done: false },
    { icon: Moon, label: "Sleep Routine", detail: "Wind down by 10pm", done: false },
];

const WeeklyPlanSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeDay, setActiveDay] = useState(2);

    return (
        <section id="plans" className="py-24 md:py-32 bg-[#F2F5F3] relative overflow-hidden">
            {/* Subtle Contrast Blobs */}
            <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#E8F1EE] rounded-full blur-[100px] opacity-60" />
            <div className="absolute bottom-0 -left-20 w-72 h-72 bg-[#F7F3E9] rounded-full blur-[100px] opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-[11px] font-bold text-[#4A675D] uppercase tracking-[0.2em]">
                        Adaptive Guidance
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#2D3331] mt-4 mb-6">
                        Your Weekly <span className="italic">Evolution.</span>
                    </h2>
                    <p className="text-[#5C6361] text-lg leading-relaxed">
                        Personalized wellness plans that recalibrate every Sunday based on your AI-driven health insights.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-xl mx-auto"
                >
                    {/* The Wellness Card */}
                    <div className="bg-[#FAF9F6] rounded-[2.5rem] border border-[#EBE8E0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                        
                        {/* Header: Shifted to Deep Sage for contrast */}
                        <div className="bg-[#4A675D] px-8 py-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#E8F1EE]/70 text-xs font-bold uppercase tracking-widest">Week 08</p>
                                    <h3 className="text-white font-serif text-2xl mt-1">Focus: Vitality</h3>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
                                    <TrendingUp className="w-4 h-4 text-[#E8F1EE]" />
                                    <span className="text-white text-sm font-semibold">72% Progress</span>
                                </div>
                            </div>
                        </div>

                        {/* Day selector: Minimalist Cream/Sage mix */}
                        <div className="flex gap-2 px-6 py-5 bg-[#FAF9F6] border-b border-[#EBE8E0]">
                            {days.map((day, i) => (
                                <button
                                    key={day}
                                    onClick={() => setActiveDay(i)}
                                    className={`flex-1 py-3 rounded-2xl text-[11px] font-bold transition-all duration-300 ${
                                        i === activeDay
                                            ? "bg-[#4A675D] text-white shadow-md shadow-[#4A675D]/20"
                                            : i < activeDay
                                                ? "bg-[#E8F1EE] text-[#4A675D]"
                                                : "text-[#8B7E66] hover:bg-[#F2F5F3]"
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Plan items */}
                        <div className="p-8 space-y-5 bg-[#FAF9F6]">
                            {planItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#F0F4F2] transition-colors group cursor-pointer border border-transparent hover:border-[#DCE4E1]"
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                        item.done 
                                        ? "bg-[#4A675D] text-white shadow-inner" 
                                        : "border-[1.5px] border-[#DCD7CC] bg-white group-hover:border-[#4A675D]"
                                    }`}>
                                        {item.done ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#DCD7CC] group-hover:bg-[#4A675D]" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-bold text-sm tracking-tight ${
                                            item.done ? "text-[#8B7E66] line-through opacity-60" : "text-[#2D3331]"
                                        }`}>
                                            {item.label}
                                        </p>
                                        <p className="text-xs text-[#5C6361] mt-0.5">{item.detail}</p>
                                    </div>
                                    <div className={`p-2 rounded-lg ${item.done ? 'bg-[#F0F4F2]' : 'bg-[#F7F3E9] opacity-70'}`}>
                                        <item.icon className="w-4 h-4 text-[#4A675D]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* Status Footer */}
                        <div className="px-8 py-5 bg-[#F2F5F3]/50 border-t border-[#EBE8E0] flex justify-center">
                             <p className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-[0.2em]">
                                Last Updated: Today, 08:00 AM
                             </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WeeklyPlanSection;