import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ICart } from '../interfaces/ICart';
import { ICartsState } from '../reducers/cartsReducer';


export enum LoadCartsTypes {
  LOAD_CARTS_SUCCESS = 'LOAD_CARTS_SUCCESS',
  LOAD_CARTS_FAILURE = 'LOAD_CARTS_FAILURE',
  LOAD_CARTS_STARTED = 'LOAD_CARTS_STARTED',
  GET_CART_SUCCESS = 'GET_CART_SUCCESS',
  GET_CART_FAILURE = 'GET_CART_FAILURE',
  GET_CART_STARTED = 'GET_CART_STARTED',
}

export interface ILoadCartsSuccessAction {
  type: LoadCartsTypes.LOAD_CARTS_SUCCESS;
  carts: Array<ICart>;
}

export interface ILoadCartsFailureAction {
  type: LoadCartsTypes.LOAD_CARTS_FAILURE;
  errorMessage: string;
}

export interface ILoadCartsStartedAction {
  type: LoadCartsTypes.LOAD_CARTS_STARTED;
}

export interface IGetCartSuccessAction {
  type: LoadCartsTypes.GET_CART_SUCCESS;
  cart: ICart;
}

export interface IGetCartFailureAction {
  type: LoadCartsTypes.GET_CART_FAILURE;
  errorMessage: string;
}

export interface IGetCartStartedAction {
  type: LoadCartsTypes.GET_CART_STARTED;
}


export type LoadCartsActions = ILoadCartsSuccessAction | ILoadCartsFailureAction | ILoadCartsStartedAction;
export type GetCartActions = IGetCartSuccessAction | IGetCartFailureAction | IGetCartStartedAction;

export const LoadCartsAction: ActionCreator<ThunkAction<Promise<any>, ICartsState, null, ILoadCartsSuccessAction>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadCartsStarted());
    try {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/carts/`, {credentials: 'include'});
      if (result.status !== 200)
        throw new Error();
      dispatch(loadCartsSuccess(await result.json()));
    } catch (err) {
      dispatch(loadCartsFailure('Error while loading data from server'));
    };
  };
};

export const GetCartAction: ActionCreator<ThunkAction<Promise<any>, ICartsState, null, IGetCartSuccessAction>> = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(getCartStarted());
    try {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/carts/${id}/`, {credentials: 'include'});
      if (result.status !== 200)
        throw new Error();
      dispatch(getCartSuccess(await result.json()));
    } catch (err) {
      dispatch(getCartFailure('Error while loading data from server'));
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

const loadCartsSuccess = (carts: Array<ICart>) => ({
  type: LoadCartsTypes.LOAD_CARTS_SUCCESS,
  carts: carts
})

const getCartStarted = () => ({
  type: LoadCartsTypes.GET_CART_STARTED
})

const getCartFailure = (error: string) => ({
  type: LoadCartsTypes.GET_CART_FAILURE,
  errorMessage: error
})

const getCartSuccess = (cart: ICart) => ({
  type: LoadCartsTypes.GET_CART_SUCCESS,
  cart: cart
})