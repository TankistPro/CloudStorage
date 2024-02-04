import React from 'react';

import OkImg from "../../../../images/ok.svg";
import NoImg from "../../../../images/no.svg";

const RenameFile = ({ toggleRenameFileHandler, file }) => {
    const [newFileName, setNewFileName] = React.useState(file.name);

    const cancelEdit = (event) => {
        event.stopPropagation();
        toggleRenameFileHandler();
    }

    const applyEdit = event => {
        event.stopPropagation();
        console.log(newFileName);
        toggleRenameFileHandler();
    }

    return (
        <div className="edit-input">
            <input
                type="text"
                value={newFileName}
                onInput={(event) => setNewFileName(event.target.value)}
                onClick={event => event.stopPropagation()}
            />
            <span onClick={event => applyEdit(event)}>
                        <img src={OkImg} alt="accept"/>
                    </span>
            <span onClick={event => cancelEdit(event)}>
                        <img src={NoImg} alt="cancel"/>
                    </span>
        </div>
    );
};

export default RenameFile;
