import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LoadCartsAction } from './actions/cartsActions';
import { AuthCheckAction } from './actions/authActions';

import Router from './router/router';
import { IAppState } from './store/store';


function App() {
  const isAuthed = useSelector((state: IAppState) => state.authState.isAuthed);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthCheckAction());
  }, [])

  useEffect(() => {
    dispatch(LoadCartsAction());
  }, [isAuthed])

  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;