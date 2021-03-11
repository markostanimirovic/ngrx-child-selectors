import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createChildSelectors } from 'ngrx-child-selectors';
import * as fromUsers from './users.reducer';

export const selectUserState = createFeatureSelector<fromUsers.State>('users');

export const { selectUsers, selectSearchTerm, selectSelectedUser } = createChildSelectors(
  selectUserState,
  fromUsers.initialState,
);

export const selectFilteredUsers = createSelector(
  selectUsers,
  selectSearchTerm,
  (users, searchTerm) => users.filter(u => u.includes(searchTerm)),
);

export const selectUsersPageViewModel = createSelector(
  selectFilteredUsers,
  selectSelectedUser,
  (filteredUsers, selectedUser) => ({ filteredUsers, selectedUser }),
);
