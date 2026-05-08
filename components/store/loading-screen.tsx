"use client";

import { useEffect, useState } from "react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2000);
    const t2 = setTimeout(onDone, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0d0c0b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: exiting ? "loadExit 0.72s cubic-bezier(.76,0,.24,1) forwards" : undefined,
        pointerEvents: exiting ? "none" : undefined,
      }}
    >
      {/* Ambient glow orbs */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "30%",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(184,151,90,.12) 0%, transparent 70%)",
        animation: "glowPulse 3s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "15%",
        right: "25%",
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(184,151,90,.07) 0%, transparent 70%)",
        animation: "glowPulse 3s ease-in-out 1.5s infinite",
        pointerEvents: "none",
      }} />

      {/* Center logo block */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Monogram */}
        <div
          style={{
            margin: "0 auto 24px",
            height: 72,
            width: 72,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.78)",
            animation: "scaleIn 0.7s cubic-bezier(.34,1.56,.64,1) 0.1s both",
          }}
        >
          GR
        </div>

        {/* Brand name clip reveal */}
        <div
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(30px,6vw,48px)",
            letterSpacing: "0.18em",
            color: "white",
            overflow: "hidden",
            lineHeight: 1,
          }}
        >
          <span style={{ display: "block", animation: "loadTextReveal 0.9s cubic-bezier(.4,0,.2,1) 0.4s both" }}>
            GREEN ROOTS
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 10,
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
            animation: "fadeUp 0.6s ease 0.9s both",
          }}
        >
          Premium Corporate Gifting
        </div>

        {/* Divider line */}
        <div
          style={{
            margin: "32px auto 0",
            width: 180,
            height: 1,
            background: "rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
            borderRadius: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent 0%, #b8975a 50%, transparent 100%)",
              animation: "loadBarFill 1.9s cubic-bezier(.4,0,.2,1) 0.4s both",
            }}
          />
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.58)",
          animation: "fadeUp 0.6s ease 1.2s both",
        }}
      >
        Curating excellence since 2020
      </div>
    </div>
  );
}
