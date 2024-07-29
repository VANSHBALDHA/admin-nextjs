'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import Displayname from '~/components/master-management/displayName/Displayname';

const DisplayName = () => {
    return (
        <ContainerDefault title="Manage Display Name">
            <HeaderDashboard
                title="Display Name"
                description="Ecommerce Display name"
            />
            <section className="ps-items-listing">
                <Displayname />
            </section>
        </ContainerDefault>
    );
};
export default DisplayName;
