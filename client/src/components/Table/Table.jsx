import React from 'react'

import './table.scss'

import { TableRow } from './TableRow/TableRow';
import {useSelector} from "react-redux";

export const Table = () => {
    const files = useSelector(state => state.fileSystem.currentFolder);

  return (
    <div className='table'>
        <div className="table__controllers"></div>
        <div className="table__main">
            <div className="table__header">
                <div className="table__row">
                    <div className='table__column'>ID</div>
                    <div className='table__column'>Название</div>
                    <div className='table__column'>Размер</div>
                    <div className='table__column'>Дата изменения</div>
                    <div className='table__column'>Дата создания</div>
                </div>
            </div>
            <div className="table__body">
                {files.length && files.map((file, index) => (
                    <TableRow file={file} key={index} />
                ))}
            </div>
        </div>
    </div>
  )
}
