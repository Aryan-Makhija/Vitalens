
"use client"

import { motion } from "framer-motion";
import { ArrowRight, Shield, Brain, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
} from "@clerk/nextjs";

const HeroSection = () => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#FAF9F6]">
        {/* Professional Ambient Background */}
        <div className="absolute inset-0">
            {/* Soft Sage Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#E8F3EE] rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F2F5F3] rounded-full blur-[120px] opacity-60" />

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
                style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/p6.png")` }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

                {/* AI Badge - High Contrast */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE4E1] mb-10 shadow-sm"
                >
                    <div className="w-2 h-2 rounded-full bg-[#4A675D] animate-pulse" />
                    <span className="text-[11px] font-bold text-[#4A675D] uppercase tracking-[0.2em]">
                        AI-Powered Health Intelligence
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 text-[#2D3331]"
                >
                    Your Health, <br />
                    <span className="italic text-[#4A675D]">Understood</span> Before <br />
                    It Speaks.
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-[#5C6361] max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    VitaLens transforms your daily habits into clinical-grade insights.
                    Experience early detection and personalized wellness through
                    advanced <span className="font-semibold text-[#4A675D]">predictive analysis</span>.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <SignedOut>
                        <SignInButton mode="modal">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#3D564D" }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#4A675D] text-white px-10 py-5 rounded-2xl text-base font-bold shadow-[0_20px_40px_-10px_rgba(74,103,93,0.3)] flex items-center gap-3 group transition-all"
                            >
                                Start Your Free Check-in
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Link href="/HomePage">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#3D564D" }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#4A675D] text-white px-10 py-5 rounded-2xl text-base font-bold shadow-[0_20px_40px_-10px_rgba(74,103,93,0.3)] flex items-center gap-3 group transition-all"
                            >
                                Dashboard
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </SignedIn>

                    <a href="#how-it-works">

                        <button className="px-10 py-5 rounded-2xl text-base font-bold text-[#4A675D] border border-[#DCE4E1] bg-white/50 backdrop-blur-sm hover:bg-white transition-all">
                            See How It Works
                        </button>
                    </a>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-10 mt-20 pt-10 border-t border-[#DCE4E1]/50"
                >
                    {[
                        { icon: Brain, label: "Predictive Models" },
                        { icon: Shield, label: "HIPAA Compliant" },
                        { icon: Heart, label: "Clinical Validation" },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-[#E8F3EE] flex items-center justify-center group-hover:bg-[#4A675D] transition-colors duration-300">
                                <Icon className="w-4 h-4 text-[#4A675D] group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-[10px] font-bold text-[#8B7E66] uppercase tracking-[0.15em]">
                                {label}
                            </span>
                        </div>
                    ))}
                </motion.div>

            </div>
        </div>
    </section>
);

export default HeroSection;
