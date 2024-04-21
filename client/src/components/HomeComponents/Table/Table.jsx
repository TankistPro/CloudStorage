import React from "react";
import { useSelector } from "react-redux";

import "./table.scss";

import { TableRow } from "./TableRow/TableRow";
import Loader from "@SharedComponents/Loader/Loader";
import BaseDropList from "@UI/BaseDropList/BaseDropList.jsx";
import {ModalContext} from "@context/useModalContext.jsx";
import {ModalAction} from "@enums/modalAction.enums.js";

export const Table = () => {
  const files = useSelector((state) => state.fileSystem.currentFolder);
  const isLoading = useSelector((state) => state.fileSystem.isLoading);

  const [currentDropListIndex, setCurrentDropListIndex] = React.useState(null);

  const { openModal } = React.useContext(ModalContext);

  const createFolderModal = React.useCallback(() => {
      const configModal = {
          title: "Создание папки",
          action: ModalAction.CREATE_FOLDER
      };

      openModal(configModal);
  }, [])

    const toggleOption = React.useCallback((e, file) => {
        e.stopPropagation();
        console.log(file)
        const index = file.stat.birthtimeMs;

        if (index === currentDropListIndex) setCurrentDropListIndex(null);
        else setCurrentDropListIndex(index);
    }, [currentDropListIndex])

    const menuItems = React.useMemo(() => ([
        {
            onClickEvent: createFolderModal,
            text: "Создать каталог",
        },
        {
            onClickEvent:() => {},
            text: "Настройки таблицы",
        }
    ]), [])

    const isTableRowLoadedAndNotEmpty = React.useMemo(() => {
        return files.length && !isLoading
    }, [files, isLoading])

    const isTableRowDataLoading = React.useMemo(() => {
        return !files.length && !isLoading
    },[files, isLoading])

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
                  menuItems={menuItems}
              />
            </div>
          </div>
        </div>
        <div className="table__body">
          {isTableRowLoadedAndNotEmpty ? (
            files.map((file, index) => (
              <TableRow
                file={file}
                key={index}
                index={index}
                setCurrentDropListIndex={setCurrentDropListIndex}
                currentDropListIndex={currentDropListIndex}
                toggleOption={toggleOption}
              />
            ))
          ) : isTableRowDataLoading ? (
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
