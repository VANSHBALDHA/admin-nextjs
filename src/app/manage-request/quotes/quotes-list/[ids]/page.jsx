import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import QuoteRequestList from "~/components/manage-requests/QuoteRequestList";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const Quotes = () => {
  return (
    <ContainerDefault title="Quotes Request List">
      <HeaderDashboard
        title="Quotes Request List"
        description="Ecommerce quote request List"
      />
      <section className="ps-items-listing">
        <QuoteRequestList />
      </section>
    </ContainerDefault>
  );
};

export default Quotes;

export function generateStaticParams() {
  return [{ ids: "QUOTE-001" }];
}
