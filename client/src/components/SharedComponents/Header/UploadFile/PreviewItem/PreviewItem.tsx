import React, {NamedExoticComponent} from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { parseSize } from '@helpers/file.helper';
import {BaseUploadFile} from "../../../../../domain/entities";

interface IPreviewItem {
    index: number,
    file: BaseUploadFile,
    previewUrl: string,
    removeFromFileData: (index: number) => void
}

export const PreviewItem: NamedExoticComponent<IPreviewItem> = React.memo(({ index, file, previewUrl, removeFromFileData }) => {

  return (
    <div className="preview-list__item">
      <div className="preview-list__index">{index + 1}.</div>

      <div className="preview-list__img">
        <img src={previewUrl} alt="" />
      </div>

      <div className="preview-list__info">
        <p><b>Имя:</b> {file.name}</p>
        <small><b>Размер:</b> {parseSize(file.size)}</small>
      </div>

      <div className="preview-list__controllers">
        <IconButton aria-label="delete" size="large">
          <DriveFileRenameOutlineIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="large"
          color="error"
          onClick={React.useCallback(() => removeFromFileData(index), [])}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
});
