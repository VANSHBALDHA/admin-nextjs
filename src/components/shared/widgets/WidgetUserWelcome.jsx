import Link from 'next/link';
import React from 'react';

const WidgetUserWelcome = () => {
    return (
        <div className="ps-block--user-wellcome">
            <div className="ps-block__left">
                <img src="/img/user/admin.jpg" alt="" />
            </div>
            <div className="ps-block__right">
                <p>
                    Hello,<Link href="/">Ecommerce</Link>
                </p>
            </div>
            
        </div>
    );
};

export default WidgetUserWelcome;
