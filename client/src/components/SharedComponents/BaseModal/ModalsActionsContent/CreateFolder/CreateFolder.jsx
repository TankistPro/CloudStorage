import React from 'react';

import './createFolder.scss';
import BaseField from "@UI/BaseField/BaseField.tsx";

import folderImg from '@images/folder.svg';
import {useFileSystem} from "@hooks/useFileSystem.ts";
import BaseButton from "@UI/BaseButton/BaseButton.tsx";
import {DialogActions, DialogContent} from "@mui/material";
import {ModalContext} from "@context/useModalContext.tsx";
import Toast from "@SharedComponents/Toast/Toast.tsx";

const CreateFolder = () => {
    const [folderName, setFolderName] = React.useState('');

    const { createFolder } = useFileSystem();
    const {closeModal} = React.useContext(ModalContext);

    const createFolderHandler = async () => {
        const response = await createFolder(folderName);

        if (response.status) {
            closeModal();
        }

        Toast({
            toastType: response.status ? 'success' : 'error',
            text:  response.status ? `Папка "${ response.newFolderName }" успешно создана` : response.error
        })
    }

    return (
        <>
            <DialogContent dividers>
                <div className='create-folder'>
                    {/*<p className="create-folder__title">Введите название папки</p>*/}
                    <div className="create-folder__input">
                        <label htmlFor="standard-basic" className="create-folder__img">
                            <img src={folderImg} alt="folder"/>
                        </label>
                        <BaseField
                            id="standard-basic"
                            onInput={(e) => setFolderName(e.target.value)}
                            label="Название папки"
                            placeholder="Введите название папки"
                            variant="standard"
                            autoComplete='off'
                            type="text"
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <BaseButton
                    autoFocus
                    onClick={createFolderHandler}
                    disabled={!folderName.length}
                >
                    Создать
                </BaseButton>
            </DialogActions>
        </>
    );
};

export default CreateFolder;
