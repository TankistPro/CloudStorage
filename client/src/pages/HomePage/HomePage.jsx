import React from 'react'
import { BreadcrumbsNav } from '../../components/BreadcrumbsNav/BreadcrumbsNav'
import { Header } from '../../components/Header/Header'
import { Table } from '../../components/Table/Table'

import './homePage.scss'

export const HomePage = () => {
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
