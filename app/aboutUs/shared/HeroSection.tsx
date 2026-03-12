import Image from "next/image";
import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

type HeroSectionProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  breadcrumbs?: BreadcrumbItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs,
  ctaLabel,
  ctaHref,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/75" />
        <div className="absolute inset-0 bg-[url('/svg/african-pattern.svg')] bg-repeat opacity-20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="text-sm text-white/70" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <span key={item.label} className="inline-flex items-center">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold">{item.label}</span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2">/</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {subtitle}
            </p>
          ) : null}

          {ctaLabel && ctaHref ? (
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
              >
                {ctaLabel}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
