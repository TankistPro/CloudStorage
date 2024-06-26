import React from "react";

import "./table.scss";

import { TableRow } from "./TableRow/TableRow";
import Loader from "@SharedComponents/Loader/Loader.js";
import BaseDropList from "@UI/BaseDropList/BaseDropList";
import {ModalContext} from "@context/useModalContext";
import {ModalAction} from "@enums/modalAction.enums";
import {useLocation} from "react-router-dom";
import {useFileSystem} from "@hooks/useFileSystem";
import {useAppSelector} from "@hooks/useCustomStore";

// @ts-ignore
export const DropListContext = React.createContext<any>();

export const Table = () => {
  const files = useAppSelector((state) => state.fileSystem.currentFolder);
  const isLoading = useAppSelector((state) => state.fileSystem.isLoading);
  const baseWorkspacePath = useAppSelector(state => state.user.user.baseWorkspacePath);
  const location = useLocation();

  const { fetchFolders } = useFileSystem();
  const [currentDropListIndex, setCurrentDropListIndex] = React.useState(-1);

  const { openModal } = React.useContext<any>(ModalContext);

  React.useEffect(() => {
      if (baseWorkspacePath) {
          fetchFolders().then();
      }
  }, [location.search, baseWorkspacePath])

  const createFolderModal = React.useCallback(() => {
      const configModal = {
          title: "Создание папки",
          action: ModalAction.CREATE_FOLDER
      };

      openModal(configModal);
  }, [])

    const toggleOptionDropList = React.useCallback((e:any, fileIndex: number) => {
        e.stopPropagation();
        if (fileIndex === currentDropListIndex) setCurrentDropListIndex(-1);
        else setCurrentDropListIndex(fileIndex);
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
      <DropListContext.Provider value={{
          toggleOptionDropList,
          currentDropListIndex,
          setCurrentDropListIndex
      }}>
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
                              />
                          ))
                      ) : isTableRowDataLoading ? (
                              <p>Пусто</p>
                          ) :
                          <>
                              <Loader loadingText={"Получаем данные..."}/>
                          </>
                      }
                  </div>
              </div>
          </div>
      </DropListContext.Provider>
  );
};
