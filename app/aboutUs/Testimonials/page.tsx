import HeroSection from "../shared/HeroSection";


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
          
        </div>

        <div className="mt-16 rounded-2xl bg-[#f8f5f1] p-8 shadow-sm">v
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
