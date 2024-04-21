import React from 'react'
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

import { BreadcrumbsNav } from '@components/HomeComponents/BreadcrumbsNav/BreadcrumbsNav'
import { Table } from '@components/HomeComponents/Table/Table'
import {useFileSystem} from "@hooks/useFileSystem";

import './homePage.scss'

export const HomePage = () => {
  return (
      <main className="main container">
          <BreadcrumbsNav/>
          <Table />
      </main>
  )
}
