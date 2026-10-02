import { Link } from "react-router-dom"
import { Mail, Phone } from "lucide-react"
import { BOOKING } from "@/lib/links"
import { cn } from "@/lib/utils"

/**
 * Booking contact as two real buttons: tap to call, tap to write.
 * What a promoter on a phone came for, so it never hides in body text.
 */
export default function BookingCard({
  className,
  headingLevel = "h2",
  showMore = true,
}: {
  className?: string
  headingLevel?: "h2" | "h3"
  /** Link to the booking page under the buttons (off on the booking page itself) */
  showMore?: boolean
}) {
  const Heading = headingLevel

  return (
    <section
      className={cn(
        "rounded-none border border-l-[3px] border-[var(--color-border)] border-l-[var(--color-accent)] bg-[var(--color-surface)] p-5",
        className
      )}
      aria-label="Booking"
    >
      <Heading className="font-condensed text-[26px] font-bold uppercase leading-none">Book Vågal</Heading>
      <p className="mt-2 text-[15.5px] text-[var(--color-muted)]">
        For booking og forespørsler, kontakt vår bookingagent:
        <span className="mt-0.5 block font-semibold text-[var(--color-text)]">{BOOKING.agency}</span>
      </p>
      <div className="mt-4 grid gap-2">
        <a href={BOOKING.phoneHref} className="btn w-full">
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          Ring {BOOKING.phoneLabel}
        </a>
        <a href={`mailto:${BOOKING.email}`} className="btn-outline w-full [overflow-wrap:anywhere]">
          <Mail className="h-[18px] w-[18px] flex-none" aria-hidden="true" />
          {BOOKING.email}
        </a>
      </div>
      {showMore && (
        <Link
          to="/booking"
          className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-[var(--color-accent-hover)] hover:underline"
        >
          Alt om booking og rider &rarr;
        </Link>
      )}
    </section>
  )
}
