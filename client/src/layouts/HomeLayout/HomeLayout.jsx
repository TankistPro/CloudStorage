import React from 'react';
import {useSelector} from "react-redux";
import {Header} from "../../components/Header/Header";
import {DockViewer} from "../../components/DockViewer/DockViewer";

import Loader from "../../components/Loader/Loader";
import {useLocation} from "react-router-dom";
import {useFileSystem} from "../../hooks/useFileSystem";

const HomeLayout = ({ children }) => {
    const isLoadingUser = useSelector(state => state.user?.isLoading);
    const isLoadingFS = useSelector(state => state.fileSystem?.isLoading);

    const [isLoaded, setIsLoaded] = React.useState(false);

    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const location = useLocation();

    const { fetchFolders } = useFileSystem();

    React.useEffect(() => {
        if (baseWorkspacePath) {
            fetchFolders();
        }
    }, [location.search, baseWorkspacePath])

    React.useEffect(() => {
        if (!isLoadingUser && !isLoadingFS) {
            setIsLoaded(true);
        }
    }, [isLoadingUser, isLoadingFS])

    return (
        <>
            {isLoaded ?
                <div className='page home-page'>
                    <Header/>
                    <DockViewer/>
                    <main className="main container">
                        { children }
                    </main>
                </div>
                :
                <div className="main-loader">
                    <Loader loadingText={"Идет загрузка. Пожалуйста подождите"} />
                </div>
            }
        </>
    );
};

export default HomeLayout;
