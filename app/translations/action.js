import { CHANGE_LANGUAGE } from "../actionTypes";
import { setLocale } from "react-native-redux-i18n";

const languageChanged = (currentLocale) => ({
    type: CHANGE_LANGUAGE,
    currentLocale
});

export const changeLang = (currentLocale) => (dispatch) => {
    dispatch(setLocale(currentLocale));
    dispatch(languageChanged(currentLocale));
};