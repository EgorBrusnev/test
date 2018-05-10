import React from "react";
import { View, TouchableOpacity, UIManager, findNodeHandle } from "react-native";
import { Button } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { popupStyles, popupIcon } from "../styles";

class PopupMenu extends React.Component {
    handleShowPopupError = (err) => {
        console.log(err);
    };

    handleMenuPress = () => {
        const { actions, onPress } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.refs.menu),
            actions,
            this.handleShowPopupError,
            onPress,
        );
    };

    render() {
        return (
            <View>
                {this.props.children}
                <Button onPress={this.handleMenuPress} style={popupStyles.main}>
                    <Icon
                        name={popupIcon.name}
                        size={popupIcon.size}
                        color={popupIcon.color}
                        ref={popupIcon.ref}
                    />
                </Button>
            </View>
        );
    }
}

PopupMenu.propTypes = {
    actions: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired,
    children: PropTypes.object,
};

export default PopupMenu;
