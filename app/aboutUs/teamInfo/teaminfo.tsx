
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

            <div className='w-full text-center p-6 md:text-5xl text-3xl font-bold'>Meet Our team</div>
            
            <div>
             <CompanyInfo name='Godwin Ezeani' workTitle='Managing Director' image='/image/picpic.jpg'  details='With over 15 years of experience in the relocation industry, Godwin has a deep understanding of the challenges and opportunities 
            that come with moving to a new country. He is passionate about helping clients navigate the complexities of international relocation and is committed to providing exceptional service and support throughout the entire process.'
            />
          
            <CompanyInfo name='Godwin Ezeani' workTitle='Human Resources' image='/image/picpic.jpg' details='With over 15 years of experience in the relocation industry, Godwin has a deep understanding of the challenges and opportunities 
            that come with moving to a new country. He is passionate about helping clients navigate the complexities of international relocation and is committed to providing exceptional service and support throughout the entire process.'
            /> 
            <CompanyInfo name='Abiodun Akutetiemhe ' workTitle='Hum' image='/image/picpic.jpg' details='With over 15 years of experience in the relocation industry, Godwin has a deep understanding of the challenges and opportunities 
            that come with moving to a new country. He is passionate about helping clients navigate the complexities of international relocation and is committed to providing exceptional service and support throughout the entire process.'
            />  
            <CompanyInfo name='Abiodun Akutetiemhe ' workTitle='Hum' image='/image/picpic.jpg'  details='With over 15 years of experience in the relocation industry, Godwin has a deep understanding of the challenges and opportunities 
            that come with moving to a new country. He is passionate about helping clients navigate the complexities of international relocation and is committed to providing exceptional service and support throughout the entire process.'
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
        
        className="relative  h-65 md:w-80 md:h-90 border-2 shadow-2xl  rounded-lg overflow-hidden">
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
          <h1 className="md:text-2xl font-bold text-[#000] py-4">{name}</h1>
          <h2 className="text-[#d17000] font-extrabold">{workTitle}</h2>
          <p className="mt-2 md:w-1/2 text-gray-700  ">{details}</p>
        </motion.div>
      </div>
    // <div>
  );
}