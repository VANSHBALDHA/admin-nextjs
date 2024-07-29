
import React from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import CartRequest from "~/components/manage-requests/CartRequest";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";

const Cart = () => {
    return (
        <ContainerDefault>
            <HeaderDashboard title="Cart Request" description="Ecommerce cart request" />
            <section className="ps-items-listing">
                <CartRequest />
            </section>
        </ContainerDefault>
    );
};

export default Cart;
