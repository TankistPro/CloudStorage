import React from 'react';
import BaseModal from "@SharedComponents/BaseModal/BaseModal.jsx";
import CreateFolderContent from "@SharedComponents/BaseModal/ModalsActionsContent/CreateFolder/CreateFolder.jsx";
import EditFile from "@SharedComponents/BaseModal/ModalsActionsContent/EditFile/EditFile.jsx";
import {ModalAction} from "@enums/modalAction.enums.js";
import {useAutoCloseModal} from "@hooks/useAutoCloseModal.js";

export const ModalContext = React.createContext();

let { Provider } = ModalContext;

export const ModalContextProvider = ({ children }) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [modalAction, setModalAction] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [payload, setPayload] = React.useState({});

    useAutoCloseModal('.MuiPaper-root', isOpenModal, setIsOpenModal);

    /*
    * Открытие модалного окна
    * @param {string} title - текст верхнего заголовка (необязательный параметр)
    * @param {ModalAction} action - тип мадального окна (обязательный параметр)
    * */
    const openModal = ( {title, action, payload}) => {
        setModalAction(action);
        setTitle(title);
        setIsOpenModal(true);
        setPayload(payload);
    }

    /*
    * Закрытие модалного окна
    * */
    const closeModal = () => {
        setIsOpenModal(false);
        setModalAction(null)
        setTitle('');
    }

    const renderModalContent = () => {
        if (modalAction === ModalAction.CREATE_FOLDER)
            return <CreateFolderContent />
        if (modalAction === ModalAction.EDIT_FILE)
            return <EditFile currentFileName={payload.fileName} />
    }

    return (
        <Provider
            value={{
                closeModal,
                openModal,
                isOpenModal
            }}
        >
            {isOpenModal &&
                <BaseModal
                    modalTitle={title}
                >
                    { renderModalContent() }
                </BaseModal>
            }
            { children }
        </Provider>
    )
}
