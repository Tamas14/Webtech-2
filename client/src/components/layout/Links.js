import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import $ from "jquery";

const Collapse = styled.div.attrs({
    className: 'collapse navbar-collapse',
    id: 'navbarNavDropdown'
})``

const List = styled.ul.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.li.attrs({
    className: 'nav-item',
})``

const RightList = styled.div.attrs({
    className: 'navbar-nav',
})``

class Links extends Component {
    constructor(props) {
        super(props)

        this.state = {isLoggedIn: (!!localStorage.jwtToken),
                    smallForm: (window.innerWidth > 992)}
    }

    responsive() {
        this.setState({smallForm: (window.innerWidth >= 992)});
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let RightItem, Logout;

        if (!isLoggedIn) {
            RightItem = <Item><Link to="login" className="nav-link">Login</Link></Item>;
        } else {
            if(this.state.smallForm)
                RightItem = <Item><h3 className="text-light">Hello, {jwt_decode(localStorage.jwtToken).name}</h3></Item>;

            Logout = <Item><Link to="/" onClick={this.onLogoutClick} className="nav-link">Logout</Link></Item>;
        }

        return (
            <React.Fragment>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"
                        id="dropdownButton">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Collapse>
                    <List>
                        <Item classname={"active"}>
                            <Link to="/" className="navbar-brand">
                                Library
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/books/list" className="nav-link">
                                List Books
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/books/create" className="nav-link">
                                Create Book
                            </Link>
                        </Item>
                    </List>
                    <RightList isLoggedIn={isLoggedIn}>
                        {RightItem}
                        {Logout}
                    </RightList>
                </Collapse>
            </React.Fragment>
        )
    }

    componentDidMount() {
        $(document).ready(() => {
            $(".navbar-nav>li>a").on('click', () => {
                if (!this.state.smallForm) {
                    $('#dropdownButton').trigger("click");
                }
            });
        });

        window.addEventListener("resize", this.responsive.bind(this));
    }
}

Links.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Links);