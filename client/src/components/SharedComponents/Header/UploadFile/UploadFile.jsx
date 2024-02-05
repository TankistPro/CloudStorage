import React from 'react'

import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import AddIcon from '@mui/icons-material/Add';

import './uploadFile.scss'

import Toast from "@SharedComponents/Toast/Toast";
import { getFileExtension } from '@helpers/file.helper';
import { ImageExtension } from '@enums/file.enum';
import { useFileSystem } from '@hooks/useFileSystem';
import { PreviewItem } from './PreviewItem/PreviewItem';
import BaseButton from "@UI/BaseButton/BaseButton.jsx";
import {useAutoCloseModal} from "@hooks/useAutoCloseModal.js";

export const UploadFile = () => {
    const [filesData, setFilesData] = React.useState([]);
    const [previewList, setPreviewList] = React.useState([]);
    const [isOpenUploadMenu, setIsOpenUploadMenu] = React.useState(false);

    const $uploadMenu = React.useRef(null);

    const { uploadFiles } = useFileSystem();

    useAutoCloseModal(['.upload-wrapper', '.preview-list__item'], isOpenUploadMenu, setIsOpenUploadMenu);

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

    const uploadFileHandler = async () => {
        const response = await uploadFiles(filesData);

        if (response) {
            Toast({
                toastType: 'success',
                text: "Файлы успешно загружены!"
              })
        } else {
            Toast({
                toastType: 'error',
                text: "Не удалось загрузить файлы!"
              })
        }

        removeAll();
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
        <BaseButton
            className="upload-wrapper__btn"
            variant="contained"
            onClick={() => setIsOpenUploadMenu(!isOpenUploadMenu)}
        >
            {filesData.length > 0 &&
                <p>{  filesData.length }</p>
            }
            <AddIcon />
        </BaseButton>
        {isOpenUploadMenu &&
            <div className="upload-wrapper__list" ref={$uploadMenu}>
                <div className="preview-list">
                    {filesData.length ?
                        filesData.map((file, index) =>
                            <PreviewItem removeFromFileData={removeFromFileData} previewUrl={previewList[index]}
                                         file={file} key={index} index={index}/>
                        )
                        :
                        <div className="empty-list">
                            <p>Список для добавления пуст</p>
                        </div>
                    }
                </div>
                <div className="upload-wrapper__footer">
                    <BaseButton
                        variant="outlined"
                        onClick={uploadFileHandler}
                        disabled={!filesData.length}
                        startIcon={<DownloadForOfflineIcon/>}
                    >
                        Загрузить
                    </BaseButton>
                    <span>
                        <BaseButton
                            variant="contained"
                            component="label"
                        >
                             Добавить файл
                            <input hidden multiple type="file" onChange={fileHandler}/>
                        </BaseButton>
                        <BaseButton
                            variant="contained"
                            disabled={!filesData.length}
                            startIcon={<DeleteIcon/>}
                            color="error"
                            onClick={removeAll}
                        >
                            Очистить все
                        </BaseButton>
                    </span>
                </div>
            </div>
        }
    </div>

  )
}
