
"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Shield } from "lucide-react";

const CTASection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8F3EE] rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative max-w-5xl mx-auto rounded-[3rem] bg-[#4A675D] p-12 md:p-20 text-center overflow-hidden shadow-[0_30px_60px_-15px_rgba(74,103,93,0.3)]"
                >
                    {/* Artistic Topographic Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <filter id="noise">
                                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                            </filter>
                            <rect width="100%" height="100%" filter="url(#noise)" />
                        </svg>
                    </div>

                    {/* Decorative Blobs in Brand Colors */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#E8F3EE]/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F7F3E9]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-[#F7F3E9]" />
                            <span className="text-[#F7F3E9] text-xs font-bold uppercase tracking-[0.2em]">Start Your Transformation</span>
                        </motion.div>

                        <h2 className="font-serif text-4xl md:text-6xl font-medium text-white mb-8 leading-tight">
                            Ready to see your health <br />
                            <span className="italic text-[#F7F3E9]">through a clearer lens?</span>
                        </h2>

                        <p className="text-[#E8F3EE]/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                            Join thousands who use our AI-driven insights to stay ahead of their health.
                            Your first clinical-grade assessment takes less than 5 minutes.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.03, backgroundColor: "#FAF9F6" }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#F7F3E9] text-[#4A675D] px-10 py-5 rounded-2xl text-base font-bold shadow-xl flex items-center gap-3 group transition-colors"
                            >
                                Begin Free Assessment
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <div className="flex items-center gap-2 text-[#E8F3EE]/60">
                                <Shield className="w-4 h-4" />
                                <span className="text-xs font-medium uppercase tracking-widest">Privacy Protected</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Micro-Copy */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <p className="text-[#8B7E66] text-xs font-medium uppercase tracking-widest">
                        Trusted by Health-Conscious Individuals Worldwide
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;