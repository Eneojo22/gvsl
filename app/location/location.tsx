"use client";
import React from 'react'
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const Location = () => {
  return (
    <div className='mb-20 border-4'>
    <div className='bobi2  w-full z-40 text-black mt-40'>
            <Hero
        title="Nigeria"
        subtitle="Ekabo"
        image="/image/emmanuel-ikwuegbu-T4q6ZPpYjog-unsplash.jpg"
        overlayOpacity="bg-black/50"
        height="h-[25vh]"
      />
    </div>
    <div className="w-0 h-20 border-2 md:w-full   mt-5">
      <nav className="  flex justify-end items-center h-20 space-x-4 mb-4 bobi w-4/5">
        <Link href="#" className="text-gray-600 hover:text-gray-800">Overview</Link>
        <Link href="#" className="text-gray-600 hover:text-gray-800">Housing</Link>
        <Link href="#" className="text-gray-600 hover:text-gray-800">Immigration Policy</Link>
        {/* <a href="#" className="text-gray-600 hover:text-gray-800">Cost Request</a> */}
      </nav>
    </div>
     <section>
      <SubHome/>
     </section>
     <Hero
  title="Housing"
  // subtitle="?"
  image="/image/Homes.jpg"
  overlayOpacity="bg-black/50"
  height="h-[20vh]"
/>
     <section>
    <Housing/>
     </section>
     <Hero
  title="Our Immigration"
  // subtitle="?"
  image="/image/immigration.jpg"
  overlayOpacity="bg-black/50"
  height="h-[20vh]"
/>
     <section>
    <Immigration/>
     </section>
     <section>
      {/* <Schooling/> */}
     </section>
    
    
    </div>
  )
}

export default Location




interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: string; // e.g. "bg-black/40"
  height?: string; // e.g. "h-[60vh]" or "h-screen"
}

 function Hero({
  title,
  subtitle,
  image,
  overlayOpacity = "bg-black/40",
  height = "h-[30vh]",
}: HeroProps) {
  return (
    <section className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}




 function SubHome() {
  return (
    <div className="container mx-auto p-4">
      {/* Navigation */}
      

      <div className="flex flex-col md:flex-row gap-6 p-4 items-center">
        {/* Left Section */}
        <div className="w-full md:w-1/2  md:h-120 text-center tracking-wide leading-relaxed border-2 ">
          <h1 className="text-2xl font-bold text-[#dd5500] md:mb-2 m-4 ">Nigeria</h1>
          <p className='text-[#413f3f] text-sm  md:h-90 m-4 p-4'>
            {/* Overview <br /> */}
            Nigeria, officially the Federal Republic of Nigeria, is a sovereign state in West Africa. It is the most populous country in Africa and the sixth most populous in the world,
             with over 200 million people. Nigeria is a federal republic comprising 36 states and the Federal Capital Territory, 
             where the capital city, Abuja, is located. Lagos is the largest city and the country’s major financial hub. Bordered by Benin to the west, 
             Niger to the north, Chad to the northeast, and Cameroon to the east, Nigeria also has a southern coastline along the Gulf of Guinea in the Atlantic Ocean. <br /> <br />
            Nigeria is a member of the United Nations, the African Union, OPEC, the Commonwealth of Nations, and ECOWAS (Economic Community of West African States). It is a culturally diverse nation with over 250 ethnic groups, and it is widely known as the "Giant of Africa" due to its large economy and influence on the continent.
          </p>
          {/* <p className="text-gray-700 mb-4">
            Overview <br />
            Angola, officially the Republic of Angola (República de Angola), is a sovereign state in Central Africa and the west coast of Southern Africa. It is the second largest lusophone (Portuguese-speaking) country in both total area and population (behind Brazil), and it is the seventh-largest country in Africa, bordered by Namibia to the south, the Democratic Republic of the Congo to the north, Zambia to the east, and the Atlantic Ocean to the west. Angola has an enclave province of Cabinda that borders the Republic of the Congo and the Democratic Republic of the Congo. The capital and largest city is Luanda. <br /> <br />
            Angola is a member of the United Nations, OPEC, African Union, the Community of Portuguese Language Countries, and the Southern African Development Community, and has a multicultural and multiethnic population.
          </p> */}
          {/* <button className="bg-[#dd5500] text-white px-4 py-2 rounded hover:bg-red-700">
            + More Locations
          </button> */}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg " >
          <h2 className="text-lg font-semibold mb-2  text-[#dd5500]">Country Facts</h2>
          <ul className="space-y-2 text-[#333333]">
           <li className="flex items-center ">
  <span className="text-[#333333] mr-2">⚙️</span> Currency: Naira (NGN)
</li>
<li className="flex items-center">
  <span className="text-[#333333] mr-2">🌡️</span> Climate: Tropical (varies from arid in the north to humid in the south)
</li>
<li className="flex items-center">
  <span className="text-[#333333] mr-2">💧</span> Water: Drinkable in some urban areas, bottled water recommended
</li>
<li className="flex items-center">
  <span className="text-[#333333] mr-2">⏰</span> Time Zone: UTC+1 (West Africa Time)
</li>
<li className="flex items-center">
  <span className="text-[#333333] mr-2">🗣️</span> Official Language(s): English
</li>
<li className="flex items-center">
  <span className="text-yellow-500 mr-2">👥</span> Population: 220+ million
</li>

          </ul>
          <div className="mt-4 text-gray-500 text-sm ">
            <DateTime/> <br />
            {/* 11:15 a.m. */}
          </div>
          
        </div>
      </div>
    </div>
  );
}



function DateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="mt-4 text-gray-500 text-sm">
      {formattedDate} <br />
      {formattedTime}
    </div>
  );
}


