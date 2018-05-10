
import PropTypes from "prop-types";
import React from "react";
import {
    Platform,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";

import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from "../../../node_modules/react-native-gifted-chat/src/Constant";
import Color from "../../../node_modules/react-native-gifted-chat/src/Color";
import {
    Icon,
    Grid,
    Text,
    Col,
    Tabs,
    Tab,
    Container,
    Header
} from "native-base";
import Modal from "react-native-modal";
import GridView from "react-native-gridview";
import { getStickers } from "../actions/conversation";
import renderSpinner from "../../Spinner";
import { baseUrl, stickerUrl, translations } from "../../Constants";
import { composerStyles } from "../../styles";
import I18n from "../../utils/i18n";


export default class Composer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    onContentSizeChange(e) {
        const { contentSize } = e.nativeEvent;

        if (!contentSize) return;

        if (
            !this.contentSize ||
            this.contentSize.width !== contentSize.width ||
            this.contentSize.height !== contentSize.height
        ) {
            this.contentSize = contentSize;
            this.props.onInputSizeChanged(this.contentSize);
        }
    }

    async componentWillMount() {
        this.props.customProps.getStickers();
    }

    onChangeText(text) {
        this.props.onTextChanged(text);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderModal() {
        const renderStickerItem = (item) => this.renderStickerItem(item);
        const closeModal = () => this.setModalVisible(false);
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={closeModal}>
                <GridView
                    data={this.props.customProps.stickers}
                    itemsPerRow={3}
                    renderItem={renderStickerItem}
                />
            </Modal>
        )
    }

    renderStickerItem(item) {
        const sendSticker = () => {
            this.props.onSend([{ user: this.props.user, text: item._id, type: "image" }])
            this.setModalVisible(false);
        }
        return (
            <TouchableOpacity
                onPress={sendSticker}
            >
                <Image style={{ width: 100, height: 100 }} source={{ uri: baseUrl + stickerUrl + item._id }} />
            </TouchableOpacity>
        );
    }

    render() {
        const openModal = () => this.setModalVisible(true);
        const onContentSizeChange = (e) => this.onContentSizeChange(e);
        const onChangeText = (text) => this.onChangeText(text);
        return (
            <Grid>
                {this.renderModal()}
                <Col size={1} >
                    <TouchableOpacity
                        onPress={openModal}
                    >
                        <Icon name="happy" />
                    </TouchableOpacity>
                </Col>
                <Col size={9} >
                    <TextInput
                        placeholder={I18n.t("chat.typeMessage")}
                        placeholderTextColor={this.props.placeholderTextColor}
                        multiline={this.props.multiline}
                        onChange={onContentSizeChange}
                        onContentSizeChange={onContentSizeChange}
                        onChangeText={onChangeText}
                        style={[composerStyles.textInput, this.props.textInputStyle, { height: this.props.composerHeight }]}
                        autoFocus={this.props.textInputAutoFocus}
                        value={this.props.text}
                        accessibilityLabel={this.props.text || this.props.placeholder}
                        enablesReturnKeyAutomatically
                        underlineColorAndroid="transparent"
                        keyboardAppearance={this.props.keyboardAppearance}
                        {...this.props.textInputProps}
                    />
                </Col>
            </Grid>
        );
    }

}


Composer.defaultProps = {
    composerHeight: MIN_COMPOSER_HEIGHT,
    text: "",
    placeholderTextColor: Color.defaultProps,
    placeholder: DEFAULT_PLACEHOLDER,
    textInputProps: null,
    multiline: true,
    textInputStyle: {},
    textInputAutoFocus: false,
    keyboardAppearance: "default",
    onTextChanged: () => { },
    onInputSizeChanged: () => { },
};

Composer.propTypes = {
    composerHeight: PropTypes.number,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    textInputProps: PropTypes.object,
    onTextChanged: PropTypes.func,
    onInputSizeChanged: PropTypes.func,
    multiline: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    textInputAutoFocus: PropTypes.bool,
    keyboardAppearance: PropTypes.string,
};
