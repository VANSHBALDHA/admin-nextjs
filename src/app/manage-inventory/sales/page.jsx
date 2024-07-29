'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import SalesReport from '~/components/manage-inventory/sales/SalesReport';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const Sales = () => {
    return (
        <ContainerDefault title="Sales">
            <HeaderDashboard
                title="Sales"
                description="Ecommerce sales"
            />
            <section className="ps-items-listing">
                <SalesReport />

            </section>
        </ContainerDefault>
    );
};
export default Sales;
