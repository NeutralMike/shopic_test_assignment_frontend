import { Route } from "react-router-dom";
import LoginPage from '../pages/loginPage';

function PublicRouter() {

  return (
    <div>
      <Route path="/login" exact component={LoginPage} />
    </div>
  );
}

export default PublicRouter;