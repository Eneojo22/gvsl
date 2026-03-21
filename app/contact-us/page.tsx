import type { Metadata } from "next";

import ContactForm from "../services/contactUs/contactUs";

export const metadata: Metadata = {
  title: "Contact G&V Support Services",
  description:
    "Contact G&V Support Services for housing, furniture, and relocation enquiries in Lagos and across Nigeria.",
  alternates: {
    canonical: "/contact-us",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function ContactUsPage() {
  return <ContactForm />;
}
