import React from "react";

import {DialogActions, DialogContent} from "@mui/material";
import folderImg from "@images/folder.svg";
import BaseField from "@UI/BaseField/BaseField.jsx";
import BaseButton from "@UI/BaseButton/BaseButton.jsx";

import {ModalContext} from "@context/useModalContext.jsx";

const EditFile = () => {
    const [fileName, setFolderName] = React.useState('');
    const {closeModal} = React.useContext(ModalContext);

    return (<>
        <DialogContent dividers>
            <div className='create-folder'>
                <div className="create-folder__input">
                    <label htmlFor="standard-basic" className="create-folder__img">
                        <img src={folderImg} alt="folder"/>
                    </label>
                    <BaseField
                        id="standard-basic"
                        onInput={(e) => setFolderName(e.target.value)}
                        label="Новое название"
                        placeholder="Введите название"
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
            >
                Переименовать
            </BaseButton>
        </DialogActions>
    </>)
}

export default EditFile;
