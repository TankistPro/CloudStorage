import React from 'react'

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

import UploadIcon from "@images/upload.svg";

export const UploadFile = () => {
    const [filesData, setFilesData] = React.useState([]);
    const [previewList, setPreviewList] = React.useState([]);
    const [isOpenUploadMenu, setIsOpenUploadMenu] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);

    const $uploadMenu = React.useRef(null);

    const { uploadFiles } = useFileSystem();

    useAutoCloseModal(['.upload-wrapper', '.preview-list__item'], isOpenUploadMenu, setIsOpenUploadMenu);

    const dragEnter = React.useCallback((event) => {
        event.preventDefault();
        setIsDragging(true);
    }, [])

    const dragDrop = React.useCallback((event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        uploadFileToPreviewList(files);
        setIsDragging(false);
    }, [])

    const dragOver = React.useCallback((event) => {
        event.preventDefault();
        setIsDragging(true);
    }, [])

    const dragLeave = React.useCallback((event) => {
        event.preventDefault();
        setIsDragging(false);
    }, [])

    const uploadFileToPreviewList = React.useCallback((files) => {
        files.forEach(file => {
            const fileExtension = getFileExtension(file.name);

            if (ImageExtension.includes(fileExtension)) {
                const reader = new FileReader();

                reader.onload = function() {
                    console.log(1)
                    setPreviewList(prevList =>[...prevList, reader.result]);
                };

                reader.readAsDataURL(file);
            } else {}

            setFilesData(files => [...files, file]);
        })
    }, [])

    const fileHandler = React.useCallback((event) => {
        const file = event.target.files[0];
        uploadFileToPreviewList([file])
    }, [])

    const uploadFileHandler = React.useCallback(async () => {
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
    }, [filesData])

    const removeFromFileData = React.useCallback((index) => {
        filesData.splice(index, 1);
        previewList.splice(index, 1);

        setFilesData([...filesData]);
        setPreviewList([...previewList]);
    }, [filesData, previewList])

    const removeAll = React.useCallback(() => {
        if (!filesData.length) return;

        setFilesData([]);
        setPreviewList([])
    }, [filesData])

    const isFilesDataEmpty = React.useMemo(() => {
        return !filesData.length
    }, [filesData])

    const deleteIcon = React.useMemo(() => {
        return <DeleteIcon/>
    }, [])

    const downloadForOfflineIcon = React.useMemo(() => {
        return <DownloadForOfflineIcon/>
    }, [])

  return (
    <div className="upload-wrapper">
        <BaseButton
            className="upload-wrapper__btn"
            variant="contained"
            onClick={React.useCallback(() => setIsOpenUploadMenu(!isOpenUploadMenu), [isOpenUploadMenu])}
        >
            {filesData.length > 0 &&
                <p>{  filesData.length }</p>
            }
            <AddIcon />
        </BaseButton>
        {isOpenUploadMenu &&
            <div
                className="upload-wrapper__list"
                ref={$uploadMenu}
            >
                <div
                    className={`preview-list ${ isDragging ? 'is-drag' : '' }`}
                    id="drag-field"
                    onDragEnter={dragEnter}
                    onDrop={dragDrop}
                    onDragOver={dragOver}
                    onDragLeave={dragLeave}
                >
                    {filesData.length ?
                        filesData.map((file, index) =>
                            <PreviewItem
                                removeFromFileData={removeFromFileData}
                                previewUrl={previewList[index]}
                                file={file}
                                key={index}
                                index={index}
                            />
                        )
                        :
                        <div
                            className="empty-list"
                        >
                            <img src={ UploadIcon } alt=""/>
                            <p>Переместите сюда файлы для загрузки или нажмите на кнопку "Добавить файл"</p>
                        </div>
                    }
                </div>
                <div className="upload-wrapper__footer">
                    <BaseButton
                        variant="outlined"
                        onClick={uploadFileHandler}
                        disabled={isFilesDataEmpty}
                        startIcon={downloadForOfflineIcon}
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
                            disabled={isFilesDataEmpty}
                            startIcon={deleteIcon}
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
