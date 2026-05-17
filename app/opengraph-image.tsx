// Dynamic OG image — fleshed out in Step 2
export const runtime = "edge";
export const alt = "Thunderclap — real social media growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { ImageResponse } = await import("next/og");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f3ee",
          fontFamily: "system-ui",
          fontSize: 80,
          fontWeight: 800,
          color: "#181d28",
        }}
      >
        Thunderclap
      </div>
    ),
    size,
  );
}
