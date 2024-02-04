import React from 'react';
import BaseField from "@UI/BaseField/BaseField.jsx";
import {useSelector} from "react-redux";

import './general.scss';
import BaseButton from "@UI/BaseButton/BaseButton.jsx";
import ImageCropper from "@SharedComponents/ImageCropperEditor/ImageCropperEditor.jsx";


const General = () => {
    const user = useSelector(state => state.user.user);

    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);

    return (
        <div className="tab general-tab">
            <h2>Общие</h2>
            <section>
                <div className="avatar-block">
                    <ImageCropper></ImageCropper>
                </div>
                <div className="form">
                    <BaseField
                        label="Имя"
                        variant="filled"
                        value={firstName}
                        disabled
                        onInput={(e) => setFirstName(e.target.value)}
                    />
                    <BaseField
                        label="Фамилия"
                        variant="filled"
                        value={lastName}
                        disabled
                        onInput={(e) => setLastName(e.target.value)}
                    />
                    <div className="btn-controllers">
                        <BaseButton variant="outlined">Изменить</BaseButton>
                        <BaseButton variant="contained" disabled>Сохранить</BaseButton>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default General;
