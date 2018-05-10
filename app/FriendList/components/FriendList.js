import React, { Component } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
    ListView,
    FlatList
} from "react-native";
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
    Form,
    List,
    Icon,
    Right,
    Left,
    InputGroup,
    Card,
    CardItem,
    Body
} from "native-base";
import {
    Grid,
    Col,
    Row
} from "react-native-easy-grid";
import FriendItem from "./FriendItem";
import { disconnect } from "../../utils/XmppListener";
import renderSpinner from "../../Spinner";
import Toast from "../../utils/PlatformToast";
import { Loc, setLocale } from "react-native-redux-i18n";
import I18n from "../../utils/i18n";
import ActionButton from "react-native-action-button";
import PopupMenu from "../../cusomComponents/PopupMenu";
import Modal from "../../cusomComponents/Modal";
import {
    settingNames,
    contextMenu,
    contextMenuItems,
    languageNames,
    languages,
    toastMessages,
    translations
} from "../../Constants";
import navigator from "../../navigator";


class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            found: false,
            menuVisible: false,
            items: {}
        }
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            header: null
        }
    }

    componentWillMount() {
        this.props.fetchConversations(this.props.user._id);
    }

    componentWillUnmount() {
        disconnect();
    }



    logout() {
        disconnect();
        this.props.logout();
        navigator.go(this, navigator.routes.LOGIN);
    }

    async findUser() {
        this.setState({ found: false });
        var searchUser = await this.props.findUser(this.state.search);
        if (searchUser !== null) {
            this.props.addConversation(this.props.user, searchUser);
        }
        else {
            Toast(toastMessages.NO_USER_FOUND);
        }
    }

    setMenuVisible(visible, items = null, id = null) {
        this.setState({ menuVisible: visible, items, chooseId: id })
    }



    deleteConversation(id) {
        this.props.deleteConversation(id, this.props.user._id);
    }


    _onMenuPress(i) {
        switch (i) {
            case 0:
                this.setMenuVisible(true, languageNames);
                break;
            case 1:
                this.logout()
                break;
            default:
                break;
        }
    }

    _onModalItemPress(title) {
        switch (title) {
            case contextMenu.DELETE:
                this.props.deleteConversation(this.state.chooseId, this.props.user._id);
                break;
            case languages.ENGLISH.name:
                this.props.setLocale(languages.ENGLISH.locale);
                break;
            case languages.RUSSIAN.name:
                this.props.setLocale(languages.RUSSIAN.locale);
            default:
                break;
        }
    }

    renderModal(items) {
        const onPressModalItem = (title) => this._onModalItemPress(title);
        const closeModal = () => this.setMenuVisible(false);
        return (
            <Modal
                isVisible={this.state.menuVisible}
                items={this.state.items}
                onPressItem={onPressModalItem}
                onBackButtonPress={closeModal}
                onBackdropPress={closeModal}
            />
        )
    }

    renderConversations() {
        const openPopup = (event, index) => this._onMenuPress(index);
        const onChangeText = text => this.setState({ search: text });
        const findUser = async () => this.findUser();
        const renderItem = ({ item }) => this.renderItem(item);
        const keyExtractor = (item, index) => item._id;
        if (this.props.isConversationListSuccess) {
            return (
                <Container>
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input
                                placeholder={I18n.t("friendList.searchFriend")}
                                onChangeText={onChangeText}
                                onSubmitEditing={findUser} />
                            <PopupMenu
                                actions={settingNames}
                                onPress={openPopup}
                            />

                        </Item>
                    </Header>

                    <Content>
                        <FlatList
                            data={this.props.conversations}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                        />
                    </Content>
                </Container >
            )
        } else {
            return null;
        }
    }

    renderItem(item) {
        const openConversation = id => this.props.openConversation(id);
        const openModal = (visible, id) => this.setMenuVisible(visible, contextMenuItems, id);
        var user = item.members.find(x => x.member._id == this.props.user._id);
        if (user.isVisible == true) {
            return (
                <FriendItem
                    openConversation={openConversation}
                    conversation={item}
                    user={this.props.user}
                    navigation={this.props.navigation}
                    openModal={openModal}
                />
            )
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Container>
                {renderSpinner(this.props.isConversationListLoading)}
                {this.renderConversations()}
                {this.renderModal()}
            </Container>
        )
    }
}


FriendList.propTypes = {
    dataSource: PropTypes.object
}

export default FriendList;