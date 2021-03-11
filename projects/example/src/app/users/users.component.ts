import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectFilteredUsers } from './users.selectors';
import * as UsersPageActions from './users.actions';

@Component({
  selector: 'ngrx-users',
  template: `
    <h2>Users</h2>
    <input type="text" [formControl]="searchControl" placeholder="Search..." />
    <ul>
      <li *ngFor="let user of filteredUsers$ | async">
        {{ user }}
      </li>
    </ul>
  `,
})
export class UsersComponent implements OnInit, OnDestroy {
  private readonly destroy = new Subject();
  readonly searchControl = new FormControl('');
  readonly filteredUsers$ = this.store.select(selectFilteredUsers);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(UsersPageActions.enter());

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(searchTerm =>
        this.store.dispatch(UsersPageActions.updateSearchTerm({ searchTerm })),
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
