import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publishedPosts as posts } from "@/data/posts";

function getBaseUrl(req: NextRequest) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (envUrl) return envUrl;

  const url = new URL(req.url);
  return url.origin;
}

function buildRssXml(baseUrl: string) {
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
    <title>마이로그팁 (MyLogTip)</title>
    <link>${baseUrl}</link>
    <description>재테크·IT·일상을 기록하는 블로그</description>
    ${itemsXml}
  </channel>
</rss>`;
}

export function GET(req: NextRequest) {
  const baseUrl = getBaseUrl(req);
  const xml = buildRssXml(baseUrl);
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

