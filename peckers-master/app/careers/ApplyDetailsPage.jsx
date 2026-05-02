"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ApplyDetailsPage({ initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    story: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.story) {
      setError("PLEASE FILL IN ALL FIELDS.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const emailTarget = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL_CAREERS;

    if (!emailTarget) {
      console.error("NEXT_PUBLIC_FORMSUBMIT_EMAIL_CAREERS IS NOT DEFINED");
      setError("CONFIGURATION ERROR. PLEASE TRY AGAIN LATER.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${emailTarget}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            Story: formData.story,
            _subject: "NEW CAREER APPLICATION - PECKERS",
            _captcha: "false",
          }),
        },
      );

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("FAILED TO SUBMIT");
      }
    } catch (err) {
      console.error("SUBMISSION ERROR:", err);
      setError("FAILED TO SEND. PLEASE TRY AGAIN.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full bg-[#080808] flex justify-center pt-[4vh] md:pt-[6vh] lg:pt-[5vh] xl:pt-[12vh] pb-[6vh] md:pb-[8vh] lg:pb-[5vh] xl:pb-[12vh] px-[6vw]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-[94%] lg:w-[94%] border border-gray-700 p-[8vw] md:p-[5vw] lg:p-[4vw] text-white"
      >
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-[3vh] gap-[2vh] md:gap-[3vw]">
          <div className="flex items-center gap-[4vw] md:gap-[1.5vw] w-full">
            <h1 className="font-peakers font-semibold text-[10vw] md:text-[8vw] lg:text-[4.5vw] xl:text-[3.5vw] tracking-[.15vw] whitespace-nowrap uppercase">
              {initialData?.applyTitle || "INTERESTED?"}
            </h1>
            <div className="h-px bg-gray-700 w-full"></div>
          </div>

          <p className="md:ml-0 text-white text-[6vw] md:text-[3.5vw] lg:text-[2.2vw] xl:text-[1.6vw] tracking-tight font-peakers whitespace-nowrap uppercase">
            {initialData?.applySubtitle || "Let’s do this."}
          </p>
        </div>

        <div className="w-full h-px bg-gray-800 mb-[5vh]"></div>

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[4vh]">
            {/* Name + Email */}
            <div className="flex flex-col md:flex-row justify-between gap-[4vh] md:gap-[2vw]">
              <div className="w-full">
                <label className="block font-mono text-gray-500 text-[3vw] md:text-[1.8vw] lg:text-[1vw] xl:text-[0.6vw] tracking-[0.2em] mb-[1vh]">
                  NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="YOUR NAME"
                  required
                  className="w-full font-mono bg-[#000000] border border-gray-700 rounded-[2vw] md:rounded-lg px-[4vw] md:px-[2vw] lg:px-[1.2vw] py-[2vh] text-gray-300 outline-none text-[4vw] md:text-[2.2vw] lg:text-base disabled:opacity-50"
                />
              </div>

              <div className="w-full">
                <label className="block font-mono text-gray-500 text-[3vw] md:text-[1.8vw] lg:text-[0.6vw] tracking-[0.2em] mb-[1vh]">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="YOUR@EMAIL.COM"
                  required
                  className="w-full font-mono bg-[#000000] border border-gray-700 rounded-[2vw] md:rounded-lg px-[4vw] md:px-[2vw] lg:px-[1.2vw] py-[2vh] text-gray-300 outline-none text-[4vw] md:text-[2.2vw] lg:text-base disabled:opacity-50"
                />
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block font-mono text-gray-500 text-[3vw] md:text-[1.8vw] lg:text-[0.6vw] tracking-[0.2em] mb-[1vh]">
                TELL US ABOUT YOU
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="5"
                placeholder="WHY PECKERS? WHAT'S YOUR STORY?"
                required
                className="w-full font-mono bg-[#000000] border border-gray-700 rounded-[2vw] md:rounded-lg px-[4vw] md:px-[2vw] lg:px-[1.2vw] py-[2vh] text-gray-300 outline-none resize-none text-[4vw] md:text-[2.2vw] lg:text-base disabled:opacity-50"
              ></textarea>
            </div>

            {/* Button and Error */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-[2.5vh] md:py-[2.5vh] text-[4.5vw] md:text-[2.5vw] lg:text-[1.4vw] xl:text-[1.1vw] tracking-wide hover:bg-gray-200 transition uppercase flex items-center justify-center gap-2 disabled:opacity-50 rounded-[2vw] md:rounded-[0.4vw]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  "SEND IT →"
                )}
              </button>
              {error && (
                <p className="text-red-500 font-mono text-[3vw] md:text-[1.2vw] lg:text-[0.8vw] text-center uppercase">
                  {error}
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-[5vh] animate-in fade-in zoom-in duration-700">
            <div className="w-[15vw] h-[15vw] md:w-[4vw] md:h-[4vw] bg-white text-black rounded-full flex items-center justify-center mb-6">
              <svg
                width="60%"
                height="60%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-[8vw] md:text-[2.5vw] font-peakers mb-2 tracking-wider text-white uppercase">
              APPLICATION SENT!
            </h2>
            <p className="text-[4vw] md:text-[1vw] font-mono text-gray-400 max-w-[80%] mb-8 uppercase">
              THANKS FOR REACHING OUT. WE’LL GET BACK TO YOU SOON.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", story: "" });
              }}
              className="text-gray-500 hover:text-white transition-colors text-[3.5vw] md:text-[0.8vw] font-mono uppercase underline decoration-1 underline-offset-4"
            >
              APPLY FOR ANOTHER ROLE
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
