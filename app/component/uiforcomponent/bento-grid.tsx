import Image from "next/image";
import { cn } from "@/app/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image, // <- now this will be a string (image path)
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: string; // path to image, e.g. "/icons/airbnb.png"
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      
      <div className="transition duration-200 group-hover/bento:translate-x-2">
      {image && (
        <div className="relative w-full h-40 mb-2">
            <Image
             src={image}
             alt={typeof title === "string" ? title : "image"}
            fill
             className="object-cover rounded-lg"
             sizes="(max-width: 768px) 100vw, 33vw" // responsive optimization
         />
        </div>
)}
        {/* {image && (
          <Image
            src={image}
            alt="kk"
            // alt={typeof title === "string" ? title : "icon"}
            width={40}
            height={40}
            className="mb-2 h-40 w-full"
          />
        )} */}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
