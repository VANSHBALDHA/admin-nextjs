import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import InvoiceDetail from "~/components/manage-inventory/sales/invoice/invoiceDetail/InvoiceDetail";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const InvoicesDetails = () => {
  return (
    <ContainerDefault title="Invoice-details">
      <HeaderDashboard
        title="Invoice-details"
        description="Ecommerce invoice details"
      />
      <section className="ps-items-listing">
        <InvoiceDetail />
      </section>
    </ContainerDefault>
  );
};
export default InvoicesDetails;

export function generateStaticParams() {
  return [
    { id: "500884010", pid: "500884010" },
    { id: "593347935", pid: "593347935" },
  ];
}

// export function generateStaticParams() {
//   return [{ pid: "500884010" }, { pid: "593347935" }];
// }
