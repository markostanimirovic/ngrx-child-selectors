import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { UsersComponent } from './users.component';
import * as fromUsers from './users.reducer';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, StoreModule.forFeature('users', fromUsers.reducer)],
  declarations: [UsersComponent],
  exports: [UsersComponent],
})
export class UsersModule {}
