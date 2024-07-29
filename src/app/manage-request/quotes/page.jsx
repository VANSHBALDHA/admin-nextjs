
import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import QuoteRequest from "~/components/manage-requests/QuoteRequest";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const Quotes = () => {
    return (
        <ContainerDefault>
            <HeaderDashboard title="Quotes Request" description="Ecommerce quote request" />
            <section className="ps-items-listing">
                <QuoteRequest />
            </section>
        </ContainerDefault>
    );
};

export default Quotes;
