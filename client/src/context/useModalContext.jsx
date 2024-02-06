import React from 'react';
import BaseModal from "@SharedComponents/BaseModal/BaseModal.jsx";
export const ModalContext = React.createContext();

let { Provider } = ModalContext;
export const ModalContextProvider = ({ children }) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [modalContent, setModalContent] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [acceptButtonText, setAcceptButtonText] = React.useState('');

    const openModal = (content, title, acceptBtnText) => {
        setModalContent(content);
        setTitle(title);
        setAcceptButtonText(acceptBtnText);
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
        setModalContent('');
        setTitle('');
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
                    acceptButtonText={acceptButtonText}
                >
                    {modalContent}
                </BaseModal>
            }
            { children }
        </Provider>
    )
}
