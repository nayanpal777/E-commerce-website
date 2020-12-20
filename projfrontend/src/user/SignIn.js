import React, { useState } from 'react';
import Base from '../cors/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';


const Signin = () => {

    const [values, setvalues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false,
        loading: false,
        didRedirect: false
    });

    const { email, password, error, success, loading, didRedirect } = values;

    const handleChange = (val) => (event) => {
        setvalues({ ...values, error: false, [val]: event.target.value });
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setvalues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                console.log("DATA", data);
                if (data.token) {
                    //const sessionToken = data.token;
                    authenticate(data, () => {
                        console.log('Token Added');
                        setvalues({
                            ...values,
                            didRedirect: true
                        })
                    });
                } else if (data.error) {
                    setvalues({
                        ...values,
                        error: true
                    })
                } else {
                    setvalues({
                        ...values,
                        loading: false
                    })
                }
            })
            .catch(e => console.log(e));
    }

    const performRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingmsg = () => {
        return (
            loading && (
                <div className="row">
                    <div className="col-md-6 offset-md-3 alert alert-info">
                        <h5>Loading....</h5>
                    </div>
                </div>
            )
        )
    }
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card bg-ligth p-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark font-weight-bold">Email</label>
                            <input type="email" className="form-control control-label" value={email} onChange={handleChange("email")}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-dark font-weight-bold">Password</label>
                            <input type="password" className="form-control control-label" value={password} onChange={handleChange("password")}></input>
                        </div>
                        <div className="text-center">
                            <button onClick={onSubmit} className="btn btn-success">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    const errormsg = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 text-left">
                    <div className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        Error in Login.. Please check <strong>Email</strong> or<strong> Password</strong> it is Invalid
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signin Page">
            {loadingmsg()}
            {errormsg()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin;