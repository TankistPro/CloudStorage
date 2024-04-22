import {toast} from "react-toastify";
import {FC} from "react";

const toastList = {
    info: toast.info,
    success: toast.success,
    warning: toast.warning,
    error: toast.error
}

interface IToast {
    toastType: "info" | "success" | "warning" | "error",
    text: string
}

// @ts-ignore
const Toast : FC<IToast> = ({ toastType, text }) => {
    toastList[toastType](
        text,
        {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }
    )
};

export default Toast;
