"use client";
import React from 'react'
import Image from "next/image";
import { useEffect, useState } from "react";
import { div } from 'framer-motion/client';
const Location = () => {
  return (
    <>
    <div className='bobi2  w-full z-40 text-black mt-40'>
            <Hero
        title="Welcome to Nigeria"
        subtitle="Ekabo"
        image="/image/emmanuel-ikwuegbu-T4q6ZPpYjog-unsplash.jpg"
        overlayOpacity="bg-black/50"
        height="h-[70vh]"
      />
    </div>
    <div className="stick h-20 border-2 w-full  mt-5">
      <nav className="flex justify-end items-center h-20 space-x-4 mb-4 bobi w-4/5">
        <a href="#" className="text-gray-600 hover:text-gray-800">Overview</a>
        <a href="#" className="text-gray-600 hover:text-gray-800">Housing</a>
        <a href="#" className="text-gray-600 hover:text-gray-800">Schools</a>
        <a href="#" className="text-gray-600 hover:text-gray-800">Cost Request</a>
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
  height="h-[70vh]"
/>
     <section>
      <Housing/>
      <Hero
       title="Schools"
        subtitle="Our schooling System"
        image="/image/sch.jpg"
       overlayOpacity="bg-black/50"
        height="h-[70vh]"
      />
     </section>
     <section>
      <Schooling/>
     </section>
    
    
    </>
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
      

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-[#dd5500] mb-2">Nigeria</h1>
          <p className='text-[#333333]'>
            Overview <br />
            Nigeria, officially the Federal Republic of Nigeria, is a sovereign state in West Africa. It is the most populous country in Africa and the sixth most populous in the world, with over 200 million people. Nigeria is a federal republic comprising 36 states and the Federal Capital Territory, where the capital city, Abuja, is located. Lagos is the largest city and the country’s major financial hub. Bordered by Benin to the west, Niger to the north, Chad to the northeast, and Cameroon to the east, Nigeria also has a southern coastline along the Gulf of Guinea in the Atlantic Ocean. <br /> <br />
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
        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg border-2" >
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
          <div className="mt-4 text-gray-500 text-sm">
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
        <div className='container mx-auto p-4 flex flex-col'>

            <div className="w-full md:w-2/3 border-2  ">
          <h1 className="text-2xl font-light text-[#dd5500]  m-4">Housing in Nigeria</h1>
          <p className='text-[#333333] text-base leading-relaxed  mx-5'>
                          Nigeria offers a wide variety of housing options, ranging from standalone houses (bungalows and duplexes) to townhouses, serviced apartments, and modern high-rise apartments—particularly in major cities such as Lagos and Abuja.
                          Many expatriates and corporate assignees prefer serviced apartments or gated estates because they provide enhanced security, reliable utilities, and on-site facilities. Unlike some countries, most rental properties in Nigeria are typically unfurnished and may not include appliances (“white goods”). 
                          However, serviced apartments usually come furnished and may include backup power (generator or inverter systems), internet access, and even cleaning services.
                          Young professionals and single assignees often opt for apartments close to business hubs.
                          Families usually prefer gated communities or estates with shared amenities such as playgrounds, gyms, and swimming pools.

                          At G&V Support Services, in collaboration with Lead Woods Homes, we are dedicated to helping you sort out your housing needs with ease and professionalism. With our apartments located at Keffi and Bouenavista, we ensure comfort, reliability, and support every step of the way.

                          In addition to providing comfortable living spaces, we understand that finding the right home in Nigeria goes beyond just securing an apartment. Location, accessibility, and lifestyle needs all play a huge role. That’s why at G&V Support Services, in collaboration with Lead Woods Homes, we don’t just provide housing—we provide a lifestyle tailored to you.

                      Whether you are a first-time expatriate, a business professional relocating for work, or a family seeking a safe and vibrant community, our team ensures that your transition is seamless. Our apartments at Keffi and Bouenavista are strategically located to give you proximity to essential services, schools, healthcare facilities, shopping centers, and major business districts.

                      We also prioritize your comfort and peace of mind, offering:

                      Modern amenities such as uninterrupted power supply, water treatment systems, and high-speed internet.

                      Security you can trust, with gated access, surveillance, and professional guards.

                      Flexible housing solutions ranging from short-term stays to long-term leases.

                      Personalized support, ensuring that your housing needs are matched with the right property and services.

                      At G&V Support Services, our mission is not just to provide you with an apartment but to create a home that complements your lifestyle and supports your success in Nigeria.


          </p>
         
        </div>

      <div className="w-full md:w-1/3 h-200 bg-gray-100 p-4 rounded-lg border-2" >
             <h2 className="text-2xl font-medium mb-6 text-[#dd5500]">Housing Facts</h2>

      {/* Popular Expat Areas */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Popular Expat Areas</h3>
        <ul className=" text-gray-600 :">
          <li className='p-3 font-medium'> Ikoyi (Lagos)</li>
          <li className='p-3 font-medium'>Victoria Island (Lagos)</li>
          <li className='p-3 font-medium'>Lekki Phase 1 (Lagos)</li>
          <li className='p-3 font-medium'>Banana Island (Lagos)</li>
          <li className='p-3 font-medium'>Ikeja GRA (Lagos)</li>
          <li className='p-3 font-medium'>Asokoro (Abuja)</li>
          <li className='p-3 font-medium'>Maitama (Abuja)</li>
          <li className='p-3 font-medium'>Wuse II (Abuja)</li>
          <li className='p-3 font-medium'>Gwarinpa (Abuja)</li>
          <li className='p-3 font-medium'>Trans-Amadi (Port Harcourt)</li>
        </ul>

Popular Expat Areas (Nigeria)






















      </div>
          </div>
        </div>

          )

}
function Schooling(){
return(
        <div className='container mx-auto p-4 flex flex-col my-3  text-black'>

        <div className="w-full md:w-2/3 m-3 ">
          <h1 className="text-2xl font-light text-[#dd5500] "> Education System in Lagos</h1>
          <p className='text-[#333333] text-base leading-relaxed  mx-5'>
          Lagos, as part of Nigeria, follows the national education framework, which is structured as a 6-3-3-4 system. This includes 6 years of primary education (ages 6-12, grades 1-6),
          3 years of junior secondary education (ages 12-15, grades 7-9), 
          3 years of senior secondary education (ages 15-18, grades 10-12), 
          and typically 4 years of tertiary education (university or equivalent). Basic education (primary and junior secondary) is officially free and compulsory for 9 years, but challenges like infrastructure issues, teacher shortages, and economic barriers mean about 10.5 million children aged 5-14 are out of school nationwide. In Lagos specifically, the system is similar but features a mix of public, private, and international schools, with many expat-focused institutions offering curricula like British, American, or IB (International Baccalaureate). The state government oversees public schools, while private ones often provide higher standards and facilities. Tertiary education is largely government-controlled, with universities, polytechnics, and colleges of education emphasizing development skills.
          Exams play a key role: Primary students take the Common Entrance Exam for secondary admission; secondary ends with WAEC (West African Examinations Council) or NECO (National Examinations Council) for university entry. Lagos has a vibrant education scene due to its urban status, but issues like overcrowding in public schools persist.
          </p>
        </div>

      <div className="w-full md:w-1/3  bg-gray-100 p-4 rounded-lg border-2" >
             <h2 className="text-2xl font-medium mb-6 text-[#dd5500]">Recommendations for Top Schools</h2>

      {/* Popular Expat Areas */}
      <div className="mb-8 ">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Popular Expat Areas</h3>
    <div>
        <h2 className="text-2xl font-medium mb-4 text-gray-800">Top Primary Schools in Lagos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Corona School – Ikoyi</li>
          <li>Grange School – Ikeja</li>
          <li>Chrisland School – Opebi/Ikeja</li>
          <li>Lagos Preparatory and Secondary School – Ikoyi</li>
          <li>Greensprings School – Lekki/Anthony</li>
          <li>Meadow Hall School – Lekki</li>
          <li>Banana Island International School – Banana Island</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-medium mb-4 text-gray-800">Top Secondary Schools in Lagos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Atlantic Hall School – Epe</li>
          <li>Greensprings School – Lekki/Anthony</li>
          <li>Grange School – Ikeja</li>
          <li>Lekki British International School – Lekki</li>
          <li>Corona Secondary School – Agbara</li>
          <li>American International School of Lagos – Victoria Island</li>
          <li>Kings' College – Lagos Island</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Universities in Lagos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>University of Lagos (UNILAG) – Akoka</li>
          <li>Lagos State University (LASU) – Ojo</li>
          <li>Pan-Atlantic University (PAU) – Ibeju-Lekki</li>
          <li>Caleb University – Imota</li>
          <li>Anchor University – Ayobo</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Professional Courses in Lagos</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Chartered Accountant (ICAN)</li>
          <li>Chartered Banker (CIBN)</li>
          <li>Taxation Professional (CITN)</li>
          <li>Project Management Professional (PMP)</li>
          <li>Data Analysis / Data Science</li>
          <li>Digital Marketing</li>
          <li>Cisco Certified Network Associate (CCNA)</li>
          <li>Human Resources Management (CIPM)</li>
          <li>Chartered Financial Analyst (CFA)</li>
        </ul>
      </div>
      
























      </div>
          </div>
        </div>
          )

}




