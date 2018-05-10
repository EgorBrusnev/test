import { CHANGE_LANGUAGE } from "../actionTypes";
import { languages } from "../Constants"

const initialState = {
    currentLocale: languages.ENGLISH.locale
}

export const langReducer = (state = initialState, action) => {
    if (action.type === CHANGE_LANGUAGE) {
        console.log("CHANGE_LANG ", action);
        return {
            ...state,
            currentLocale: action.currentLocale
        }
    }
    return state;
}