import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';


const currenttab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" }
    } else {
        return { color: "#FFFFFF" }
    }
}

const Menu = ({ history, path }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark pt-1">
                <li className="nav-item">
                    <Link style={currenttab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>
                {isAuthenticated() && (
                    <li className="nav-item">
                        <Link style={currenttab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
                    </li>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <Link style={currenttab(history, "/user/Dashboard")} className="nav-link" to="/user/Dashboard">Dashboard</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link style={currenttab(history, "/signUp")} className="nav-link" to="/signUp">SignUp</Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currenttab(history, "/signIn")} className="nav-link" to="/signIn">SignIn</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <button
                            onClick={() => {
                                signout(() => {
                                    history.push("/");
                                })
                            }}
                            className="nav-link text-warning">Signout</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu);