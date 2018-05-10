import React, { Component } from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import {
    Container,
    Text,
    Item,
    Card,
    CardItem,
    Body
} from 'native-base';
import {
    Grid,
    Col,
    Row
} from 'react-native-easy-grid';

import navigator from "../../navigator";

import _ from 'lodash';

class FriendItem extends Component {

    recipient = [
        {
            member: {}
        }
    ]

    constructor(props) {
        super(props);
        this.calculateRecipient(props);
    }

    calculateRecipient(props) {
        this.recipient = props.conversation.members.filter((x) => { return x.member._id !== props.user._id });
        if (_.isEmpty(this.recipient)) this.recipient = [{ member: { ...props.user, name: props.user.name + " (ME)" } }]
    }

    componentWillReceiveProps(props) {
        this.calculateRecipient(props)
    }

    _onLongPress() {
        this.props.openModal(true, this.props.conversation._id)
    }

    _onPress() {
        this.props.openConversation(this.props.conversation._id);
        navigator.go(this, navigator.routes.CHAT);
    }

    render() {
        const onPress = () => this._onPress();
        const onLongPress = () => this._onLongPress();
        return (
            <View>
                <TouchableOpacity
                    delayLongPress={1000}
                    onPress={onPress}
                    onLongPress={onLongPress}
                >
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>{_.first(this.recipient).member.name}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View >
        )
    }
}

export default FriendItem;