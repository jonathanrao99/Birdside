"use client";
import React from "react";
import SauceSection from "./saucepageone";

const SaucesPage = ({ initialSaucesData }) => {
  // If we have less than 5 sauces, we can fill them or just show what we have.
  // The user asked to "duplicate into 5 times", so if Sanity has less,
  // we'll repeat them or ensure at least 5 slots are planned.
  const sauces = initialSaucesData || [];

  if (sauces.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">
          Loading Peckers Sauces...
        </p>
      </div>
    );
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <SauceSection initialData={sauces} />
    </main>
  );
};

export default SaucesPage;
