"use client";

import { useState } from "react";

const contactHighlights = [
  "Reliable relocation support tailored to each client",
  "Fast response from a local team that knows the terrain",
  "24/7 assistance for urgent arrival and transition needs",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    interest: "",
    message: "",
    agree: false,
  });
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.currentTarget;
    const checked = (event.currentTarget as HTMLInputElement).checked;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to submit your message.");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        interest: "",
        message: "",
        agree: false,
      });
      setSubmitMessage({
        type: "success",
        text: "Your message has been received. The admin team can now reply from the dashboard.",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Unable to submit your message right now.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f2ed] px-4 pb-16 pt-28 text-black sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-[#111111] px-6 py-10 text-white sm:px-8 lg:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#dd5500]">
              Contact Us
            </p>
            <h1 className="mt-4 max-w-xl text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[3.05rem]">
              Let&apos;s help you settle in with confidence.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Whether you need relocation support, housing assistance, airport meet and
              greet, or chauffeur services, our team is ready to guide you.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-[#dd5500]">Call us</p>
                <a href="tel:+2348137167298" className="mt-2 block text-lg font-medium">
                  +234 813 716 7298
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-[#dd5500]">Email us</p>
                <a href="mailto:info@gvss.ng" className="mt-2 block text-lg font-medium">
                  info@gvss.ng
                </a>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-[#dd5500]">Visit us</p>
              <p className="mt-2 text-base font-medium">
                90, Allen Avenue, Ikeja, Lagos
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {contactHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#dd5500]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 py-10 sm:px-8 lg:px-10">
            <h2 className="text-2xl font-bold text-[#111111]">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-[#4a4a4a]">
              Fill in your details and we&apos;ll get back to you as soon as possible.
            </p>

            {submitMessage && (
              <div
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                  submitMessage.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#ded6ce] bg-[#faf7f3] px-4 py-3 text-sm text-black outline-none transition focus:border-[#dd5500]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#ded6ce] bg-[#faf7f3] px-4 py-3 text-sm text-black outline-none transition focus:border-[#dd5500]"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#ded6ce] bg-[#faf7f3] px-4 py-3 text-sm text-black outline-none transition focus:border-[#dd5500]"
              />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6ce] bg-[#faf7f3] px-4 py-3 text-sm text-black outline-none transition focus:border-[#dd5500]"
              />

              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#ded6ce] bg-[#faf7f3] px-4 py-3 text-sm text-black outline-none transition focus:border-[#dd5500]"
              >
                <option value="" disabled>
                  Which service are you interested in?
                </option>
                <option value="relocation">Relocation Support</option>
                <option value="airport-meet-and-greet">Airport Meet and Greet</option>
                <option value="leadwood-homes">Leadwood Homes</option>
                <option value="leadwood-furniture">Leadwood Furniture</option>
                <option value="chauffeur-services">Chauffeur Services</option>
                <option value="other">Other</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us a little about what you need."
                value={formData.message}
                onChange={handleChange}
                required
                className="h-32 w-full rounded-xl border border-[#ded6ce] bg-[#faf7f3] px-4 py-3 text-sm text-black outline-none transition focus:border-[#dd5500]"
              />

              <label className="flex items-start gap-3 text-sm text-[#4a4a4a]">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-[#ded6ce] accent-[#dd5500]"
                />
                <span>
                  I agree to be contacted about my enquiry and understand that G&V
                  Support Services Limited will use this information to respond.
                </span>
              </label>

              <button
                type="submit"
                disabled={!formData.agree || submitting}
                className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  formData.agree
                    ? "bg-[#dd5500] text-white hover:bg-[#c54400]"
                    : "cursor-not-allowed bg-[#d8d0c7] text-[#6a625a]"
                }`}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
