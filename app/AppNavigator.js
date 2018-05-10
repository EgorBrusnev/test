import MessangerApp from "./Chat/containers/MessengerApp";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import LoginApp from "./Login/containers/LoginApp";
import FriendListApp from "./FriendList/containers/FriendListApp";
import Chat from "./Chat/containers/MessengerApp";
import { Provider, connect } from "react-redux";
import Registration from "./Login/containers/RegistrationApp";
import { routes } from "./Constants"

export const AppNavigator = StackNavigator(
	{
		Registration: {
			screen: Registration
		},
		Login: {
			screen: LoginApp
		},
		FriendList: {
			screen: FriendListApp
		},
		Chat: {
			screen: Chat
		}
	},
	{
		initialRouteName: routes.LOGIN
	}
);

const AppWithNavigationState = ({ dispatch, nav }) => (
	<AppNavigator
		navigation={addNavigationHelpers({ dispatch, nav })} />
);

const mapStateToProps = state => ({
	nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);