import * as types from "../../actionTypes";
import * as url from "../../Constants";
import api from "../../utils/AxiosApi";


const onConversations = (conversations = []) => ({
	type: types.CONVERSATIONS,
	conversations
});

const onConversationCreate = (conversation = {}) => ({
	type: types.NEW_CONVERSATION,
	conversation
});

const onAllConversationsLoading = () => ({
	type: types.CONVERSATION_LIST_LOADING
});

const onConversationDeleted = (deletedConversation) => ({
	type: types.CONVERSAION_DELETED,
	deletedConversation
});


export const openConversation = (conversationId = null) => ({
	type: types.OPEN_CONVERSATION,
	conversationId
});

export const deleteConversation = (conversationId, userId) => (dispatch) => {
	api.post(url.deleteConversation, {
		conversationId,
		userId
	}).then(data => {
		dispatch(onConversationDeleted(data));
	}).catch(err => {
		console.log(err);
	});

};

export const fetchConversations = (userId) => (dispatch) => {
	dispatch(onAllConversationsLoading());
	api.get(url.allConversations + userId)
		.then(data => {
			dispatch(onConversations(data));
		})
		.catch(err => {
			console.log(err);
		});
};

export const newConversation = (user, recipient) => (dispatch) => {
	api.post(url.newConversation, {
		userId: user._id,
		recipient: recipient._id,
	}).then(data => {
		dispatch(onConversationCreate(data.newConversation));
	});
};