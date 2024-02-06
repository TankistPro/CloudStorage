import React from 'react';

import './createFolder.scss';
import BaseField from "@UI/BaseField/BaseField.jsx";

import folderImg from '@images/folder.svg';
import {useFileSystem} from "@hooks/useFileSystem.js";
import BaseButton from "@UI/BaseButton/BaseButton.jsx";
import {DialogActions, DialogContent} from "@mui/material";
import {ModalContext} from "@context/useModalContext.jsx";

const CreateFolder = () => {
    const [folderName, setFolderName] = React.useState('');

    const { createFolder } = useFileSystem();
    const {closeModal} = React.useContext(ModalContext);

    const createFolderHandler = () => {
        createFolder(folderName);
        closeModal();
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
