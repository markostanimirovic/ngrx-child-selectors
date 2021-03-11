import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsersPageViewModel } from './users.selectors';
import * as UsersPageActions from './users.actions';

@Component({
  selector: 'ngrx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  readonly vm$ = this.store.select(selectUsersPageViewModel);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(UsersPageActions.enter());
  }

  onSelectUser(user: string): void {
    this.store.dispatch(UsersPageActions.selectUser({ user }));
  }

  onSearchUsers({ target }: Event): void {
    const searchTerm = (target as HTMLInputElement).value;
    this.store.dispatch(UsersPageActions.searchUsers({ searchTerm }));
  }
}
