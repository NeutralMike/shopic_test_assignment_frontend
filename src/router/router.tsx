import PublicRouter from './public';
import PrivateRouter from './private';

function Router() {

  return (
    <div>
      <PublicRouter/>
      <PrivateRouter/>
    </div>
  );
}

export default Router;