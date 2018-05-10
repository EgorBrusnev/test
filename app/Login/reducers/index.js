import * as types from "../../actionTypes";


const initialState = {
	isAuthorized: false
};

export const fetchSignInResult = (state = initialState, action) => {
	switch (action.type) {
	case types.SUCCESS_SIGN_IN:
		return {
			...state,
			...action.response,
			isAuthorized: true
		};
	case types.FAILED_SIGN_IN:
		console.log("FAILED_SIGNIN")
		return {
			...state,
			...action.response,
			isAuthorized: false
		};
	case types.SUCCESS_REGISTRATION:
		return {
			...state,
			...action.response,
			isAuthorized: true
		};
	case types.FAILED_REGISTRATION:
		return {
			...state,
			...action.response,
			isAuthorized: false
		};
	default:
		return state;
	}
};