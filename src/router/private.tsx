import { Route, Redirect } from "react-router-dom";
import HomePage from '../pages/homePage';


function PrivateRoute({ children, ...rest }: any) {
  let auth = {user: false};
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PrivateRouter() {

  return (
    <div>
      <PrivateRoute path="/">
        <HomePage/>
      </PrivateRoute>
    </div>
  );
}

export default PrivateRouter;