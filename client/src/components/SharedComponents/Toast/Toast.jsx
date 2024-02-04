import {toast} from "react-toastify";

const toastList = {
    info: toast.info,
    success: toast.success,
    warning: toast.warning,
    error: toast.error
}

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

const Toast = ({ toastType, text }) => {
    toastList[toastType](
        text,
        toastOptions
    )
};

export default Toast;
