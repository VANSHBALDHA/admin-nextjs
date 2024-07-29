import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import OrderList from "~/components/manage-inventory/sales/orders/OrderList";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import orders from "~/data/orderData";

const orderss = () => {
  return (
    <ContainerDefault title="Order List">
      <HeaderDashboard title="Order List" description="Ecommerce order list" />
      <section className="ps-items-listing">
        <OrderList />
      </section>
    </ContainerDefault>
  );
};
export default orderss;

// export function generateStaticParams() {
//   try {
//     if (!orders || !Array.isArray(orders)) {
//       throw new Error("Invalid features data");
//     }

//     return orders.map((feature) => ({
//       orderId: feature.id.toString(),
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

export function generateStaticParams() {
  return [
    { orderId: "ORD001" },
    { orderId: "ORD002" },
    { orderId: "ORD003" },
    { orderId: "ORD004" },
    { orderId: "ORD005" },
  ];
}
