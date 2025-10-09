
import Image from "next/image";
// import { carTypes } from "../main"; // adjust the import path to where your data is
import { carTypes } from "../../chooseAvehicle";
import { CarPage } from "./carpage";
// import { param } from "framer-motion/dist/types/client";

export default async function CarDetailsPage({
  params,
}: {
  params: { carslug: string };
}) {
  const { carslug } = params;
  const decodedSlug = decodeURIComponent(carslug);
  console.log("received slug:",carslug);
  console.log("decoded slug:", decodedSlug);

  const car = carTypes.find(
    (c) => c.slug.toLowerCase().replace(/\s/g, "-") === decodedSlug
  );


  if (!car) {
    return (
      <div className="flex justify-center items-center bg-black h-screen">
        <h1 className="text-2xl font-semibold text-white">Car not found 🚘</h1>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen mt-35 text-black bg-gray-100 py-12  px-4">
      <div className="max-w-6xl  mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-72 md:h-auto">
            <Image
              src={car.imageUrl}
              alt={car.name}
              fill
              className="object-contain p-6 bg-gray-50"
            />
          </div>

          {/* Car Details */}
          <div className="p-6 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
            <p className="text-gray-600 text-lg mb-2">{car.type}</p>
            <p className="text-orange-600 font-bold text-xl mb-4">
              ₦{car.amount} / day
            </p>
          </div>
        </div>

        {/* Booking Form */}
       <CarPage car={{ name: car.name, type: car.type, amount: car.amount, image:car.imageUrl }} />

      </div>
    </div>
  );
}
