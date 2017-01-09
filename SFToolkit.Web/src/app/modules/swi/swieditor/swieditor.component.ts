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

  addStage() {
    let newStage = new SWIStage;
    newStage.sequence = this.swi.stages.length + 1;
    this.swi.stages.push(newStage);
  }

  removeStage(stage: SWIStage) {
    this.swi.stages = this.swi.stages.filter(s => s.sequence != stage.sequence);
    //now we need to update the sequence numbers as we may have removed a stage in the middle of the array
  }

  reorderList() {
    var stages: any[] = this.swi.stages;

    for (var index = 0; index < stages.length; index++) {
      stages[index].sequence == index;
    }

    this.swi.stages = stages;

    console.log("stages", stages);
    console.log("swi.stages", this.swi.stages);

  }

}