function Housing(){
return(
       <div className="w-full max-w-5xl mx-auto   mt-10 rounded-lg p-6 bg-white  ">
  <h1 className="text-2xl font-light text-[#dd5500] mb-4 text-center">
    Housing in Nigeria: Premier Accommodation Solutions with Leadwood Homes
  </h1>

  <p className="text-[#333333] text-base leading-relaxed text-justify">
    Nigeria's housing landscape is undergoing a remarkable transformation, fueled by rapid urbanization, population growth, and a burgeoning demand for quality living spaces. As of 2025, the country's real estate market is projected to reach a staggering US$2.61 trillion, with the residential segment alone accounting for US$2.25 trillion—driven by an annual housing demand growth of approximately 8% and an urban population expected to exceed 60% of the total populace in major hubs like Lagos, Abuja, and Port Harcourt. Despite a persistent housing deficit of over 22 million units, innovative trends such as affordable micro-apartments, sustainable eco-friendly developments, and public-private partnerships (PPPs) are bridging the gap, making homeownership more accessible for middle- and low-income families. Property prices in key urban centers are forecasted to rise by 5-15% this year, underscoring the sector's resilience amid economic shifts like the Central Bank of Nigeria's recent benchmark rate cut to 27%, which is easing mortgage access and spurring investment.
    <br /><br />
    At Leadwoods Home (GVSS), we recognize these dynamics and are committed to empowering our clients with exceptional housing options that align with Nigeria's evolving needs. Through our strategic affiliation with Lead Homes, a premier real estate firm based in Lekki, Lagos, we deliver the best in premium accommodation—ranging from luxury apartments and gated community estates to affordable land plots and modern residential developments. Lead Homes specializes in transparent transactions, flexible payment plans, and high-quality properties that prioritize security, sustainability, and proximity to urban amenities, ensuring seamless integration into Nigeria's dynamic real estate ecosystem.
    <br /><br />
    Whether you're a diaspora investor seeking high-yield opportunities, a growing family in need of spacious homes, or a professional eyeing short-let rentals in vibrant city centers, our partnership with Lead Homes guarantees tailored solutions that exceed expectations. Explore their curated portfolio of flats, houses, and commercial spaces today and secure your slice of Nigeria's booming housing future.
    <br /><br />
    <Link href={'../services/ourapartment/'} className='hover:text-orange-500'><strong>Discover Leadwoods Homes Properties</strong></Link> – Your gateway to world-class accommodation in Nigeria.
    <br /><br />
    For personalized consultations or property viewings, contact our GVSS Housing team at 
    <span className="text-[#dd5500] font-medium"> leadwoodsupport@gvss.ng </span> 
  </p>
</div>
)}

