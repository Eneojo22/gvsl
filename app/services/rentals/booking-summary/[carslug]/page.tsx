import Image from "next/image";
import { carTypes } from "../../chooseAvehicle";
import { CarPage } from "./carpage";
import { Link } from "lucide-react";


export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ carslug: string }>;
}) {
  const { carslug } = await params; 
  const decodedSlug = decodeURIComponent(carslug);

  const car = carTypes.find(
    (c) => c.slug.toLowerCase().replace(/\s/g, "-") === decodedSlug
  );



  if (!car) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <div className="bg-white shadow-md rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          Vehicle Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          We couldn’t find the car you’re looking for. It may have been removed or is currently unavailable.
        </p>
        <Link
          href="/services/carrentals"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200"
        >
          Browse Available Cars
        </Link>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen mt-35 text-black bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-72 md:h-auto">
            <Image
              src={car.imageUrl}
              alt={car.name}
              fill
              className="object-contain p-6 bg-gray-50"
            />
          </div>

          <div className="p-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <p className="text-gray-600 text-lg mb-2">{car.type}</p>
            <p className="text-orange-600 font-bold text-xl mb-4">
              ₦{car.amount} / day
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <CarPage
          car={{
            name: car.name,
            type: car.type,
            amount: car.amount,
            image: car.imageUrl,
          }}
        />

        {/* Booking Summary */}
       
      </div>
    </div>
  );
}
