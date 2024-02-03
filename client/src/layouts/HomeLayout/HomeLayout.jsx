import React from 'react';
import {Header} from "../../components/Header/Header";
import {DockViewer} from "../../components/DockViewer/DockViewer";

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