const Immigration = () => {
  return (
    <div className="w-full max-w-5xl mx-auto   mt-10 mb-40 rounded-lg p-6 text-black  ">
      <h1 className="text-2xl font-light text-[#dd5500] mb-4 text-center">
        Navigating Nigeria Visa Requirements: Seamless Support for Expatriates
        </h1>
        <p>
          As Nigeria's economy continues to attract global talent particularly in sectors like oil & gas, tech, and finance—understanding visa requirements is crucial for expatriates embarking on temporary contracts up to three years. With urbanization driving a projected 8% annual housing demand growth and urban populations exceeding 60%, the country offers immense opportunities, but immigration processes must be handled meticulously to avoid delays or penalties. Recent reforms, including the Nigeria Visa Policy (NVP) 2025 effective May 1, 2025, and the launch of the Expatriate Administration System (EAS), have digitized applications, eliminated physical visa stickers, and introduced stricter compliance measures, such as mandatory Expatriate Personal Liability Insurance to cover deportation costs for non-compliance. An amnesty period until July 31, 2025, allows regularization of overstays without fines, after which penalties apply: daily surcharges, 5-year bans for 6+ month overstays, and 10-year bans for 1+ year overstays.
          <br /><br />
          At G&V Support Services Limited (GVSS), we specialize in guiding expatriates through these requirements, ensuring compliance from application to arrival. Our end-to-end visa and document preparation services—streamlined through partnerships with licensed immigration consultants—handle everything from initial assessments to biometric enrollments, freeing you to focus on your contract. We align visa strategies with your housing needs via our affiliation with Lead Homes, securing premium accommodations in key hubs like Lagos and Abuja upon approval.
          <br /><br />
          Key Visa Types for Temporary Contracts (Up to 3 Years)
Nigeria's immigration framework, managed by the Nigeria Immigration Service (NIS), categorizes visas for expatriates into short-stay (up to 90 days) and long-term options, with work authorization often requiring a combined Temporary Work Permit (TWP) and Combined Expatriate Residence Permit and Aliens Card (CERPAC). All applications are now primarily online via the NIS portal, with processing times of 24-48 hours for e-Visas and up to 2 weeks for work permits. From May 1, 2025, all entrants must complete Landing and Exit Cards at borders for enhanced tracking.



        </p>
        <div className="overflow-x-auto w-full my-6">
  <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
    <thead className="bg-[#dd5500] text-white">
      <tr>
        <th className="border border-gray-300 p-3 text-left">Visa Type</th>
        <th className="border border-gray-300 p-3 text-left">Purpose & Duration</th>
        <th className="border border-gray-300 p-3 text-left">Key Eligibility</th>
        <th className="border border-gray-300 p-3 text-left">Core Requirements</th>
        <th className="border border-gray-300 p-3 text-left">Fees (Approximate, in USD)</th>
      </tr>
    </thead>

    <tbody className="text-[#333333]">
      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 p-3 font-medium">
          Short Stay e-Visa / Visa on Arrival (VOA)
        </td>
        <td className="border border-gray-300 p-3">
          Initial entry for business meetings, contract negotiations, job interviews, or site visits (up to 90 days). Ideal for pre-contract scouting.
        </td>
        <td className="border border-gray-300 p-3">
          Frequent business travelers, top executives from multinationals, or holders of valid passports from visa-waiver countries (e.g., US, UK, EU).
        </td>
        <td className="border border-gray-300 p-3 whitespace-pre-line">
          - Valid passport (6+ months validity).
          {"\n"}- Online application with invitation letter from Nigerian host/company.
          {"\n"}- Proof of funds, return ticket, yellow fever vaccination.
          {"\n"}- Security clearance (integrated with Interpol via EAS).
        </td>
        <td className="border border-gray-300 p-3">$100–$150 (plus $20 processing).</td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 p-3 font-medium">
          Temporary Work Permit (TWP) / STR Visa
        </td>
        <td className="border border-gray-300 p-3">
          Work authorization for contracts up to 3 years; location-specific (e.g., Lagos/Abuja). Converts to residence upon arrival.
        </td>
        <td className="border border-gray-300 p-3">
          Roles Nigerians cant fill (e.g., specialized tech/engineering). Requires employer sponsorship via Expatriate Quota approval.
        </td>
        <td className="border border-gray-300 p-3 whitespace-pre-line">
          - Employer applies for Quota (proving local unavailability).
          {"\n"}- Employment contract, CV, credentials.
          {"\n"}- 4 copies of formal invitation letter from Nigerian company.
          {"\n"}- Medical/police clearance, passport photos.
        </td>
        <td className="border border-gray-300 p-3">$200–$500 (Quota: $1,000+; renewable annually).</td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 p-3 font-medium">CERPAC</td>
        <td className="border border-gray-300 p-3">
          Combined residence/work permit for stays beyond 56 days; up to 1 year initial, renewable up to 3 years total for contracts. Mandatory for all long-term expats.
        </td>
        <td className="border border-gray-300 p-3">
          Employed by Nigerian firms, multinationals, or Free Zones. Allows dependents.
        </td>
        <td className="border border-gray-300 p-3 whitespace-pre-line">
          - TWP approval first.
          {"\n"}- Online application post-arrival.
          {"\n"}- Biometrics at NIS office.
          {"\n"}- Proof of address (we assist via Lead Homes).
        </td>
        <td className="border border-gray-300 p-3">$1,000–$2,000 (includes card issuance; annual renewal $700+).</td>
      </tr>

      <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 p-3 font-medium">Free Zone Visa</td>
        <td className="border border-gray-300 p-3">
          For work in economic free zones (e.g., Lekki); 2 years, renewable.
        </td>
        <td className="border border-gray-300 p-3">Hired by zone-licensed companies.</td>
        <td className="border border-gray-300 p-3 whitespace-pre-line">
          - Contract, Free Zone Authority clearance.
          {"\n"}- Similar to TWP but zone-specific.
        </td>
        <td className="border border-gray-300 p-3">$300–$600.</td>
      </tr>
    </tbody>
  </table>
</div>


      </div>
  )
}   




