import { Reducer } from 'redux';
import { LoadCartsTypes, LoadCartsActions } from '../actions/cartsActions';

export interface ICartsState {
  carts: Array<any>;
  loading: boolean;
  errorMessage: string;
}

const initialCartsState: ICartsState = {
  carts: [],
  loading: false,
  errorMessage: '',
};

export const cartsReducer: Reducer<ICartsState, LoadCartsActions> = (
    state = initialCartsState,
    action
  ) => {
    switch (action.type) {
      case LoadCartsTypes.LOAD_CARTS_STARTED: {
        return {
          ...state,
          loading: true
        };
      }
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
      default:
        return state;
    }
  };