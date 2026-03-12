import { redirect } from "next/navigation";

type OrderSuccessRedirectPageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function Page({ searchParams }: OrderSuccessRedirectPageProps) {
  const { orderId } = await searchParams;

  if (orderId) {
    redirect(`/services/leadwoodfurniture/leadwoods-funitures/order/order-success?orderId=${orderId}`);
  }

  redirect("/services/leadwoodfurniture/leadwoods-funitures/order/order-success");
}
