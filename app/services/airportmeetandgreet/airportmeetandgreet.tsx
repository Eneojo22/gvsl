import {
  Building2,
  CarFront,
  Handshake,
  ShieldCheck,
} from "lucide-react";

import ServicePageTemplate from "../service-page-template";

export default function AirportMeetAndGreetPage() {
  return (
    <ServicePageTemplate
      eyebrow="Airport Meet and Greet"
      title="A calm, professional welcome from the moment you arrive."
      description="We help new arrivals move through the airport with confidence, connect them to their onward transport, and reduce the stress that often comes with landing in a new country."
      image="/image/meetgreet.jpg"
      stats={[
        {
          label: "Arrival focus",
          value: "Airport support",
          description: "Guided help from touchdown to the next destination.",
        },
        {
          label: "On-the-ground help",
          value: "Personal escort",
          description: "A dedicated consultant meets and supports the traveler directly.",
        },
        {
          label: "Next step",
          value: "Transfer ready",
          description: "Smooth handoff into the arranged vehicle and accommodation plan.",
        },
        {
          label: "Client experience",
          value: "Lower stress",
          description: "Clear coordination helps remove arrival confusion and delays.",
        },
      ]}
      heroItems={[
        "A named destination consultant meets the traveler on arrival.",
        "Support through airport navigation, luggage handling guidance, and immediate coordination.",
        "Pre-arranged transfer to the client’s residence, hotel, or temporary accommodation.",
        "Attention to practical requests such as vehicle preference or family travel needs.",
      ]}
      actions={[
        { label: "Talk to our team", href: "/contact-us" },
        {
          label: "View orientation support",
          href: "/services/orientation",
          variant: "secondary",
        },
      ]}
      introTitle="Arrival support should feel organized, reassuring, and easy to follow."
      introParagraphs={[
        "The first hours after landing are often the most demanding part of a relocation journey. Travelers may be tired, unfamiliar with the airport environment, and focused on getting safely to their next destination without unnecessary delays.",
        "Our Airport Meet and Greet service is built to make that transition smoother. We coordinate arrival details in advance, meet the client at the airport, and stay present through the key arrival stages until the transfer is complete.",
        "For companies, this means a more controlled arrival experience. For assignees and families, it means a more comfortable first impression of Nigeria.",
      ]}
      introAsideTitle="What this service solves"
      introAsideDescription="Instead of leaving the traveler to figure out the arrival process alone, we create a clear handoff from airport arrival to local settlement."
      introAsideItems={[
        "Reduces uncertainty at the point of entry.",
        "Creates a professional first impression for corporate assignees and visitors.",
        "Connects airport arrival directly to transport and accommodation arrangements.",
      ]}
      highlightsTitle="Why clients value this support"
      highlightsDescription="The service is designed to keep the arrival process practical, respectful, and well coordinated."
      highlights={[
        {
          title: "Warm personal welcome",
          description: "Clients are received by a consultant who is ready to guide, assist, and answer immediate questions.",
          icon: Handshake,
        },
        {
          title: "Reliable arrival guidance",
          description: "We help travelers understand the next steps clearly instead of navigating the airport process alone.",
          icon: ShieldCheck,
        },
        {
          title: "Coordinated onward transfer",
          description: "The airport arrival is linked directly to the pre-arranged vehicle and destination plan.",
          icon: CarFront,
        },
        {
          title: "Better first-night setup",
          description: "Where required, we help the client reach and settle into the intended accommodation more smoothly.",
          icon: Building2,
        },
      ]}
      processTitle="A simple four-step arrival flow"
      processDescription="We keep the process easy to understand so the client knows what will happen before, during, and after landing."
      processSteps={[
        {
          title: "Pre-arrival coordination",
          description: "We confirm travel details, arrival timing, destination information, and any special requirements before the trip.",
        },
        {
          title: "Airport reception",
          description: "Our consultant meets the traveler at the agreed arrival point and begins the in-person support process.",
        },
        {
          title: "Arrival assistance",
          description: "We guide the client through the practical next steps and help keep the arrival moving smoothly.",
        },
        {
          title: "Transfer and handoff",
          description: "The traveler is escorted into the arranged vehicle and taken to the planned accommodation or destination.",
        },
      ]}
      coverageTitle="What we typically cover"
      coverageDescription="The service scope can be adapted to the traveler profile, company policy, and arrival plan."
      coverageGroups={[
        {
          title: "Included support areas",
          description: "Common parts of the service most clients ask us to manage.",
          items: [
            "Arrival coordination before landing",
            "Meet and greet at the airport",
            "Guidance through the immediate arrival process",
            "Luggage and movement support where needed",
            "Transfer coordination to residence, hotel, or temporary housing",
            "Immediate communication with company or family contacts when required",
          ],
        },
        {
          title: "Best suited for",
          description: "This service is especially useful when the arrival needs to feel well managed and low stress.",
          items: [
            "Corporate assignees relocating to Nigeria",
            "Executives and VIP travelers",
            "Families arriving with children or extra luggage",
            "First-time visitors who need local support on arrival",
          ],
        },
      ]}
      ctaTitle="Need a better arrival experience for your client or employee?"
      ctaDescription="We can help you plan an airport arrival that feels more controlled, more comfortable, and easier to manage from the first point of contact."
      ctaPrimary={{ label: "Request this service", href: "/contact-us" }}
      ctaSecondary={{ label: "Explore orientation", href: "/services/orientation" }}
    />
  );
}
