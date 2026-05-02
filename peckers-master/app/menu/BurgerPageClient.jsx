"use client";

import { useState } from "react";
import BurgerTitleSection from "./BurgerTitleSection";
import BurgerPageText from "./BurgerPageText";

export default function BurgerPageClient({ initialBurgers, initialNavbarData }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleBurgerChange = (index) => {
        setActiveIndex(index);
    };

    return (
        <div id="main-content">
            <BurgerTitleSection 
                initialBurgers={initialBurgers} 
                initialNavbarData={initialNavbarData} 
                onBurgerChange={handleBurgerChange}
            />
            <BurgerPageText burgerData={initialBurgers[activeIndex]} />
        </div>
    );
}
