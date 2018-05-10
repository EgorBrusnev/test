import React, { Component } from "react";
import FriendList from "../components/FriendList";
import { connect } from "react-redux";
import { ListView } from "react-native";
import { fetchConversations, newConversation, openConversation, deleteConversation } from "../actions/conversations";
import { findUser } from "../actions/contacts";
import { onLogout } from "../../Login/actions/login";
import { changeLang } from "../../translations/action";

const dataSource = new ListView.DataSource({
	rowHasChanged: (r1, r2) => {
		return r1 !== r2;
	}
});


const mapStateToProps = (state, props) => {
	var user = state.response.user,
		conversations = state.conversations.allConversations;
	return ({
		contacts: state.contacts,
		conversations,
		user,
		isConversationListLoading: state.conversations.isConversationListLoading,
		isConversationListSuccess: state.conversations.isConversationListSuccess,
		dataSource: dataSource.cloneWithRows(conversations)
	});
};

const mapDispatchToProps = (dispatch) => ({
	fetchConversations: (userId) => dispatch(fetchConversations(userId)),
	addConversation: (user, recipient) => dispatch(newConversation(user, recipient)),
	findUser: (username) => dispatch(findUser(username)),
	openConversation: (id) => dispatch(openConversation(id)),
	logout: () => dispatch(onLogout()),
	deleteConversation: (id, userId) => dispatch(deleteConversation(id, userId)),
	setLocale: (locale) => dispatch(changeLang(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);