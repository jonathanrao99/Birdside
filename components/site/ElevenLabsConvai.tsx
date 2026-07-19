"use client";

import Script from "next/script";
import { createElement, useEffect, useState } from "react";

const WIDGET_SCRIPT = "https://unpkg.com/@elevenlabs/convai-widget-embed";
const AGENT_ID = "agent_4501kqp21g1xfphbna99acdqasmk";
const IDLE_LOAD_MS = 12000;

/**
 * ElevenLabs ConvAI voice agent (custom element + embed script).
 * @see https://elevenlabs.io/docs/conversational-ai
 */
export default function ElevenLabsConvai() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) return;

    const load = () => setEnabled(true);
    const timeout = window.setTimeout(load, IDLE_LOAD_MS);
    const options = { once: true, passive: true } as const;

    window.addEventListener("pointerdown", load, options);
    window.addEventListener("keydown", load, { once: true });
    window.addEventListener("scroll", load, options);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
      window.removeEventListener("scroll", load);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script src={WIDGET_SCRIPT} strategy="lazyOnload" />
      {createElement("elevenlabs-convai", { "agent-id": AGENT_ID })}
    </>
  );
}
