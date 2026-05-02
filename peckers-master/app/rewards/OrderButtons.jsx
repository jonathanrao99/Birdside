"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function OrderButtons() {
  const [eatInDropdownOpen, setEatInDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEatInDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setEatInDropdownOpen(!eatInDropdownOpen)}
          className="bg-[#1e1d1b] hover:bg-[#2a2927] px-7 py-3 rounded-full text-[#c1bfba] text-xs font-bold tracking-[2px] uppercase font-bold transition-all cursor-pointer flex items-center gap-2"
        >
          EAT IN
          <FaChevronDown className={`text-[10px] transition-transform duration-300 ${eatInDropdownOpen ? "rotate-180" : ""}`} />
        </button>
        
        {eatInDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 bg-[#1a1a1a] border border-[#333] rounded-[24px] py-2 shadow-2xl min-w-[170px] z-50 overflow-hidden">
            <Link
              href="/hitchin"
              className="block px-6 py-3 hover:bg-[#262626] text-white text-xs font-bold tracking-[2px] uppercase transition-colors border-b border-white/5"
              onClick={() => setEatInDropdownOpen(false)}
            >
              Hitchin
            </Link>
            <Link
              href="/stevenage"
              className="block px-6 py-3 hover:bg-[#262626] text-white text-xs font-bold tracking-[2px] uppercase transition-colors"
              onClick={() => setEatInDropdownOpen(false)}
            >
              Stevenage
            </Link>
          </div>
        )}
      </div>

      <Link
        href="https://peckers.vmos.io/store/store-selection?app=online"
        target="_blank"
        className="bg-[#1e1d1b] hover:bg-[#2a2927] px-7 py-3 rounded-full text-[#c1bfba] text-xs font-bold tracking-[2px] uppercase font-bold transition-all cursor-pointer"
      >
        PICK-UP
      </Link>
      
      <Link
        href="https://peckers.vmos.io/store/store-selection?app=delivery"
        target="_blank"
        className="bg-[#1e1d1b] hover:bg-[#2a2927] px-7 py-3 rounded-full text-[#c1bfba] text-xs font-bold tracking-[2px] uppercase font-bold transition-all cursor-pointer"
      >
        DELIVERY
      </Link>
    </div>
  );
}
