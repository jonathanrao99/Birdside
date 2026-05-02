"use client";

import { useEffect, useState } from "react";

export function usePageLoader() {
    const [loading, setLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Only run on client
        if (typeof window !== "undefined") {
            const hasLoaded = sessionStorage.getItem("peckers_initial_loaded");
            if (!hasLoaded) {
                setLoading(true);
            }
            setIsInitialized(true);
        }
    }, []);

    const completeLoading = () => {
        setLoading(false);
        sessionStorage.setItem("peckers_initial_loaded", "true");
    };

    return { loading, isInitialized, completeLoading };
}