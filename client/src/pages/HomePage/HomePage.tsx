import React from 'react'

import { BreadcrumbsNav } from '@HomeComponents/BreadcrumbsNav/BreadcrumbsNav'
import { Table } from '@HomeComponents/Table/Table'

import './homePage.scss'

export const HomePage = () => {
  return (
      <main className="main container">
          <BreadcrumbsNav/>
          <Table />
      </main>
  )
}
