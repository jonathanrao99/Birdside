"use client";

import { upload } from "@vercel/blob/client";
import { useState } from "react";

const HANDLE_URL = "/api/blob/hero-upload";

type Slot = "desktop" | "mobile";

const PATHS: Record<Slot, string> = {
  desktop: "hero/BirdsideDesktop.mov",
  mobile: "hero/BirdsideHeroMobile.mov"
};

export default function HeroBlobUploadPage() {
  const [secret, setSecret] = useState("");
  const [desktopPct, setDesktopPct] = useState<number | null>(null);
  const [mobilePct, setMobilePct] = useState<number | null>(null);
  const [desktopUrl, setDesktopUrl] = useState<string | null>(null);
  const [mobileUrl, setMobileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<Slot | null>(null);

  async function uploadSlot(slot: Slot, file: File) {
    setError(null);
    if (!secret.trim()) {
      setError("Enter the upload secret (HERO_BLOB_UPLOAD_SECRET from .env.local).");
      return;
    }
    const pathname = PATHS[slot];
    const setPct = slot === "desktop" ? setDesktopPct : setMobilePct;
    const setUrl = slot === "desktop" ? setDesktopUrl : setMobileUrl;
    setBusy(slot);
    setPct(0);
    try {
      const result = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: HANDLE_URL,
        clientPayload: JSON.stringify({ secret: secret.trim() }),
        multipart: true,
        contentType: file.type || "video/quicktime",
        onUploadProgress: ({ percentage }) => setPct(percentage)
      });
      setUrl(result.url);
      setPct(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setPct(null);
    } finally {
      setBusy(null);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "2rem",
        maxWidth: 640,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
        color: "#111"
      }}
    >
      <h1 style={{ fontSize: "1.25rem" }}>Hero videos → Vercel Blob</h1>
      <p style={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#444" }}>
        Large <code>.mov</code> files use{" "}
        <strong>multipart client upload</strong> (not the 4.5 MB server{" "}
        <code>put()</code> path). Run <code>vercel env pull</code> so{" "}
        <code>BLOB_READ_WRITE_TOKEN</code> exists locally. Set{" "}
        <code>HERO_BLOB_UPLOAD_SECRET</code> in Vercel and locally, then paste it
        below. After upload, add the URLs to project env as{" "}
        <code>NEXT_PUBLIC_HOME_HERO_VIDEO_DESKTOP</code> and{" "}
        <code>NEXT_PUBLIC_HOME_HERO_VIDEO_MOBILE</code>, redeploy.
      </p>

      <label style={{ display: "block", marginTop: "1.25rem", fontSize: "0.85rem" }}>
        Upload secret
        <input
          type="password"
          autoComplete="off"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: 6, padding: "0.5rem" }}
        />
      </label>

      {error ? (
        <p style={{ color: "#b00020", marginTop: "1rem", fontSize: "0.9rem" }}>{error}</p>
      ) : null}

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Desktop</h2>
        <input
          type="file"
          accept="video/quicktime,video/mp4,.mov"
          disabled={busy !== null}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void uploadSlot("desktop", f);
            e.target.value = "";
          }}
        />
        {desktopPct !== null ? (
          <p style={{ fontSize: "0.85rem" }}>Progress: {Math.round(desktopPct)}%</p>
        ) : null}
        {desktopUrl ? (
          <p style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>
            <strong>NEXT_PUBLIC_HOME_HERO_VIDEO_DESKTOP</strong>
            <br />
            {desktopUrl}
          </p>
        ) : null}
      </section>

      <section style={{ marginTop: "1.25rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Mobile</h2>
        <input
          type="file"
          accept="video/quicktime,video/mp4,.mov"
          disabled={busy !== null}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void uploadSlot("mobile", f);
            e.target.value = "";
          }}
        />
        {mobilePct !== null ? (
          <p style={{ fontSize: "0.85rem" }}>Progress: {Math.round(mobilePct)}%</p>
        ) : null}
        {mobileUrl ? (
          <p style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>
            <strong>NEXT_PUBLIC_HOME_HERO_VIDEO_MOBILE</strong>
            <br />
            {mobileUrl}
          </p>
        ) : null}
      </section>
    </main>
  );
}
