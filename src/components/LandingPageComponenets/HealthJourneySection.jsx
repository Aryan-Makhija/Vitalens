
"use client"

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ClipboardList,
  Brain,
  FileSearch,
  FlaskConical,
  FileText,
  CalendarCheck,
  User,
  Stethoscope,
  ChevronDown,
  Shield,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity
} from "lucide-react";

const journeySteps = [
  {
    id: 1,
    icon: User,
    title: "Something Feels Off",
    subtitle: "The Human Element",
    description: "Your journey begins with a simple check-in. Tell us about your fatigue, sleep, or mood in your own words—no clinical jargon required.",
    visual: "symptom",
    color: "bg-[#F7F3E9]", // Warm Cream
    iconColor: "text-[#8B7E66]", // Muted Earth
    accentBorder: "border-[#DCD7CC]",
    expandedContent: "Our AI uses Natural Language Processing to understand your descriptions just like a person would.",
  },
  {
    id: 2,
    icon: ClipboardList,
    title: "Form 1 — Initial Vitals",
    subtitle: "Broad Spectrum Check",
    description: "A smart questionnaire captures lifestyle habits and immediate symptoms—mirroring the intake form at a high-end clinic.",
    visual: "form1",
    color: "bg-[#E8F1EE]", // Soft Sage
    iconColor: "text-[#4A675D]", // Deep Sage
    accentBorder: "border-[#C5D6D0]",
    expandedContent: "This form adapts in real-time. If you mention sleep, it dives deeper into your circadian rhythms automatically.",
  },
  {
    id: 3,
    icon: FlaskConical,
    title: "Layer 1 — Silent Analysis",
    subtitle: "Pattern Detection",
    description: "Our first AI layer scans your data for inconsistencies. It flags mismatches between your habits and reported symptoms.",
    visual: "layer1",
    color: "bg-[#E0E9F0]", // Muted Morning Blue
    iconColor: "text-[#5A7A8C]",
    accentBorder: "border-[#C5D0D9]",
    expandedContent: "This layer acts as a 'Lab Technician,' prepping your data for clinical-grade reasoning in the next steps.",
  },
  {
    id: 4,
    icon: FileSearch,
    title: "Form 2 — The Specialist",
    subtitle: "Conditional Deep Dive",
    description: "Triggered only when needed, this form explores specific stressors or history flagged by the first analysis layer.",
    visual: "form2",
    color: "bg-[#E8F1EE]",
    iconColor: "text-[#4A675D]",
    accentBorder: "border-[#C5D6D0]",
    expandedContent: "By only asking what matters, we reduce 'form fatigue' while maintaining diagnostic depth.",
  },
  {
    id: 5,
    icon: Brain,
    title: "Layer 2 — Synthesis",
    subtitle: "Advanced AI Reasoning",
    description: "Both forms are unified. The AI cross-references 500+ health biomarkers to build your multi-dimensional profile.",
    visual: "layer2",
    color: "bg-[#F3EFE7]", // Warm Bone
    iconColor: "text-[#7C725D]",
    accentBorder: "border-[#D6CEC0]",
    expandedContent: "This mimics a Multi-Disciplinary Team (MDT) review, ensuring your report is balanced and evidence-based.",
  },
  {
    id: 6,
    icon: FileText,
    title: "The Consultation",
    subtitle: "Final Health Report",
    description: "Receive a professional summary highlighting wins, concerns, and control status—delivered with medical-grade clarity.",
    visual: "report",
    color: "bg-[#E8F1EE]",
    iconColor: "text-[#4A675D]",
    accentBorder: "border-[#C5D6D0]",
    expandedContent: "Includes 'Actionable Priorities' and an escalation guide if professional medical intervention is recommended.",
  },
  {
    id: 7,
    icon: CalendarCheck,
    title: "The Vital Loop",
    subtitle: "Weekly Evolution",
    description: "Your plan isn't static. Each week, your feedback recalibrates the AI, leading to progressively better health outcomes.",
    visual: "weekly",
    color: "bg-[#F7F3E9]",
    iconColor: "text-[#8B7E66]",
    accentBorder: "border-[#DCD7CC]",
    expandedContent: "The system learns your 'normal,' making it more sensitive to small positive or negative changes over time.",
  },
];

