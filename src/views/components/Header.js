import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'
import Cookies from 'js-cookie'

class Header extends Component {

    constructor() {
        super();
    }

    logout() {
        Cookies.remove("jwt");
    }

    logoutButtonPressed(e) {
        this.logout();
        this.forceUpdate();
    }

    render() {
        const jwt = Cookies.get('jwt');
        var profile;
        if (jwt) {
            profile =(
                <>
                    <li>
                        <Link to="/account">Konto</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={this.logoutButtonPressed.bind(this)}>Logga ut</Link>
                    </li>
                </>
            )
        } else {
           profile = (
                <>
                    <li>
                        <Link to="/login">Logga in</Link>
                    </li>
                    <li>
                        <Link to="/register">Registrera profil</Link>
                    </li>
                </>
            ) 
        }
        return (
            <header className="App-header">
                <nav className="Navbar">
                    <ul>
                    <li><SearchBox/></li>
                    <li>
                        <Link to="/">Startsida</Link>
                    </li>
                    <li>
                        <Link to="/products">Produkter</Link>
                    </li>
                    {profile}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;