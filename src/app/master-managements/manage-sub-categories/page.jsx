'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import ManageSubCategories from '~/components/master-management/manage-sub-categories/ManageSubCategories';

const ManageSubCategory = () => {
    return (
        <ContainerDefault title="Manage all sub categories">
            <HeaderDashboard
                title="Manage Sub Categories"
                description="Ecommerce manage sub categories"
            />
            <section className="ps-items-listing">
                <ManageSubCategories />
            </section>
        </ContainerDefault>
    );
};
export default ManageSubCategory;
