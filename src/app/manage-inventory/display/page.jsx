'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import DisplayInventory from '~/components/manage-inventory/display/DisplayInventory';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const Display = () => {
    return (
        <ContainerDefault title="Display Inventory">
            <HeaderDashboard
                title="Display Inventory"
                description="Ecommerce display inventory"
            />
            <section className="ps-items-listing">
                <DisplayInventory />
            </section>
        </ContainerDefault>
    );
};
export default Display;
