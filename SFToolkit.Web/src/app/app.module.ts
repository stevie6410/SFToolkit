import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


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
    NavModule,
    SWIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
