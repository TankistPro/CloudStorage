import React from 'react'

import './tableRow.scss'

import OptionsDropList from '../OptionDropList/OptionsDropList';

import folderImg from '@images/folder.svg';
import fileImg from '@images/file.svg';

import RenameFile from "../RenameFile/RenameFile";
import {displayTime} from "@helpers/time.helper";
import {parseSize} from "@helpers/file.helper";
import {FileType} from "@enums/file.enum.js";
import {useFileSystem} from "@hooks/useFileSystem";
import { useDocViewer } from '@hooks/useDocViewer';

export const TableRow = ({ file, setCurrentDropListIndex, currentDropListIndex }) => {
    const [isEdited, setIsEdited] = React.useState(false);


    const { openFolder } = useFileSystem()
    const { openDocViewer } = useDocViewer();

    const fileImage = React.useMemo(() => {
        return file.type === FileType.File ? fileImg : folderImg
    }, [file])

    const openHandler = async () => {
        if (file.type === FileType.Folder) {
            await openFolder(file.name)
        } else if (file.type === FileType.File) {

            // FIXME: Временно закрыл открытие файлов, кроме фотогорафий
            // const fileExtension = getFileExtension(file.name);
            // if (ImageExtension.includes(fileExtension))
                openDocViewer(file.name);
        }
    }

    const toggleOption = (e) => {
        e.stopPropagation();
        const index = file.stat.birthtimeMs;

        if (index === currentDropListIndex) setCurrentDropListIndex(null);
        else setCurrentDropListIndex(file.stat.birthtimeMs);
    }

    const toggleRenameFileHandler = () => {
        setIsEdited(!isEdited);
    }

  return (
    <div className="table__row" onClick={openHandler}>
        <div className='table__column'>-</div>
        <div className='table__column'>
            <img src={ fileImage } alt="folder" />
            {isEdited ?
                <RenameFile
                    toggleRenameFileHandler={toggleRenameFileHandler}
                    file={file}
                />
                : file.name
            }
        </div>
        <div className='table__column'>{ file.type === FileType.File ? parseSize(file.stat.size) : '' }</div>
        <div className='table__column'>{ displayTime(file.stat.ctime) }</div>
        <div className='table__column'>{ displayTime(file.stat.birthtime) }</div>
        <div className='table__column options'>
            <OptionsDropList
                toggleOption={toggleOption}
                file={file}
                isOpenDropListOption={file.stat.birthtimeMs === currentDropListIndex}
                toggleEdit={toggleRenameFileHandler}
            />
        </div>
    </div>
  )
}
