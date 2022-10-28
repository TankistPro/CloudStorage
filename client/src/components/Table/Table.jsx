import React from 'react'

import './table.scss'

import folderImg from '../../images/folder.svg';
import fileImg from '../../images/file.svg';
import { TableRow } from './TableRow/TableRow';

export const Table = () => {
  return (
    <div className='table'>
        <div className="table__controllers">

        </div>
        <div className="table__main">
            <div className="table__header">
                <div className="table__row">
                    <div className='table__column'>ID</div>
                    <div className='table__column'>Название</div>
                    <div className='table__column'>Размер</div>
                    <div className='table__column'>Дата создания</div>
                    <div className='table__column'>Дата изменения</div>
                </div>
            </div>
            <div className="table__body">
                {[1, 2, 3, 4, 5, 6].map(index => (
                    <TableRow fileType={ index % 2 === 0 ? "file" : "folder"} />
                ))
                }
            </div>
        </div>
    </div>
  )
}
