import React from 'react'

import { Breadcrumbs, Link, Typography } from '@mui/material'
import {useSelector} from "react-redux";

export const BreadcrumbsNav = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);
    const pathStack = useSelector(state => state.fileSystem.pathStack);

    const renderItem = (fileName, index) => {
        const name = baseWorkspacePath === fileName ? "Home" : fileName

        if (index + 1 === pathStack.length) {
            return <Typography key={index} color="text.primary">{ name }</Typography>
        }

        return <Link underline="hover" key={index} color="inherit" href="/">{ name }</Link>
    }

  return (
    <div className='breadcrumbs'>
        <Breadcrumbs aria-label="breadcrumb">
            {pathStack.map((fileName, index) => (
                renderItem(fileName, index)
            ))}
        </Breadcrumbs>
    </div>
  )
}
