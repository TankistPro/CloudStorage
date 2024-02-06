import React from 'react';
import BaseIconButton from "@UI/BaseIconButton/IconButton.jsx";
import {Dialog, DialogTitle} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {ModalContext} from "@context/useModalContext.jsx";

const BaseModal = ({ modalTitle, children }) => {
    const { closeModal, isOpenModal } = React.useContext(ModalContext);

    return (
        <>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={isOpenModal}
            >
                {modalTitle &&
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        { modalTitle }
                    </DialogTitle>
                }
                <BaseIconButton
                    aria-label="close"
                    onClick={() => closeModal()}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </BaseIconButton>
                { children }
            </Dialog>
        </>
    );
};

export default BaseModal;
