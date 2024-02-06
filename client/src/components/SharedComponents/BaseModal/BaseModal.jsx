import React from 'react';
import BaseIconButton from "@UI/BaseIconButton/IconButton.jsx";
import {Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import BaseButton from "@UI/BaseButton/BaseButton.jsx";
import CloseIcon from '@mui/icons-material/Close';
import {ModalContext} from "../../../context/useModalContext.jsx";

const BaseModal = ({ acceptButtonText='Продолжить', modalTitle = "title", children }) => {
    const { closeModal } = React.useContext(ModalContext);

    return (
        <>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    { modalTitle }
                </DialogTitle>
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
                <DialogContent dividers>
                    { children }
                </DialogContent>
                <DialogActions>
                    <BaseButton autoFocus>
                        { acceptButtonText }
                    </BaseButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BaseModal;
