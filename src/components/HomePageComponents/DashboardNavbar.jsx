
// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   Calendar,
//   BarChart3,
//   User,
//   Menu,
//   X,
//   Lock,
// } from "lucide-react";
// import Link from "next/link";
// import { UserButton } from "@clerk/nextjs";

// const DashboardNavbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [userhistory, setuserhistory] = useState([]);
//   const [profileOpen, setProfileOpen] = useState(false);

//   const userdetails = async () => {
//     try {
//       const result = await fetch("/api/DiagnosisHistory", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await result.json();
//       setuserhistory(data.Allhistory || []);
//     } catch (err) {
//       console.error("Failed to fetch history:", err);
//     }
//   };

//   useEffect(() => {
//     userdetails();
//   }, []);

//   const hasHistory = userhistory.length > 0;

//   const navItems = [
//     { label: "Dashboard", icon: LayoutDashboard, href: "#", active: true },
//     { label: "Start Check-In", icon: ClipboardList, href: "/Checkin", cta: true },
//     {
//       label: "Weekly Plan",
//       icon: Calendar,
//       href: "/WeeklyPlan",
//       disabled: !hasHistory
//     },
//     {
//       label: "Diagnosis History",
//       icon: BarChart3,
//       href: "/DiagnosisHistory",
//       disabled: !hasHistory
//     },
//   ];

//   return (
//     <>
//       <motion.nav
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="sticky top-0 z-[100] backdrop-blur-md bg-white/60 border-b border-[#DCE4E1]"
//       >
//         <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
//           {/* Brand Logo */}
//           <Link href="/" className="flex items-center gap-2 group relative z-[110]">
//             <div className="w-8 h-8 rounded-lg bg-[#4A675D] flex items-center justify-center transition-transform group-hover:rotate-12">
//               <span className="text-white font-serif text-xl font-bold italic">V</span>
//             </div>
//             <span className="font-serif text-2xl font-medium text-[#2D3331] tracking-tight">
//               VitaLens
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.disabled ? "#" : item.href}
//                 onClick={(e) => item.disabled && e.preventDefault()}
//                 className={`relative group flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 ${
//                   item.cta
//                     ? "bg-[#4A675D] text-white shadow-lg shadow-[#4A675D]/20 ml-4 hover:scale-105"
//                     : item.active
//                     ? "text-[#4A675D] bg-[#E8F3EE]"
//                     : item.disabled
//                     ? "text-[#8B7E66]/40 cursor-not-allowed italic"
//                     : "text-[#5C6361] hover:text-[#4A675D] hover:bg-[#F0F4F2]"
//                 }`}
//               >
//                 <item.icon className={`w-4 h-4 ${item.disabled ? "opacity-30" : "opacity-100"}`} />
//                 <span className="tracking-wide">{item.label}</span>
//                 {item.disabled && <Lock className="w-3 h-3 ml-1 opacity-40" />}
//               </Link>
//             ))}

//             <div className="h-6 w-px bg-[#DCE4E1] mx-4" />

//             {/* Profile Action Trigger */}
//             <button
//               onClick={() => setProfileOpen(true)}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold text-[#5C6361] hover:bg-[#F0F4F2] transition-all"
//             >
//               <User className="w-4 h-4" />
//               <span>Profile</span>
//             </button>

//             <div className="w-10 h-10 rounded-full border border-[#DCE4E1] bg-white flex items-center justify-center hover:bg-[#F7F3E9] transition-colors ml-2">
//               <UserButton afterSignOutUrl="/" />
//             </div>
//           </div>

//           {/* Mobile Menu Action Toggle */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="lg:hidden w-10 h-10 flex items-center justify-center text-[#2D3331] relative z-[110] focus:outline-none rounded-xl hover:bg-gray-100/50 transition-colors"
//             aria-label="Toggle Menu"
//           >
//             {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Responsive Mobile Dropdown Drawer */}
//         <AnimatePresence>
//           {mobileOpen && (
//             <>
//               {/* Overlay Backdrop */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setMobileOpen(false)}
//                 className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
//               />

//               {/* Navigation List Sheet */}
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.25, ease: "easeInOut" }}
//                 className="absolute top-0 left-0 w-full bg-white border-b border-[#DCE4E1] pt-24 pb-8 px-6 shadow-xl z-[95] lg:hidden flex flex-col gap-3"
//               >
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.label}
//                     href={item.disabled ? "#" : item.href}
//                     onClick={(e) => {
//                       if (item.disabled) {
//                         e.preventDefault();
//                       } else {
//                         setMobileOpen(false);
//                       }
//                     }}
//                     className={`flex items-center justify-between w-full p-4 rounded-xl text-sm font-bold transition-all ${
//                       item.cta
//                         ? "bg-[#4A675D] text-white shadow-md text-center justify-center mt-2"
//                         : item.active
//                         ? "text-[#4A675D] bg-[#E8F3EE]"
//                         : item.disabled
//                         ? "text-[#8B7E66]/40 cursor-not-allowed italic bg-gray-50/50"
//                         : "text-[#5C6361] hover:bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className="w-4 h-4" />
//                       <span>{item.label}</span>
//                     </div>
//                     {item.disabled && <Lock className="w-3.5 h-3.5 opacity-40" />}
//                   </Link>
//                 ))}

