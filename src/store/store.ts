import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { ICartsState, cartsReducer } from '../reducers/cartsReducer';


export interface IAppState {
  cartsState: ICartsState
}


const rootReducer = combineReducers<IAppState>({
  cartsState: cartsReducer
});


export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
