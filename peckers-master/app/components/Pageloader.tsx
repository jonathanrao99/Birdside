"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface PageLoaderProps {
    loading: boolean;
    minimal?: boolean;
    onComplete?: () => void;
}

export default function PageLoader({ loading, minimal, onComplete }: PageLoaderProps) {
    useEffect(() => {
        if (loading) {
            const duration = minimal ? 400 : 900;
            const timer = setTimeout(() => {
                onComplete?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [loading, minimal, onComplete]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {!minimal && (
                        <motion.div
                            className="relative w-20 h-20 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 18,
                                mass: 0.8
                            }}
                        >
                            <img
                                src="https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/PageloaderImage.webp"
                                alt="Loading..."
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

