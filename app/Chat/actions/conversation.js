import { AppState } from "react-native";
import { sendXMPPMessage } from "../../utils/XmppListener";
import RNFetchBlob from "react-native-fetch-blob";
import * as types from "../../actionTypes";
import * as url from "../../Constants";
import api from "../../utils/AxiosApi";




const onConversationFetched = (currentConversation = {}) => ({
	type: types.CONVERSATION_SUCCESS,
	currentConversation
});

const onMessageSent = (newMessage = {}) => ({
	type: types.MESSAGE_SENT,
	newMessage
});

const onConversationLoading = () => ({
	type: types.CONVERSATION_LOADING,
});

const onStickersLoading = () => ({
	type: types.STICKERS_LOADING
});

const onStickersFetched = (stickers) => ({
	type: types.STICKERS_SUCCESS,
	stickers
});

export const fetchOneConversation = (id) => (dispatch) => {
	dispatch(onConversationLoading());
	api.get(url.chat + id)
		.then(data => {
			dispatch(onConversationFetched(data));
		}).catch(err => {
			console.log(err);
		})

};

export const receiveMessage = (newMessage = {}) => ({
	type: types.RECEIVE_MESSAGE,
	newMessage
});

export const sendMessage = (from, messageBody, conversationId, to, isConversationOpen = false, type = "text") => (dispatch) => {
	api.post(url.sendMessage, {
		type,
		conversationId,
		messageBody,
		userId: from
	}).then(data => {
		if (isConversationOpen) {
			sendXMPPMessage(data, to);
			dispatch(onMessageSent(data.newMessage));
		}
	});
};


export const getStickers = () => (dispatch) => {
	dispatch(onStickersLoading());
	api.get(url.allStickersUrl)
		.then(data => {
			dispatch(onStickersFetched(data));
		})
		.catch(err => {
			console.log(err);
		});
};