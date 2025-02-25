import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/header";

interface RestaurantMenuPage {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethod = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPage) => {
  const { slug } = await params;

  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({
    where: { slug: slug },
  });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
