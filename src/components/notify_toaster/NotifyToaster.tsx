import {ToastContainer, toast, Slide} from "react-toastify";

export const succesToaster = (message: string) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const errorToaster = (message: string) => {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
};

const NotifyToaster = () => {
    return (
        <ToastContainer transition={Slide}/>
    );
}

export default NotifyToaster;