import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface SectionHeadingProps {
  title: string
  id?: string
  /** Optional "see all" link on the right, e.g. { to: "/konserter", label: "Se alle" } */
  link?: { to: string; label: string }
}

/** Section title with an optional link on the same line. The link keeps a 44px target. */
export default function SectionHeading({ title, id, link }: SectionHeadingProps) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {link && (
        <Link
          to={link.to}
          className="inline-flex min-h-[44px] items-center gap-0.5 whitespace-nowrap text-[15px] font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          {link.label}
          <ChevronRight className="h-[18px] w-[18px] text-[var(--color-accent)]" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
