import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import AddFeatures from "~/components/manage-products/addFeatures/AddFeatures";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import productsData from "~/data/productsData";

const AddNewFeatures = () => {
  //   console.log(slug, "slug");

  return (
    <ContainerDefault title="Add Specification">
      <HeaderDashboard
        title="Add Specification"
        description="Ecommerce products features listing and add Specification"
      />
      <section className="ps-items-listing">
        <AddFeatures />
      </section>
    </ContainerDefault>
  );
};
export default AddNewFeatures;

export function generateStaticParams() {
  return [
    { id: "wireless-headphones" },
    { id: "high-speed-blender" },
    { id: "4-person-camping-tent" },
    { id: "hydrating-face-cream" },
    { id: "all-weather-car-cover" },
    { id: "running-sneakers" },
    { id: "robotics-stem-kit" },
    { id: "precision-screwdriver-set" },
    { id: "hardcover-notebook" },
    { id: "interactive-cat-toy" },
  ];
}
