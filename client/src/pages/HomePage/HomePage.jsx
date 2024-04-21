import React from 'react'
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import { BreadcrumbsNav } from '@components/HomeComponents/BreadcrumbsNav/BreadcrumbsNav'
import { Table } from '@components/HomeComponents/Table/Table'
import {useFileSystem} from "@hooks/useFileSystem";

import './homePage.scss'

export const HomePage = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const location = useLocation();

    const { fetchFolders } = useFileSystem();

    React.useEffect(() => {
        if (baseWorkspacePath) {
            fetchFolders().then();
        }
    }, [location.search, baseWorkspacePath])

  return (
      <main className="main container">
          <BreadcrumbsNav/>
          <Table />
      </main>
  )
}
