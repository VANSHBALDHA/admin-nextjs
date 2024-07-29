'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import ManageSubSubCategories from '~/components/master-management/manage-sub-sub-categories/ManageSubSubCategories';

const ManageSubSubCategory = () => {
    return (
        <ContainerDefault title="Manage all sub - sub categories">
            <HeaderDashboard
                title="Manage Sub-Sub Categories"
                description="Ecommerce manage sub - sub categories"
            />
            <section className="ps-items-listing">
                <ManageSubSubCategories />
            </section>
        </ContainerDefault>
    );
};
export default ManageSubSubCategory;
