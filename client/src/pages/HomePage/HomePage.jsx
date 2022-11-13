import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import { BreadcrumbsNav } from '../../components/BreadcrumbsNav/BreadcrumbsNav'
import { Header } from '../../components/Header/Header'
import { Table } from '../../components/Table/Table'

import './homePage.scss'

import {fetchCurrentFolder} from "../../store/actions/fileSystem.action";

export const HomePage = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (baseWorkspacePath) {
            dispatch(fetchCurrentFolder(baseWorkspacePath))
        }
    }, [baseWorkspacePath])

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
