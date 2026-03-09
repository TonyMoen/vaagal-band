export interface ParsedPost {
  platform: string;
  caption: string;
  image_url: string;
}

const PLATFORM_ALIASES: Record<string, string[]> = {
  tiktok: ["tiktok"],
  instagram_feed: ["instagram feed", "instagram"],
  instagram_story: ["instagram story", "ig story"],
  facebook_feed: ["facebook feed", "facebook"],
  facebook_story: ["facebook story", "fb story"],
};

function extractImageUrls(text: string): string[] {
  const urls: string[] = [];
  const mdRegex = /!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = mdRegex.exec(text)) !== null) urls.push(m[1]);
  return urls;
}

function extractCaptions(text: string): string[] {
  const captions: string[] = [];
  const regex = /[Cc]aption:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    captions.push(m[1]);
  }
  return captions;
}

export function parseYoloResponse(
  response: string,
  platforms: string[]
): ParsedPost[] {
  const posts: ParsedPost[] = [];

  // Split response into platform sections by ### headings
  const headingRegex = /^###\s+(.+)$/gm;
  const headings: { platform: string; index: number }[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(response)) !== null) {
    const headingText = match[1].toLowerCase();
    for (const platform of platforms) {
      const aliases = PLATFORM_ALIASES[platform] || [platform];
      if (aliases.some((a) => headingText.includes(a))) {
        headings.push({ platform, index: match.index + match[0].length });
        break;
      }
    }
  }

  // Extract content between headings
  const sections: { platform: string; content: string }[] = [];
  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].index;
    const end =
      i + 1 < headings.length
        ? response.lastIndexOf("\n###", headings[i + 1].index)
        : response.length;
    sections.push({ platform: headings[i].platform, content: response.slice(start, end) });
  }

  // Parse each section
  for (const section of sections) {
    const images = extractImageUrls(section.content);
    const captions = extractCaptions(section.content);

    const combinedCaption =
      captions.length > 0
        ? captions[0]
        : section.content.replace(/!\[[^\]]*\]\([^)]+\)/g, "").trim();

    posts.push({
      platform: section.platform,
      caption: combinedCaption,
      image_url: images[0] || "",
    });
  }

  // Fallback for missing platforms
  if (posts.length < platforms.length) {
    const allImages = extractImageUrls(response);
    const allCaptions = extractCaptions(response);
    let idx = 0;

    for (const platform of platforms) {
      if (posts.some((p) => p.platform === platform)) continue;
      posts.push({
        platform,
        caption: allCaptions[idx] || response.slice(0, 200),
        image_url: allImages[idx] || "",
      });
      idx++;
    }
  }

  return posts;
}
