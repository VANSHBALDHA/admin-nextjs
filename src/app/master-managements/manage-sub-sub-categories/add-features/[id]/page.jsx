import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import Features from "~/components/master-management/manage-sub-sub-categories/features/Features";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import combinedData from "~/data/subCategoryData";

const ManageSubSubCategory = () => {
  return (
    <ContainerDefault title="Add Features">
      <HeaderDashboard
        title="Add Features"
        description="Ecommerce features listing"
      />
      <section className="ps-items-listing">
        <Features />
      </section>
    </ContainerDefault>
  );
};
export default ManageSubSubCategory;

export function generateStaticParams() {
  try {
    if (!combinedData || !Array.isArray(combinedData)) {
      throw new Error("Invalid features data");
    }

    return combinedData.map((feature) => ({
      id: feature.subCategoryNameId,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
