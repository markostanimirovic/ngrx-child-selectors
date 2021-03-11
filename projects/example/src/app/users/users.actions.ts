import { createAction, props } from '@ngrx/store';

export const enter = createAction('[Users Page] Enter');
export const updateSearchTerm = createAction(
  '[Users Page] Update Search Term',
  props<{ searchTerm: string }>(),
);
