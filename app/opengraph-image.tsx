import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MUFAT İnşaat Mühendisliği";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#171717",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#D9A441", fontSize: 42, fontWeight: 800 }}>
          MUFAT<span style={{ color: "#D9A441" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "#FAFAF8", fontSize: 56, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Hesapla başlar. Sahada kanıtlanır.
          </div>
          <div style={{ color: "rgba(250,250,248,0.55)", fontSize: 28 }}>
            Turhal · Tokat · İnşaat Mühendisliği
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
