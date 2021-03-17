import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import * as AuthActions from '../auth.actions'

export interface AuthState {
  user:User
}

export const intialState: AuthState ={
  user: undefined
}

// export const reducers: ActionReducerMap<AuthState> = {

// };

export const authReducer = createReducer(
  intialState,

  on(AuthActions.login, (state, action) =>{
    return{
      user: action.user
    }
  }),
  on(AuthActions.logout, (state,action) => {
    return{
      user: undefined
    }
  })

)
