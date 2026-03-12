import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";

export type ServiceAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export type ServiceStat = {
  label: string;
  value: string;
  description: string;
};

export type ServiceHighlightCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServiceChecklistGroup = {
  title: string;
  description?: string;
  items: string[];
};

type ServicePageTemplateProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  stats: ServiceStat[];
  heroItems: string[];
  actions: ServiceAction[];
  introTitle: string;
  introParagraphs: string[];
  introAsideTitle: string;
  introAsideDescription: string;
  introAsideItems: string[];
  highlightsTitle: string;
  highlightsDescription: string;
  highlights: ServiceHighlightCard[];
  processTitle: string;
  processDescription: string;
  processSteps: ServiceProcessStep[];
  coverageTitle: string;
  coverageDescription: string;
  coverageGroups: ServiceChecklistGroup[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: ServiceAction;
  ctaSecondary?: ServiceAction;
};

function ActionLink({ action }: { action: ServiceAction }) {
  const className =
    action.variant === "secondary"
      ? "inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
      : "inline-flex items-center justify-center gap-2 rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c54800]";

  return (
    <Link
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
      className={className}
    >
      {action.label}
      {action.variant === "secondary" ? null : <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}

export default function ServicePageTemplate({
  eyebrow,
  title,
  description,
  image,
  stats,
  heroItems,
  actions,
  introTitle,
  introParagraphs,
  introAsideTitle,
  introAsideDescription,
  introAsideItems,
  highlightsTitle,
  highlightsDescription,
  highlights,
  processTitle,
  processDescription,
  processSteps,
  coverageTitle,
  coverageDescription,
  coverageGroups,
  ctaTitle,
  ctaDescription,
  ctaPrimary,
  ctaSecondary,
}: ServicePageTemplateProps) {
  return (
    <div className="bg-[#faf6f1] text-[#1d160f]">
      <section className="relative isolate overflow-hidden bg-[#140d08]">
        <Image src={image} alt={title} fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(221,85,0,0.34),transparent_42%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120b06]/96 via-[#120b06]/82 to-[#120b06]/38" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-white">{eyebrow}</span>
          </nav>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px]">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f2b994]">
                {eyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                {description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {actions.map((action) => (
                  <ActionLink key={`${action.label}-${action.href}`} action={action} />
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f2b994]">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[32px] border border-white/10 bg-white/10 p-6 text-white shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f2b994]">
                What clients can expect
              </p>
              <div className="mt-6 space-y-4">
                {heroItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f2b994]" />
                    <p className="text-sm leading-6 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[32px] border border-[#ead9cb] bg-white p-8 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1d160f]">{introTitle}</h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-[#5f4a3b]">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="rounded-[30px] border border-[#ead9cb] bg-[#fff8f2] p-6 shadow-[0_18px_50px_-28px_rgba(74,37,15,0.25)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cf6c3d]">
              Clear guidance
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[#1d160f]">{introAsideTitle}</h3>
            <p className="mt-4 text-sm leading-6 text-[#5f4a3b]">{introAsideDescription}</p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#4e3d31]">
              {introAsideItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#cf6c3d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f7eee7_0%,#fff9f4_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#cf6c3d]">
              Service strengths
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1d160f]">{highlightsTitle}</h2>
            <p className="mt-4 text-base leading-7 text-[#5f4a3b]">{highlightsDescription}</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-[28px] border border-[#ecd9cc] bg-white p-6 shadow-[0_16px_50px_-28px_rgba(74,37,15,0.35)]"
              >
                <highlight.icon className="h-8 w-8 text-[#cf6c3d]" />
                <h3 className="mt-5 text-xl font-semibold text-[#1d160f]">{highlight.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f4a3b]">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#cf6c3d]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1d160f]">{processTitle}</h2>
          <p className="mt-4 text-base leading-7 text-[#5f4a3b]">{processDescription}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[28px] border border-[#ecd9cc] bg-white p-6 shadow-[0_16px_50px_-28px_rgba(74,37,15,0.3)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f8e2d3] text-sm font-semibold text-[#a5430c]">
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#1d160f]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5f4a3b]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fff8f2] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#cf6c3d]">
              What we cover
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1d160f]">{coverageTitle}</h2>
            <p className="mt-4 text-base leading-7 text-[#5f4a3b]">{coverageDescription}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {coverageGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[30px] border border-[#ead9cb] bg-white p-6 shadow-[0_16px_45px_-28px_rgba(74,37,15,0.28)]"
              >
                <h3 className="text-2xl font-semibold text-[#1d160f]">{group.title}</h3>
                {group.description ? (
                  <p className="mt-3 text-sm leading-6 text-[#5f4a3b]">{group.description}</p>
                ) : null}
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#4e3d31]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#cf6c3d]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[36px] bg-[#1c120b] px-6 py-10 text-white shadow-[0_28px_80px_-36px_rgba(0,0,0,0.65)] sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f2b994]">
                Ready to plan?
              </p>
              <h2 className="mt-3 text-3xl font-semibold">{ctaTitle}</h2>
              <p className="mt-4 text-base leading-7 text-white/75">{ctaDescription}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={ctaPrimary.href}
                target={ctaPrimary.external ? "_blank" : undefined}
                rel={ctaPrimary.external ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c54800]"
              >
                {ctaPrimary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {ctaSecondary ? (
                <Link
                  href={ctaSecondary.href}
                  target={ctaSecondary.external ? "_blank" : undefined}
                  rel={ctaSecondary.external ? "noreferrer" : undefined}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {ctaSecondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
