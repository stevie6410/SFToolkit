import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';


import { SWI, SWIStage, Observation, User, Company } from '../models/swi.models';
import { SWIService } from '../swi.service';

@Component({
  selector: 'swi-editor',
  templateUrl: './swieditor.component.html',
  styleUrls: ['./swieditor.component.css']
})
export class SWIEditorComponent implements OnInit, OnChanges {

  swi: SWI;
  swi_id: string = "5869c4dffe2edf2ee33f91c8";
  headerForm: FormGroup;


  constructor(private swiService: SWIService, private formBuilder: FormBuilder) { 
    //Build the form object
    this.headerForm = this.formBuilder.group({
      title: ['', Validators.required],
      revision: ['', Validators.required],
      isReleased: ['', Validators.required]
    });
  }

  ngOnInit() {
    // this.route.params
    //   .switchMap((params: Params) => 

    this.swiService.getSWI(this.swi_id)
      .subscribe((swi: SWI) => {
        this.swi = swi
        this.headerForm.patchValue(this.swi);
        console.log(this.swi);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("SimpleChange", changes);
    if (changes['swi'].currentValue) {
      console.log("Picked up changes", changes['swi']);
      this.headerForm.patchValue(changes['swi'].currentValue);
    }
  }

  addStage(){ 
    let newStage = new SWIStage;
    newStage.sequence = (this.swi.stages.length + 1).toString();
    this.swi.stages.push(newStage);
  }

  removeStage(stage: SWIStage){

  }

}
