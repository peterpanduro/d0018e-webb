import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'
import Cookies from 'js-cookie'

class Header extends Component {

    logout() {
        Cookies.remove("jwt");
    }

    render() {
        const jwt = Cookies.get('jwt');
        var profile;
        if (jwt) {
            profile =(
                <div>
                    <li>
                        <Link to="/account">Konto</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={this.logout}>Logga ut</Link>
                    </li>
                </div>
            )
        } else {
           profile = (
                <div>
                    <li>
                        <Link to="/login">Logga in</Link>
                    </li>
                    <li>
                        <Link to="/register">Registrera profil</Link>
                    </li>
                </div>
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