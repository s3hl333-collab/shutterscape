import { ImageResponse } from "next/og";

export const alt = "Shutterspace — The Art of Seeing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#f1ebdd",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, fontFamily: "monospace" }}>
          <span>GCU PHOTOGRAPHY COLLECTIVE</span>
          <span>THE ART OF SEEING</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 210, lineHeight: 0.9, letterSpacing: -8 }}>SHUTTER</div>
          <div style={{ fontSize: 210, lineHeight: 0.9, letterSpacing: -8, fontStyle: "italic", color: "#e2452a", marginLeft: 260 }}>SPACE</div>
        </div>
        <div style={{ fontSize: 30, color: "#a3a3a0", fontStyle: "italic" }}>
          We don&apos;t just capture moments. We give them a place to live.
        </div>
      </div>
    ),
    size,
  );
}
