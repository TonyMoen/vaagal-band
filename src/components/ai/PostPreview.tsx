import { useState } from "react";
import { Pencil, Check, Copy, ImageOff, Download, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import MarkdownContent from "@/components/ai/MarkdownContent";

interface PostPreviewProps {
  platform: string;
  caption: string;
  imageUrls: string[];
  onCaptionChange?: (newCaption: string) => void;
  onSwapImage?: (index: number) => void;
  onDownload?: () => void;
}

const platformLabels: Record<string, string> = {
  tiktok: "TikTok",
  instagram_feed: "Instagram Feed",
  instagram_story: "Instagram Story",
  facebook_feed: "Facebook Feed",
  facebook_story: "Facebook Story",
};

const platformAspect: Record<string, string> = {
  tiktok: "aspect-[9/16]",
  instagram_feed: "aspect-[4/5]",
  instagram_story: "aspect-[9/16]",
  facebook_feed: "aspect-square",
  facebook_story: "aspect-[9/16]",
};

export default function PostPreview({
  platform,
  caption,
  imageUrls,
  onCaptionChange,
  onSwapImage,
  onDownload,
}: PostPreviewProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(caption);
  const [copied, setCopied] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const handleSave = () => {
    onCaptionChange?.(editValue);
    setEditing(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasMultiple = imageUrls.length > 1;
  const currentUrl = imageUrls[currentImageIdx] || "";

  return (
    <div className="flex flex-col border border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Platform label */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
          {platformLabels[platform] || platform}
        </span>
        {hasMultiple && (
          <span className="text-xs text-[var(--color-muted)]">
            {currentImageIdx + 1} / {imageUrls.length}
          </span>
        )}
      </div>

      {/* Image preview */}
      <div
        className={`relative w-full overflow-hidden bg-[var(--color-bg)] ${platformAspect[platform] || "aspect-square"}`}
      >
        {currentUrl ? (
          <img
            src={currentUrl}
            alt={`${platform} preview`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-muted)]">
            <ImageOff size={32} />
          </div>
        )}

        {/* Carousel navigation */}
        {hasMultiple && (
          <>
            <button
              onClick={() => setCurrentImageIdx((i) => Math.max(0, i - 1))}
              disabled={currentImageIdx === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 p-1.5 text-white backdrop-blur disabled:opacity-30 hover:bg-black/80"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentImageIdx((i) => Math.min(imageUrls.length - 1, i + 1))}
              disabled={currentImageIdx === imageUrls.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 p-1.5 text-white backdrop-blur disabled:opacity-30 hover:bg-black/80"
            >
              <ChevronRight size={16} />
            </button>
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {imageUrls.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIdx(i)}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === currentImageIdx ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Caption */}
      <div className="flex flex-1 flex-col p-4">
        {editing ? (
          <div className="flex flex-1 flex-col gap-2">
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
              className="flex-1 resize-none border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-1 bg-[var(--color-accent)] px-3 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)]"
            >
              <Check size={14} /> Lagre
            </button>
          </div>
        ) : (
          <>
            <MarkdownContent content={caption} className="flex-1 text-sm" />
            <div className="mt-3 flex flex-wrap gap-2">
              {onSwapImage && (
                <button
                  onClick={() => onSwapImage(currentImageIdx)}
                  className="flex items-center gap-1 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <RefreshCw size={12} /> Bytt bilde
                </button>
              )}
              <button
                onClick={() => {
                  setEditValue(caption);
                  setEditing(true);
                }}
                className="flex items-center gap-1 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Pencil size={12} /> Rediger
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {copied ? (
                  <>
                    <Check size={12} /> Kopiert
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Kopier
                  </>
                )}
              </button>
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="flex items-center gap-1 border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <Download size={12} /> Last ned
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
