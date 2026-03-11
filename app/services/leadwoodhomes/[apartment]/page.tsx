import Settlings from "./dynamicpage";

export default async function Page({
  params,
}: {
  params: Promise<{ apartment: string }>
}) {
  const { apartment } = await params;

  return (
    <div className="h-dvh flex items-center justify-center text-4xl font-bold text-black">
      <Settlings apartmentId={apartment} />
    </div>
  );
}



