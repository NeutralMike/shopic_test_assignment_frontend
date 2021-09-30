import PrivateRoute from './private';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from "react-router-dom";
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';

function Router() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute path="/">
          <HomePage/>
      </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;