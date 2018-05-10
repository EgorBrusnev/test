import React, { Component } from "react";
import { Provider } from "react-redux";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import reducer from "./app/combinedReducer";
import Root from "./app/RootComponent";
import axios from "axios";
import { baseUrl } from "./app/Constants";
import configStore from "./app/configStore";





const { store, persistor } = configStore();

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Root />
                </PersistGate>
            </Provider>
        );
    }
}
