import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import 'hammerjs';

import { AppComponent } from './app.component';
import { NavModule } from './modules/nav/nav.module';
import { SWIModule } from './modules/swi/swi.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    NavModule,
    SWIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
