import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindClassComponent } from './find-class.component';

describe('FindClassComponent', () => {
  let component: FindClassComponent;
  let fixture: ComponentFixture<FindClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindClassComponent]
    });
    fixture = TestBed.createComponent(FindClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
