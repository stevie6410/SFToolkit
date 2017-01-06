/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SwiService } from './swi.service';

describe('SwiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwiService]
    });
  });

  it('should ...', inject([SwiService], (service: SwiService) => {
    expect(service).toBeTruthy();
  }));
});
