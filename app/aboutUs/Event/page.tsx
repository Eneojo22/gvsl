import HeroSection from "../shared/HeroSection";
import { getEvents } from "@/app/lib/cms-store";

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <div>
      <HeroSection
        title="Events & Workshops"
        subtitle="Join our upcoming sessions to learn, connect, and get the most from your relocation experience."
        backgroundImage="/image/meetgreet.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/aboutUs" },
          { label: "Events" },
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-slate-700">
            Our events bring together new arrivals, local experts, and global HR teams to share insights, address
            relocation challenges, and build connections.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {events.map((event) => (
            <article
              key={event.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">{event.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-medium">Date:</span> {event.date}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                </div>
                <a
                  href={event.ctaHref}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800] md:mt-0"
                >
                  {event.ctaLabel}
                </a>
              </div>

              <p className="mt-6 text-base leading-relaxed text-slate-700">{event.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-[#f8f5f1] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Can’t find the right session?</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            We regularly run custom briefing sessions for corporate teams and relocating families. Reach out and we’ll help you find the right timing and agenda.
          </p>
          <a
            href="/contact-us"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Contact our events team
          </a>
        </div>
      </main>
    </div>
  );
}
