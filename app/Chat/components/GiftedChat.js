import { GiftedChat } from "react-native-gifted-chat";
import React, { Component } from "react";
import { View } from "react-native";
import { addMessageReceiver } from "../../utils/XmppListener";
import MessageText from "./MessageText";
import CustomComposer from "./CustomComposer";
import { Container, Text } from "native-base";
import renderSpinner from "../../Spinner";
import { indicatorStyles } from "../../styles";
import _ from "lodash";
import I18n from "../../utils/i18n";
import { translations } from "../../Constants";


class Chat extends Component {
	constructor(props) {
		super(props);
		addMessageReceiver((newMessage) => this.props.receiveMessage(newMessage));
		this.state = {
			currentConversation: {
				members: [],
				messages: []
			}
		};
	}



	componentWillMount() {
		this.props.fetchMessages(this.props.currentConversationId);
	}

	componentWillReceiveProps(props) {
		this.recipient = props.currentConversation.members.filter((x) => { return x._id !== this.props.user._id; });
		if (this.recipient.length === 0) this.recipient = [this.props.user];
	}

	renderChat() {
		const sendMessage = messages => { this.props.sendMessage(messages[0].user._id, messages[0].text, _id, this.recipient[0].username, messages[0].type); }
		var { _id } = this.props.currentConversation;
		if (this.props.isConversationSuccess) {
			return (
				<GiftedChat
					messages={this.props.currentConversation.messages}
					onSend={sendMessage}
					renderMessageText={(messageTextProps) => {
						return <MessageText {...messageTextProps} />;
					}}
					renderComposer={(props) => {
						return <CustomComposer {...props} customProps={this.props} />;
					}}
					user={{
						_id: this.props.user._id
					}}
				/>
			);
		} else return null;
	}

	render() {
		return (
			<Container>
				{renderSpinner(this.props.isConversationLoading)}
				{this.renderEmpty()}
				{this.renderChat()}
			</Container>
		);
	}

	renderEmpty() {
		if (this.props.isConversationSuccess) {
			if (_.isEmpty(this.props.currentConversation.messages)) {
				return (
					<View style={indicatorStyles.center} >
						<Text>{I18n.t("chat.emptyMessage")}</Text>
					</View>
				);
			}
		}
	}
}

export default Chat;