import { FIND_USER } from "../../actionTypes";



export const contactsReducer = (state = {}, action) => {
	switch (action.type) {
	case FIND_USER:
		return {
			...state,
			searchUser: action.newUser
		};
	default:
		return state;
	}
};