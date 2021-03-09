import { capitalize } from './helpers';
import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';

type RecordKeys<R extends Record<string, unknown>> = Array<keyof R & string>;

type ExtractState<S> = S extends Selector<infer State, unknown> ? State : never;

type ExtractResult<S> = S extends Selector<unknown, infer Result> ? Result : never;

type ChildSelectors<
  State extends object,
  Result extends Record<string, unknown>,
  SelectedKeys extends RecordKeys<Result>
> = {
  [Key in SelectedKeys[number] & string as `select${Capitalize<Key>}`]: MemoizedSelector<
    State,
    Result[Key]
  >;
};

export function createChildSelectors<
  State extends object,
  Result extends Record<string, any>,
  SelectedKeys extends RecordKeys<Result>
>(
  parentSelector: Selector<State, Result>,
  selectedKeys: SelectedKeys,
): ChildSelectors<State, Result, SelectedKeys>;

export function createChildSelectors<State extends object, Result extends Record<string, any>>(
  parentSelector: Selector<any, Result>,
  objectWithSelectedKeys: Result,
): ChildSelectors<State, Result, RecordKeys<Result>>;

export function createChildSelectors<
  State extends object,
  Result extends Record<string, any>,
  SelectedKeys extends RecordKeys<Result>
>(
  parentSelector: Selector<any, Result>,
  selectedKeysOrObject: SelectedKeys | Result,
): ChildSelectors<State, Result, SelectedKeys> {
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
    {} as ChildSelectors<State, Result, SelectedKeys>,
  );
}
