import React from 'react';
import BaseField from "@UI/BaseField/BaseField";

import './general.scss';
import BaseButton from "@UI/BaseButton/BaseButton";
import ImageCropper from "@SharedComponents/ImageCropperEditor/ImageCropperEditor";
import {InputAdornment} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import {useAppSelector} from "@hooks/useCustomStore";

const General = () => {
    const user = useAppSelector(state => state.user.user);

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
                    <BaseField
                        label="Описание"
                        multiline
                        variant="filled"
                        placeholder="Расскажите всем о себе (ваши увлечения, хобби)..."
                        disabled
                        rows={4}
                    />
                    <BaseField
                        id="input-with-icon-textfield"
                        label="Ссылка на ваш сайт"
                        variant="standard"
                        disabled
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LanguageIcon />
                                </InputAdornment>
                            ),
                        }}
                        value="https://nikolaygusev.ru/"
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
