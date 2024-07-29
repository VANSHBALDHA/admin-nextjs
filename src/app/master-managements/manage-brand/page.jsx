'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import ManageBrands from '~/components/master-management/manage-brand/ManageBrands';

const ManageBrand = () => {
    return (
        <ContainerDefault title="Manage brands">
            <HeaderDashboard
                title="Manage Brands"
                description="Ecommerce manage brands"
            />
            <section className="ps-items-listing">
                <ManageBrands />
            </section>
        </ContainerDefault>
    );
};
export default ManageBrand;
