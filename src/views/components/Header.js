import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox'

class Header extends Component {
    render() {
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
                    <li>
                        <Link to="/login">Logga in</Link>
                    </li>
                    <li>
                        <Link to="/register">Registrera profil</Link>
                    </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;