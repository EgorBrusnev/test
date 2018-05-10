import { createStore, applyMiddleware } from "redux"
import { sendMessage } from "../Chat/actions/conversation"
import { DeviceEventEmitter } from "react-native"
import { persistStore, persistReducer, getStoredState } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import logger from "redux-logger"
import reducer from "../combinedReducer"

import { setupListeners, connect, disconnect, removeListeners } from "./XmppListener";

module.exports = async (taskData) => {
    var test = "def";
    const persistConfig = {
        key: "root",
        storage
    }
    var state = await getStoredState(persistConfig);

    test = await new Promise(
        async (resolve, reject) => {
            resolve(test)
            if (state.response.isAuthorized) {
                test = await connect(state.response.user.username, state.response.user.password, true);
                resolve(test);
            }
        }
    )

    return test;


}







