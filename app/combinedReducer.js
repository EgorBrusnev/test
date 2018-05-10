import * as types from "./actionTypes";
import { combineReducers } from "redux";
import { fetchSignInResult } from "./Login/reducers";
import { ChatReducer } from "./Chat/reducers/conversation";

import { AppNavigator } from "./AppNavigator";
import { fetchConversationsResult } from "./FriendList/reducers/conversations";
import { contactsReducer } from "./FriendList/reducers/contacts";
import storage from "redux-persist/lib/storage";
import { reducer as i18n } from "react-native-redux-i18n";
import { langReducer } from "./translations/reducer";




const router = AppNavigator.router;
const mainNavAction = router.getActionForPathAndParams("Login");
const initialState = router.getStateForAction(mainNavAction);

const navReducer = (state = initialState, action) => {
	return router.getStateForAction(action, state);
};


const messagerAppReducer = combineReducers({
	i18n,
	response: fetchSignInResult,
	nav: navReducer,
	conversations: fetchConversationsResult,
	contacts: contactsReducer,
	chat: ChatReducer,
	locale: langReducer
});

const rootReducer = (state, action) => {
	if (action.type == types.LOGOUT) {
		Object.keys(state).forEach(key => {
			storage.removeItem(`persist:${key}`);
		});
		state = undefined;
	}
	return messagerAppReducer(state, action);
};



export default rootReducer;