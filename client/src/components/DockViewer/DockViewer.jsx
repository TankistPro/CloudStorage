import React from 'react'
import { useSelector } from 'react-redux';
import FileViewer from 'react-file-viewer';

import './dockViewer.scss'

import { useDocViewer } from '../../hooks/useDocViewer';

export const DockViewer = () => {
    const docViewer = useSelector(state => state.docViewer);

    const {closeDocViewer} = useDocViewer();

    React.useEffect(() => {
        console.log(docViewer)
        function closeOnClick(event) {
            const target = event.target;

            if (!target.closest('.pg-viewer-wrapper') && !target.closest('.table__row')) {
                closeDocViewer()
            }
        }

        if (docViewer?.isOpen) {
            window.addEventListener('click', closeOnClick)
        }

        return () => {
            window.removeEventListener('click', closeOnClick)
        }
    }, [docViewer?.isOpen])

    return (
        <>
            {docViewer?.isOpen &&
                <div
                    className={`d-viewer d-viewer__open `}
                    /*className={`d-viewer ${docViewer?.isOpen ? 'd-viewer__open' : ''} ${ImageExtension.includes(docViewer?.fileExtension) ? 'viewer-img' : ''}`}*/>
                    {/*<div className="d-viewer__close" onClick={() => closeDocViewer()}>+</div>*/}
                    <FileViewer
                        fileType={docViewer?.fileExtension}
                        filePath={docViewer?.filePath}
                        />
                </div>
            }
        </>
    )
}
