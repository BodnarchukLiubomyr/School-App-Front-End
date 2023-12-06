import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClassComponent } from './get-class.component';

describe('GetClassComponent', () => {
  let component: GetClassComponent;
  let fixture: ComponentFixture<GetClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetClassComponent]
    });
    fixture = TestBed.createComponent(GetClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
