import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectUsersPageViewModel } from './users.selectors';
import * as UsersPageActions from './users.actions';

@Component({
  selector: 'ngrx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private readonly destroy = new Subject();
  readonly searchControl = new FormControl('');
  readonly vm$ = this.store.select(selectUsersPageViewModel);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(UsersPageActions.enter());

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(searchTerm => this.store.dispatch(UsersPageActions.searchUsers({ searchTerm })));
  }

  onSelectUser(user: string): void {
    this.store.dispatch(UsersPageActions.selectUser({ user }));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
