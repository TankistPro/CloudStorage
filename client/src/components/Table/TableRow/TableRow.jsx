import React from 'react'
import PropTypes from "prop-types";

import './tableRow.scss'

import folderImg from '../../../images/folder.svg';
import fileImg from '../../../images/file.svg';
import {displayTime} from "../../../helpers/time.helper";
import {parseSize} from "../../../helpers/file.helper";

export const TableRow = ({ file }) => {
  return (
    <div className="table__row">
        <div className='table__column'>-</div>
        <div className='table__column'>
            <img src={ file.type === 'File' ? fileImg : folderImg} alt="folder" />
            { file.name }
        </div>
        <div className='table__column'>{ file.type === 'File' ? parseSize(file.stat.size) : '' }</div>
        <div className='table__column'>{ displayTime(file.stat.ctime) }</div>
        <div className='table__column'>{ displayTime(file.stat.birthtime) }</div>
    </div>
  )
}

TableRow.propType = {
    file: {
        name: PropTypes.string,
        type: PropTypes.oneOf(['File', 'Folder']),
        extension: PropTypes.string,
        stat: {}
    }
}
