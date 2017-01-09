import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SWIService } from '../../app/services/swi.service';
import { SWI } from '../../app/models/swi.models';

@Component({
  selector: 'page-edit-swi',
  templateUrl: 'edit-swi.html'
})
export class EditSWIPage {

  swi: SWI;
  swi_id: string = '5869c4dffe2edf2ee33f91c8';

  constructor(public navCtrl: NavController, public navParams: NavParams
  , private swiService: SWIService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSWIPage');

    this.swiService.getSWI(this.swi_id).subscribe(
      (data) => {
        console.log(data);
        this.swi = data;
      },
      err => {console.log(err);}
    );


  }

}
