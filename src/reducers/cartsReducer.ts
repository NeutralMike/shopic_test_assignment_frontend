import { Reducer } from 'redux';
import { LoadCartsTypes, LoadCartsActions, GetCartActions } from '../actions/cartsActions';
import { ICart } from '../interfaces/ICart';

export interface ICartsState {
  carts: Array<ICart>;
  loading: boolean;
  errorMessage: string;
}

const initialCartsState: ICartsState = {
  carts: [],
  loading: false,
  errorMessage: '',
};

export const cartsReducer: Reducer<ICartsState, LoadCartsActions | GetCartActions> = (
    state = initialCartsState,
    action
  ) => {
    switch (action.type) {
      case LoadCartsTypes.GET_CART_STARTED:
      case LoadCartsTypes.LOAD_CARTS_STARTED: {
        return {
          ...state,
          loading: true
        };
      }
      case LoadCartsTypes.GET_CART_FAILURE:
      case LoadCartsTypes.LOAD_CARTS_FAILURE: {
        return {
          ...state,
          loading: false,
          errorMessage: action.errorMessage

        };
      }
      case LoadCartsTypes.LOAD_CARTS_SUCCESS: {
        return {
          ...state,
          errorMessage: '',
          loading: false,
          carts: action.carts
        };
      }
      case LoadCartsTypes.GET_CART_SUCCESS: {
        return {
          ...state,
          errorMessage: '',
          loading: false,
          carts: state.carts.map(cart => cart.id === action.cart.id ? action.cart : cart)
        }
      }
      default:
        return state;
    }
  };