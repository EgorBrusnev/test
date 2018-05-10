import React, { Component } from "react";
import { View, Text } from "react-native";
import { AppNavigator } from "./AppNavigator";
import { connect } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import I18n from "react-native-i18n";



class Root extends Component {
    constructor(props) {
        super(props);
        I18n.locale = props.locale.currentLocale;
    }

    render() {
        return (
            <AppNavigator />
        )
    }
}


mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Root);