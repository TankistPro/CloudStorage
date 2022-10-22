import React from 'react'

import { Breadcrumbs, Link, Typography } from '@mui/material'

export const BreadcrumbsNav = () => {
  return (
    <div className='breadcrumbs'>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href="#"
            >
                Base
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
    </div>
  )
}
