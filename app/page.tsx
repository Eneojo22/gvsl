// import Image from "next/image";
import Landingpage from "./component/landingpage";
export default async function Home() {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <Landingpage/>;
}