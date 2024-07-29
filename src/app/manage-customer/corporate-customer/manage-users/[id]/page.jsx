import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import ManageUser from "~/components/manage-customer/corporate-user/manage-user/ManageUser";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const ManageUsers = () => {
  return (
    <ContainerDefault title="Manage User Role">
      <HeaderDashboard
        title="Manage User Role"
        description="Ecommerce Manage User Role"
      />
      <section className="ps-items-listing">
        <ManageUser />
      </section>
    </ContainerDefault>
  );
};
export default ManageUsers;

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}
