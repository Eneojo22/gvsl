import type { Metadata } from "next";
import { Footer } from "./component/footer";
import { Poppins,Montserrat } from "next/font/google";
import "./globals.css";

// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navbar2";
const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
});
// Import Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // You can choose the weights you need
  variable: "--font-poppins", // This makes it accessible as a CSS variable
  display: "swap",
});


export const metadata: Metadata = {
  title: " G & V support services Limited",
  description: "travel with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <html lang="en">
      <body className={`${poppins.variable}  antialiased`}>
      <Navbar/>
      {/* <div className="mt-16"> */}
        {children} 
      {/* </div> */}
       
        <Footer/>
      </body>
     
    </html>
  );
}
