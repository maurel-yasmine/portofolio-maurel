import { Link } from "react-router-dom";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { HelmetContainer } from "@/components/HelmetContainer";
import { ArrowRight, Home, Sparkles } from "@/data/icons";

/** Catch-all 404 route. */
export default function NotFoundPage() {
  return (
    <>
      <HelmetContainer page="/404" />

      <section
        aria-labelledby="notfound-heading"
        className="relative flex min-h-[80vh] items-center overflow-hidden px-4 pb-16 pt-28"
      >
        <BackgroundBlobs variant="hero" />

        <div className="relative z-10 mx-auto max-w-xl text-center">
          <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blush/50 text-2xl text-rose-deep dark:bg-rose/10 dark:text-rose">
            <Sparkles />
          </span>

          <p className="count-badge mx-auto mb-5">404</p>

          <h1
            id="notfound-heading"
            className="font-heading text-2xl font-bold tracking-tight text-ink tiny:text-3xl sm:text-4xl dark:text-[#f3eaf0]"
          >
            Lorem ipsum, page not found.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-ink-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <Link
            to="/"
            className="shine-wrap group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-lilac px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(232,160,180,0.55)] transition hover:-translate-y-0.5"
          >
            <Home className="text-base" />
            Back to Home
            <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
