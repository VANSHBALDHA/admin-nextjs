'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import ManageProduct from '~/components/manage-products/ManageProduct';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const ManageProducts = () => {

    return (
        <ContainerDefault title="Manage Products">
            <HeaderDashboard
                title="Manage Products"
                description="Ecommerce Product Listing "
            />
            <section className="ps-items-listing">
                <ManageProduct />
            </section>
        </ContainerDefault>
    );
};
export default ManageProducts
