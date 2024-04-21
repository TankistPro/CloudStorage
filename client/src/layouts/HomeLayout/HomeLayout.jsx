import React from 'react';
import {Header} from "@SharedComponents/Header/Header";

const HomeLayout = React.memo(({ children }) => {
    return (
        <div className='page home-page'>
            <Header/>
            { children }
        </div>
    );
});

export default HomeLayout;
