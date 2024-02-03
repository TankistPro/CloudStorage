import React from 'react'
import { useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import './dockViewer.scss'

import { useDocViewer } from '../../hooks/useDocViewer';
import { ImageExtension } from '../../enums/file.enum';

const config = {
    header: {
      disableHeader: false,
      disableFileName: false,
      retainURLParams: true,
    },
    csvDelimiter: ",", // "," as default,
    pdfZoom: {
      defaultZoom: 0.7, // 1 as default,
      zoomJump: 0.1, // 0.1 as default,
    },
    pdfVerticalScrollByDefault: true, // false as default
  }

export const DockViewer = () => {
    const docViewer = useSelector(state => state.docViewer);

    const {closeDocViewer} = useDocViewer();

    React.useEffect(() => {
        function closeOnClick(event) {
            const target = event.target;

            if (!target.closest('#react-doc-viewer') && !target.closest('.table__row')) {
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
                    className={`d-viewer d-viewer__open ${ImageExtension.includes(docViewer?.fileExtension) ? 'viewer-img' : 'viewer-doc'}`}
                    /*className={`d-viewer ${docViewer?.isOpen ? 'd-viewer__open' : ''} ${ImageExtension.includes(docViewer?.fileExtension) ? 'viewer-img' : ''}`}*/>
                    {/*<div className="d-viewer__close" onClick={() => closeDocViewer()}>+</div>*/}
                    <DocViewer
                        documents={[{
                            uri: docViewer?.filePath
                        }]}
                        config={config}
                        pluginRenderers={DocViewerRenderers}
                    />
                </div>
            }
        </>
    )
}
