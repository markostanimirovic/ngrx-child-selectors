import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forRoot({}), UsersModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
