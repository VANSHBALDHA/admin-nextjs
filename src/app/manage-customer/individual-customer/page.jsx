'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import IndividualUsers from '~/components/manage-customer/inidividual-user/IndividualUser';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const ManageCustomers = () => {
    return (
        <ContainerDefault title="Manage Individual Customers">
            <HeaderDashboard
                title="Manage Individual Customers"
                description="Ecommerce users data"
            />
            <section className="ps-items-listing">
                <IndividualUsers />
            </section>
        </ContainerDefault>
    );
};
export default ManageCustomers;
