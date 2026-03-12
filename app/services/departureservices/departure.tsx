import {
  Building2,
  ClipboardList,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import ServicePageTemplate from "../service-page-template";

export default function DeparturePage() {
  return (
    <ServicePageTemplate
      eyebrow="Departure Services"
      title="Close out an assignment with less disruption and better control."
      description="Our departure support helps assignees and employers manage the final relocation stage more smoothly, from lease exit and inventory handover to refunds, utilities, and practical close-out coordination."
      image="/image/flight.jpg"
      stats={[
        {
          label: "Service focus",
          value: "Move-out support",
          description: "Structured help for the last stage of the relocation journey.",
        },
        {
          label: "Planning style",
          value: "Managed timeline",
          description: "Key steps are organized early so important notices and handovers are not missed.",
        },
        {
          label: "Property exit",
          value: "Close-out coordination",
          description: "We help manage landlord, inventory, repair, and service provider touchpoints.",
        },
        {
          label: "Client benefit",
          value: "Less pressure",
          description: "The assignee can stay focused while departure tasks are better controlled.",
        },
      ]}
      heroItems={[
        "A coordinated departure timeline built around the client’s move-out date.",
        "Support with lease notice, landlord communication, and handover preparation.",
        "Practical help around inventory checks, service disconnections, and cleaning arrangements.",
        "Closer attention to refunds, claims, and final property-related follow-up.",
      ]}
      actions={[
        { label: "Request departure support", href: "/contact-us" },
        {
          label: "View arrival services",
          href: "/services/airportmeetandgreet",
          variant: "secondary",
        },
      ]}
      introTitle="Departure needs the same level of care as arrival."
      introParagraphs={[
        "The end of an expatriate assignment often involves many moving parts. Lease notices, property checks, deposit discussions, utility closures, and final service arrangements all need to be handled correctly and on time.",
        "Our Departure Services are designed to reduce the pressure of that process. We help build a realistic close-out timeline, coordinate the practical tasks, and keep communication moving with landlords, suppliers, and other relevant parties.",
        "This gives the assignee more room to focus on their final responsibilities while helping the employer maintain a more orderly and professional departure experience.",
      ]}
      introAsideTitle="What this support improves"
      introAsideDescription="A managed departure process helps prevent last-minute confusion, missed notices, and unnecessary disputes during move-out."
      introAsideItems={[
        "Keeps critical departure tasks visible and scheduled.",
        "Supports smoother property handover and service closure.",
        "Improves follow-up on deposits, claims, and final obligations.",
      ]}
      highlightsTitle="Where the service adds value"
      highlightsDescription="We focus on the parts of departure that usually create the most stress when they are left unmanaged."
      highlights={[
        {
          title: "Move-out planning",
          description: "We help create a practical sequence for notices, exit preparation, and final handover activities.",
          icon: ClipboardList,
        },
        {
          title: "Landlord and property coordination",
          description: "The close-out process is easier when landlord communication and property expectations are handled early.",
          icon: Building2,
        },
        {
          title: "Refund and account follow-up",
          description: "We support discussions around deposits, outstanding balances, and final service account actions.",
          icon: WalletCards,
        },
        {
          title: "Reduced close-out risk",
          description: "A structured process lowers the chance of missed steps, unnecessary delays, or avoidable disputes.",
          icon: ShieldCheck,
        },
      ]}
      processTitle="A more organized move-out sequence"
      processDescription="We keep the departure process clear and easy to follow so clients know what happens next and when."
      processSteps={[
        {
          title: "Departure planning",
          description: "We review the move-out date, housing obligations, supplier notices, and the client’s key departure requirements.",
        },
        {
          title: "Notice and coordination",
          description: "Required notifications are prepared and shared with landlords or providers within the right timeframes.",
        },
        {
          title: "Property close-out",
          description: "We help coordinate cleaning, repairs, inventory check-out, and the final handover process.",
        },
        {
          title: "Final follow-up",
          description: "Where applicable, we support ongoing communication around deposits, claims, and residual service matters.",
        },
      ]}
      coverageTitle="Typical departure support areas"
      coverageDescription="The service can be adjusted depending on housing arrangements, company policy, and the complexity of the move-out."
      coverageGroups={[
        {
          title: "Practical close-out support",
          description: "Common tasks we help coordinate for assignees and employers.",
          items: [
            "End-of-assignment lease termination",
            "Formal notice to landlords",
            "Deposit refund facilitation",
            "Coordination of property repairs and third-party services",
            "Utility, phone, and internet service closure support",
            "Arrangement of professional cleaning services",
            "Inventory check-out management",
            "Assistance with bank account transfer or closure guidance where needed",
          ],
        },
        {
          title: "Best used when",
          description: "This service is most valuable when departure includes multiple parties, deadlines, or property obligations.",
          items: [
            "Corporate assignments ending in leased accommodation",
            "Executives who need a managed exit process",
            "Families coordinating final housing and service handovers",
            "Employers seeking a more controlled relocation close-out",
          ],
        },
      ]}
      ctaTitle="Need a smoother assignment close-out for your assignee?"
      ctaDescription="We can help you structure the departure process so the final stage of relocation feels more professional, more predictable, and easier to manage."
      ctaPrimary={{ label: "Contact our team", href: "/contact-us" }}
      ctaSecondary={{ label: "See arrival support", href: "/services/airportmeetandgreet" }}
    />
  );
}
