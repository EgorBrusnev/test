import Login from "../components/Login";
import { fetchSignIn } from "../actions/login";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
	response: state.response
});
const mapDispatchToProps = dispatch => ({
	signIn: (username, password, token = null) => dispatch(fetchSignIn({ username, password }, token)),
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);