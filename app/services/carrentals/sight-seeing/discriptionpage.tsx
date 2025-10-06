
// // import { properties } from "/services/properties/apartmentData";
// import Link from "next/link";
// // import properties from "../apartmentData";
// import properties from "@/app/services/ourapartment/apartmentData";
// import Image from "next/image";

// type Props = {
//   apartmentId: string;
// };

// export default function ({ apartmentId }: Props) {
//   const location = properties.find((p) => p.title.toString() === apartmentId);
// //  go an error here because i was compare a number to a string this is the error This comparison appears to be unintentional because the types
//   if (!location) {
//     return <div>Apartment not found <Link href={'/'}>Go back to our Apartment</Link></div>;
//   }

//   return (
//     <div>
//         <h2 className="mt-35 text-3xl font-semibold p-2">{location.title}</h2>
//         <div className="relative sm:w-full h-84">           
//           <Image
//               src={location.image}
//               alt={location.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//     <div>
//               {/* <p>NB: </p> */}
//              </div>
//     </div>
//   );
// }
