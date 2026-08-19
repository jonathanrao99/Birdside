"use client";

import Script from "next/script";
import { createElement } from "react";

const WIDGET_SCRIPT = "https://unpkg.com/@elevenlabs/convai-widget-embed";
const AGENT_ID = "agent_4501kqp21g1xfphbna99acdqasmk";

/**
 * ElevenLabs ConvAI voice agent (custom element + embed script).
 * @see https://elevenlabs.io/docs/conversational-ai
 */
export default function ElevenLabsConvai() {
  return (
    <>
      <Script src={WIDGET_SCRIPT} strategy="afterInteractive" />
      {createElement("elevenlabs-convai", { "agent-id": AGENT_ID })}
    </>
  );
}
