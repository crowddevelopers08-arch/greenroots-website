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
        background: "#111d12",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: exiting ? "loadExit 0.72s cubic-bezier(.76,0,.24,1) forwards" : undefined,
        pointerEvents: exiting ? "none" : undefined,
      }}
    >
      {/* Center block */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Spinning ring + monogram */}
        <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 30px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(201,168,106,.15) 210deg, #c9a86a 320deg, #f2ddb0 360deg)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              mask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              animation: "plRingSpin 1.15s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 12,
              borderRadius: "50%",
              border: "1px solid rgba(201,168,106,.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              letterSpacing: "0.12em",
              color: "#ecdcb6",
              background: "rgba(13,31,18,.5)",
              animation: "plPop 0.7s cubic-bezier(.34,1.56,.64,1) 0.1s both",
            }}
          >
            GR
          </div>
        </div>

        {/* Brand name — gold shimmer sweep */}
        <div
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(30px,6vw,48px)",
            letterSpacing: "0.18em",
            lineHeight: 1,
            backgroundImage:
              "linear-gradient(90deg, #dce9dd 0%, #ffffff 35%, #c9a86a 50%, #ffffff 65%, #dce9dd 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation:
              "plRise 0.8s cubic-bezier(.4,0,.2,1) 0.3s both, plShimmer 2.8s linear 0.6s infinite",
          }}
        >
          GREEN ROOTS
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 12,
            fontSize: 10,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(233,240,233,0.62)",
            animation: "plRise 0.7s cubic-bezier(.4,0,.2,1) 0.6s both",
          }}
        >
          The Gifting Company
        </div>

        {/* Progress track with sweeping fill */}
        <div
          style={{
            margin: "32px auto 0",
            width: 190,
            height: 2,
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "60%",
              background:
                "linear-gradient(90deg, transparent 0%, #c9a86a 50%, transparent 100%)",
              animation: "plBar 1.5s cubic-bezier(.4,0,.2,1) 0.4s infinite",
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
          color: "rgba(233,240,233,0.4)",
          animation: "plRise 0.7s cubic-bezier(.4,0,.2,1) 1s both",
        }}
      >
        Curating excellence since 2020
      </div>
    </div>
  );
}
