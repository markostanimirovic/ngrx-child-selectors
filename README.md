# NgRx Child Selectors

**Before:**

```ts
export const selectUserState = createFeatureSelector<fromUsers.State>('users');

export const selectUsers = createSelector(
  selectUserState,
  userState => userState.users,
);
export const selectLoading = createSelector(
  selectUserState,
  userState => userState.loading,
);
export const selectPagination = createSelector(
  selectUserState,
  userState => userState.pagination,
);

export const selectCurrentPage = createSelector(
  selectPagination,
  pagination => pagination.currentPage,
);
export const selectItemsPerPage = createSelector(
  selectPagination,
  pagination => pagination.itemsPerPage,
);
```

**After:**

```ts
export const selectUserState = createFeatureSelector<fromUsers.State>('users');

export const {
  selectUsers,
  selectLoading,
  selectPagination,
} = createChildSelectors(selectUserState, fromUsers.initialState);

export const {
  selectCurrentPage,
  selectItemsPerPage,
} = createChildSelectors(selectPagination, ['currentPage', 'itemsPerPage']);
```
