import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';


function PrivateRoute({ children, ...rest }: any) {
  const isAuthed = useSelector<IAppState, boolean>((state: IAppState) => state.authState.isAuthed);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthed ? (
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

export default PrivateRoute;