import * as types from "../../actionTypes";

const initialState = {
	currentConversation: {},
	isConversationLoading: true,
	isConversationSuccess: false,
	stickers: [],
	isStickersLoading: true,
	isStickersSuccess: false
};


export const ChatReducer = (state = initialState, action) => {
	switch (action.type) {
	case types.MESSAGE_SENT:
		return {
			...state,
			currentConversation: {
				...state.currentConversation,
				messages: [
					action.newMessage,
					...state.currentConversation.messages
				]
			}
		};
	case types.CONVERSATION_LOADING:
		return {
			...state,
			isConversationSuccess: false,
			isConversationLoading: true
		};
	case types.CONVERSATION_SUCCESS:
		return {
			...state,
			currentConversation: action.currentConversation,
			isConversationSuccess: true,
			isConversationLoading: false
		};
	case types.RECEIVE_MESSAGE:
		return {
			...state,
			currentConversation: {
				...state.currentConversation,
				messages: [
					action.newMessage,
					...state.currentConversation.messages
				]
			}
		};
	case types.STICKERS_LOADING:
		return {
			...state,
			isStickersLoading: true,
			isStickersSuccess: false
		};
	case types.STICKERS_SUCCESS:
		return {
			...state,
			stickers: action.stickers,
			isStickersLoading: false,
			isStickersSuccess: true
		};
	default:
		return state;
	}
};