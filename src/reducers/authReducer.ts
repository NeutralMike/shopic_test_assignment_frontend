import { Reducer } from 'redux';
import { AuthTypes, LoginActions, AuthCheckActions } from '../actions/authActions';


export interface IAuthState {
  isAuthed: boolean;
}

const initialAuthState: IAuthState = {
  isAuthed: false,
};

export const authReducer: Reducer<IAuthState, LoginActions | AuthCheckActions> = (
    state = initialAuthState,
    action
  ) => {
    switch (action.type) {
      case AuthTypes.AUTH_CHECK_FAILURE:
      case AuthTypes.LOGIN_FAILURE: {
        return {
          ...state,
          isAuthed: false,
        };
      }
      case AuthTypes.AUTH_CHECK_SUCCESS:
      case AuthTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          isAuthed: true,
        };
      }
      default:
        return state;
    }
  };