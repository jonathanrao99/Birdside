"use client";

import { motion } from "motion/react";

export default function Loading() {
    return (
        <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="relative w-28 h-28 flex items-center justify-center"
                animate={{ 
                    scale: [1, 1.05, 1] 
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
            >
                <img 
                    src="https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/PageloaderImage.webp" 
                    alt="Loading..."
                    className="w-full h-full object-contain"
                />
            </motion.div>
        </motion.div>
    );
}
