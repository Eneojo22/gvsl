import React from 'react'
import { Hero } from '../airportmeetandgreet/iairportmeetandgreet'
// import { CheckCircle } from "lucide-react";
import { BiCheckbox } from 'react-icons/bi';
const Departure = () => {
  return (
<>

    <div className=' w-full  text-black mt-40 '>
        <Hero
            title=" See you Next Time"
            // subtitle="Seamless Airport Meet & Greet"
            image="/image/meetgreet.jpg"
            overlayOpacity="bg-black/50"
            height="h-[30vh]"
              />
            </div>
   <div className="w-full p-10 text-black ">
                
            {/* <p className='text-[#333333]  border-2  '> */}
                  
                <p className='text-4xl font-bold m-3'> Departure Services</p>

            <p className=' w-200 p-2'>At G&V Support Services Limited, we understand that the end of an expatriate assignment requires as much care and attention as its beginning. Our comprehensive Departure Services ensure your assignee can stay focused on their role until their final day, while we handle the complexities of their departure.

                    Our dedicated Destination Consultant will create a tailored departure timeline, managing every detail with precision. From lease termination to securing deposit refunds and addressing any property damage claims, we’ve got it covered. We coordinate utility, phone, and internet disconnections, ensuring timely notice to landlords and seamless transitions.

                    G&V Departure Services Include:</p>

            {/* </p> */}
                
           <Items  title='End-of-assignment lease termination'></Items>
           <Items  title='Formal notice to landlords'></Items>
           <Items  title='Deposit refund facilitation'></Items>
           <Items  title='Coordination of property repairs and third-party services'></Items>
           <Items  title='Assistance with bank account transfers or closures'></Items>
           <Items  title='Arrangement of professional cleaning services'></Items>
           <Items  title='Inventory check-out management'></Items>

              </div>
              
        </>
  )
}

export default Departure


interface ItemsProps {
  title: string;
  
}
export function Items({  title}: ItemsProps){

    return(

    <>
     <ul className=" text-black  pt-6  ">
                <li className="flex items-start">
        <BiCheckbox className="w-5 h-5 text-amber-700 mr-2" />
        {title}
      </li>
        </ul>
    
    
    </>
    )
}