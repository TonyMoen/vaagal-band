import { ChevronDown } from "lucide-react"
import type { Faq } from "@/lib/band"

/**
 * Questions and answers as native disclosure rows. The answers are in the HTML
 * whether a row is open or not, so search engines and AI crawlers read them all.
 */
export default function FaqList({ items, id }: { items: Faq[]; id?: string }) {
  return (
    <div id={id} className="border-t border-[var(--color-border)]">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-[var(--color-border)]">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-semibold leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="h-5 w-5 flex-none text-[var(--color-muted)] transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-4 pr-9 text-[16px] leading-relaxed text-[var(--color-muted)]">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
