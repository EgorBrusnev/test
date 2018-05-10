import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./combinedReducer";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["i18n", "nav", "isConversationListLoading", "isConversationListSuccess", "isConversationLoading", "isConversationSuccess", "isStickersLoading", "isStickersSuccess"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
    let persistor = persistStore(store)
    return { store, persistor }
};