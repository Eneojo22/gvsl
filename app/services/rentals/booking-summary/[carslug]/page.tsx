import Image from "next/image";
import Link from "next/link";

import { carTypes } from "../../chooseAvehicle";
import { CarPage } from "./carpage";

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ carslug: string }>;
}) {
  const { carslug } = await params;
  const decodedSlug = decodeURIComponent(carslug);

  const car = carTypes.find(
    (item) => item.slug.toLowerCase().replace(/\s/g, "-") === decodedSlug
  );

  if (!car) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-md">
          <h1 className="mb-3 text-2xl font-semibold text-gray-800">Vehicle Not Found</h1>
          <p className="mb-6 text-gray-500">
            We couldn't find the car you're looking for. It may have been removed or is currently
            unavailable.
          </p>
          <Link
            href="/services/rentals"
            className="inline-block rounded-lg bg-orange-600 px-6 py-2.5 font-medium text-white transition-all duration-200 hover:bg-orange-700"
          >
            Browse Available Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 text-black">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-72 md:h-auto">
            <Image
              src={car.imageUrl}
              alt={car.name}
              fill
              className="bg-gray-50 object-contain p-6"
            />
          </div>

          <div className="flex flex-col justify-center p-6">
            <h1 className="mb-2 text-3xl font-bold">{car.name}</h1>
            <p className="mb-2 text-lg text-gray-600">{car.type}</p>
            <p className="mb-4 text-xl font-bold text-orange-600">NGN {car.amount} / day</p>
          </div>
        </div>

        <CarPage
          car={{
            name: car.name,
            type: car.type,
            amount: car.amount,
            image: car.imageUrl,
          }}
        />
      </div>
    </div>
  );
}
