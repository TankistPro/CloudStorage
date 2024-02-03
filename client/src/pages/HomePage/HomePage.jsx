import React from 'react'

import { BreadcrumbsNav } from '../../components/BreadcrumbsNav/BreadcrumbsNav'
import { Table } from '../../components/Table/Table'

import './homePage.scss'

export const HomePage = () => {

  return (
      <>
          <BreadcrumbsNav/>
          <Table/>
      </>
  )
}
