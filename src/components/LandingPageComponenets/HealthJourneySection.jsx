// "use client"

// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { useRef, useState } from "react";
// import {
//   ClipboardList,
//   Brain,
//   FileSearch,
//   FlaskConical,
//   FileText,
//   CalendarCheck,
//   ArrowDown,
//   User,
//   Stethoscope,
//   ChevronDown,
//   Shield,
//   CheckCircle2,
//   AlertCircle,
//   TrendingUp,
// } from "lucide-react";

// const journeySteps = [
//   {
//     id: 1,
//     icon: User,
//     title: "Something Feels Off",
//     subtitle: "You notice a change",
//     description:
//       "Just like visiting a doctor when something doesn't feel right, you start by sharing what you've noticed — fatigue, mood changes, sleep issues, or anything unusual.",
//     visual: "symptom",
//     color: "bg-warm",
//     iconColor: "text-foreground",
//     accentBorder: "border-warm-deep",
//     expandedContent:
//       "No medical jargon needed. Our guided prompts help you articulate how you're feeling in plain language. Think of it as your first conversation with a caring physician.",
//   },
//   {
//     id: 2,
//     icon: ClipboardList,
//     title: "Form 1 — Initial Check-in",
//     subtitle: "Your first health snapshot",
//     description:
//       "A smart questionnaire captures your lifestyle habits, recent symptoms, diet, sleep, and activity levels — like the initial tests at a clinic.",
//     visual: "form1",
//     color: "bg-sage-light",
//     iconColor: "text-primary",
//     accentBorder: "border-primary/30",
//     expandedContent:
//       "Adaptive questions that adjust based on your answers. The form learns what's relevant and skips what's not, saving you time while gathering comprehensive data.",
//   },
//   {
//     id: 3,
//     icon: FlaskConical,
//     title: "Layer 1 — AI Analysis",
//     subtitle: "Pattern detection begins",
//     description:
//       "Our first AI layer scans for inconsistencies and patterns across your responses — detecting mismatches between habits, symptoms, and lifestyle factors.",
//     visual: "layer1",
//     color: "bg-teal-light",
//     iconColor: "text-accent",
//     accentBorder: "border-accent/30",
//     expandedContent:
//       "No advice is given at this stage. Like a lab running tests, Layer 1 silently identifies areas that need deeper exploration before drawing any conclusions.",
//   },
//   {
//     id: 4,
//     icon: FileSearch,
//     title: "Form 2 — Deep Insights",
//     subtitle: "Conditional deep dive",
//     description:
//       "Based on Layer 1 findings, a second targeted form explores stress levels, injury history, medications, and lifestyle context that matter most.",
//     visual: "form2",
//     color: "bg-sage-light",
//     iconColor: "text-primary",
//     accentBorder: "border-primary/30",
//     expandedContent:
//       "This form only appears when needed — like a specialist referral. It digs deeper into the specific areas flagged by the initial analysis, ensuring nothing is missed.",
//   },
//   {
//     id: 5,
//     icon: Brain,
//     title: "Layer 2 — Deep Analysis",
//     subtitle: "Comprehensive AI reasoning",
//     description:
//       "Both forms are analyzed together through our advanced AI engine — correlating data points, assessing risk factors, and building your health profile.",
//     visual: "layer2",
//     color: "bg-teal-light",
//     iconColor: "text-accent",
//     accentBorder: "border-accent/30",
//     expandedContent:
//       "Layer 2 cross-references your data with health guidelines and patterns. It ensures safe, evidence-based interpretation — like a team of specialists reviewing your case.",
//   },
//   {
//     id: 6,
//     icon: FileText,
//     title: "Final Report & Guidance",
//     subtitle: "Your personal health summary",
//     description:
//       "A clear, comprehensive report highlights concerns, positive areas, control status, and escalation recommendations — summarized like a doctor's consultation.",
//     visual: "report",
//     color: "bg-warm",
//     iconColor: "text-foreground",
//     accentBorder: "border-warm-deep",
//     expandedContent:
//       "Color-coded risk levels, actionable next steps, and plain-language explanations. If anything needs urgent attention, the system recommends professional consultation.",
//   },
//   {
//     id: 7,
//     icon: CalendarCheck,
//     title: "Weekly Plan & Feedback Loop",
//     subtitle: "Ongoing improvement",
//     description:
//       "Receive a personalized weekly plan with habit adjustments, check-in reminders, and progress tracking — your continuous path to better health.",
//     visual: "weekly",
//     color: "bg-sage-light",
//     iconColor: "text-primary",
//     accentBorder: "border-primary/30",
//     expandedContent:
//       "The feedback loop means your plans evolve with you. Each week's data refines next week's recommendations, creating a virtuous cycle of health improvement.",
//   },
// ];

