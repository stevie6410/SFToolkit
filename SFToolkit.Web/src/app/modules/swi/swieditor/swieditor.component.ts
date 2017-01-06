import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SWI, SWIStage, Observation, User, Company } from '../models/swi.models';
import { SWIService } from '../swi.service';

@Component({
  selector: 'swi-editor',
  templateUrl: './swieditor.component.html',
  styleUrls: ['./swieditor.component.css']
})
export class SWIEditorComponent implements OnInit {

  swi: SWI;
  swi_id: string = "5869c1ca251e422e9644e7a7";

  constructor(private swiService: SWIService) { }

  ngOnInit() {
    // this.route.params
    //   .switchMap((params: Params) => 

    this.swiService.getSWI(this.swi_id)
      .subscribe((swi: SWI) => {
        this.swi = swi
        console.log(this.swi);
      });
  }

}
