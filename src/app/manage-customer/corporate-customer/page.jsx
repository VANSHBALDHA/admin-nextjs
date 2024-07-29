
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import CorporateUser from '~/components/manage-customer/corporate-user/CorporateUser';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';

const ManageCorporateCustomers = () => {
    return (
        <ContainerDefault title="Manage Corporate Customers">
            <HeaderDashboard
                title="Manage Corporate Customers"
                description="Ecommerce customers"
            />
            <section className="ps-items-listing">
                <CorporateUser />
            </section>
        </ContainerDefault>
    );
};
export default ManageCorporateCustomers;
