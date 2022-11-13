import AuthService from "../services/auth.service";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {REMOVE_ERROR_STATE, REMOVE_USER_STATE} from "../store/slice/userSlice";

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout();

        dispatch(REMOVE_USER_STATE());
        dispatch(REMOVE_ERROR_STATE());

        navigate('/auth');
    }

    return {
        logout
    }
}
