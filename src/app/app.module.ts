import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameComponent } from './frame/frame.component';
import { CodeComponent } from './code/code.component';
import { MenuComponent } from './menu/menu.component';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { rootReducer, IAppState, INITIAL_STATE } from './store'; 
import { CounterActions } from './actions'; 


import { MdButtonModule, MdIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    CodeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MdButtonModule,
    MdIconModule,
    NgReduxModule
  ],
  providers: [CounterActions],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<IAppState>) {
    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
}
