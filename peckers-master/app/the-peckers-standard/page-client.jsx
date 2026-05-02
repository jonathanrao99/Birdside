"use client";

import React, { useState } from "react";
import UniquenessLandingPage from "./LandingPage";
import SubSections from "./SubSections";

const UniquenessPage = ({ initialData }) => {
  const { landingData, sectionsData } = initialData || {};

  // Add JSON+LD schema and preload critical videos
  React.useEffect(() => {
    // Preload first video if available for faster loading
    if (sectionsData && sectionsData.length > 0 && sectionsData[0].videoUrl) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = sectionsData[0].videoUrl;
      document.head.appendChild(link);
    }
  }, [sectionsData]);

  return (
    <div id="main-content" className="uniqueness-page">

      <UniquenessLandingPage initialData={landingData} />
      <SubSections initialData={sectionsData} />

    </div>
  )
}

export default UniquenessPage;
