import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authActions";
import classnames from "classnames";
import "../../style/style.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    };

    render() {
        const {errors} = this.state;

        let alert;

        if(errors.emailnotfound) {
            alert = <div className="alert alert-danger">{errors.email}{errors.emailnotfound}</div>;
        }else if(errors.passwordincorrect) {
            alert = <div className="alert alert-danger">{errors.password}{errors.passwordincorrect}</div>;
        }

        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form noValidate onSubmit={this.onSubmit}>
						{alert}
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            placeholder="email address"
                            className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                        />

                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            placeholder="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                            })}
                        />

                        <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);
