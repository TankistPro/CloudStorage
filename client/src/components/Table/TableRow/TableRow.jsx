import React from 'react'
import PropTypes from "prop-types";

import './tableRow.scss'

import folderImg from '../../../images/folder.svg';
import fileImg from '../../../images/file.svg';
import moreOption from '../../../images/more.svg';

import {displayTime} from "../../../helpers/time.helper";
import {parseSize} from "../../../helpers/file.helper";
import {FileType} from "../../../enums/file.enum";
import {useFileSystem} from "../../../hooks/useFileSystem";

export const TableRow = ({ file }) => {

    const { openFolder } = useFileSystem()

    const fileImage = React.useMemo(() => {
        return file.type === FileType.File ? fileImg : folderImg
    }, [file])

    const openHandler = async () => {
        if (file.type === FileType.Folder) {
            await openFolder(file.name)
        } else if (file.type === FileType.File) {}
    }

  return (
    <div className="table__row" onClick={openHandler}>
        <div className='table__column'>-</div>
        <div className='table__column'>
            <img src={ fileImage } alt="folder" />
            { file.name }
        </div>
        <div className='table__column'>{ file.type === FileType.File ? parseSize(file.stat.size) : '' }</div>
        <div className='table__column'>{ displayTime(file.stat.ctime) }</div>
        <div className='table__column'>{ displayTime(file.stat.birthtime) }</div>
        <div className='table__column options'>
            <img className='more-option' src={ moreOption } alt="more"/>
        </div>
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
