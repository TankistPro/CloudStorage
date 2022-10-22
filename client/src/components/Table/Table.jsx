import React from 'react'
import { Pagination } from '@mui/material'
import './table.scss'

export const Table = () => {
  return (
    <div className='table'>
        <div className="table__controllers">

        </div>
        <div className="table__main">
            <div className="table__header">
                <div className="table__row">
                    <div className='table__column table__column_center'>ID</div>
                    <div className='table__column table__column_center'>Название</div>
                    <div className='table__column table__column_center'>Размер</div>
                    <div className='table__column table__column_center'>Дата создания</div>
                    <div className='table__column table__column_center'>Дата изменения</div>
                </div>
            </div>
            <div className="table__body">
                <div className="table__row">
                    <div className='table__column table__column_center'>1</div>
                    <div className='table__column table__column_center'>Test.png</div>
                    <div className='table__column table__column_center'>12гб</div>
                    <div className='table__column table__column_center'>12.08.2022</div>
                    <div className='table__column table__column_center'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column table__column_center'>1</div>
                    <div className='table__column table__column_center'>Test.png</div>
                    <div className='table__column table__column_center'>12гб</div>
                    <div className='table__column table__column_center'>12.08.2022</div>
                    <div className='table__column table__column_center'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column table__column_center'>1</div>
                    <div className='table__column table__column_center'>Test.png</div>
                    <div className='table__column table__column_center'>12гб</div>
                    <div className='table__column table__column_center'>12.08.2022</div>
                    <div className='table__column table__column_center'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column table__column_center'>1</div>
                    <div className='table__column table__column_center'>Test.png</div>
                    <div className='table__column table__column_center'>12гб</div>
                    <div className='table__column table__column_center'>12.08.2022</div>
                    <div className='table__column table__column_center'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column table__column_center'>1</div>
                    <div className='table__column table__column_center'>Test.png</div>
                    <div className='table__column table__column_center'>12гб</div>
                    <div className='table__column table__column_center'>12.08.2022</div>
                    <div className='table__column table__column_center'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column table__column_center'>1</div>
                    <div className='table__column table__column_center'>Test.png</div>
                    <div className='table__column table__column_center'>12гб</div>
                    <div className='table__column table__column_center'>12.08.2022</div>
                    <div className='table__column table__column_center'>15.11.2022</div>
                </div>
            </div>
        </div>
        <div className="table__pagination">
            <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
    </div>
  )
}
