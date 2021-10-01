import { Reducer } from 'redux';
import { AuthTypes, LoginActions, AuthCheckActions } from '../actions/authActions';


export interface IAuthState {
  isAuthed: boolean;
  errors: any;
}

const initialAuthState: IAuthState = {
  isAuthed: false,
  errors: {
    password: '',
    username: '',
    general: '',
  },
};

export const authReducer: Reducer<IAuthState, LoginActions | AuthCheckActions> = (
    state = initialAuthState,
    action
  ) => {
    switch (action.type) {
      case AuthTypes.AUTH_CHECK_FAILURE: {
        return {
          ...state,
          isAuthed: false,
        };
      }
      case AuthTypes.LOGIN_FAILURE: {
        return {
          ...state,
          isAuthed: false,
          errors: {
            ...{
              password: '',
              username: '',
              general: '',
            },
            ...action.errors
          },
        };
      }
      case AuthTypes.AUTH_CHECK_SUCCESS:
      case AuthTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          isAuthed: true,
          errors: {
            password: '',
            username: '',
            general: '',
          },
        };
      }
      default:
        return state;
    }
  };