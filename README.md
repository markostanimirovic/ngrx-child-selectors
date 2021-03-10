# 🏭 NgRx Child Selectors

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Build Status](https://travis-ci.org/markostanimirovic/ngrx-child-selectors.svg?branch=master)](https://travis-ci.org/markostanimirovic/ngrx-child-selectors)
[![Coverage Status](https://coveralls.io/repos/github/markostanimirovic/ngrx-child-selectors/badge.svg?branch=master)](https://coveralls.io/github/markostanimirovic/ngrx-child-selectors)

**NgRx Plugin for Easy Creation of Child Selectors**

## Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Demo](#demo)
- [Comparison with `createSelector`](#comparison-with-createselector)

## Installation

NPM: `npm install ngrx-child-selectors`

Yarn: `yarn add ngrx-child-selectors`

> **Note:** NgRx Child Selectors lib requires TypeScript 4.1 or higher. 

## Getting Started

**UNDER_CONSTRUCTION**

## Demo

**UNDER_CONSTRUCTION**

## Comparison with `createSelector`

**UNDER_CONSTRUCTION**

The same selectors created using `createSelector` vs `createChildSelectors`.

### Using `createSelector`:

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

### Using `createChildSelectors`:

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
