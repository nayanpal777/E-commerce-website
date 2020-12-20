import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './cors/Home';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import signup from './user/SignUp';
import Dashboard from './user/Dashboard';
import Signin from './user/SignIn'
import Cart from './cors/Cart';

const Routes = ()=>{
    return(
        <div>
            {/* BrowserRouter is use for private Route if we not have private route we can skip this */}
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signup" exact component={signup}/>
                    <Route path="/signin" exact component={Signin}/>
                    <Route path="/cart" exact component={Cart}/>
                    <PrivateRoutes path="/user/dashboard" exact component={Dashboard}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Routes;