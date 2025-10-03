import heroImg from "../assets/hero-1920.jpg";

type Props = {
  src: string;
  alt: string;
  overlay?: boolean;
};

export default function Hero({
  src = heroImg,
  alt = "",
  overlay = true,
}: Props) {
  return (
    <section className="relative isolate min-h-[45svh] md:min-h-[65vh]">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
        fetchPriority="high"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black/30 md:bg-black/35"
          aria-hidden="true"
        />
      )}
    </section>
  );
}
