"use client";

import { type FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NEXT_LOCATION_MOUNT_ID } from "@/lib/split-page-html";
import s from "./next-location-suggest.module.css";

type Phase = "idle" | "loading" | "success";

function CardContent() {
  const [city, setCity] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [submittedCity, setSubmittedCity] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    setPhase("loading");
    // Placeholder — replace with Supabase insert when backend is wired
    await new Promise<void>((resolve) => setTimeout(resolve, 1400));
    setSubmittedCity(trimmed);
    setPhase("success");
  }

  function handleReset() {
    setCity("");
    setSubmittedCity("");
    setPhase("idle");
  }

  return (
    <div className="locations-list_block">

      {/* ── Top panel — inside locations-list_img-wrap (position:relative, 16/9) ── */}
      <div className="locations-list_img-wrap">
        <div className={s.visual}>

          <p className={s.visualHeading}>Next Stop?</p>

          {/* Route graphic: KATY TX ●──────○ ??? */}
          <div className={s.routeWrap}>
            <div className={s.routeTrack}>
              <span className={s.dotSolid} />
              <span className={s.routeLine} />
              <span className={s.dotGhost} />
            </div>
            <div className={s.routeLabels}>
              <span className={s.routeLabel}>Katy, TX</span>
              <span className={s.routeLabel}>???</span>
            </div>
          </div>

          <span className={s.comingLabel}>Coming soon</span>
        </div>
      </div>

      {/* ── Content — mirrors .locations-list_content ── */}
      <div className={`locations-list_content ${s.content}`}>
        {phase === "success" ? (
          <div className={s.successState}>
            <div className={s.checkWrap} aria-hidden>
              <svg
                className={s.checkSvg}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className={`heading-style-h4 ${s.successHeading}`}>Noted!</h2>
            <p className={s.successBody}>
              We&apos;ll keep{" "}
              <span className={s.successCity}>{submittedCity}</span> on the
              radar.
            </p>
            <button type="button" className={s.resetBtn} onClick={handleReset}>
              Suggest another
            </button>
          </div>
        ) : (
          <>
            <h2 className={`heading-style-h4 ${s.heading}`}>Your City?</h2>
            <p className={s.subtext}>
              Be the reason we park near you.
            </p>
            <form className={s.form} onSubmit={handleSubmit} noValidate>
              <input
                className={s.input}
                type="text"
                placeholder="Drop your city…"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={phase === "loading"}
                aria-label="Suggest a city for our next location"
                maxLength={100}
              />
              <button
                className={s.sendBtn}
                type="submit"
                disabled={phase === "loading" || city.trim().length === 0}
              >
                {phase === "loading" ? (
                  <>
                    <span className={s.spinner} aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Suggest this city"
                )}
              </button>
            </form>
          </>
        )}
      </div>

    </div>
  );
}

export default function NextLocationSuggest() {
  const [mountEl, setMountEl] = useState<Element | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setMountEl(document.getElementById(NEXT_LOCATION_MOUNT_ID));
    });
  }, []);

  if (!mountEl) return null;
  return createPortal(<CardContent />, mountEl);
}
