import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import CartListing from "~/components/manage-requests/CartListing";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const Cart = () => {
  return (
    <ContainerDefault>
      <HeaderDashboard
        title="Cart List"
        description="Ecommerce user cart list"
      />
      <section className="ps-items-listing">
        <CartListing />
      </section>
    </ContainerDefault>
  );
};

export default Cart;

export function generateStaticParams() {
  return [
    { id: "CART-001" },
    { id: "CART-002" },
    { id: "CART-101" },
    { id: "CART-102" },
  ];
}
