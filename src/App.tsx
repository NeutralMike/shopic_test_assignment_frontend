import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { LoadCartsAction } from './actions/cartsActions';

import Router from './router/router';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('loadCarts')
    dispatch(LoadCartsAction())
  }, [])

  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;