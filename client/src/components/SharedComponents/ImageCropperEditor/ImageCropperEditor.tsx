import React from 'react';

import './imageCropper.scss';

import EditIcon from '@mui/icons-material/Edit';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import defaultAvatar from '@images/default-avatar.png';
import BaseButton from "@UI/BaseButton/BaseButton";
import {Avatar} from "@mui/material";
import {useUser} from "@hooks/useUser";
import {useAppSelector} from "@hooks/useCustomStore";

const ImageCropperEditor = () => {
    const user = useAppSelector(state => state.user.user);
    const [isOpenCropperEditor, setIsOpenCropperEditor] = React.useState(false);

    const [cropData, setCropData] = React.useState("");
    const cropperRef = React.createRef<any>();

    const { saveAvatar } = useUser();

    const userAvatar = React.useMemo(() => {
        if(user.avatarHash) return `http://localhost:5520/user-avatars/${user.avatarHash}`;
        else return defaultAvatar
    }, [user])

    const [image, setImage] = React.useState(userAvatar);

    const getCropData = () => {
        setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    };

    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    React.useEffect(() => {
        if (isOpenCropperEditor) {
            setCropData(image);
        }
    }, [isOpenCropperEditor, image]);

    const saveImageHandel = React.useCallback(async () => {
        cropperRef.current.cropper.getCroppedCanvas().toBlob(async (data: Blob) => {
            const response = await saveAvatar(data);
            console.log(response);
        })
    }, [cropData])

    return (
        <div className="imageCropper">
            <div className="avatar-preview">
                <Avatar
                    alt="avatar"
                    src={userAvatar}
                    sx={{ width: '100%', height: '100%' }}
                />
                <div className="avatar-preview__btns">
                    <BaseButton
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon />}
                        onClick={() => setIsOpenCropperEditor(!isOpenCropperEditor)}
                    >
                        Изменить
                    </BaseButton>
                </div>
            </div>

            {isOpenCropperEditor &&
                <div className="cropper-modal-wrapper">
                    <div className="cropper-modal-editor">
                        <div className="cropper-modal-editor__wrapper">
                            <div className="cropper-modal-editor__column editor">
                                <Cropper
                                    ref={cropperRef}
                                    style={{height: "400px", width: "400px"}}
                                    zoomTo={0.1}
                                    initialAspectRatio={1}
                                    src={image}
                                    viewMode={1}
                                    background={true}
                                    responsive={true}
                                    cropBoxResizable={false}
                                    dragMode='move'
                                    cropend={getCropData}
                                    autoCropArea={1}
                                    guides={true}
                                />
                            </div>
                            <div className="cropper-modal-editor__column preview">
                                <Avatar
                                    alt="avatar"
                                    src={cropData}
                                    sx={{
                                        width: '300px',
                                        height: '300px',
                                        border: "1px solid #000"
                                }}
                                />
                                <p>300x300px</p>
                                <Avatar
                                    alt="avatar"
                                    src={cropData}
                                    sx={{
                                        width: '42px',
                                        height: '42px',
                                        border: "1px solid #000"
                                }}
                                />
                                <p>42x42px</p>
                            </div>
                        </div>
                        <div className="cropper-modal-editor__wrapper btn-controllers">
                            <BaseButton
                                variant="contained"
                                color="success"
                                component="label"
                            >
                                Загрузить фото
                                <input hidden multiple type="file" onChange={onChange}/>
                            </BaseButton>
                            <span>
                               <BaseButton variant="outlined" onClick={() => setIsOpenCropperEditor(false)}>Отмена</BaseButton>
                                <BaseButton variant="contained" onClick={saveImageHandel}>Применить</BaseButton>
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ImageCropperEditor;
