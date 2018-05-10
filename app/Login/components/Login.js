import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
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
import renderSpinner from "../../Spinner";
import SplashScreen from "react-native-splash-screen";
import { loginStyles } from "../../styles";
import Toast from "../../utils/PlatformToast";
import I18n from "../../utils/i18n";
import navigator from "../../navigator";
import { translations } from "../../Constants";

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    state = {
        username: "",
        password: ""
    }

    componentWillMount() {
        SplashScreen.hide();
        var user = {},
            response = this.props.response;
        if (response.isAuthorized) {
            user = response.user;
            this.props.signIn(user.username, user.password, response.token);
        }
    }

    componentWillReceiveProps(props) {
        console.log("WILLRECEIVEPROPS", props);
        var response = props.response;
        var credits = []
        var username = "";
        var password = "";
        if (response.isAuthorized) {
            username = response.user.username;
            password = response.user.password;
            console.log(username + " " + password);
            setupListeners();
            connect(username, password);
            navigator.go(this, navigator.routes.FRIEND_LIST, true);
        } else if (response.success === false) {
            console.log("ERRORMESSASGE", response.error.errmsg);
            Toast(response.error.errmsg);
        }
    }

    renderForm() {
        const inputUsername = (text) => this.setState({ username: text });
        const inputPassword = (text) => this.setState({ password: text });
        const signIn = () => this.props.signIn(this.state.username, this.state.password);
        const goToRegistration = () => navigator.go(this, navigator.routes.REGISTRATION);
        if (this.props.response.isAuthorized === false) {
            return (
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
                                <Item last>
                                    <Input
                                        placeholder={I18n.t("login.password")}
                                        secureTextEntry={true}
                                        onChangeText={inputPassword} />
                                </Item>
                                <Button full
                                    onPress={signIn}>
                                    <Text>{I18n.t("login.signIn")}</Text>
                                </Button>
                            </Form>
                        </Row>
                        <Row style={loginStyles.form}>
                            <TouchableOpacity
                                onPress={goToRegistration}
                            >
                                <Text>{I18n.t("login.registration")}</Text>
                            </TouchableOpacity>
                        </Row>
                        <Row style={loginStyles.row}></Row>
                    </Grid>
                </Content>
            )
        } else {
            return null;
        }
    }





    render() {
        return (
            <Container>
                {renderSpinner(this.props.response.isAuthorized)}
                {this.renderForm()}
            </Container>)
    }
}

Login.propTypes = {
    signIn: PropTypes.func,
    response: PropTypes.object
}

export default Login;