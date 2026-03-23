import HeroSection from "../shared/HeroSection";
import TestimonialsReviewsSection from "../shared/TestimonialsReviewsSection";

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

      <TestimonialsReviewsSection />
    </div>
  );
}
