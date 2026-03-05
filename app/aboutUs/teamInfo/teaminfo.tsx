
'use client'
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';


const Company = () => {
  return (
    <div className=' mt-35 border-4 text-black'>
          <ImageCarousel 
            title="Our Team"
                  subtitle="We are a mulitidisciplinary team with extensive experience in relocation and global mobility services. 
                  Our team is passionate about delivering exceptional service and support to our clients, ensuring a smooth and successful relocation experience. 
                   We are dedicated to providing personalized solutions that meet the unique needs of each client, and we work closely with them to ensure their satisfaction
                    throughout the entire relocation process.        "
                  image="/image/meetgreet.jpg"
                  overlayOpacity="bg-black/80"
                  height="h-[30vh]"
          
          />
{/* why then how */}
{/* What will i do if i know i cant fail */}
            <div className='w-full text-center p-6 md:text-5xl text-3xl font-bold'>Meet Our team</div>
            
            <div>
             <CompanyInfo 
  name="Gospel Akuetiemhe" 
  workTitle="Managing Director" 
  image="/image/picpic.jpg"  
  details="Gospel Akuetiemhe is the Managing Director of G&V Support Services limited, where he provides strategic leadership and drives the company’s vision for growth and operational excellence. With extensive industry experience and a results-oriented mindset, he ensures that GVSS consistently delivers exceptional value to its clients while fostering innovation, efficiency, and sustainable long-term success."
/>

<CompanyInfo 
  name="Abiodun Akuetiemhe" 
  workTitle="Director, Administration & Human Resources" 
  image="/image/picpic.jpg"
  details="Abiodun Akuetiemhe serves as the Director of Administration and Human Resources. She is dedicated to building a strong workforce and cultivating a positive organizational culture. With expertise in recruitment, employee relations, and staff development, she ensures that GVSS attracts, develops, and retains top talent to support the company’s mission and long-term growth."
/>

<CompanyInfo 
  name="Wisdom Ugwu" 
  workTitle="Accountant" 
  image="/image/wisdompic.jpg"
  details="Wisdom Ugwu is the Accountant at G&V Support Services, bringing strong expertise in financial reporting, auditing, and tax compliance. With keen attention to detail and a commitment to financial accuracy, he oversees the company’s financial operations, ensuring transparency, efficiency, and compliance with industry regulations."
/>

<CompanyInfo 
  name="Oluwakemi Adesanwo" 
  workTitle="Facility Supervisor" 
  image="/image/kemipic.jpg"  
  details="Oluwakemi Adesanwo is the Facility Supervisor at G&V Support Services, responsible for overseeing daily facility operations and ensuring a safe, efficient, and well-organized environment. With a strong focus on operational excellence and attention to detail, she plays a key role in maintaining smooth facility management processes that support productivity and organizational effectiveness."
/>
            </div>
         </div>
  )
}

export default Company;


interface imageCarouselProps {
  title: string;
  subtitle?: string;
  image: string;
  overlayOpacity?: string; 
  height?: string; 
}


export function ImageCarousel({
  title,
  subtitle,
  image,
  overlayOpacity = 'bg-black/40',
  height = 'h-[30vh]',
}: imageCarouselProps) {
  return (
     <section className={`relative ${height} w-full flex items-center justify-center overflow-hidden`}>
          {/* Background Image */}
          <Image src={image} alt={title} fill priority className="object-cover object-center" />
    
          {/* Overlay */}
          <div className={`absolute inset-0 ${overlayOpacity}`} />
    
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
               duration: 0.9,
               delay: 0.6,
                ease: [0, 0.71, 0.2, 1.01],
           }} className="relative z-10 text-center text-white px-4">
            <h1 className="text-[30px]  md:text-7xl text-[#fd4c07] font-bold mb-4">{title}</h1>
            {subtitle && <motion.p
            initial={{ opacity: 0, scale: 0.5, translateX: 0 }}
            animate={{ opacity: 1, scale: 1, translateX: 10 }}
            transition={{
               duration: 0.9,
               delay: 0.6,
                ease: [0, 0.71, 0.2, 1.01],
           }}
            
            
            className="text-[10px] md:text-sm text-shadow-2xs  font-extrabold">{subtitle}</motion.p>
            }
          </motion.div>
        </section>
  )
  }

  interface companyInfoProps {
    name: string;
    workTitle: string;
    image: string;
    details: string; 
    // height: 'h-[30vh]'; 
  }

  export function CompanyInfo({ name, workTitle, image, details }: companyInfoProps) {
  return (
    // <div className="  ">
      <div className="md:m-auto p-3 md:w-5/6 md:p-10 text-black   flex md:flex  md:flex-row flex-col md:items-start  md:space-x-6">
        
        {/* Image container */}
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
               duration: 0.9,
               delay: 0.6,
                ease: [0, 0.71, 0.2, 1.01],
           }}  
        
        className="relative  h-100 md:w-80 md:h-90  shadow-2xl  rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center"
            placeholder="empty"
          />
        </motion.div>

        {/* Text content */}
        <motion.div
            initial={{ opacity: 1,  scale: 0, translateX: -100 }}
            animate={{ opacity: 1,scale: 1, translateX:0,  }}
            transition={{
               duration: 0.8,
               delay: 0.8,
                ease: [0, 0.71, 0.2, 1.01],
           }}
           className="md:flex-1  md:w-1/2 p-3 ">
          <h1 className="md:text-lg font-bold text-[#000] py-4">{name}</h1>
          <h2 className="text-[#d17000] font-extrabold">{workTitle}</h2>
          <p className="mt-2 md:w-1/2 text-gray-700  ">{details}</p>
        </motion.div>
      </div>
    // <div>
  );
}