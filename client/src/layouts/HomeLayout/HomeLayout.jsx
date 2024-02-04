import React from 'react';
import {Header} from "../../components/SharedComponents/Header/Header";
import {DockViewer} from "../../components/SharedComponents/DockViewer/DockViewer";

const HomeLayout = ({ children }) => {
    return (
        <div className='page home-page'>
            <Header/>
            <DockViewer/>
            { children }
        </div>
    );
};

export default HomeLayout;
