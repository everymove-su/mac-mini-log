import { NextResponse } from "next/server";
import { posts } from "@/data/posts";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

function buildRssXml() {
  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid>${baseUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>맥미니 로그 (Mac Mini Log)</title>
    <link>${baseUrl}</link>
    <description>M4 맥 미니 기반 데이터·테크 라이프 블로그</description>
    ${itemsXml}
  </channel>
</rss>`;
}

export function GET() {
  const xml = buildRssXml();
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

