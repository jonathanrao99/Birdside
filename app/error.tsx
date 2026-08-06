"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "3rem",
        background: "#000",
        color: "#fff",
        fontFamily:
          "var(--_typography---font-family--secondary), system-ui, sans-serif",
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: "36rem" }}>
        <p
          style={{
            margin: "0 0 1rem",
            color: "#ff3045",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase"
          }}
        >
          Something went sideways
        </p>
        <h1 style={{ margin: "0 0 1rem", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
          Try that again.
        </h1>
        <p style={{ margin: "0 0 2rem", color: "rgba(255, 255, 255, 0.72)" }}>
          The page hit an unexpected error. Retry the page or head back home.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={reset}>
            Retry
          </button>
          <Link href="/">Go home</Link>
        </div>
      </div>
    </main>
  );
}
