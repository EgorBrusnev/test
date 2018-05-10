import { FIND_USER } from "../../actionTypes";
import { findUserUrl, baseUrl } from "../../Constants";
import api from "../../utils/AxiosApi";

export const findUser = (username) => async (dispatch) => {
    const data = await api.get(findUserUrl + username);
    return data;

}

const onUserFind = (newUser = {}) => ({
    type: FIND_USER,
    newUser
})