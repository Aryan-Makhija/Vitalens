// "use client"

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { LayoutDashboard, ClipboardList, Calendar, BarChart3, TrendingUp, User, HelpCircle, Menu, X } from "lucide-react";
// import Link from "next/link";
// // import { Link } from "react-router-dom";

// const navItems = [
//   { label: "Dashboard", icon: LayoutDashboard, active: true, href: "/dashboard" },
//   { label: "Start Check-In", icon: ClipboardList, cta: true, href: "/dashboard" },
//   { label: "Weekly Plan", icon: Calendar, disabled: true, href: "/dashboard" },
//   { label: "Insights", icon: BarChart3, disabled: true, href: "/dashboard" },
//   { label: "Progress", icon: TrendingUp, disabled: true, href: "/dashboard" },
//   { label: "Profile", icon: User, href: "/dashboard" },
//   { label: "Help", icon: HelpCircle, href: "/dashboard" },
// ];

// const DashboardNavbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="sticky top-0 z-50 backdrop-blur-xl bg-card/70 border-b border-border"
//     >
//       <div className="container mx-auto px-6 flex items-center justify-between h-16">
//         <Link href="/" className="font-display text-xl font-bold text-gradient">VitaLens</Link>

//         {/* Desktop */}
//         <div className="hidden md:flex items-center gap-1">
//           {navItems.map((item) => (
//             <button
//               key={item.label}
//               disabled={item.disabled}
//               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
//                 item.cta
//                   ? "gradient-cta text-primary-foreground shadow-soft hover:opacity-90"
//                   : item.active
//                   ? "bg-secondary text-foreground"
//                   : item.disabled
//                   ? "text-muted-foreground/50 cursor-not-allowed"
//                   : "text-muted-foreground hover:text-foreground hover:bg-secondary"
//               }`}
//             >
//               <item.icon className="w-4 h-4" />
//               {item.label}
//               {item.disabled && <span className="text-[10px] opacity-60">🔒</span>}
//             </button>
//           ))}
//         </div>

//         {/* Mobile toggle */}
//         <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
//           {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {mobileOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           className="md:hidden border-t border-border bg-card/90 backdrop-blur-xl px-6 py-4 space-y-2"
//         >
//           {navItems.map((item) => (
//             <button
//               key={item.label}
//               disabled={item.disabled}
//               className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                 item.cta
//                   ? "gradient-cta text-primary-foreground"
//                   : item.active
//                   ? "bg-secondary text-foreground"
//                   : item.disabled
//                   ? "text-muted-foreground/50"
//                   : "text-muted-foreground hover:bg-secondary"
//               }`}
//             >
//               <item.icon className="w-4 h-4" />
//               {item.label}
//               {item.disabled && <span className="text-[10px]">🔒</span>}
//             </button>
//           ))}
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// };

// export default DashboardNavbar;
"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  BarChart3,
  TrendingUp,
  User,
  HelpCircle,
  Menu,
  X,
  Lock
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true, href: "/dashboard" },
  { label: "Start Check-In", icon: ClipboardList, cta: true, href: "/dashboard" },
  { label: "Weekly Plan", icon: Calendar, disabled: true, href: "/dashboard" },
  { label: "Insights", icon: BarChart3, disabled: true, href: "/dashboard" },
  { label: "Progress", icon: TrendingUp, disabled: true, href: "/dashboard" },
  { label: "Profile", icon: User, href: "/dashboard" },
];

const DashboardNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-[100] backdrop-blur-md bg-white/60 border-b border-[#DCE4E1]"
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#4A675D] flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-serif text-xl font-bold italic">V</span>
          </div>
          <span className="font-serif text-2xl font-medium text-[#2D3331] tracking-tight">
            VitaLens
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              disabled={item.disabled}
              className={`relative group flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 ${item.cta
                  ? "bg-[#4A675D] text-white shadow-lg shadow-[#4A675D]/20 ml-4 hover:scale-105"
                  : item.active
                    ? "text-[#4A675D] bg-[#E8F3EE]"
                    : item.disabled
                      ? "text-[#8B7E66]/40 cursor-not-allowed italic"
                      : "text-[#5C6361] hover:text-[#4A675D] hover:bg-[#F0F4F2]"
                }`}
            >
              <item.icon className={`w-4 h-4 ${item.disabled ? "opacity-30" : "opacity-100"}`} />
              <span className="tracking-wide">{item.label}</span>

              {item.disabled && (
                <Lock className="w-3 h-3 ml-1 opacity-40 group-hover:opacity-100 transition-opacity" />
              )}

              {item.active && !item.cta && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#4A675D] rounded-full"
                />
              )}
            </button>
          ))}

          <div className="h-6 w-px bg-[#DCE4E1] mx-4" />

          <button className="w-10 h-10 rounded-full border border-[#DCE4E1] bg-white flex items-center justify-center hover:bg-[#F7F3E9] transition-colors">
            <HelpCircle className="w-4 h-4 text-[#8B7E66]" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-[#2D3331]"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#DCE4E1] overflow-hidden"
          >
            <div className="px-6 py-8 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  disabled={item.disabled}
                  className={`flex w-full items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${item.cta
                      ? "bg-[#4A675D] text-white"
                      : item.active
                        ? "bg-[#E8F3EE] text-[#4A675D]"
                        : item.disabled
                          ? "text-[#8B7E66]/30 bg-[#FAF9F6]"
                          : "text-[#5C6361] border border-transparent active:bg-[#F0F4F2]"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5" />
                    <span className="tracking-wide uppercase text-[11px] font-black">{item.label}</span>
                  </div>
                  {item.disabled && <Lock className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default DashboardNavbar;