
// import { properties } from "/services/properties/apartmentData";
import Link from "next/link";
import properties from "../apartmentData";
import Image from "next/image";

type Props = {
  apartmentId: string;
};

export default function Settlings({ apartmentId }: Props) {
  const apartment = properties.find((p) => p.id.toLocaleString() === apartmentId);
//  go an error here because i was compare a number to a string this is the error This comparison appears to be unintentional because the types
 if (!apartment) {
    return <div>Apartment not found <Link href={'/'}>Go back to our Apartment</Link></div>;
  }
 
  return (
    <div>
        <h2 className="mt-35 text-3xl font-semibold p-2">{apartment.title}</h2>
        <div className="relative sm:w-full h-84">           
          <Image
              src={apartment.image}
              alt={apartment.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="md:p-4">
                         <p className="text-[#cf6c3d] font-semibold">{apartment.type}</p>
                       <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                           {apartment.description}
                         </p>

             <p className="text-xl font-bold text-black mt-4">
                         ₦{apartment.price.toLocaleString()}
                             </p>
            </div>

      <div className="flex flex-wrap gap-3 text-sm text-gray-700 mt-4">
               <span>🛏 {apartment.features.bedrooms} Beds</span>
               <span>🛁 {apartment.features.bathrooms} Baths</span>
               <span>🚽 {apartment.features.toilets} Toilets</span>
               <span>🚗 {apartment.features.parkingSpaces} Parking</span>
             </div>
              <Link href="https://wa.me/2348137167298" target="_blank">
      <button className="border text-lg rounded-3xl p-4 mt-7 font-extrabold px-10 bg-[#000] text-[#ffffff]">Book Inspection Now</button>
      <div><p className="text-sm md:text-lg text-gray-600 mt-2">
        Please click the button below to schedule your inspection. We encourage you to book promptly, as availability is limited. </p></div>
    </Link>
    <div>
              {/* <p>NB: </p> */}
             </div>
    </div>
  );
}
