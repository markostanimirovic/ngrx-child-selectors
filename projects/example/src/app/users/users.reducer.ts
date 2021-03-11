import { createReducer, on } from '@ngrx/store';
import * as UsersPageActions from './users.actions';

export interface State {
  users: string[];
  searchTerm: string;
}

export const initialState: State = {
  users: ['marko', 'john', 'jimmy', 'steve', 'michael'],
  searchTerm: '',
};

export const reducer = createReducer(
  initialState,
  on(UsersPageActions.enter, () => initialState),
  on(UsersPageActions.updateSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm })),
);
