import React from 'react'

import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AddIcon from '@mui/icons-material/Add';

import './uploadFile.scss'

import { getFileExtension } from '../../../helpers/file.helper';
import { ImageExtension } from '../../../enums/file.enum';
import { useFileSystem } from '../../../hooks/useFileSystem';
import { PreviewItem } from './PreviewItem/PreviewItem';

export const UploadFile = () => {
    const [filesData, setFilesData] = React.useState([]);
    const [previewList, setPreviewList] = React.useState([]);

    const [isOpenUploadMenu, setIsOpenUploadMenu] = React.useState(false);

    const { uploadFiles } = useFileSystem();

    const fileHandler = (event) => {
        const file = event.target.files[0];
        const fileExtension = getFileExtension(file.name);
        
        if (ImageExtension.includes(fileExtension)) {
            const reader = new FileReader();
        
            reader.readAsDataURL(file);
        
            reader.onload = function() {
                setPreviewList([...previewList, reader.result]);
            };
        } else {}

        setFilesData([...filesData, file]);
    }

    const removeFromFileData = (index) => {
        filesData.splice(index, 1);
        previewList.splice(index, 1);

        setFilesData([...filesData]);
        setPreviewList([...previewList]);
    }

    const removeAll = () => {
        if (!filesData.length) return;
        
        setFilesData([]);
        setPreviewList([])
    }

  return (
    <div className="upload-wrapper">
        <Button className="upload-wrapper__btn" variant="contained" onClick={() => setIsOpenUploadMenu(!isOpenUploadMenu)}>
            {filesData.length > 0 &&
                <p>{  filesData.length }</p>
            }
            <AddIcon />
        </Button>
        <div className="upload-wrapper__list" style={{ display: isOpenUploadMenu ? "block" : "none" }}>
            <div className="preview-list">
                {filesData.length ? 
                    filesData.map((file, index) =>
                        <PreviewItem removeFromFileData={removeFromFileData} previewUrl={previewList[index]} file={file} key={index}  index={index} />
                    )
                : 
                <div className="empty-list">
                    <p>Список для добавления пуст</p>
                </div>
                }   
            </div>
            <div className="upload-wrapper__footer">
                <Button variant="outlined" onClick={() => uploadFiles(filesData)} disabled={!filesData.length} startIcon={<DownloadForOfflineIcon />}>
                        Загрузить
                    </Button>
                <span>
                    <Button variant="contained" component="label">
                        Добавить файл
                        <input hidden multiple type="file" onChange={fileHandler} />
                    </Button>
                    <Button variant="contained" disabled={!filesData.length} startIcon={<DeleteIcon />} color="error" onClick={removeAll}>
                        Очистить все
                    </Button>
                </span>
            </div>
        </div>
    </div>
    
  )
}
