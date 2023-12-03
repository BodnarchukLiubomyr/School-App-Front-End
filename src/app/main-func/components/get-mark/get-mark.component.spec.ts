import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMarkComponent } from './get-mark.component';

describe('GetMarkComponent', () => {
  let component: GetMarkComponent;
  let fixture: ComponentFixture<GetMarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetMarkComponent]
    });
    fixture = TestBed.createComponent(GetMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
