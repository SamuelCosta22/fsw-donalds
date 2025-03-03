import { OrderStatus } from "@prisma/client";

export const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em preparo";
  if (status === "PENDING") return "Pendente";
  if (status === "PAYMENT_CONFIRMED") return "Pagamento Confirmado";
  if (status === "PAYMENT_FAILED") return "Falha no Pagamento";
  if (status === "CONFIRMED") return "Confirmado";
  if (status === "DELIVERED") return "Em rota";
  return "";
};

export const getStatusColors = (status: OrderStatus) => {
  if (status === "FINISHED") return "bg-green-500 text-white";
  if (status === "IN_PREPARATION") return "bg-yellow-500 text-white";
  if (status === "PENDING") return "bg-gray-200 text-gray-500";
  if (status === "PAYMENT_CONFIRMED") return "bg-blue-500 text-white";
  if (status === "PAYMENT_FAILED") return "bg-red-500 text-white";
  if (status === "CONFIRMED") return "bg-gray-200 text-gray-500";
  if (status === "DELIVERED") return "bg-gray-200 text-gray-500";
  return "";
};
