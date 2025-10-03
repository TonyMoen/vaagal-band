import { useEffect, useRef } from "react";

export default function BandsintownWidget() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    el.innerHTML = "";

    const a = document.createElement("a");
    a.className = "bit-widget-initializer";
    a.setAttribute("data-artist-name", "id_15561560");
    a.setAttribute("data-auto-style", "true");
    a.setAttribute("data-background-color", "rgba(0,0,0,0)");
    a.setAttribute("data-separator-color", "#26282b");
    a.setAttribute("data-text-color", "#e7e7ea");
    a.setAttribute(
      "data-font",
      "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    );
    a.setAttribute("data-display-local-dates", "true");
    a.setAttribute("data-display-rsvp", "false");
    a.setAttribute("data-event-rsvp-position", "hidden");
    a.setAttribute("data-local-dates-position", "tab");
    a.setAttribute("data-display-past-dates", "true");
    a.setAttribute("data-display-details", "false");
    a.setAttribute("data-display-lineup", "false");
    a.setAttribute("data-display-start-time", "false");
    a.setAttribute("data-display-limit", "all");
    a.setAttribute("data-date-format", "MMM. D, YYYY");
    a.setAttribute("data-date-orientation", "horizontal");
    a.setAttribute("data-date-border-color", "#26282b");
    a.setAttribute("data-date-border-width", "1px");
    a.setAttribute("data-date-border-radius", "12px");
    a.setAttribute("data-date-capitalization", "capitalize");
    a.setAttribute("data-event-ticket-cta-size", "large");
    a.setAttribute("data-event-ticket-text", "BILLETTER");
    a.setAttribute("data-event-ticket-icon", "false");
    a.setAttribute("data-event-ticket-cta-text-color", "#ffffff");
    a.setAttribute("data-event-ticket-cta-bg-color", "#ff6100");
    a.setAttribute("data-event-ticket-cta-border-color", "#ff6100");
    a.setAttribute("data-event-ticket-cta-border-width", "0px");
    a.setAttribute("data-event-ticket-cta-border-radius", "12px");
    a.setAttribute("data-button-label-capitalization", "uppercase");
    a.setAttribute("data-header-capitalization", "uppercase");
    a.setAttribute("data-location-capitalization", "uppercase");
    a.setAttribute("data-venue-capitalization", "uppercase");
    a.setAttribute("data-bit-logo-position", "bottomRight");
    a.setAttribute("data-bit-logo-color", "#888888");
    a.setAttribute("data-language", "en");
    a.setAttribute("data-layout-breakpoint", "900");

    el.appendChild(a);

    const script = document.createElement("script");
    script.src = "https://widgetv3.bandsintown.com/main.min.js";
    script.async = true;
    script.charset = "utf-8";
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, []);

  return (
    <div
      className="
        rounded-2xl border
      "
    >
      <div className="" />
      <div ref={ref} />
    </div>
  );
}
