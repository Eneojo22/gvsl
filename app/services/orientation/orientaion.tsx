import {
  BookOpen,
  Building2,
  MapPinned,
  School,
} from "lucide-react";

import ServicePageTemplate from "../service-page-template";

export default function OrientationPage() {
  return (
    <ServicePageTemplate
      eyebrow="Orientation and Area Tours"
      title="Understand the city, the lifestyle, and the practical choices before you settle in."
      description="Our orientation service gives relocating clients a clearer picture of daily life in Nigeria, helping them make informed decisions about neighborhoods, housing, schools, and local routines."
      image="/image/orientation.jpg"
      stats={[
        {
          label: "Service focus",
          value: "Local clarity",
          description: "Useful context for clients who need to adapt quickly and confidently.",
        },
        {
          label: "Tour style",
          value: "Tailored guidance",
          description: "Each orientation is shaped around the client’s priorities and assignment needs.",
        },
        {
          label: "Decision support",
          value: "Area insights",
          description: "We help compare locations, amenities, routines, and suitability.",
        },
        {
          label: "Outcome",
          value: "Better choices",
          description: "Clients can move forward with clearer expectations and less uncertainty.",
        },
      ]}
      heroItems={[
        "Personalized orientation built around the client, family profile, and assignment goals.",
        "Practical guidance on neighborhoods, commuting, lifestyle, and everyday services.",
        "Support with understanding housing options and shortlisting suitable locations.",
        "Useful local context for schools, routines, and settling into the environment more comfortably.",
      ]}
      actions={[
        { label: "Plan an orientation", href: "/contact-us" },
        {
          label: "Explore housing support",
          href: "/services/leadwoodhomes",
          variant: "secondary",
        },
      ]}
      introTitle="A good orientation makes relocation easier to understand."
      introParagraphs={[
        "Relocating to a new country involves much more than finding a place to live. Clients also need to understand the environment around them, how daily life works, and which locations best match their personal and professional priorities.",
        "Our Orientation and Area Tours service is designed to make that adjustment more manageable. We guide the client through the local context in a structured, easy-to-follow way, with attention to the issues that matter most to them.",
        "That may include neighborhood comparisons, housing considerations, schooling options, commuting realities, and the cultural insights that help a newcomer feel more comfortable much sooner.",
      ]}
      introAsideTitle="What the client gains"
      introAsideDescription="The goal is not only to show locations, but to help the client understand what everyday life in each option is likely to feel like."
      introAsideItems={[
        "Stronger understanding of local culture and day-to-day expectations.",
        "More confident area and housing decisions.",
        "Clearer view of practical factors such as access, schools, and lifestyle fit.",
      ]}
      highlightsTitle="What makes the service useful"
      highlightsDescription="The orientation is designed to answer real relocation questions in a way that feels practical and relevant."
      highlights={[
        {
          title: "Cultural context",
          description: "Clients receive helpful guidance on local customs, habits, and social expectations that affect daily life.",
          icon: BookOpen,
        },
        {
          title: "Neighborhood insight",
          description: "We explain how different areas compare in character, access, convenience, and general suitability.",
          icon: MapPinned,
        },
        {
          title: "Housing understanding",
          description: "Clients can review housing possibilities with a stronger sense of what each area and property option offers.",
          icon: Building2,
        },
        {
          title: "School guidance",
          description: "Families receive useful direction on education options and the considerations that matter when choosing schools.",
          icon: School,
        },
      ]}
      processTitle="How the orientation usually works"
      processDescription="We keep the experience structured so clients can absorb the information without feeling overloaded."
      processSteps={[
        {
          title: "Needs briefing",
          description: "We gather the client’s priorities, lifestyle requirements, family needs, and assignment expectations.",
        },
        {
          title: "Planned tour route",
          description: "The orientation is arranged around the most relevant neighborhoods, facilities, and housing considerations.",
        },
        {
          title: "Guided local review",
          description: "During the tour, we explain the context behind each option so the client can compare areas more effectively.",
        },
        {
          title: "Next-step direction",
          description: "After the orientation, the client has a clearer basis for housing decisions, school choices, and follow-up support.",
        },
      ]}
      coverageTitle="What we can cover during orientation"
      coverageDescription="The scope is flexible and can be adjusted based on whether the client is a single assignee, a couple, or a relocating family."
      coverageGroups={[
        {
          title: "Common orientation topics",
          description: "These are the issues most clients want help understanding early in the relocation process.",
          items: [
            "Nigerian culture, social norms, and practical local expectations",
            "Neighborhood comparisons and lifestyle fit",
            "Housing types, residential areas, and accommodation options",
            "Commute patterns and access to key business districts",
            "Daily amenities such as shopping, healthcare, and essential services",
            "Education options for school-age children",
          ],
        },
        {
          title: "Ideal for",
          description: "The service is especially helpful when clients need to make informed choices quickly in a new environment.",
          items: [
            "New assignees arriving in Nigeria for the first time",
            "Families comparing school and neighborhood options",
            "Executives who need a fast but well-structured local briefing",
            "Clients preparing for home search and settling-in support",
          ],
        },
      ]}
      ctaTitle="Need a clearer introduction to life in Nigeria for a relocating client?"
      ctaDescription="We can structure an orientation that gives the client practical context, reduces uncertainty, and supports better relocation decisions from the beginning."
      ctaPrimary={{ label: "Arrange an orientation", href: "/contact-us" }}
      ctaSecondary={{ label: "View Leadwood Homes", href: "/services/leadwoodhomes" }}
    />
  );
}
