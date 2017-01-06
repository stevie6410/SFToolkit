/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwistageComponent } from './swistage.component';

describe('SwistageComponent', () => {
  let component: SwistageComponent;
  let fixture: ComponentFixture<SwistageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwistageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwistageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
