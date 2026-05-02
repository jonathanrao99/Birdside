"use client";

import { useState } from "react";
import WrapsTitleSection from "../WrapsTitleSection";
import WrapsPageText from "../WrapsPageText";

export default function WrapsPageClient({ initialWraps, initialNavbarData }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleWrapChange = (index) => {
        setActiveIndex(index);
    };

    return (
        <div id="main-content">
            <WrapsTitleSection 
                initialWraps={initialWraps} 
                initialNavbarData={initialNavbarData} 
                onWrapChange={handleWrapChange}
            />
            <WrapsPageText wrapData={initialWraps[activeIndex]} />
        </div>
    );
}
