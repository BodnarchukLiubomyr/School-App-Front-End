import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectViewComponent } from './subject-view.component';

describe('SubjectViewComponent', () => {
  let component: SubjectViewComponent;
  let fixture: ComponentFixture<SubjectViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectViewComponent]
    });
    fixture = TestBed.createComponent(SubjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
