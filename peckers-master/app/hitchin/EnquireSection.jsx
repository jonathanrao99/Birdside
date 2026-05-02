"use client";
import { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";
import CustomTimePicker from "./CustomTimePicker";
import CustomGuestCounter from "./CustomGuestCounter";

export default function EnquiriesSection({ location }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Sanitize text input: strip HTML tags and limit length
  const sanitizeText = (text, maxLength = 200) => {
    return text.replace(/<[^>]*>/g, "").slice(0, maxLength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 15) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      }
      return;
    }
    if (name === "name") {
      const sanitized = sanitizeText(value, 100);
      if (/^[a-zA-Z\s'\-]*$/.test(sanitized)) {
        setFormData((prev) => ({ ...prev, [name]: sanitized }));
      }
      return;
    }
    if (name === "guests") {
      const num = parseInt(value, 10);
      if (value === "" || (num >= 0 && num <= 500)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    if (name === "details") {
      setFormData((prev) => ({ ...prev, [name]: sanitizeText(value, 1000) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone) {
      setError("Please provide your name and phone number.");
      return;
    }
    if (formData.phone.length < 10 || formData.phone.length > 15) {
      setError("Please enter a valid phone number (10-15 digits).");
      return;
    }
    if (formData.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(formData.date + "T00:00:00");
      if (selectedDate < today) {
        setError(
          "Date cannot be in the past. Please select today or a future date.",
        );
        return;
      }
    }
    if (formData.time) {
      const [hours] = formData.time.split(":").map(Number);
      if (hours < 11 || hours >= 23) {
        setError(
          "Please select a time within operating hours (11:00 AM - 11:00 PM).",
        );
        return;
      }
    }
    if (
      formData.guests &&
      (parseInt(formData.guests, 10) < 1 || parseInt(formData.guests, 10) > 500)
    ) {
      setError("Guest count must be between 1 and 500.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const emailTargets = {
      hitchin: process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL_HITCHIN,
      stevenage: process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL_STEVENAGE,
    };
    const emailTarget = emailTargets[location?.toLowerCase()];
    const sheetUrls = {
      hitchin: process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL_HITCHIN,
      stevenage: process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL_STEVENAGE,
    };
    const sheetUrl = sheetUrls[location?.toLowerCase()];

    try {
      // 1. Google Sheets Submission
      if (sheetUrl) {
        await fetch(sheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Date: new Date().toLocaleString(),
            Location: location,
            Name: formData.name,
            Phone: formData.phone,
            Guests: formData.guests,
            EventDate: formData.date,
            EventTime: formData.time,
            Details: formData.details,
          }),
        });
      } else {
        console.warn(
          "Google Sheet URL for this location is not configured in .env.",
        );
      }

      // 2. FormSubmit (Email) Submission
      if (emailTarget) {
        await fetch(`https://formsubmit.co/ajax/${emailTarget}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            Location: location,
            _subject: `New Event Enquiry - ${location}`,
            _captcha: "false",
          }),
        });
      } else {
        console.warn(
          `FormSubmit email for ${location} is not configured in .env.`,
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to send inquiry. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry-form"
      className="w-[90%] md:w-[94%] lg:w-[88%] bg-black md:min-h-0 lg:min-h-0 xl:min-h-screen mx-auto md:ml-[3vw] lg:ml-[7vw] mt-[10vw] md:mt-[7vw] rounded-[4vw] md:rounded-[1.4vw] text-white font-sans flex flex-col md:flex-row overflow-hidden"
      style={{ border: "1px solid #1F2739" }}
    >
      {/* LEFT SIDE */}
      <div className="w-full md:w-[35vw] lg:w-[29vw] border-b md:border-b-0 md:border-r border-[#1F2937] px-[8vw] md:px-[3vw] lg:px-[4vw] py-[8vw] md:py-[4vw] flex flex-col justify-start bg-[#121212]">
        <h2 className="text-[8vw] md:text-[2.6vw] font-bold uppercase tracking-wider text-white font-peakers">
          ENQUIRIES
        </h2>
        <p className="text-white/60 text-[3.5vw] md:text-[14px] lg:text-[.95vw] mb-[8vw] md:mb-[5vw] font-bold font-sans leading-relaxed mt-[4vw] md:mt-[2vw]">
          <strong>Planning a celebration?</strong>
          <br />
          {location === "stevenage" ? (
            <>
              Our Stevenage location offers a spacious setting designed for
              group bookings and vibrant social gatherings. Host your next event
              at the home of Peckers.
            </>
          ) : (
            <>
              From landmark birthdays to local gatherings, host your next event
              at the home of seriously good chicken.
            </>
          )}
        </p>

        <div className="flex flex-col mt-[-2.5vw] gap-[4vw] md:gap-[1.9vw]">
          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg
              className="w-[8vw] md:w-[34px] h-[9vw] md:h-[38px] min-w-[8vw] md:min-w-[34px]"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM21.3574 31.2188V7.38281C20.9355 7.88672 20.3555 8.29688 19.6172 8.61328C18.8789 8.91797 18.1816 9.07031 17.5254 9.07031V4.13086C18.1465 4.03711 18.8145 3.83789 19.5293 3.5332C20.2441 3.2168 20.9062 2.78906 21.5156 2.25C22.1367 1.69922 22.6113 1.03711 22.9395 0.263672H27.9141V31.2188H21.3574Z"
                fill="#374151"
              />
            </svg>
            <span className="text-[5vw] md:text-[18px] lg:text-[1.8vw] tracking-wider font-peakers">
              BIRTHDAY & EVENTS
            </span>
          </div>

          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg
              className="w-[10vw] md:w-[40px] h-[9vw] md:h-[36px] min-w-[10vw] md:min-w-[40px]"
              viewBox="0 0 35 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM18.1758 31.2188V29.7422C18.1758 28.207 18.4102 26.8301 18.8789 25.6113C19.3594 24.3809 19.9746 23.2441 20.7246 22.2012C21.4746 21.1465 22.2656 20.1152 23.0977 19.1074C23.9062 18.123 24.6738 17.1152 25.4004 16.084C26.1387 15.041 26.7363 13.916 27.1934 12.709C27.6621 11.4902 27.8965 10.125 27.8965 8.61328C27.8965 7.88672 27.7852 7.26562 27.5625 6.75C27.3516 6.22266 26.9062 5.95898 26.2266 5.95898C25.1953 5.95898 24.6797 6.87891 24.6797 8.71875V12.498H18.1758C18.1641 12.2285 18.1465 11.9238 18.123 11.584C18.1113 11.2441 18.1055 10.916 18.1055 10.5996C18.1055 8.37305 18.3398 6.48633 18.8086 4.93945C19.2773 3.38086 20.1035 2.19727 21.2871 1.38867C22.4824 0.568359 24.1582 0.158203 26.3145 0.158203C28.8809 0.158203 30.873 0.878906 32.291 2.32031C33.7207 3.76172 34.4355 5.81836 34.4355 8.49023C34.4355 10.3066 34.2012 11.9004 33.7324 13.2715C33.2637 14.6309 32.6426 15.873 31.8691 16.998C31.0957 18.1113 30.2461 19.2246 29.3203 20.3379C28.6641 21.123 28.0254 21.9258 27.4043 22.7461C26.7949 23.5664 26.2559 24.4453 25.7871 25.3828H34.2246V31.2188H18.1758Z"
                fill="#374151"
              />
            </svg>
            <span className="text-[5vw] md:text-[18px] lg:text-[1.8vw] tracking-wider font-peakers">
              SOCIAL GATHERINGS
            </span>
          </div>

          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg
              className="w-[9vw] md:w-[38px] h-[8.5vw] md:h-[36px] min-w-[9vw] md:min-w-[38px]"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM25.5938 31.5703C22.8633 31.5703 20.877 30.8496 19.6348 29.4082C18.3926 27.9668 17.7715 25.793 17.7715 22.8867V19.6523H24.1172V22.9043C24.1172 23.7246 24.2168 24.4219 24.416 24.9961C24.627 25.5586 25.0898 25.8398 25.8047 25.8398C26.5312 25.8398 26.9941 25.5352 27.1934 24.9258C27.3926 24.3047 27.4922 23.2969 27.4922 21.9023V21.1289C27.4922 20.0625 27.3105 19.1309 26.9473 18.334C26.5957 17.5371 25.8984 17.1387 24.8555 17.1387C24.7266 17.1387 24.6094 17.1445 24.5039 17.1562C24.4102 17.1562 24.3281 17.1621 24.2578 17.1738V11.6191C25.3242 11.6191 26.1387 11.3848 26.7012 10.916C27.2637 10.4355 27.5449 9.63867 27.5449 8.52539C27.5449 6.7793 27.041 5.90625 26.0332 5.90625C25.377 5.90625 24.9316 6.16406 24.6973 6.67969C24.4746 7.18359 24.3633 7.82812 24.3633 8.61328V9.54492H17.9648C17.9531 9.4043 17.9414 9.23437 17.9297 9.03516C17.9297 8.83594 17.9297 8.64258 17.9297 8.45508C17.9297 5.61914 18.5918 3.53906 19.916 2.21484C21.2402 0.890625 23.2676 0.228516 25.998 0.228516C31.2715 0.228516 33.9082 2.9707 33.9082 8.45508C33.9082 9.97852 33.7031 11.2383 33.293 12.2344C32.8828 13.2188 32.1211 13.9102 31.0078 14.3086C31.8867 14.7305 32.5371 15.2695 32.959 15.9258C33.3809 16.582 33.6562 17.3965 33.7852 18.3691C33.9141 19.3418 33.9785 20.5195 33.9785 21.9023C33.9785 24.9961 33.3281 27.3809 32.0273 29.0566C30.7383 30.7324 28.5938 31.5703 25.5938 31.5703Z"
                fill="#374151"
              />
            </svg>
            <span className="text-[5vw] md:text-[18px] lg:text-[1.8vw] tracking-wider font-peakers">
              PRIVATE HIRE
            </span>
          </div>

          <div className="flex items-center gap-[4vw] md:gap-[1.8vw]">
            <svg
              className="w-[10vw] md:w-[40px] h-[9vw] md:h-[38px] min-w-[10vw] md:min-w-[40px]"
              viewBox="0 0 35 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.19141 31.5C5.57813 31.5 3.55664 30.7676 2.12695 29.3027C0.708984 27.8379 0 25.7285 0 22.9746V9.01758C0 6.11133 0.673828 3.88477 2.02148 2.33789C3.38086 0.779297 5.4375 0 8.19141 0C10.957 0 13.0137 0.779297 14.3613 2.33789C15.709 3.88477 16.3828 6.11133 16.3828 9.01758V22.9746C16.3828 25.7285 15.6738 27.8379 14.2559 29.3027C12.8379 30.7676 10.8164 31.5 8.19141 31.5ZM8.19141 25.8047C8.67188 25.8047 9.04688 25.5879 9.31641 25.1543C9.58594 24.7207 9.7207 24.2344 9.7207 23.6953V8.41992C9.7207 7.69336 9.63867 7.06055 9.47461 6.52148C9.32227 5.9707 8.89453 5.69531 8.19141 5.69531C7.48828 5.69531 7.05469 5.9707 6.89062 6.52148C6.73828 7.06055 6.66211 7.69336 6.66211 8.41992V23.6953C6.66211 24.2344 6.79688 24.7207 7.06641 25.1543C7.34766 25.5879 7.72266 25.8047 8.19141 25.8047ZM34.5 31.5V0.0H29.0L18.0 18.0V25.0H29.0V31.5ZM29.0 18.0V7.0L22.0 18.0H29.0Z"
                fill="#374151"
              />
            </svg>
            <span className="text-[5vw] md:text-[18px] lg:text-[1.8vw] tracking-wider font-peakers">
              OUTSIDE CATERING
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[65vw] lg:w-[57vw] px-[6vw] md:px-[3vw] lg:px-[4vw] py-[8vw] md:py-[4vw] lg:py-[3vw] flex flex-col font-peakers bg-[#000000]">
        <div className="flex items-center gap-[4vw] mb-[6vw] md:mb-[2vw]">
          <h2 className="text-[7vw] md:text-[2.6vw] tracking-[0.05vw] font-bold whitespace-nowrap">
            GET IN TOUCH
          </h2>
          <div className="flex-1 h-[2px] bg-[#1F2937] w-full"></div>
        </div>

        {/* FORM */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[6vw] md:gap-[2vw]"
          >
            {/* NAME + PHONE */}
            <div className="flex flex-col md:flex-row gap-[6vw] md:gap-[2vw]">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[14px] lg:text-[0.8vw] tracking-wide font-extralight font-mono text-white">
                  YOUR NAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  disabled={isSubmitting}
                  className="bg-[#111111] text-[4vw] md:text-[15px] lg:text-[1.1vw] border border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white placeholder-white/40 focus:outline-none disabled:opacity-50"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[14px] lg:text-[0.8vw] tracking-wide font-extralight text-white font-mono">
                  PHONE NO. <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  required
                  disabled={isSubmitting}
                  className="bg-[#111111] text-[4vw] md:text-[15px] lg:text-[1.1vw] border border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white placeholder-white/40 focus:outline-none disabled:opacity-50"
                  style={{ fontFamily: "var(--font-neuzeit)" }}
                />
              </div>
            </div>

            {/* GUESTS + DATE + TIME */}
            <div className="flex flex-col md:flex-row gap-[6vw] md:gap-[2vw]">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[12px] lg:text-[0.8vw] tracking-widest font-extralight font-mono text-white">
                  GUESTS
                </label>
                <CustomGuestCounter
                  value={formData.guests}
                  onChange={(val) => {
                    setError(null);
                    setFormData((prev) => ({ ...prev, guests: val }));
                  }}
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[12px] lg:text-[0.8vw] tracking-wide text-white font-mono font-extralight">
                  DATE
                </label>
                <CustomDatePicker
                  value={formData.date}
                  onChange={(val) => {
                    setError(null);
                    setFormData((prev) => ({ ...prev, date: val }));
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[3vw] md:text-[12px] lg:text-[0.8vw] font-extralight font-mono tracking-widest text-white">
                  TIME
                </label>
                <CustomTimePicker
                  value={formData.time}
                  onChange={(val) => {
                    setError(null);
                    setFormData((prev) => ({ ...prev, time: val }));
                  }}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-[2vw] md:gap-2">
              <label className="text-[3vw] md:text-[12px] lg:text-[0.8vw] font-mono font-extralight tracking-widest text-white">
                DETAILS
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your event (e.g., Birthday, Party size)... "
                disabled={isSubmitting}
                style={{ fontFamily: "var(--font-neuzeit)" }}
                className="bg-[#111111] border font-extralight text-[4vw] md:text-[16px] lg:text-[1.2vw] border-[#1F2937] rounded-[2vw] md:rounded-xl px-[4vw] md:px-6 py-[3vw] md:py-4 text-white placeholder-white/40 resize-none focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* BUTTON AND ERROR */}
            <div className="mt-[4vw] md:mt-[2vw] flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-white flex justify-center items-center gap-3 cursor-pointer text-black font-sans font-bold px-[6vw] md:px-[3.5vw] py-[4vw] md:py-5 rounded-[2vw] md:rounded-[.6vw] text-[4vw] md:text-[18px] lg:text-[1.45vw] tracking-widest hover:bg-white/90 transition shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    SENDING...
                  </>
                ) : (
                  "SUBMIT INQUIRY"
                )}
              </button>
              {error && (
                <p className="text-red-500 font-mono text-[3vw] md:text-[1vw] uppercase">
                  {error}
                </p>
              )}
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-[10vw] md:py-[5vw] animate-in fade-in zoom-in duration-700">
            <div className="w-[20vw] h-[20vw] md:w-[6vw] md:h-[6vw] bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <svg
                width="50%"
                height="50%"
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
            <h3 className="text-[8vw] md:text-[3vw] font-bold mb-3 font-peakers tracking-wider text-white">
              INQUIRY RECEIVED
            </h3>
            <p className="text-[4vw] md:text-[1.1vw] font-mono font-extralight text-white/60 max-w-[80%] mb-8 leading-relaxed">
              Thank you for getting in touch. Our team will review your details
              and get back to you shortly to help plan your event.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  guests: "",
                  date: "",
                  time: "",
                  details: "",
                });
              }}
              className="text-[#9CA3AF] hover:text-white transition-colors text-[3.5vw] md:text-[1vw] font-mono uppercase underline decoration-1 underline-offset-4"
            >
              Submit Another Enquiry
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
