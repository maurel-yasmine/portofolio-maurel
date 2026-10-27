import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { InitialMotion } from "@/components/InitialMotion";
import { COVER_IMAGE, JOB_TITLE, OWNER_NAME, PORTRAIT_IMAGE } from "@/config/Identity";
import { ArrowUpRight, MapPin } from "@/data/icons";
import { Socials } from "@/data/social";

/** Linktree-style profile card with a stacked list of social links. */
export function LinktreeBox() {
  return (
    <section aria-labelledby="linktree-heading" className="relative overflow-hidden px-4 pb-16 pt-28">
      <BackgroundBlobs variant="section" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <InitialMotion>
          <div className="panel-soft overflow-hidden">
            {/* Cover */}
            <div className="relative h-32 tiny:h-36 sm:h-40">
              <img
                src={COVER_IMAGE}
                alt="Decorative cover"
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent dark:from-[#241c22]/70" />
            </div>

            {/* Avatar + identity */}
            <div className="-mt-14 px-6 pb-6 text-center">
              <img
                src={PORTRAIT_IMAGE}
                alt={`Portrait of ${OWNER_NAME}`}
                className="mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_20px_60px_-20px_rgba(201,190,234,0.45)] dark:border-[#241c22]"
              />

              <h1
                id="linktree-heading"
                className="mt-4 font-heading text-xl font-bold tracking-tight text-ink tiny:text-2xl dark:text-[#f3eaf0]"
              >
                {OWNER_NAME}
              </h1>

              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-rose-deep dark:text-rose">
                {JOB_TITLE}
              </p>

              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <MapPin className="text-sm" />
                Lorem ipsum, Dolor Sit Amet
              </p>

              <p className="mt-4 text-sm font-light leading-relaxed text-ink-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </InitialMotion>

        {/* Links */}
        <ul className="mt-6 flex flex-col gap-3">
          {Socials.map((social, index) => (
            <InitialMotion key={social.id} delay={0.05 + index * 0.05}>
              <li>
                <a
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group surface-card flex items-center gap-4 px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-rose/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush/40 text-lg text-rose-deep transition group-hover:scale-110 dark:bg-rose/10 dark:text-rose">
                    <social.SvgIcon />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink dark:text-[#f3eaf0]">
                    {social.label}
                  </span>
                  <ArrowUpRight className="text-lg text-ink-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rose-deep" />
                </a>
              </li>
            </InitialMotion>
          ))}
        </ul>
      </div>
    </section>
  );
}
