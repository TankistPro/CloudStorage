import React from 'react'
import {useSelector} from "react-redux";

import { BreadcrumbsNav } from '../../components/BreadcrumbsNav/BreadcrumbsNav'
import { Header } from '../../components/Header/Header'
import { Table } from '../../components/Table/Table'

import './homePage.scss'

import {useLocation} from "react-router-dom";
import {useFileSystem} from "../../hooks/useFileSystem";

export const HomePage = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const location = useLocation();

    const { fetchFolderHandler } = useFileSystem();

    React.useEffect(() => {
        if (baseWorkspacePath) {
            fetchFolderHandler();
        }
    }, [location.search, baseWorkspacePath])

  return (
    <div className='page home-page'>
      <Header />
      <main className="main container">
        <BreadcrumbsNav />
        <Table />
      </main>
    </div>
  )
}
