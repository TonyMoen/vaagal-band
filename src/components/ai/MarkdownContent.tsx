/**
 * Lightweight markdown renderer for AI chat responses.
 * Handles: images, bold, italic, links, headings, horizontal rules, line breaks.
 * No external dependencies.
 */

interface MarkdownContentProps {
  content: string;
  className?: string;
}

interface TextNode {
  type: "text" | "image" | "bold" | "italic" | "link";
  value: string;
  href?: string;
  alt?: string;
}

function parseInline(text: string): TextNode[] {
  const nodes: TextNode[] = [];
  // Match: ![alt](url), **bold**, *italic*, [text](url)
  const regex = /!\[([^\]]*)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined || match[2] !== undefined) {
      // Image: ![alt](url)
      nodes.push({ type: "image", value: match[2], alt: match[1] });
    } else if (match[3] !== undefined) {
      // Bold: **text**
      nodes.push({ type: "bold", value: match[3] });
    } else if (match[4] !== undefined) {
      // Italic: *text*
      nodes.push({ type: "italic", value: match[4] });
    } else if (match[5] !== undefined) {
      // Link: [text](url)
      nodes.push({ type: "link", value: match[5], href: match[6] });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push({ type: "text", value: text.slice(lastIndex) });
  }

  return nodes;
}

function InlineRenderer({ text }: { text: string }) {
  const nodes = parseInline(text);

  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case "image":
            return (
              <img
                key={i}
                src={node.value}
                alt={node.alt || ""}
                className="my-2 max-w-full border border-[var(--color-border)]"
                loading="lazy"
              />
            );
          case "bold":
            return (
              <strong key={i} className="font-bold">
                {node.value}
              </strong>
            );
          case "italic":
            return (
              <em key={i} className="italic">
                {node.value}
              </em>
            );
          case "link":
            return (
              <a
                key={i}
                href={node.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline hover:text-[var(--color-accent-hover)]"
              >
                {node.value}
              </a>
            );
          default:
            return <span key={i}>{node.value}</span>;
        }
      })}
    </>
  );
}

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  const lines = content.split("\n");

  return (
    <div className={className}>
      {lines.map((line, i) => {
        const trimmed = line.trim();

        // Horizontal rule
        if (/^[-*_]{3,}$/.test(trimmed)) {
          return (
            <hr
              key={i}
              className="my-3 border-[var(--color-border)]"
            />
          );
        }

        // Headings
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={i} className="mb-1 mt-3 text-sm font-bold">
              <InlineRenderer text={trimmed.slice(4)} />
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="mb-1 mt-3 font-condensed text-base font-bold uppercase tracking-wider">
              <InlineRenderer text={trimmed.slice(3)} />
            </h2>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={i} className="mb-2 mt-3 font-condensed text-lg font-bold uppercase tracking-wider">
              <InlineRenderer text={trimmed.slice(2)} />
            </h1>
          );
        }

        // Empty line
        if (trimmed === "") {
          return <div key={i} className="h-2" />;
        }

        // Regular paragraph with inline parsing
        return (
          <p key={i} className="leading-relaxed">
            <InlineRenderer text={line} />
          </p>
        );
      })}
    </div>
  );
}
