import React from 'react'
import { useSelector } from 'react-redux';

import './dockViewer.scss'

import { useDocViewer } from '@hooks/useDocViewer';
import PSPDFKit from "pspdfkit";
import {useAutoCloseModal} from "@hooks/useAutoCloseModal.js";

export const DockViewer = () => {
    const docViewer = useSelector(state => state.docViewer);
    const containerRef = React.useRef(null);

    const {closeDocViewer} = useDocViewer();

    // useAutoCloseModal(['.pg-viewer-wrapper', '.table__row'], closeDocViewer, docViewer?.isOpen)

    React.useEffect(() => {
        if (!docViewer?.isOpen) return

        const container = containerRef.current;

        (async function () {
            PSPDFKit.unload(container);
            const instance = await PSPDFKit.load({
                container,
                document: docViewer?.filePath,
                baseUrl: `${window.location.protocol}//${window.location.host}/`,
            });
        })();

        return () => PSPDFKit && PSPDFKit.unload(container);
    }, [docViewer?.isOpen]);

    return (
        <>
            {docViewer?.isOpen &&
                <div
                    className={`d-viewer d-viewer__open `}>

                    <div
                        ref={containerRef}
                        style={{width: '90%', height: '90vh'}}
                    />
                </div>
            }
        </>
    )
}
