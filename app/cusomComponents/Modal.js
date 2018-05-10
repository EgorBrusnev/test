import React, { Component } from "react";
import {
    FlatList,
    View,
    TouchableOpacity
} from "react-native";
import {
    Card,
    CardItem,
    Body,
    Text
} from "native-base";
import Modal from "react-native-modal";
import { modal } from "../Constants";

export default class CustomMenu extends Component {

    setMenuVisible(visible) {
        this.setState({ modalVisible: visible })
    }

    handleOptionPress(title) {
        this.props.onPressItem(title);
    }

    renderListItem({ item }) {
        const chooseOption = () => {
            this.props.onBackButtonPress()
            this.handleOptionPress(item)
        }
        return (
            <TouchableOpacity
                onPress={chooseOption}
            >
                <View>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>{item}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const onBackButtonPress = () => this.props.onBackButtonPress();
        const onBackdropPress = () => this.props.onBackdropPress();
        const renderListItem = ({ item }) => this.renderListItem({ item });
        const keyExtractor = (item, index) => item;
        return (
            <Modal
                animationIn={modal.animation.animationIn}
                animationOut={modal.animation.animationOut}
                isVisible={this.props.isVisible}
                onBackButtonPress={onBackButtonPress}
                onBackdropPress={onBackdropPress}
            >
                <View>
                    <FlatList
                        data={this.props.items}
                        renderItem={renderListItem}
                        keyExtractor={keyExtractor}
                    />
                </View>
            </Modal>
        )
    }
}