import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import Invoice from "~/components/manage-inventory/sales/invoice/Invoice";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import tableData from "~/data/invoiceData";

const Invoices = () => {
  return (
    <ContainerDefault title="Invoice">
      <HeaderDashboard title="Invoice" description="Ecommerce invoice" />
      <section className="ps-items-listing">
        <Invoice />
      </section>
    </ContainerDefault>
  );
};
export default Invoices;

// export function generateStaticParams() {
//   try {
//     if (!tableData || !Array.isArray(tableData)) {
//       throw new Error("Invalid features data");
//     }

//     return tableData.map((feature) => ({
//       id: feature.id.toString(),
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

export function generateStaticParams() {
  return [
    { id: "ORD001" },
    { id: "ORD002" },
    { id: "ORD003" },
    { id: "ORD004" },
    { id: "ORD005" },
  ];
}
