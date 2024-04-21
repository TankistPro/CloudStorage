import React, {useContext} from 'react'

import './tableRow.scss'

import OptionsDropList from '../OptionDropList/OptionsDropList';

import folderImg from '@images/folder.svg';
import fileImg from '@images/file.svg';

import {displayTime} from "@helpers/time.helper";
import {parseSize} from "@helpers/file.helper";
import {FileType} from "@enums/file.enum.js";
import {useFileSystem} from "@hooks/useFileSystem";

export const TableRow = ({ file, index }) => {
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

    const fileSize = React.useCallback((file) => {
        return file.type === FileType.File ? parseSize(file.stat.size) : ''
    }, [])

    const fileParseTime = React.useCallback((time) => {
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
