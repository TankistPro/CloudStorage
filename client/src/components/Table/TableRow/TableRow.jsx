import React from 'react'

import './tableRow.scss'

import OptionsDropList from '../OptionDropList/OptionsDropList';

import folderImg from '../../../images/folder.svg';
import fileImg from '../../../images/file.svg';

import {displayTime} from "../../../helpers/time.helper";
import {parseSize} from "../../../helpers/file.helper";
import {FileType} from "../../../enums/file.enum";
import {useFileSystem} from "../../../hooks/useFileSystem";

export const TableRow = ({ file, setCurrentDropListIndex, currentDropListIndex }) => {
    const { openFolder } = useFileSystem()
    
    const fileImage = React.useMemo(() => {
        return file.type === FileType.File ? fileImg : folderImg
    }, [file])

    const openHandler = async () => {
        if (file.type === FileType.Folder) {
            await openFolder(file.name)
        } else if (file.type === FileType.File) {}
    }
    
    const toggleOption = (e) => {
        e.stopPropagation();
        const index = file.stat.birthtimeMs;

        if (index === currentDropListIndex) setCurrentDropListIndex(null);
        else setCurrentDropListIndex(file.stat.birthtimeMs);
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
            <OptionsDropList toggleOption={toggleOption} isOpenDropListOption={file.stat.birthtimeMs === currentDropListIndex}  />
        </div>
    </div>
  )
}
