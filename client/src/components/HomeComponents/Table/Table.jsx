import React from "react";
import { useSelector } from "react-redux";

import "./table.scss";

import { TableRow } from "./TableRow/TableRow";
import Loader from "../../SharedComponents/Loader/Loader";

export const Table = () => {
  const files = useSelector((state) => state.fileSystem.currentFolder);
  const isLoading = useSelector((state) => state.fileSystem.isLoading);

  const [currentDropListIndex, setCurrentDropListIndex] = React.useState(null);

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
            <div className="table__column" />
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