const StepVisual = ({ visual, isActive }) => {
  const baseClass = "w-full h-full flex items-center justify-center";

  switch (visual) {
    case "symptom":
      return (
        <div className={baseClass}>
          <motion.div animate={isActive ? { opacity: [0.4, 1, 0.4] } : {}} transition={{ duration: 3, repeat: Infinity }}>
            <Activity className="text-[#4A675D] w-12 h-12 stroke-[1.5px]" />
          </motion.div>
        </div>
      );
    case "form1":
    case "form2":
      return (
        <div className="space-y-2 w-24">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={isActive ? { width: "100%" } : { width: 0 }}
              transition={{ delay: i * 0.2 }}
              className="h-1.5 bg-[#4A675D]/20 rounded-full"
            />
          ))}
        </div>
      );
    case "layer1":
    case "layer2":
      return (
        <div className="relative">
          <motion.div
            animate={isActive ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border border-dashed border-[#4A675D]/40 rounded-full flex items-center justify-center"
          >
            <Brain className="w-6 h-6 text-[#4A675D]/60" />
          </motion.div>
        </div>
      );
    case "report":
      return (
        <div className="p-3 bg-white/50 border border-[#DCD7CC] rounded-lg shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-[#4A675D]" />
        </div>
      );
    case "weekly":
      return (
        <div className="flex gap-1 items-end h-8">
          {[4, 7, 5, 8, 6].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={isActive ? { height: `${h * 10}%` } : {}}
              className="w-2 bg-[#4A675D]/30 rounded-t-sm"
            />
          ))}
        </div>
      );
    default: return null;
  }
};

const JourneyStep = ({ step, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative pb-16 md:pb-24">
      {/* Timeline Connector */}
      {!isLast && (
        <div className="absolute left-[20px] md:left-1/2 top-10 w-[1px] h-full bg-[#DCD7CC] md:-translate-x-1/2 z-0" />
      )}

      <div className={`flex flex-col md:grid md:grid-cols-2 md:gap-20 items-center ${isLeft ? "" : "md:direction-rtl"}`}>
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className={`${isLeft ? "md:text-right" : "md:col-start-2 md:text-left"}`}
        >
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`cursor-pointer group relative p-8 rounded-[2rem] bg-[#FAF9F6] border border-[#EBE8E0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:shadow-md border-l-4 ${step.accentBorder}`}
          >
            <div className={`flex items-center gap-4 mb-4 ${isLeft ? "md:flex-row-reverse" : "flex-row"}`}>
              <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center shrink-0`}>
                <step.icon className={`w-6 h-6 ${step.iconColor}`} />
              </div>
              <div className={isLeft ? "md:text-right text-left" : "text-left"}>
                <h3 className="font-bold text-[#2D3331] text-lg">{step.title}</h3>
                <p className="text-xs font-bold text-[#4A675D] uppercase tracking-tighter opacity-70">{step.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-[#5C6361] leading-relaxed mb-4">{step.description}</p>

            <button className="text-[11px] font-bold uppercase tracking-widest text-[#4A675D] flex items-center gap-1">
              {isExpanded ? "Less Info" : "Platform Logic"}
              <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-xs text-[#7C8582] border-t border-[#EBE8E0] mt-4 leading-relaxed italic">
                    {step.expandedContent}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Visual Side */}
        <div className={`hidden md:flex items-center justify-center ${isLeft ? "" : "md:col-start-1 md:row-start-1"}`}>
          <div className="w-48 h-48 rounded-full bg-[#F0F4F2] border border-[#DCE4E1] flex items-center justify-center relative shadow-inner">
            <StepVisual visual={step.visual} isActive={isInView} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HealthJourneySection() {
  return (
    <section id="healthJourney" className="bg-[#FCFAF7] py-24 relative overflow-hidden">
      {/* Soft Ambient Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#E8F1EE] rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[50%] bg-[#F7F3E9] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-4 py-1 rounded-full border border-[#DCE4E1] bg-[#F0F4F2] text-[#4A675D] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            The Journey to Wellness
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2D3331] mb-6">
            A specialized path to <span className="italic">personal clarity.</span>
          </h2>
          <p className="text-[#5C6361] text-lg leading-relaxed">
            We mirror the thoroughness of a clinical visit, distilled into a seamless, intelligent experience.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {journeySteps.map((step, i) => (
            <JourneyStep key={step.id} step={step} index={i} isLast={i === journeySteps.length - 1} />
          ))}
        </div>

        {/* Professional Footer Badge */}
        <div className="mt-12 flex flex-col items-center">
          <div className="px-6 py-4 rounded-full bg-white border border-[#EBE8E0] flex items-center gap-3 shadow-sm">
            <Shield className="w-5 h-5 text-[#4A675D]" />
            <span className="text-xs text-[#5C6361] font-medium uppercase tracking-wider">
              Clinical Guidelines Adhered • Secure Data Analysis
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}