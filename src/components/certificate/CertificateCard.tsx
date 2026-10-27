import type { Certificate } from "@/data/certificate";
import { ArrowUpRight, Certificate as CertificateIcon } from "@/data/icons";

interface CertificateCardProps {
  certificate: Certificate;
  /** `grid` is used on the certification page, `slider` in the home card stack. */
  variant?: "grid" | "slider";
  className?: string;
}

/** A single certificate card: image, title and an external link button. */
export function CertificateCard({
  certificate,
  variant = "grid",
  className = "",
}: CertificateCardProps) {
  const isSlider = variant === "slider";

  return (
    <article
      className={`group surface-card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-20px_rgba(201,190,234,0.45)] ${
        isSlider ? "p-3" : "p-4"
      } ${className}`}
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-blush/25 dark:bg-white/5">
        <img
          src={certificate.image}
          alt={certificate.title}
          loading={isSlider ? "eager" : "lazy"}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lilac/25 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-start gap-2">
          <CertificateIcon className="mt-0.5 shrink-0 text-lg text-rose-deep dark:text-rose" />
          <h3
            className={`font-heading font-bold leading-snug tracking-tight text-ink dark:text-[#f3eaf0] ${
              isSlider ? "text-sm" : "text-base"
            }`}
          >
            {certificate.title}
          </h3>
        </div>

        <a
          href={certificate.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-white/70 px-4 py-2 text-xs font-medium text-ink transition hover:-translate-y-0.5 hover:border-rose/60 hover:text-rose-deep dark:bg-white/5 dark:text-[#f3eaf0]"
        >
          View Certificate
          <ArrowUpRight className="text-sm" />
        </a>
      </div>
    </article>
  );
}
