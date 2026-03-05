// import { properties } from "@/app/services/properties/apartmentData";
import properties from "../apartmentData";
import Settlings from "./dynamicpage";
export default async function Page({
  params,
}: {
  params: Promise<{ apartment: string }>
}) {
  const { apartment } = await params
  return <div className="h-dvh text-black flex justify-center items-center text-4xl font-bold">
    <Settlings apartmentId={(await params).apartment} />
</div>
}



