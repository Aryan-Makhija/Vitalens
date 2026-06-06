
// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Activity } from "lucide-react";
// import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import Link from "next/link";

// const navItems = [
//   { name: "Features", href: "#features" },
//   { name: "Health Jorney", href: "#healthJourney" },
//   { name: "Process", href: "#how-it-works" },
//   { name: "Plans", href: "#plans" },
//   { name: "Trust", href: "#trust" },
// ];

// const Navbar = () => {
//   const [hoveredPath, setHoveredPath] = useState("");

//   return (
//     <motion.nav
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6 }}
//       className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-white/80 border-b border-[#DCE4E1]/50"
//     >
//       <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

//         {/* LEFT SIDE: Brand Logo */}
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="w-9 h-9 rounded-lg bg-[#4A675D] flex items-center justify-center transition-transform group-hover:scale-105">
//             <Activity className="w-5 h-5 text-white" />
//           </div>
//           <span className="font-serif font-bold text-xl text-[#1A1F1E] tracking-tight">
//             VitaLens
//           </span>
//         </Link>

//         {/* CENTER: Navigation Links (Desktop) */}
//         <div className="hidden md:flex items-center gap-2">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               onMouseEnter={() => setHoveredPath(item.name)}
//               onMouseLeave={() => setHoveredPath("")}
//               className="relative px-4 py-2 text-sm font-medium text-[#5C6361] hover:text-[#1A1F1E] transition-colors"
//             >
//               <span>{item.name}</span>
//               {hoveredPath === item.name && (
//                 <motion.span
//                   layoutId="nav-underline"
//                   className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A675D] mx-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 />
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* RIGHT SIDE: Auth Actions */}
//         <div className="flex items-center gap-3">
//           <SignedOut>
//             <div className="hidden sm:block">
//               <SignInButton mode="modal">
//                 <button className="text-sm font-bold text-[#4A675D] hover:text-[#3d554c] px-4 py-2 transition-colors">
//                   Log in
//                 </button>
//               </SignInButton>
//             </div>
//             <SignUpButton mode="modal">
//               <button className="bg-[#4A675D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#3d554c] transition-all shadow-md active:scale-95">
//                 Start Free Check-in
//               </button>
//             </SignUpButton>
//           </SignedOut>

//           <SignedIn>
//             <Link href="/HomePage" className="hidden md:block text-sm font-bold text-[#5C6361] hover:text-[#4A675D] mr-2 transition-colors">
//               My Dashboard
//             </Link>
//             <div className="p-1 rounded-full border border-[#DCE4E1]">
//               <UserButton
//                 afterSignOutUrl="/"
//                 appearance={{
//                   elements: {
//                     userButtonAvatarBox: "w-9 h-9"
//                   }
//                 }}
//               />
//             </div> 
//           </SignedIn>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;





"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Menu, X, ChevronRight } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Health Journey", href: "#healthJourney" },
  { name: "Process", href: "#how-it-works" },
  { name: "Plans", href: "#plans" },
  { name: "Trust", href: "#trust" },
];

const Navbar = () => {
  const [hoveredPath, setHoveredPath] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-white/90 border-b border-[#DCE4E1]/50"
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LEFT SIDE: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group relative z-[110]">
          <div className="w-9 h-9 rounded-lg bg-[#4A675D] flex items-center justify-center transition-transform group-hover:scale-105">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-serif font-bold text-xl text-[#1A1F1E] tracking-tight">
            VitaLens
          </span>
        </Link>

        {/* CENTER: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredPath(item.name)}
              onMouseLeave={() => setHoveredPath("")}
              className="relative px-4 py-2 text-sm font-medium text-[#5C6361] hover:text-[#1A1F1E] transition-colors"
            >
              <span className="relative z-10">{item.name}</span>
              {hoveredPath === item.name && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A675D] mx-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE: Auth Actions & Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-[110]">
          <div className="hidden sm:block">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-bold text-[#4A675D] hover:text-[#3d554c] px-4 py-2 transition-colors">
                  Log in
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-[#4A675D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#3d554c] transition-all shadow-md active:scale-95">
                <span className="hidden xs:inline">Start Free Check-in</span>
                <span className="xs:hidden">Start</span>
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link href="/HomePage" className="hidden md:block text-sm font-bold text-[#5C6361] hover:text-[#4A675D] mr-2 transition-colors">
              My Dashboard
            </Link>
            <div className="p-0.5 rounded-full border border-[#DCE4E1]">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#4A675D] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#DCE4E1]/50 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl text-[#5C6361] hover:text-[#4A675D] hover:bg-[#F3F4F1] transition-all"
                >
                  <span className="font-medium text-lg">{item.name}</span>
                  <ChevronRight size={18} className="opacity-50" />
                </Link>
              ))}

              <SignedIn>
                <Link
                  href="/HomePage"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl text-[#4A675D] font-bold bg-[#F3F4F1]"
                >
                  <span>My Dashboard</span>
                  <Activity size={18} />
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full text-center p-4 text-[#5C6361] font-bold md:hidden">
                    Log in
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;