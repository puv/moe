import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from './signin/page';
import SignUp from './signup/page';
import Forgot from './forgot/page';
import TwoFactor from './2fa/page';


export default function AuthPageComponent() {
    return (
        <div className="h-full grid place-content-center">
            <Router>
                <Switch>
                    <Route exact path="/auth">
                        <SignIn />
                    </Route>
                    <Route path="/auth/signin">
                        <SignIn />
                    </Route>
                    <Route path="/auth/signup">
                        <SignUp />
                    </Route>
                    <Route path="/auth/forgot">
                        <Forgot />
                    </Route>
                    <Route path="/auth/2fa">
                        <TwoFactor />
                    </Route>
                </Switch>
            </Router >
        </div>
    );
}