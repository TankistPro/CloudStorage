import React, {NamedExoticComponent} from 'react';
import {Header} from "@SharedComponents/Header/Header";

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout : NamedExoticComponent<HomeLayoutProps> = React.memo(({ children }) => {
    return (
        <div className='page home-page'>
            <Header/>
            { children }
        </div>
    );
});

export default HomeLayout;