// const StepVisual = ({ visual, isActive }) => {
//   const baseClass = "w-full h-full flex items-center justify-center";

//   switch (visual) {
//     case "symptom":
//       return (
//         <div className={baseClass}>
//           <div className="relative">
//             <motion.div
//               animate={isActive ? { scale: [1, 1.05, 1] } : {}}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-20 h-20 rounded-full bg-warm-deep/50 flex items-center justify-center"
//             >
//               <User className="w-10 h-10 text-foreground/70" />
//             </motion.div>
//             <motion.div
//               animate={isActive ? { opacity: [0, 1, 0] } : { opacity: 0 }}
//               transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
//               className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center"
//             >
//               <AlertCircle className="w-3 h-3 text-accent" />
//             </motion.div>
//           </div>
//         </div>
//       );
//     case "form1":
//     case "form2":
//       return (
//         <div className={baseClass}>
//           <div className="w-full max-w-[140px] space-y-2">
//             {[1, 2, 3].map((i) => (
//               <motion.div
//                 key={i}
//                 initial={{ width: 0 }}
//                 animate={isActive ? { width: "100%" } : { width: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.15 }}
//                 className="h-3 rounded-full bg-primary/15"
//               />
//             ))}
//             <motion.div
//               initial={{ width: 0 }}
//               animate={isActive ? { width: "60%" } : { width: 0 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//               className="h-3 rounded-full bg-primary/10"
//             />
//           </div>
//         </div>
//       );
//     case "layer1":
//     case "layer2":
//       return (
//         <div className={baseClass}>
//           <div className="relative w-20 h-20">
//             {[0, 1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 animate={
//                   isActive
//                     ? { rotate: 360, scale: [1, 1.1, 1] }
//                     : { rotate: 0 }
//                 }
//                 transition={{
//                   rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
//                   scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
//                 }}
//                 className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30"
//                 style={{ padding: i * 8 }}
//               />
//             ))}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <FlaskConical className="w-6 h-6 text-accent" />
//             </div>
//           </div>
//         </div>
//       );
//     case "report":
//       return (
//         <div className={baseClass}>
//           <div className="space-y-2 w-full max-w-[140px]">
//             <div className="flex items-center gap-2">
//               <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={isActive ? { width: "100%" } : { width: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="h-2.5 rounded-full bg-primary/20"
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <AlertCircle className="w-4 h-4 text-accent shrink-0" />
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={isActive ? { width: "75%" } : { width: 0 }}
//                 transition={{ duration: 0.4, delay: 0.15 }}
//                 className="h-2.5 rounded-full bg-accent/20"
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <TrendingUp className="w-4 h-4 text-primary shrink-0" />
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={isActive ? { width: "90%" } : { width: 0 }}
//                 transition={{ duration: 0.4, delay: 0.3 }}
//                 className="h-2.5 rounded-full bg-primary/15"
//               />
//             </div>
//           </div>
//         </div>
//       );
//     case "weekly":
//       return (
//         <div className={baseClass}>
//           <div className="flex gap-1.5">
//             {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ height: 12 }}
//                 animate={isActive ? { height: 12 + Math.random() * 30 } : { height: 12 }}
//                 transition={{ duration: 0.5, delay: i * 0.08 }}
//                 className={`w-4 rounded-sm ${i < 4 ? "bg-primary/30" : "bg-muted"}`}
//               />
//             ))}
//           </div>
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// const JourneyStep = ({
//   step,
//   index,
//   isLast,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-60px" });
//   const [isExpanded, setIsExpanded] = useState(false);
//   const isLeft = index % 2 === 0;

//   return (
//     <div ref={ref} className="relative">
//       {/* Connector line */}
//       {!isLast && (
//         <motion.div
//           initial={{ height: 0 }}
//           animate={isInView ? { height: "100%" } : {}}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="absolute left-1/2 -translate-x-1/2 top-[4.5rem] w-px bg-gradient-to-b from-border to-border/30 z-0 hidden md:block"
//           style={{ height: "calc(100% + 2rem)" }}
//         />
//       )}

