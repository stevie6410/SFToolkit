import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { SWIEditorComponent } from './swieditor/swieditor.component';
import { SWIViewerComponent } from './swiviewer/swiviewer.component';
import { SWIService } from './swi.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SWIEditorComponent,
    SWIViewerComponent
  ],
  declarations: [
    SWIEditorComponent,
    SWIViewerComponent
  ],
  providers: [
    SWIService,
    HttpModule
  ]
})
export class SWIModule { }
