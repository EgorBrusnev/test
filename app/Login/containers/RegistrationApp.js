import Registration from "../components/Registration";
import { fetchRegistration } from "../actions/login";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
	response: state.response
});
const mapDispatchToProps = dispatch => ({
	register: (username, password, name) => dispatch(fetchRegistration({ username, name, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);