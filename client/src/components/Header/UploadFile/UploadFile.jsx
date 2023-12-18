import React from 'react'

import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AddIcon from '@mui/icons-material/Add';

import './uploadFile.scss'

import { parseSize, getFileExtension } from '../../../helpers/file.helper';
import { ImageExtension } from '../../../enums/file.enum';

export const UploadFile = () => {
    const [filesData, setFilesData] = React.useState([]);
    const [previewList, setPreviewList] = React.useState([]);

    const [isOpenUploadMenu, setIsOpenUploadMenu] = React.useState(false);

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
            <AddIcon />
        </Button>
        <div className="upload-wrapper__list" style={{ display: isOpenUploadMenu ? "block" : "none" }}>
            <div className="preview-list">
                {filesData.length ? 
                    filesData.map((file, index) =>
                        <div key={index} className="preview-list__item">
                            <div className="preview-list__index">{index + 1}.</div>

                            <div className="preview-list__img">
                                <img src={previewList[index]} alt="" />
                            </div>

                            <div className="preview-list__info">
                                <p>Наименование: {file.name}</p>
                                <small>Размер: {parseSize(file.size)}</small>
                            </div>

                            <div className="preview-list__controllers">
                                <IconButton aria-label="delete" size="large">
                                    <DriveFileRenameOutlineIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="large" color="error" onClick={() => removeFromFileData(index)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>
                    )
                : <p>Пусто</p>
                }
                
            </div>
            <div className="upload-wrapper__footer">
                <Button variant="outlined" startIcon={<DownloadForOfflineIcon />}>
                        Загрузить
                    </Button>
                <span>
                    <Button variant="contained" component="label">
                        Добавить файл
                        <input hidden multiple type="file" onChange={fileHandler} />
                    </Button>
                    <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={removeAll}>
                        Очистить все
                    </Button>
                </span>
            </div>
        </div>
    </div>
    
  )
}
