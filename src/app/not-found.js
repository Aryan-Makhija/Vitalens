"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F3F4F1] flex items-center justify-center p-6 font-sans text-[#2D3331]">
            <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-sm shadow-xl border border-[#DCE4E1] text-center relative overflow-hidden">
                {/* Visual Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4A675D]" />

                {/* Animated Graphic Core */}
                <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                    {/* Outer Diagnostic Tracking Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-[#4A675D]/30 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border border-stone-200 rounded-full"
                    />
                    
                    {/* Floating Center Icon Area */}
                    <div className="w-14 h-14 bg-[#F8FAFC] rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#4A675D] shadow-sm">
                        <Search size={24} className="opacity-80" />
                    </div>
                </div>

                {/* Text Context Stack */}
                <div className="space-y-3 mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B7E66] block">
                        Error Code 404
                    </span>
                    <h1 className="text-3xl font-serif text-[#1A1F1E] tracking-tight">
                        Path Out of Scope
                    </h1>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                        The resource link, record register, or diagnostic index layer you are trying to reach does not exist or has been archived to a different secure environment.
                    </p>
                </div>

                {/* Navigation CTA Actions */}
                <div className="flex flex-col gap-2.5">
                    <Link 
                        href="/HomePage" 
                        className="flex items-center justify-center gap-2 bg-[#4A675D] text-white py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#3d554c] transition-all shadow-sm group"
                    >
                        <LayoutDashboard size={14} className="group-hover:scale-105 transition-transform" /> 
                        Return to Central Dashboard
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 font-bold py-2 text-xs uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Previous Screen
                    </button>
                </div>
            </div>
        </div>
    );
}