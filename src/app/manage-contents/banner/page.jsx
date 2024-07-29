"use client";
import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import Banners from "~/components/manage-contents/banners/Banners";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const BannerPage = () => {
  return (
    <ContainerDefault>
      <HeaderDashboard title="Banner" description="Martfury Category Listing" />
      <section className="ps-items-listing">
        <Banners />
      </section>
    </ContainerDefault>
  );
};

export default BannerPage;
