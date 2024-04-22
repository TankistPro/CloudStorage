import React, {FC} from 'react'

import './tableRow.scss'

import OptionsDropList from '../OptionDropList/OptionsDropList';

import folderImg from '@images/folder.svg';
import fileImg from '@images/file.svg';

import {displayTime} from "@helpers/time.helper.js";
import {parseSize} from "@helpers/file.helper.js";
import {FileType} from "@enums/file.enum.js";
import {useFileSystem} from "@hooks/useFileSystem.js";
import {BaseFile} from "../../../../domain/entities";

interface ITableRow {
    file: BaseFile,
    index: number
}

export const TableRow : FC<ITableRow> = ({ file, index }) => {
    const { openFolder, openFileInNewTab } = useFileSystem()

    const fileImage = React.useMemo(() => {
        return file.type === FileType.File ? fileImg : folderImg
    }, [])
    const openHandler = React.useCallback(async () => {
        if (file.type === FileType.Folder) {
            await openFolder(file.name);
        } else if (file.type === FileType.File) {
            openFileInNewTab(file.name);
        }
    }, [])

    const fileSize = React.useCallback((file: BaseFile) => {
        return file.type === FileType.File ? parseSize(file.stat.size) : ''
    }, [])

    const fileParseTime = React.useCallback((time: Date) => {
        return displayTime(time)
    }, [])

  return (
    <div className="table__row" onClick={openHandler}>
        <div className='table__column'>-</div>
        <div className='table__column'>
            <img src={ fileImage } loading={"lazy"} alt="folder" />
            { file.name }
        </div>
        <div className='table__column'>{ fileSize(file) }</div>
        <div className='table__column'>{ fileParseTime(file.stat.ctime) }</div>
        <div className='table__column'>{ fileParseTime(file.stat.birthtime) }</div>
        <div className='table__column options'>
            <OptionsDropList
                file={file}
                fileIndex={index}
            />
        </div>
    </div>
  )
}
