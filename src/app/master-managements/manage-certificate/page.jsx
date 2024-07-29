'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import ManageCertificates from '~/components/master-management/manage-certificate/ManageCertificate';

const ManageCertificate = () => {
    return (
        <ContainerDefault title="Manage Certificate">
            <HeaderDashboard
                title="Manage Certificate"
                description="Ecommerce manage certificate"
            />
            <section className="ps-items-listing">
                <ManageCertificates />
            </section>
        </ContainerDefault>
    );
};
export default ManageCertificate;
