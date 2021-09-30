import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ICartsState } from '../reducers/cartsReducer';


export enum LoadCartsTypes {
  LOAD_CARTS_SUCCESS = 'LOAD_CARTS_SUCCESS',
  LOAD_CARTS_FAILURE = 'LOAD_CARTS_FAILURE',
  LOAD_CARTS_STARTED = 'LOAD_CARTS_STARTED',
}

export interface ILoadCartsSuccessAction {
  type: LoadCartsTypes.LOAD_CARTS_SUCCESS;
  carts: any;
}

export interface ILoadCartsFailureAction {
  type: LoadCartsTypes.LOAD_CARTS_FAILURE;
  errorMessage: string;
}

export interface ILoadCartsStartedAction {
  type: LoadCartsTypes.LOAD_CARTS_STARTED;
}

export type LoadCartsActions = ILoadCartsSuccessAction | ILoadCartsFailureAction | ILoadCartsStartedAction;

export const LoadCartsAction: ActionCreator<ThunkAction<Promise<any>, ICartsState, null, ILoadCartsSuccessAction>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadCartsStarted());
    try {
      console.log('ok');
      let result = await fetch(`http://127.0.0.1:8000/api/carts/`, {credentials: 'same-origin'});
      console.log(result);
      if (result.status !== 200)
        throw new Error();
      dispatch(loadCartsSuccess(await result.json()));
    } catch (err) {
      dispatch(loadCartsFailure('Error while loading data from server'));
    };
  };
};

const loadCartsStarted = () => ({
  type: LoadCartsTypes.LOAD_CARTS_STARTED
})

const loadCartsFailure = (error: string) => ({
  type: LoadCartsTypes.LOAD_CARTS_FAILURE,
  errorMessage: error
})

const loadCartsSuccess = (carts: Array<any>) => ({
  type: LoadCartsTypes.LOAD_CARTS_SUCCESS,
  carts: carts
})