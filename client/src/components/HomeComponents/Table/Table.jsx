import React from "react";
import { useSelector } from "react-redux";

import "./table.scss";

import { TableRow } from "./TableRow/TableRow";
import Loader from "@SharedComponents/Loader/Loader";
import BaseDropList from "@UI/BaseDropList/BaseDropList.jsx";
import {ModalContext} from "@context/useModalContext.jsx";
import {ModalAction} from "@enums/modalAction.enums.js";
import {useAutoCloseModal} from "@hooks/useAutoCloseModal.js";

export const Table = () => {
  const files = useSelector((state) => state.fileSystem.currentFolder);
  const isLoading = useSelector((state) => state.fileSystem.isLoading);

  const [currentDropListIndex, setCurrentDropListIndex] = React.useState(null);

  const { openModal } = React.useContext(ModalContext);

  const createFolderModal = () => {
      const configModal = {
          title: "Создание папки",
          action: ModalAction.CREATE_FOLDER
      };

      openModal(configModal);
  }

  return (
    <div className="table">
      <div className="table__controllers"></div>
      <div className="table__main">
        <div className="table__header">
          <div className="table__row">
            <div className="table__column">ID</div>
            <div className="table__column">Название</div>
            <div className="table__column">Размер</div>
            <div className="table__column">Дата изменения</div>
            <div className="table__column">Дата создания</div>
            <div className="table__column">
              <BaseDropList
                  width={200}
                  menuItems={[
                  {
                    onClickEvent: createFolderModal,
                    text: "Создать каталог",
                  },
                  {
                    onClickEvent: () => {},
                    text: "Настройки таблицы",
                  }
                ]}
              />
            </div>
          </div>
        </div>
        <div className="table__body">
          {(files.length && !isLoading) ? (
            files.map((file, index) => (
              <TableRow
                file={file}
                key={index}
                index={index}
                setCurrentDropListIndex={setCurrentDropListIndex}
                currentDropListIndex={currentDropListIndex}
              />
            ))
          ) : (!files.length && !isLoading) ? (
              <p>Пусто</p>
          ) :
              <>
                <Loader loadingText={"Получаем данные..."} />
              </>
          }
        </div>
      </div>
    </div>
  );
};
