import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRatingComponent } from './work-rating.component';

describe('WorkRatingComponent', () => {
  let component: WorkRatingComponent;
  let fixture: ComponentFixture<WorkRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkRatingComponent]
    });
    fixture = TestBed.createComponent(WorkRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
