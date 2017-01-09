import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

import { SWI } from '../models/swi.models';


@Injectable()
export class SWIService {

  apiBaseUrl: string = "http://localhost:3000/api/v1/swi/";

  constructor(private http: Http) {

  }

  public getSWIs(): Observable<SWI[]> {
    return this.http.get(this.apiBaseUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getSWI(id: string): Observable<SWI> {
    let url: string = this.apiBaseUrl + id.toString();
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
