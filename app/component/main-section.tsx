
"use client"
import { motion } from 'framer-motion';



interface AboutSectionProps {
  // title: string;
  Subtitle: string;
  end_subtle: string;
  body: string;
  buttonTitle: string;
  backgroundImage: string;
}

export const AboutSection = ({
  // title,
  Subtitle,
  end_subtle,
  body,
  buttonTitle,
  backgroundImage,
}: AboutSectionProps) => {
  return (
    <section className=" h-dvh flex flex-col md:flex-row">
      {/* Left Text Side */}
      <div 
    //   initial={{ opacity: 0, x: 100 }}
    // whileInView={{ opacity: 1, x: 0 }}
    // transition={{ duration: 0.8 }}
    // viewport={{ once: true }}
    
      
      className="flex flex-col justify-center items-start p-10 w-full md:w-1/2 bg-white">
        {/* <h2 className="text-3xl font-semibold text-neutral-900 mb-2">{title}</h2> */}
        <p className="text-5xl font-thin text-amber-800 mb-2">{Subtitle}</p>
        <p className="text-2xl font-bold text-amber-950 mb-4">{end_subtle}</p>
        <p className="text-sm font-bold text-slate-700 mb-8">{body}</p>
        <button className="bg-black font-bold text-white px-8 py-4 text-lg rounded-full hover:bg-gray-800 transition duration-300">
          {buttonTitle}
        </button>
      </div>

      {/* Right Image Side */}
      <div
        className=" md:w-1/2  md:h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`}}
      />
      
    </section>
  );
};
