
export const host = "brusneve-l";
export const baseUrl = "http://brusneve-l:8080";
export const findUserUrl = "/api/user?username=";
export const stickerUrl = "/assets/sticker?id=";
export const allStickersUrl = "/api/stickers/all";
export const sendMessage = "/api/message/send";
export const chat = "/api/conversation/";
export const allConversations = "/api/conversations?userId=";
export const newConversation = "/api/conversation/new";
export const signIn = "/api/login";
export const registration = "/api/register";
export const deleteConversation = "/api/conversation/delete";
export const settings = { CHANGE_LANG: "Change language", LOGOUT: "Logout" }
export const settingNames = [settings.CHANGE_LANG, settings.LOGOUT];
export const languages = { ENGLISH: { locale: "en", name: "English" }, RUSSIAN: { locale: "ru", name: "Russian" } };
export const languageNames = [languages.ENGLISH.name, languages.RUSSIAN.name];
export const contextMenu = { DELETE: "Delete" }
export const contextMenuItems = [contextMenu.DELETE];
export const routes = { REGISTRATION: "Registration", LOGIN: "Login", FRIEND_LIST: "FriendList", CHAT: "Chat" }
export const modal = { animation: { animationIn: "zoomInDown", animationOut: "zoomOutUp" } };
export const toastMessages = { NO_USER_FOUND: "No user found", ERROR_REPEAT_PASSWORD: "Error repeat password doesn\"t match" }