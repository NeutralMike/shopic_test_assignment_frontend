import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ICartsState } from '../reducers/cartsReducer';


export enum AuthTypes {
  AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS',
  AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

export interface ILoginSuccessAction {
  type: AuthTypes.LOGIN_SUCCESS;
}

export interface ILoginFailureAction {
  type: AuthTypes.LOGIN_FAILURE;
  errors: object
}

export interface IAuthCheckSuccessAction {
  type: AuthTypes.AUTH_CHECK_SUCCESS;
}

export interface IAuthCheckFailureAction {
  type: AuthTypes.AUTH_CHECK_FAILURE;
}


export type AuthCheckActions = IAuthCheckSuccessAction | IAuthCheckFailureAction;
export type LoginActions = ILoginSuccessAction | ILoginFailureAction;


export const LoginAction: ActionCreator<ThunkAction<Promise<any>, ICartsState, null, ILoginSuccessAction>> = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/login/`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData
      }
      );
    if (result.status !== 200){
      dispatch(loginFailure(await result.json()));
    }
    else {
      dispatch(loginSuccess());
    }
  };
};


export const AuthCheckAction: ActionCreator<ThunkAction<Promise<any>, ICartsState, null, IAuthCheckSuccessAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/auth-check/`, {credentials: 'include'});
      if (result.status !== 200)
        throw new Error();
      dispatch(AuthCheckSuccess());
    } catch (err) {
      dispatch(AuthCheckFailure());
    };
  };
};


const loginSuccess = () => ({
  type: AuthTypes.LOGIN_SUCCESS
})

const loginFailure = (errors: any) => ({
  type: AuthTypes.LOGIN_FAILURE,
  errors
})

const AuthCheckSuccess = () => ({
  type: AuthTypes.AUTH_CHECK_SUCCESS
})

const AuthCheckFailure = () => ({
  type: AuthTypes.AUTH_CHECK_FAILURE,
})
