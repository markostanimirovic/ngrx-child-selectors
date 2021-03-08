import { capitalize } from './helpers';
import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';

type RecordKeys<Rec extends Record<string, unknown>> = Array<keyof Rec & string>;

type ChildSelectors<
  State extends Record<string, unknown>,
  SelectedKeys extends RecordKeys<State>
> = {
  [Key in SelectedKeys[number] & string as `select${Capitalize<Key>}`]: MemoizedSelector<
    State,
    State[Key]
  >;
};

export function createChildSelectors<
  State extends Record<string, any>,
  SelectedKeys extends RecordKeys<State>
>(
  parentSelector: Selector<any, State>,
  selectedKeys: SelectedKeys,
): ChildSelectors<State, SelectedKeys>;

export function createChildSelectors<State extends Record<string, any>>(
  parentSelector: Selector<any, State>,
  objectWithSelectedKeys: State,
): ChildSelectors<State, RecordKeys<State>>;

export function createChildSelectors<
  State extends Record<string, any>,
  SelectedKeys extends RecordKeys<State>
>(
  parentSelector: Selector<any, State>,
  selectedKeysOrObject: SelectedKeys | State,
): ChildSelectors<State, SelectedKeys> {
  const childKeys = Array.isArray(selectedKeysOrObject)
    ? selectedKeysOrObject as string[]
    : Object.keys(selectedKeysOrObject) as string[];

  return childKeys.reduce(
    (childSelectors, childKey) => ({
      ...childSelectors,
      [`select${capitalize(childKey)}`]: createSelector(
        parentSelector,
        parentState => parentState[childKey],
      ),
    }),
    {} as ChildSelectors<State, SelectedKeys>,
  );
}
