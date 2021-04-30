import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';

export function createChildSelector<
  AppState extends Record<string, any>,
  ParentState extends Record<string, any>,
  SelectedKey extends keyof ParentState
>(
  parentSelector: Selector<AppState, ParentState>,
  selectedKey: SelectedKey,
): MemoizedSelector<AppState, ParentState[SelectedKey]> {
  return createSelector(parentSelector, parentState => parentState[selectedKey]);
}
