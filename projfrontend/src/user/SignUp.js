import React, { useState } from 'react';
import Base from '../cors/Base'
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper/index';
import '../style.css';

const SignUp = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });
    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                console.log(data);
                if (data.email === email) {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: false,
                        success: true
                    })
                } else {
                    setValues({
                        ...values,
                        error: true,
                        success: false
                    })
                }
            })
            .catch(err => console.log(err));
    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card bg-ligth p-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark font-weight-bold">Name</label>
                            <input type="text" className="form-control" value={name} onChange={handleChange("name")}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-dark font-weight-bold">Email</label>
                            <input type="email" className="form-control control-label" value={email} onChange={handleChange("email")}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-dark font-weight-bold">Password</label>
                            <input type="password" className="form-control control-label" value={password} onChange={handleChange("password")}></input>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successmsg = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 text-left">
                    <div className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New account created successfully. Please <Link to="/signin"><strong>login now!</strong></Link> 
                    </div>
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
                        Check all field again
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Base title="Sign Up page" description="Sign up for User">
            {successmsg()}
            {errormsg()}
            {signUpForm()}
        </Base>
    )
}

export default SignUp;