# 🏭 NgRx Child Selectors

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![NPM](https://img.shields.io/npm/v/ngrx-child-selectors)](https://www.npmjs.com/package/ngrx-child-selectors)
[![Build Status](https://travis-ci.org/markostanimirovic/ngrx-child-selectors.svg?branch=master)](https://travis-ci.org/markostanimirovic/ngrx-child-selectors)
[![Coverage Status](https://coveralls.io/repos/github/markostanimirovic/ngrx-child-selectors/badge.svg?branch=master)](https://coveralls.io/github/markostanimirovic/ngrx-child-selectors)

**NgRx Plugin for Easy Creation of Child Selectors**

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Comparison with `createSelector`](#comparison-with-createselector)

## Installation

NPM: `npm install ngrx-child-selectors`

Yarn: `yarn add ngrx-child-selectors`

> **Note:** NgRx Child Selectors library requires TypeScript 4.1 or higher. 

## Usage

NgRx Child Selectors plugin provides `createChildSelectors` function that is used to create memoized
and strongly typed child selectors based on the parent selector. It accepts the parent selector as the first,
and the object that has the same type as the return value of the parent selector as the second argument:

```ts
export interface State {
  users: User[];
  loading: boolean;
  pagination: Pagination;
}

export const initialState: State = {
  users: [],
  loading: false,
  pagination: { currentPage: 1, itemsPerPage: 10 },
};

export const selectUserState = createFeatureSelector<State>('users');

export const {
  selectUsers,
  selectLoading,
  selectPagination,
} = createChildSelectors(selectUserState, initialState);

export const {
  selectCurrentPage,
  selectItemsPerPage,
} = createChildSelectors(selectPagination, initialState.pagination);
```

> **Tip:** Use the initial state as the second argument when the parent selector is a feature selector.

Also, there is another signature of `createChildSelectors` function. It accepts the array of the parent state
keys as the second argument and creates selectors for the passed keys:

```ts
const {
  selectUsers,
  selectLoading,
} = createChildSelectors(selectUserState, ['users', 'loading']);
```

## Demo

**UNDER_CONSTRUCTION**

## Comparison with `createSelector`

In the example below you can see the same selectors created with `createSelector` vs `createChildSelectors`.

### `createSelector`

```ts
export const selectUserState = createFeatureSelector<State>('users');

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

### `createChildSelectors`

```ts
export const selectUserState = createFeatureSelector<State>('users');

export const {
  selectUsers,
  selectLoading,
  selectPagination,
} = createChildSelectors(selectUserState, initialState);

export const {
  selectCurrentPage,
  selectItemsPerPage,
} = createChildSelectors(selectPagination, initialState.pagination);
```
