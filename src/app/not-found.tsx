import { ART } from "@/lib/art";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bone)",
        color: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{ width: "160px", marginBottom: "20px" }}
        dangerouslySetInnerHTML={{ __html: ART.ufo() }}
      />
      <h1 style={{ fontSize: "clamp(60px, 14vw, 140px)", lineHeight: 0.9 }}>
        404
      </h1>
      <p style={{ maxWidth: "420px", fontSize: "19px", margin: "18px 0 28px" }}>
        This frame slipped out of the darkroom. Nothing was exposed here.
      </p>
      <a className="bt" href="/">
        Back to Shutterscape ↑
      </a>
    </div>
  );
}
