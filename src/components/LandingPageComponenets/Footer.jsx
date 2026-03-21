// import { Activity } from "lucide-react";

// const Footer = () => (
//   <footer className="border-t border-border/50 bg-secondary/30">
//     <div className="container mx-auto px-6 py-12">
//       <div className="grid md:grid-cols-4 gap-8">
//         <div className="md:col-span-1">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center">
//               <Activity className="w-4 h-4 text-primary-foreground" />
//             </div>
//             <span className="font-display font-bold text-lg text-foreground">VitaLens</span>
//           </div>
//           <p className="text-sm text-muted-foreground leading-relaxed">
//             AI-powered health intelligence for early detection and personalized wellness guidance.
//           </p>
//         </div>

//         {[
//           { title: "Product", links: ["Features", "How It Works", "Pricing", "API"] },
//           { title: "Company", links: ["About Us", "Blog", "Careers", "Contact"] },
//           { title: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Security"] },
//         ].map((col) => (
//           <div key={col.title}>
//             <h4 className="font-display font-semibold text-foreground mb-4 text-sm">{col.title}</h4>
//             <ul className="space-y-2.5">
//               {col.links.map((link) => (
//                 <li key={link}>
//                   <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       <div className="border-t border-border/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//         <p className="text-xs text-muted-foreground">
//           © 2026 VitaLens. All rights reserved.
//         </p>
//         <div className="flex items-center gap-6">
//           {["Twitter", "LinkedIn", "GitHub"].map((social) => (
//             <a key={social} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
//               {social}
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;

"use client"

import { Activity, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { title: "Product", links: ["Features", "How It Works", "Pricing", "API"] },
    { title: "Company", links: ["About Us", "Blog", "Careers", "Contact"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Security"] },
  ];

  return (
    <footer className="bg-[#F4F7F5] border-t border-[#DCE4E1]">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">

          {/* Brand Identity Column */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#4A675D] flex items-center justify-center shadow-lg shadow-[#4A675D]/10">
                <Activity className="w-5 h-5 text-[#F7F3E9]" />
              </div>
              <span className="font-serif font-bold text-2xl text-[#2D3331] tracking-tight">
                VitaLens
              </span>
            </div>
            <p className="text-[#5C6361] text-sm leading-relaxed max-w-sm mb-8">
              Empowering proactive health through advanced AI intelligence.
              Bridging the gap between clinical data and actionable wellness.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Github, label: "GitHub" }
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-[#DCE4E1] flex items-center justify-center text-[#4A675D] hover:bg-[#4A675D] hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-[#2D3331] mb-6 text-xs uppercase tracking-[0.2em]">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#5C6361] hover:text-[#4A675D] hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#DCE4E1] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[11px] font-bold text-[#8B7E66] uppercase tracking-widest">
              © 2026 VitaLens Systems Inc.
            </p>
            <div className="h-4 w-px bg-[#DCE4E1] hidden md:block" />
            <p className="text-[10px] text-[#5C6361] italic">
              Designed for clinical-grade health monitoring.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4A675D] animate-pulse" />
              <span className="text-[10px] font-bold text-[#4A675D] uppercase tracking-tighter">System Status: Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
