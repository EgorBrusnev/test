import React, { Component } from "react";
import { sendMessage, fetchOneConversation, receiveMessage, getStickers } from "../actions/conversation";
import { connect } from "react-redux";
import { ListView } from "react-native";
import Chat from "../components/GiftedChat";


const dataSource = new ListView.DataSource({
	rowHasChanged: (r1, r2) => {
		return r1 !== r2;
	}
});

const mapStateToProps = (state, props) => {
	return ({
		user: state.response.user,
		currentConversationId: state.conversations.currentConversationId,
		currentConversation: state.chat.currentConversation,
		isConversationLoading: state.chat.isConversationLoading,
		isConversationSuccess: state.chat.isConversationSuccess,
		isStickersLoading: state.chat.isStickersLoading,
		isStickersSuccess: state.chat.isStickersSuccess,
		stickers: state.chat.stickers,
		error: state.chat.error
	});
};

const mapDispatchToProps = dispatch => ({
	sendMessage: (from, body, convId, to, type) => {
		dispatch(sendMessage(from, body, convId, to, true, type));
	},
	fetchMessages: (id, resolve, reject) => {
		dispatch(fetchOneConversation(id, resolve, reject));
	},
	receiveMessage: (newMessage) => {
		dispatch(receiveMessage(newMessage));
	},
	getStickers: () => {
		dispatch(getStickers());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);