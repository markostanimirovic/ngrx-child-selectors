import { createAction, props } from '@ngrx/store';

export const enter = createAction('[Users Page] Enter');
export const selectUser = createAction('[Users Page] Select User', props<{ user: string }>());
export const searchUsers = createAction(
  '[Users Page] Search Users',
  props<{ searchTerm: string }>(),
);
