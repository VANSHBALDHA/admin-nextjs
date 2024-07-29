'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import ReservedInventory from '~/components/manage-inventory/reserved/ReservedInventory';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const Reserved = () => {
    return (
        <ContainerDefault title="Reserved Inventory">
            <HeaderDashboard
                title="Reserved Inventory"
                description="Ecommerce reserved inventory"
            />
            <section className="ps-items-listing">
                <ReservedInventory />
            </section>
        </ContainerDefault>
    );
};
export default Reserved;
