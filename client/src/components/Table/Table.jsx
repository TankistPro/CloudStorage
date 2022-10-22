import React from 'react'
import { Pagination } from '@mui/material'

import './table.scss'

import folderImg from '../../images/folder.svg';
import fileImg from '../../images/file.svg';

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
                <div className="table__row">
                    <div className='table__column'>1</div>
                    <div className='table__column'>
                        <img src={folderImg} alt="folder" />
                        Test.png
                    </div>
                    <div className='table__column'>12гб</div>
                    <div className='table__column'>12.08.2022</div>
                    <div className='table__column'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column'>1</div>
                    <div className='table__column'>
                        <img src={fileImg} alt="folder" />
                        Test.png
                    </div>
                    <div className='table__column'>12гб</div>
                    <div className='table__column'>12.08.2022</div>
                    <div className='table__column'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column'>1</div>
                    <div className='table__column'>
                        <img src={folderImg} alt="folder" />
                        Test.png
                    </div>
                    <div className='table__column'>11ГБ</div>
                    <div className='table__column'>12.08.2022</div>
                    <div className='table__column'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column'>1</div>
                    <div className='table__column'>
                        <img src={folderImg} alt="folder" />
                        Test.png
                    </div>
                    <div className='table__column'>12гб</div>
                    <div className='table__column'>12.08.2022</div>
                    <div className='table__column'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column'>1</div>
                    <div className='table__column'>
                        <img src={folderImg} alt="folder" />
                        Test.png
                    </div>
                    <div className='table__column'>12гб</div>
                    <div className='table__column'>12.08.2022</div>
                    <div className='table__column'>15.11.2022</div>
                </div>
                <div className="table__row">
                    <div className='table__column'>1</div>
                    <div className='table__column'>
                        <img src={fileImg} alt="folder" />
                        Test.png
                    </div>
                    <div className='table__column'>12гб</div>
                    <div className='table__column'>12.08.2022</div>
                    <div className='table__column'>15.11.2022</div>
                </div>
            </div>
        </div>
        {/* <div className="table__pagination">
            <Pagination count={10} variant="outlined" shape="rounded" />
        </div> */}
    </div>
  )
}
