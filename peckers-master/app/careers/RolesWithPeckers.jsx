"use client";
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';

export default function RolesWithPeckers({ initialData }) {
    const perksFallback = [
        {
            title: "PROPER FOOD",
            description: "FREE STAFF MEALS ON SHIFT. THE BEST CHICKEN IN TOWN, STRAIGHT TO YOUR FACE.",
            icon: (
                <svg className="relative z-10 w-[6vw] h-[6vw] md:w-[1.8vw] md:h-[1.8vw]" width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 27C2.175 27 1.46875 26.7063 0.88125 26.1187C0.29375 25.5312 0 24.825 0 24V19.5H30V24C30 24.825 29.7063 25.5312 29.1188 26.1187C28.5313 26.7063 27.825 27 27 27H3ZM3 22.5V24H27V22.5H3ZM15 15.75C15 15.75 14.775 15.75 14.325 15.75C13.875 15.75 13.3875 16 12.8625 16.5C12.3375 17 11.375 17.25 9.975 17.25C8.575 17.25 7.625 17 7.125 16.5C6.625 16 5.925 15.75 5.025 15.75C4.125 15.75 3.4125 16 2.8875 16.5C2.3625 17 1.4 17.25 0 17.25V14.25C0.9 14.25 1.6125 14 2.1375 13.5C2.6625 13 3.625 12.75 5.025 12.75C6.425 12.75 7.375 13 7.875 13.5C8.375 14 9.075 14.25 9.975 14.25C10.875 14.25 11.5875 14 12.1125 13.5C12.6375 13 13.6 12.75 15 12.75C16.4 12.75 17.3625 13 17.8875 13.5C18.4125 14 19.125 14.25 20.025 14.25C20.925 14.25 21.625 14 22.125 13.5C22.625 13 23.575 12.75 24.975 12.75C26.375 12.75 27.3625 13 27.9375 13.5C28.5125 14 29.2 14.25 30 14.25V17.25C28.6 17.25 27.6625 17 27.1875 16.5C26.7125 16 26.025 15.75 25.125 15.75C24.225 15.75 23.5 16 22.95 16.5C22.4 17 21.425 17.25 20.025 17.25C18.625 17.25 17.6625 17 17.1375 16.5C16.6125 16 15.9 15.75 15 15.75ZM0 10.5V9C0 6.125 1.35625 3.90625 4.06875 2.34375C6.78125 0.781248 10.425 -1.90735e-06 15 -1.90735e-06C19.575 -1.90735e-06 23.2188 0.781248 25.9313 2.34375C28.6438 3.90625 30 6.125 30 9V10.5H0ZM15 3C11.9 3 9.30625 3.3875 7.21875 4.1625C5.13125 4.9375 3.8 6.05 3.225 7.5H26.775C26.2 6.05 24.8688 4.9375 22.7812 4.1625C20.6938 3.3875 18.1 3 15 3Z" fill="white" />
                </svg>
            )
        },
        {
            title: "FLEXIBLE SHIFTS",
            description: "WORK HARD, PLAY HARD. WE BUILD THE ROTA AROUND YOUR LIFE, NOT THE OTHER WAY AROUND.",
            icon: (
                <svg className="relative z-10 w-[6vw] h-[6vw] md:w-[1.8vw] md:h-[1.8vw]" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.95 22.05L22.05 19.95L16.5 14.4V7.5H13.5V15.6L19.95 22.05ZM15 30C12.925 30 10.975 29.6062 9.15 28.8187C7.325 28.0312 5.7375 26.9625 4.3875 25.6125C3.0375 24.2625 1.96875 22.675 1.18125 20.85C0.39375 19.025 0 17.075 0 15C0 12.925 0.39375 10.975 1.18125 9.15C1.96875 7.325 3.0375 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.96875 9.15 1.18125C10.975 0.393749 12.925 -1.19209e-06 15 -1.19209e-06C17.075 -1.19209e-06 19.025 0.393749 20.85 1.18125C22.675 1.96875 24.2625 3.0375 25.6125 4.3875C26.9625 5.7375 28.0313 7.325 28.8188 9.15C29.6063 10.975 30 12.925 30 15C30 17.075 29.6063 19.025 28.8188 20.85C28.0313 22.675 26.9625 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.0312 20.85 28.8187C19.025 29.6062 17.075 30 15 30ZM15 27C18.325 27 21.1563 25.8312 23.4938 23.4937C25.8313 21.1562 27 18.325 27 15C27 11.675 25.8313 8.84375 23.4938 6.50625C21.1563 4.16875 18.325 3 15 3C11.675 3 8.84375 4.16875 6.50625 6.50625C4.16875 8.84375 3 11.675 3 15C3 18.325 4.16875 21.1562 6.50625 23.4937C8.84375 25.8312 11.675 27 15 27Z" fill="white" />
                </svg>
            )
        },
        {
            title: "GOOD VIBES",
            description: "FAST-PACED, LOUD MUSIC, GREAT PEOPLE. IT’S CHAOS, BUT IT’S THE GOOD KIND.",
            icon: (
                <svg className="relative z-10 w-[6vw] h-[6vw] md:w-[1.8vw] md:h-[1.8vw]" width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 20.4L12.3 13.5H8.025L11.025 3H3V15H7.5V20.4ZM4.5 30V18H0V-1.90735e-06H15L12 10.5H18L4.5 30Z" fill="white" />
                </svg>
            )
        }
    ];

    const perks = initialData?.perks || perksFallback;

    return (
        <div className="w-full bg-black flex flex-col items-center pt-[6vh] md:pt-[6vh] lg:pt-[5vh] xl:pt-[12vh] pb-[4vh] md:pb-[6vh] lg:pb-[5vh] xl:pb-[10vh] px-[6vw]">

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-peakers text-white font-semibold text-[10vw] md:text-[8vw] lg:text-[4.5vw] xl:text-[3.5vw] text-center leading-none uppercase"
            >
                {initialData?.rolesTitle || "WHY ROLL WITH US?"}
            </motion.h1>

            {/* Underline */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-[15vw] md:w-[7vw] h-[2px] md:h-[3px] lg:h-[4px] bg-white mt-[2vh]"
            ></motion.div>


            <div className="w-full pt-[4vh] md:pt-[2vh] lg:pt-[2vh] pb-[4vh] md:pb-0 lg:pb-0 flex justify-center">

                <div className="w-full lg:w-[85%] flex flex-col md:flex-row justify-between items-stretch gap-[4vh] md:gap-[1.5vw] lg:gap-0">

                    {perks.map((perk, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                            className="w-full md:w-[32%] lg:w-[31%] min-h-[45vh] md:min-h-fit md:h-auto lg:min-h-fit lg:h-auto relative flex flex-col items-center text-center px-[8vw] md:px-[4vw] lg:px-[2vw] py-[8vh] md:py-[6vh] lg:py-[4vh] rounded-[2vw] md:rounded-[1vw] lg:rounded-[0.5vw] overflow-hidden"
                        >
                            <Image
                                src="https://ehtazgziwtjqm5ww.public.blob.vercel-storage.com/careers/Background%2BOverlay%2BBorder.webp"
                                alt="Card Background"
                                fill
                                className="object-cover"
                            />
                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className="w-[15vw] h-[15vw] md:w-[9vw] md:h-[9vw] lg:w-[6.5vw] lg:h-[6.5vw] xl:w-[5vw] xl:h-[5vw] relative flex items-center justify-center mb-[4vh] md:mb-[3vh] lg:mb-[4vh]">
                                    <svg className="absolute inset-0 w-full h-full" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="79" height="79" rx="39.5" fill="black" stroke="#2A2A2A" />
                                    </svg>
                                    <div className="scale-125 md:scale-100 lg:scale-100">
                                        {perk.icon || perksFallback[index % 3].icon}
                                    </div>
                                </div>

                                <h2 className="font-peakers text-white text-[7vw] md:text-[4vw] lg:text-[2.2vw] xl:text-[1.6vw] mb-[2vh] tracking-widest uppercase text-center">
                                    {perk.title}
                                </h2>

                                <p className="text-gray-400 text-[3.8vw] md:text-[2.2vw] lg:text-[1.1vw] xl:text-[0.8vw] tracking-[0.05vw] leading-relaxed md:leading-[1.4] lg:leading-[1.6vw] text-center">
                                    {perk.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
        </div>
    )
}