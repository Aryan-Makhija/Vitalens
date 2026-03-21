import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const Navbar = () => (
  <motion.nav
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
  >
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg gradient-cta flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-xl text-foreground">VitaLens</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {["Features", "How It Works", "Trust", "Plans"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
          Log in
        </button>
        <button className="gradient-cta text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          Start Free Check-in
        </button>
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