//                 <div className="h-px bg-gray-100 my-2" />

//                 {/* Account Actions for Mobile Layout */}
//                 <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
//                   <button
//                     onClick={() => {
//                       setMobileOpen(false);
//                       setProfileOpen(true);
//                     }}
//                     className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-[#5C6361]"
//                   >
//                     <User className="w-4 h-4" />
//                     <span>Account Profile</span>
//                   </button>
//                   <div className="w-10 h-10 rounded-full border border-[#DCE4E1] bg-white flex items-center justify-center">
//                     <UserButton afterSignOutUrl="/" />
//                   </div>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </>
//   );
// };

// export default DashboardNavbar;

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  BarChart3,
  User,
  Menu,
  X,
  Lock,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { UserButton, useClerk } from "@clerk/nextjs";

const DashboardNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userhistory, setuserhistory] = useState([]);
  const { openUserProfile } = useClerk(); // Clerk modal manager hook

  const userdetails = async () => {
    try {
      const result = await fetch("/api/DiagnosisHistory", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      setuserhistory(data.Allhistory || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  useEffect(() => {
    userdetails();
  }, []);

  const hasHistory = userhistory.length > 0;

  const navItems = [
    { label: "My Dashboard", icon: LayoutDashboard, href: "#", active: true },
    { label: "Start Check-In", icon: ClipboardList, href: "/Checkin", cta: true },
    {
      label: "Weekly Plan",
      icon: Calendar,
      href: "/WeeklyPlan",
      disabled: !hasHistory
    },
    {
      label: "Diagnosis History",
      icon: BarChart3,
      href: "/DiagnosisHistory",
      disabled: !hasHistory
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-[100] backdrop-blur-md bg-white/60 border-b border-[#DCE4E1]"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-[110]">
            <div className="w-9 h-9 rounded-lg bg-[#4A675D] flex items-center justify-center transition-transform group-hover:scale-105">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-[#1A1F1E] tracking-tight">
              VitaLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.disabled ? "#" : item.href}
                onClick={(e) => item.disabled && e.preventDefault()}
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
                {item.disabled && <Lock className="w-3 h-3 ml-1 opacity-40" />}
              </Link>
            ))}

            <div className="h-6 w-px bg-[#DCE4E1] mx-4" />

            {/* Profile Action Trigger - Connected to Clerk */}
            <button
              onClick={() => openUserProfile()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold text-[#5C6361] hover:bg-[#F0F4F2] transition-all"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>

            <div className="w-10 h-10 rounded-full border border-[#DCE4E1] bg-white flex items-center justify-center hover:bg-[#F7F3E9] transition-colors ml-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>

          {/* Mobile Menu Action Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#2D3331] relative z-[110] focus:outline-none rounded-xl hover:bg-gray-100/50 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Responsive Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
              />

              {/* Navigation List Sheet */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full bg-white border-b border-[#DCE4E1] pt-24 pb-8 px-6 shadow-xl z-[95] lg:hidden flex flex-col gap-3"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.disabled ? "#" : item.href}
                    onClick={(e) => {
                      if (item.disabled) {
                        e.preventDefault();
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                    className={`flex items-center justify-between w-full p-4 rounded-xl text-sm font-bold transition-all ${item.cta
                        ? "bg-[#4A675D] text-white shadow-md text-center justify-center mt-2"
                        : item.active
                          ? "text-[#4A675D] bg-[#E8F3EE]"
                          : item.disabled
                            ? "text-[#8B7E66]/40 cursor-not-allowed italic bg-gray-50/50"
                            : "text-[#5C6361] hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.disabled && <Lock className="w-3.5 h-3.5 opacity-40" />}
                  </Link>
                ))}

                <div className="h-px bg-gray-100 my-2" />

                {/* Account Actions for Mobile Layout */}
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      openUserProfile(); // Connected to Clerk for mobile view
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-[#5C6361] w-full text-left"
                  >
                    <User className="w-4 h-4" />
                    <span>Account Profile</span>
                  </button>
                  <div className="w-10 h-10 rounded-full border border-[#DCE4E1] bg-white flex items-center justify-center shrink-0">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default DashboardNavbar;
