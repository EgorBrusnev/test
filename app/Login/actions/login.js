import * as types from "../../actionTypes";
import * as url from "../../Constants";
import api from "../../utils/AxiosApi";

const onSuccessSignIn = (response) => ({
	type: types.SUCCESS_SIGN_IN,
	response: response
});

const onFailedSignIn = (response) => ({
	type: types.FAILED_SIGN_IN,
	response: response
});

const onSuccessRegistration = (response) => ({
	type: types.SUCCESS_REGISTRATION,
	response: response
});

const onFailedRegistration = (response) => ({
	type: types.FAILED_REGISTRATION,
	response: response
});

export const onLogout = () => ({
	type: types.LOGOUT
});


export const fetchSignIn = (user, token) => (dispatch) => {
	console.log("SIGNIN");
	if (token !== null) {
		user.token = token;
	}
	api.post(url.signIn, user)
		.then((data) => {
			if (data.success) {
				dispatch(onSuccessSignIn(data));
			} else {
				dispatch(onFailedSignIn(data));
			}
		})
		.catch(error => {
			console.log(error);
		});
};

export const fetchRegistration = (user) => (dispatch) => {
	api.post(url.registration,
		{
			username: user.username,
			password: user.password,
			name: user.name
		})
		.then(data => {
			if (data.success) {
				dispatch(onSuccessRegistration(data));
			} else {
				dispatch(onFailedRegistration(data));
			}
		})
		.catch(error => {
			console.log(error);
		});
};