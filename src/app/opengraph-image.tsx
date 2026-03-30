import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export const alt = `${SITE_NAME} — limit is the sky`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#737373",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 68,
            color: "#fafafa",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          limit is the sky
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a3a3a3",
            marginTop: 28,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    { ...size },
  );
}
