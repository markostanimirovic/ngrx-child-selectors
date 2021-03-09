import { capitalize } from './helpers';
import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';

type RecordKeys<R extends Record<string, unknown>> = Array<keyof R & string>;

export type ChildSelectors<
  AppState extends Record<string, unknown>,
  ParentState extends Record<string, unknown>,
  SelectedKeys extends RecordKeys<ParentState>
> = {
  [Key in SelectedKeys[number] & string as `select${Capitalize<Key>}`]: MemoizedSelector<
    AppState,
    ParentState[Key]
  >;
};

export function createChildSelectors<
  AppState extends Record<string, any>,
  ParentState extends Record<string, any>,
  SelectedKeys extends RecordKeys<ParentState>
>(
  parentSelector: Selector<AppState, ParentState>,
  selectedKeys: SelectedKeys,
): ChildSelectors<AppState, ParentState, SelectedKeys>;

export function createChildSelectors<
  AppState extends Record<string, any>,
  ParentState extends Record<string, any>
>(
  parentSelector: Selector<AppState, ParentState>,
  objectWithSelectedKeys: ParentState,
): ChildSelectors<AppState, ParentState, RecordKeys<ParentState>>;

export function createChildSelectors<
  AppState extends Record<string, any>,
  ParentState extends Record<string, any>,
  SelectedKeys extends RecordKeys<ParentState>
>(
  parentSelector: Selector<AppState, ParentState>,
  selectedKeysOrObject: SelectedKeys | ParentState,
): ChildSelectors<AppState, ParentState, SelectedKeys> {
  const selectedKeys = Array.isArray(selectedKeysOrObject)
    ? selectedKeysOrObject
    : Object.keys(selectedKeysOrObject);

  return selectedKeys.reduce(
    (childSelectors, selectedKey) => ({
      ...childSelectors,
      [`select${capitalize(selectedKey)}`]: createSelector(
        parentSelector,
        parentState => parentState[selectedKey],
      ),
    }),
    {} as ChildSelectors<AppState, ParentState, SelectedKeys>,
  );
}
