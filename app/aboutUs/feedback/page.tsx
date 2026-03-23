import HeroSection from "../shared/HeroSection";
import FeedbackFormSection from "../shared/FeedbackFormSection";

export default function FeedbackPage() {
  return (
    <div>
      <HeroSection
        title="Share your feedback"
        subtitle="Leave a local review about your experience with G&V Support Services Limited."
        backgroundImage="/image/meetgreet.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/aboutUs" },
          { label: "Feedback" },
        ]}
      />

      <FeedbackFormSection />
    </div>
  );
}
