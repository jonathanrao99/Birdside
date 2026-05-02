"use client";
import React from 'react'
import { motion } from 'framer-motion';
import { urlFor } from '../../sanity/lib/image';

export default function CrewPage({ initialData }) {
    // Default placeholder data for when Sanity data is not yet uploaded
    const crewMembers = initialData?.crewMembers || [
        { label: "THE GRILL", image: null },
        { label: "FRONT HOUSE", image: null },
        { label: "THE PREP", image: null },
        { label: "THE VIBE", image: null },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-black text-white px-[6vw] py-[8vh] md:py-[6vh] lg:py-[12vh]"
        >

            {/* Top Row */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-[2vw] lg:gap-0">

                {/* Left Title */}
                <h1 className="font-peakers text-[12vw] md:text-[9vw] lg:text-[4.2vw] font-bold tracking-[0.1vw] leading-none uppercase">
                    {initialData?.heading || "THE CREW"}
                </h1>

                {/* Right Text */}
                <p className="text-left md:text-right font-semibold font-peakers text-[4vw] md:text-[2.2vw] lg:text-[.9vw] tracking-[0.1vw] pt-0 md:pt-[1vw] lg:pt-[1.5vw] text-gray-400 max-w-full md:max-w-[45vw] lg:max-w-[35vw] uppercase">
                    {initialData?.description || (
                        <>
                            FROM THE KITCHEN TO THE COUNTER — THIS IS THE <br className="hidden lg:block" />
                            PECKERS FAMILY.
                            NO ROBOTS, JUST LEGENDS.
                        </>
                    )}
                </p>

            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-[#4444] mt-[3vh] md:mt-[4vh] lg:mt-[4vh] mb-[6vh] md:mb-[5vh] lg:mb-[6vh]"></div>

            {/* Crew Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[8vw] md:gap-[4vw] lg:gap-[1.5vw]"
            >
                {crewMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className={`group relative aspect-3/4 overflow-hidden bg-[#111] transition-all duration-500 rounded-[3vw] md:rounded-xl lg:rounded-none 
                            ${(index === 1 || index === 3) ? "md:mt-[3vh] lg:mt-[4vh]" : ""} 
                            `}
                    >
                        {/* Image from Sanity or Placeholder */}
                        {member.image ? (
                            <img
                                src={urlFor(member.image).width(800).url()}
                                alt={member.label}
                                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-[#333] font-peakers text-[4vw] md:text-[2vw] lg:text-[1vw]">WAITING FOR IMAGE</span>
                            </div>
                        )}

                        {/* Bottom Gradient Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/90 to-transparent"></div>

                        {/* Label */}
                        <div className="absolute bottom-[4vw] left-[4vw] md:bottom-[3vw] md:left-[3vw] lg:bottom-[1.5vw] lg:left-[1.5vw]">
                            <span className="font-peakers text-[5vw] md:text-[3.5vw] lg:text-[0.9vw] font-bold tracking-wider text-white uppercase drop-shadow-md">
                                {member.label}
                            </span>
                        </div>

                    </motion.div>
                ))}
            </motion.div>

            {/* Section Bottom Gradient Border */}
            <div className="w-full h-px relative mt-[8vh]">
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-yellow-600 to-transparent"
                />
            </div>

        </motion.div>
    )
}