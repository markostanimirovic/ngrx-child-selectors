import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { UsersComponent } from './users.component';
import * as fromUsers from './users.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('users', fromUsers.reducer)],
  declarations: [UsersComponent],
  exports: [UsersComponent],
})
export class UsersModule {}
