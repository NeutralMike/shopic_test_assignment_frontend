import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { ICartsState, cartsReducer } from '../reducers/cartsReducer';
import { IAuthState, authReducer } from '../reducers/authReducer';


export interface IAppState {
  cartsState: ICartsState,
  authState: IAuthState
}


const rootReducer = combineReducers<IAppState>({
  cartsState: cartsReducer,
  authState: authReducer
});


export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
