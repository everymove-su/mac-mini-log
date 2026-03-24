import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/data/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 40, color: "#18181b" }}>마이로그팁</span>
      </div>
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        borderLeft: "12px solid #10b981",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <span
          style={{
            fontSize: "22px",
            color: "#10b981",
            fontWeight: "bold",
            letterSpacing: "0.1em",
          }}
        >
          MYLOGTIP
        </span>
        <span
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            color: "#18181b",
            lineHeight: 1.3,
            maxWidth: "900px",
          }}
        >
          {post.title}
        </span>
        <span
          style={{
            fontSize: "28px",
            color: "#71717a",
            maxWidth: "900px",
            lineHeight: 1.5,
          }}
        >
          {post.summary.slice(0, 80)}...
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "22px", color: "#a1a1aa" }}>
          {post.publishedAt} · {post.readTime} 소요
        </span>
      </div>
    </div>
  );
}