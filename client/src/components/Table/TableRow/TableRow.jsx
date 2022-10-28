import React from 'react'
import PropTypes from "prop-types";

import './tableRow.scss'

import folderImg from '../../../images/folder.svg';
import fileImg from '../../../images/file.svg';

export const TableRow = (props) => {
  return (
    <div className="table__row">
        <div className='table__column'>1</div>
        <div className='table__column'>
            <img src={ props.fileType === 'file' ? fileImg : folderImg} alt="folder" />
            { props.fileName }
        </div>
        <div className='table__column'>{ props.size }гб</div>
        <div className='table__column'>12.08.2022</div>
        <div className='table__column'>15.11.2022</div>
    </div>
  )
}

TableRow.propType = {
    id: PropTypes.number,
    fileType: PropTypes.oneOf(['file', 'folder']),
    fileName: PropTypes.string,
    size: PropTypes.number,
    dateCreated: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    dateModify: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}

TableRow.defaultProps = {
    fileType: 'folder',
    size: 122,
    fileName: 'Test'
}
