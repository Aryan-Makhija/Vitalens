import { motion } from "framer-motion";

const FloatingBlobs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            className="absolute -top-20 -right-20 w-72 h-72 bg-sage-light opacity-60 animate-blob-morph"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-1/3 -left-16 w-56 h-56 bg-teal-light opacity-50 blob-2"
            animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-20 right-1/4 w-40 h-40 bg-warm opacity-50 blob"
            animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

export default FloatingBlobs;
