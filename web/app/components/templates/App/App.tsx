import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppStyle, { GlobalStyle } from './App.style';
import Home from '../Home';
import Dashboard from '../Dashboard';
import * as React from 'react';
import theme from '../../../styles/theme';
import Signup from '../Signup';
import Profile from '../Profile';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import Endpoint from '../../../api/endpoint';
import FillCv from '../FillCv';
import FeatureUnavailable from '../FeatureUnavailable';
export let firebaseStore : any = null;

firebase.initializeApp(Endpoint.production.FIRE_BASE);
let storage: any = firebase.storage();
firebaseStore = {
  storage,
  firebase: firebase
}

export default (props: any) => {
    return (
        <ThemeProvider theme={theme}>
            <AppStyle>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={ Home }></Route>
                        <Route path="/dashboard" component={ Dashboard }></Route>
                        <Route path="/register" component={ Signup }></Route>
                        <Route path="/profile" component={ Profile }></Route>
                        <Route path="/fill-in/:template_id?" component={ FillCv }></Route>
                        <Route path="/under-dev" component={ FeatureUnavailable }></Route>
                    </Switch>
                </BrowserRouter>
                <GlobalStyle />
            </AppStyle>
        </ThemeProvider>
    )
}