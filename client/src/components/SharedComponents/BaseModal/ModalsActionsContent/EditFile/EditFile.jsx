import React from "react";

import {DialogActions, DialogContent} from "@mui/material";
import folderImg from "@images/folder.svg";
import BaseField from "@UI/BaseField/BaseField.tsx";
import BaseButton from "@UI/BaseButton/BaseButton.tsx";

import {ModalContext} from "@context/useModalContext.tsx";
import {useFileAction} from "@hooks/useFileAction.ts";

const EditFile = ({ currentFileName }) => {
    const [newFileName, setNewFileName] = React.useState(currentFileName);
    const {closeModal} = React.useContext(ModalContext);

    const { renameFile } = useFileAction();

    const renameFileHandler = async () => {
        const status = await renameFile(currentFileName, newFileName);

        if (status) {
            closeModal();
        }
    }

    return (<>
        <DialogContent dividers>
            <div className='create-folder'>
                <div className="create-folder__input">
                    <label htmlFor="standard-basic" className="create-folder__img">
                        <img src={folderImg} alt="folder"/>
                    </label>
                    <BaseField
                        id="standard-basic"
                        onInput={(e) => setNewFileName(e.target.value)}
                        value={newFileName}
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
                disabled={currentFileName === newFileName}
                onClick={renameFileHandler}
            >
                Переименовать
            </BaseButton>
        </DialogActions>
    </>)
}

export default EditFile;