//       {/* Step node on timeline */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0 }}
//         animate={isInView ? { opacity: 1, scale: 1 } : {}}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 w-10 h-10 rounded-full bg-card border-2 border-primary/30 items-center justify-center shadow-soft"
//       >
//         <span className="text-xs font-bold text-primary">{step.id}</span>
//       </motion.div>

//       {/* Content card */}
//       <div className={`md:grid md:grid-cols-2 md:gap-16 items-center ${isLeft ? "" : "md:direction-rtl"}`}>
//         <motion.div
//           initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className={`${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12 md:col-start-2"} md:direction-ltr`}
//         >
//           <div
//             onClick={() => setIsExpanded(!isExpanded)}
//             className={`group relative p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-elevated transition-all cursor-pointer ${step.accentBorder} border-l-4 md:border-l-0 ${isLeft ? "md:border-r-4" : "md:border-l-4"}`}
//           >
//             <div className="flex items-start gap-4">
//               {/* Mobile step number */}
//               <div className="md:hidden w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
//                 <span className="text-xs font-bold text-primary">{step.id}</span>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div
//                     className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}
//                   >
//                     <step.icon className={`w-5 h-5 ${step.iconColor}`} />
//                   </div>
//                   <div>
//                     <h3 className="font-display font-bold text-base text-foreground">{step.title}</h3>
//                     <p className="text-xs text-muted-foreground font-medium">{step.subtitle}</p>
//                   </div>
//                 </div>

//                 <p className="text-sm text-muted-foreground leading-relaxed mt-3">{step.description}</p>

//                 {/* Expand toggle */}
//                 <button className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary hover:text-accent transition-colors">
//                   {isExpanded ? "Show less" : "Learn more"}
//                   <ChevronDown
//                     className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
//                   />
//                 </button>

//                 <AnimatePresence>
//                   {isExpanded && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="pt-3 border-t border-border/50 mt-3">
//                         <div className="flex items-start gap-2">
//                           <Stethoscope className="w-4 h-4 text-accent mt-0.5 shrink-0" />
//                           <p className="text-sm text-muted-foreground leading-relaxed">
//                             {step.expandedContent}
//                           </p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

//             {/* Hover glow */}
//             <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//           </div>
//         </motion.div>

//         {/* Visual side */}
//         <motion.div
//           initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.35 }}
//           className={`hidden md:flex ${isLeft ? "md:pl-12" : "md:pr-12 md:col-start-1 md:row-start-1"} md:direction-ltr items-center justify-center h-32`}
//         >
//           <div className="w-full max-w-[200px] h-full rounded-2xl bg-muted/40 border border-border/30 p-4 flex items-center justify-center">
//             <StepVisual visual={step.visual} isActive={isInView} />
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const HealthJourneySection = () => {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

//   return (
//     <section id="health-journey" className="py-24 md:py-32 relative overflow-hidden">
//       {/* Background blobs */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-20 -left-32 w-64 h-64 bg-sage-light/40 blob animate-blob-morph opacity-40" />
//         <div className="absolute bottom-40 -right-24 w-56 h-56 bg-teal-light/30 blob-2 animate-float-slow opacity-30" />
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           ref={sectionRef}
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-2xl mx-auto mb-20"
//         >
//           <span className="text-sm font-semibold text-primary uppercase tracking-wider">
//             Your Health Journey
//           </span>
//           <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-5">
//             Like Visiting a Doctor,{" "}
//             <span className="text-gradient">But Smarter</span>
//           </h2>
//           <p className="text-muted-foreground text-lg leading-relaxed">
//             Follow the same trusted process of early detection and diagnosis — enhanced by AI that
//             never misses a detail. Every step is designed to protect, not replace, your health
//             decisions.
//           </p>
//         </motion.div>

//         {/* Journey steps */}
//         <div className="relative max-w-5xl mx-auto space-y-10 md:space-y-16">
//           {journeySteps.map((step, i) => (
//             <JourneyStep
//               key={step.id}
//               step={step}
//               index={i}
//               isLast={i === journeySteps.length - 1}
//             />
//           ))}
//         </div>

//         {/* Bottom trust note */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center justify-center gap-3 mt-16 py-4 px-6 rounded-xl bg-secondary/60 border border-border/50 max-w-lg mx-auto"
//         >
//           <Shield className="w-5 h-5 text-primary shrink-0" />
//           <p className="text-sm text-muted-foreground">
//             <span className="font-semibold text-foreground">VitaLens does not replace doctors.</span>{" "}
//             We support early detection and monitoring so you can seek help sooner.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HealthJourneySection;



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