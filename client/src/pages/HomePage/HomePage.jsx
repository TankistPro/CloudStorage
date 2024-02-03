import React from 'react'

import { BreadcrumbsNav } from '../../components/BreadcrumbsNav/BreadcrumbsNav'
import { Table } from '../../components/Table/Table'

import './homePage.scss'
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useFileSystem} from "../../hooks/useFileSystem";

export const HomePage = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const location = useLocation();

    const { fetchFolders } = useFileSystem();

    React.useEffect(() => {
        if (baseWorkspacePath) {
            fetchFolders();
        }
    }, [location.search, baseWorkspacePath])

  return (
      <main className="main container">
          <BreadcrumbsNav/>
          <Table/>
      </main>
  )
}
