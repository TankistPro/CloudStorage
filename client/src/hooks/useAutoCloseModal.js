import React from "react";

export const useAutoCloseModal = (targetElementClasses, dependence, closeModalFnc) => {
    React.useEffect(() => {
        function closeOnClick(event) {
            const target = event.target;
            if (Array.isArray(targetElementClasses)) {
                let check = 0;

                for (let i = 0; i < targetElementClasses.length; i++) {
                    if (!target.closest(targetElementClasses[i])) {
                        check += 1;
                    }
                }

                if (check === targetElementClasses.length) {
                    closeModalFnc(false);
                }
            } else {
                if (!target.closest(targetElementClasses)) {
                    closeModalFnc(false);
                }
            }
        }

        if (dependence) {
            window.addEventListener('click', closeOnClick)

            return () => {
                console.log("Remove EventListener for " + targetElementClasses);
                window.removeEventListener('click', closeOnClick)
            }
        }
    }, [dependence])
}
