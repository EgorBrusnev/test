import React, { Component } from "react";
import { Alert } from "react-native";
import { sendMessage } from "../../Chat/actions/conversation";
import PropTypes from "prop-types";
import {
    Container,
    Header,
    Content,
    Text,
    Input,
    Footer,
    Button,
    Item,
    Form
} from "native-base";
import {
    Grid,
    Col,
    Row
} from "react-native-easy-grid";
import {
    setupListeners,
    connect,
    disconnect
} from "../../utils/XmppListener";

import Toast from "../../utils/PlatformToast";
import { loginStyles } from "../../styles";
import I18n from "../../utils/i18n";
import navigator from "../../navigator";
import { toastMessages, translations } from "../../Constants";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            password: "",
            repeat_password: ""
        }
    }

    static navigationOptions = {
        header: null
    }



    componentWillReceiveProps(props) {
        var response = props.response;
        var credits = []
        var username = "";
        var password = "";
        if (response.success) {
            username = response.user.username;
            password = response.user.password;
            setupListeners();
            connect(username, password);
            navigator.go(this, navigator.routes.FRIEND_LIST);
        } else if (response.success === false) {
            Toast(response.error.errmsg);
        }
    }

    _onPress() {
        if (this.state.password === this.state.repeat_password) {
            this.props.register(this.state.username, this.state.password, this.state.name);
        } else {
            Toast(toastMessages.ERROR_REPEAT_PASSWORD);
        }
    }

    render() {
        const inputUsername = (text) => this.setState({ username: text });
        const inputName = (text) => this.setState({ name: text });
        const inputPassword = (text) => this.setState({ password: text });
        const repeatPassword = (text) => this.setState({ repeat_password: text });
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row style={loginStyles.row}></Row>
                        <Row style={loginStyles.row}>
                            <Form style={loginStyles.form}>
                                <Item>
                                    <Input
                                        placeholder={I18n.t("login.username")}
                                        onChangeText={inputUsername} />
                                </Item>
                                <Item>
                                    <Input
                                        placeholder={I18n.t("login.name")}
                                        onChangeText={inputName} />
                                </Item>
                                <Item last>
                                    <Input
                                        placeholder={I18n.t("login.password")}
                                        secureTextEntry={true}
                                        onChangeText={inputPassword} />
                                </Item>
                                <Item last>
                                    <Input
                                        placeholder={I18n.t("login.repeatPassword")}
                                        secureTextEntry={true}
                                        onChangeText={repeatPassword} />
                                </Item>
                                <Button full
                                    onPress={() => this._onPress()}>
                                    <Text>{I18n.t("login.signUp")}</Text>
                                </Button>
                            </Form>
                        </Row>
                        <Row style={loginStyles.row}></Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

Registration.propTypes = {
    reigster: PropTypes.func,
    response: PropTypes.object
}

export default Registration;