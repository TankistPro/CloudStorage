import React from 'react'

import { Breadcrumbs, Typography } from '@mui/material'
import {useSelector} from "react-redux";
import {useFileSystem} from "@hooks/useFileSystem";

import './breadcrumbsNav.scss';

export const BreadcrumbsNav = () => {
    const baseWorkspacePath = useSelector(state => state.user?.user?.baseWorkspacePath);

    const { parseFsPath, goToBackFolder } = useFileSystem();

    const pathStack = parseFsPath();

    const renderItem = (fileName, index) => {
        const name = baseWorkspacePath === fileName ? "Home" : fileName

        if (index + 1 === pathStack.length) {
            return <Typography key={index} color="text.primary">{ name }</Typography>
        }

        return <p onClick={() => goToBackFolder(fileName)} className='breadcrumbs__link' key={index} color="inherit">{ name }</p>
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
