"use client";
import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import NewProductRequest from "~/components/manage-requests/NewProductRequest";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const Products = () => {
  return (
    <ContainerDefault>
      <HeaderDashboard
        title="New Product Request"
        description="Ecommerce new product request"
      />
      <section className="ps-items-listing">
        <NewProductRequest />
      </section>
    </ContainerDefault>
  );
};

export default Products;
