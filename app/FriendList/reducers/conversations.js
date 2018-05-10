import * as types from "../../actionTypes";

const initialState = {
	allConversations: [],
	isConversationListLoading: true,
	isConversationListSuccess: false
};

export const fetchConversationsResult = (state = initialState, action) => {
	switch (action.type) {
	case types.CONVERSATIONS:
		return {
			...state,
			allConversations: action.conversations,
			isConversationListLoading: false,
			isConversationListSuccess: true
		};
	case types.CONVERSATION_LIST_LOADING:
		return {
			...state,
			isConversationListLoading: true,
			isConversationListSuccess: false
		};
	case types.NEW_CONVERSATION:
		return {
			...state,
			allConversations: [...state.allConversations, action.conversation]
		};
	case types.OPEN_CONVERSATION:
		return {
			...state,
			currentConversationId: action.conversationId
		};
	case types.CONVERSAION_DELETED:
		var newState = { ...state };
		var conversation = newState.allConversations.find(x => x._id == action.deletedConversation._id);
		newState.allConversations.forEach((value, index, array) => {
			if (value._id == action.deletedConversation._id) {
				newState.allConversations[index] = action.deletedConversation;
				return;
			}
		});
		return {
			...state,
			allConversations: [...newState.allConversations]
		};
	default:
		return state;
	}
};