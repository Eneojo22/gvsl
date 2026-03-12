import HeroSection from "../shared/HeroSection";

const testimonials = [
  {
    quote:
      "G&V made our relocation effortless. Their team guided us through every step and provided local insights that made settling in smooth and stress-free.",
    author: "Sarah Thompson",
    role: "Senior Software Engineer",
    location: "Lagos, Nigeria",
  },
  {
    quote:
      "The communication, professionalism, and attention to detail were outstanding. We felt supported from day one — highly recommend their services.",
    author: "Michael Reynolds",
    role: "Project Manager",
    location: "Abuja, Nigeria",
  },
  {
    quote:
      "The team arranged our housing and school visits quickly and efficiently. Their local knowledge helped us make decisions with confidence.",
    author: "Emily Carter",
    role: "HR Director",
    location: "Port Harcourt, Nigeria",
  },
];

export default function TestimonialsPage() {
  return (
    <div>
      <HeroSection
        title="What our clients say"
        subtitle="Real feedback from people who have moved to Nigeria with our support."
        backgroundImage="/image/meetgreet.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/aboutUs" },
          { label: "Testimonials" },
        ]}
      />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-base leading-relaxed text-slate-700">
          We partner with individuals and organizations to deliver relocation services that are
          practical, people-first, and built to last. Here are a few of the stories we’re proud to
          share.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote
              key={item.author}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-lg leading-relaxed text-slate-800">“{item.quote}”</p>
              <footer className="mt-6 flex flex-col gap-1 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{item.author}</span>
                <span>{item.role}</span>
                <span className="text-slate-500">{item.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-[#f8f5f1] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Share your experience</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Have you used our services? We’d love to hear what went well and what we can improve.
            Reach out to our team and we’ll follow up with a quick response.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-full bg-[#dd5500] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c54800]"
            >
              Contact us
            </a>
            <a
              href="mailto:hello@gvssupport.com"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Send feedback
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
