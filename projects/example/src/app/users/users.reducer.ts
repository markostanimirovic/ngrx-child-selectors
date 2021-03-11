import { createReducer, on } from '@ngrx/store';
import * as UsersPageActions from './users.actions';

export interface State {
  users: string[];
  selectedUser: string | null;
  searchTerm: string;
}

export const initialState: State = {
  users: ['marko', 'john', 'jimmy', 'steve', 'michael'],
  selectedUser: null,
  searchTerm: '',
};

export const reducer = createReducer(
  initialState,
  on(UsersPageActions.enter, () => initialState),
  on(UsersPageActions.selectUser, (state, { user }) => ({ ...state, selectedUser: user })),
  on(UsersPageActions.searchUsers, (state, { searchTerm }) => ({ ...state, searchTerm })),
);
