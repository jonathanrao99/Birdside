"use client";

import { motion } from 'framer-motion';

export default function StoryCircle({ initialData = null }) {
    const data = initialData;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full bg-transparent text-white px-[4vw] xl:px-[3vw] pt-[0.8vw] pb-[1.5vw] backdrop-blur-[2px]"
        >
            <div className="flex items-center justify-between gap-6 md:gap-10 w-full">
                <h2 className="text-[3.2vw] xl:text-[3vw] text-left font-bold leading-[1.08] py-2 font-peakers tracking-wide uppercase whitespace-nowrap">
                    {data?.circleSectionHeading || "A LEGACY THAT CAME FULL CIRCLE"}
                </h2>

                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 h-px bg-[#1F2937] mx-3 md:mx-10"
                ></motion.div>

                <span className="text-white/60 tracking-[0.22em] font-sans text-[0.8vw] xl:text-[0.75vw] whitespace-nowrap uppercase text-right">
                    {data?.establishedYear ? `EST. ${data.establishedYear}` : "EST. EST. 1978"}
                </span>
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full h-px bg-[#1F2937] mt-[1vw] md:mt-3"
            ></motion.div>

        </motion.section>
    );
}