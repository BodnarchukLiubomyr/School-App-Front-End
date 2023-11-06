import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWithClassComponent } from './work-with-class.component';

describe('WorkWithClassComponent', () => {
  let component: WorkWithClassComponent;
  let fixture: ComponentFixture<WorkWithClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkWithClassComponent]
    });
    fixture = TestBed.createComponent(WorkWithClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
