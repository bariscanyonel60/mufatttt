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
          background: "#2B2D31",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#2E6F64", fontSize: 42, fontWeight: 800 }}>
          MUFAT<span style={{ color: "#2E6F64" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "#EAE7E2", fontSize: 56, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
            Hesapla başlar. Sahada kanıtlanır.
          </div>
          <div style={{ color: "rgba(234,231,226,0.55)", fontSize: 28 }}>
            Turhal · Tokat · İnşaat Mühendisliği
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
