import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SWIEditorComponent } from './swieditor/swieditor.component';
import { SWIViewerComponent } from './swiviewer/swiviewer.component';
import { SWIService } from './swi.service';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';
import { SwistageComponent } from './swistage/swistage.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedControlsModule
  ],
  exports: [
    SWIEditorComponent,
    SWIViewerComponent
  ],
  declarations: [
    SWIEditorComponent,
    SWIViewerComponent,
    SwistageComponent
  ],
  providers: [
    SWIService,
    HttpModule
  ]
})
export class SWIModule { }
