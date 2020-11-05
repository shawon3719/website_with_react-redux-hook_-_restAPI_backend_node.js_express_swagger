import React, { Component, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { useDispatch, useSelector } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const TheAdminLayout = React.lazy(() => import('./containers/TheAdminLayout'));

// Pages
const Login = React.lazy(() => import('./views/admin/login/Login'));
const Register = React.lazy(() => import('./views/admin/register/Register'));
const Page500 = React.lazy(() => import('./views/admin/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
            {/* //Admin Routes */}
              <Route exact path="/admin" name="Login Page" render={props => <LoginPage {...props}/>} />
              <Route path="/admin-index" name="Admin Dashboard" render={props => <TheAdminLayout {...props}/>} />
              <Route exact path="/admin-404" name="Page 404" render={props => <TheAdminLayout {...props}/>} />
              <Route exact path="/sliders" name="Sliders" render={props => <TheAdminLayout {...props}/>} />
              <Route exact path="/page-setup" name="Pages" render={props => <TheAdminLayout {...props}/>} />
              {/* <Route exact path="/contact" name="Pages" render={props => <TheAdminLayout {...props}/>} /> */}

              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
               <Route path="/page/id=:id" name="Home" render={props => <TheLayout {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
