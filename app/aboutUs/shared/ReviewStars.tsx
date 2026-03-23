import { Star } from "lucide-react";

type ReviewStarsProps = {
  rating: number;
  size?: number;
};

export default function ReviewStars({ rating, size = 18 }: ReviewStarsProps) {
  const roundedRating = Math.max(1, Math.min(5, Math.round(rating)));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${roundedRating} out of 5 stars`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = value <= roundedRating;

        return (
          <Star
            key={value}
            size={size}
            className={isFilled ? "fill-current text-amber-400" : "text-slate-300"}
            strokeWidth={1.8}
          />
        );
      })}
    </div>
  );
}
