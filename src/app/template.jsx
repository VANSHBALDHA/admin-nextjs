'use client';
import React, { useEffect } from 'react';
import Providers from '~/redux/provider';
import '~/public/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/fonts/font-awesome/css/font-awesome.css';
import 'public/css/bootstrap.min.css';
import '~/styles/style.scss';

export const metadata = {
    title: 'Ecommerce Admin',
    description: '',
};

export default function Template({ children }) {
    useEffect(() => {
        const handleLoad = () => {
            const nextElement = document.getElementById('__next');
            if (nextElement) {
                nextElement.classList.add('loaded');
            }
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    return <Providers>{children}</Providers>;
}
