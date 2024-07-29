'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import ManageCategories from '~/components/master-management/manageCategories/ManageCategories';

const ManageCategory = () => {
    return (
        <ContainerDefault title="Manage all categories">
            <HeaderDashboard
                title="Manage Categories"
                description="Ecommerce manage categories"
            />
            <section className="ps-items-listing">
                <ManageCategories />
            </section>
        </ContainerDefault>
    );
};
export default ManageCategory;
