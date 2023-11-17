import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGroupComponent } from './get-group.component';

describe('GetGroupComponent', () => {
  let component: GetGroupComponent;
  let fixture: ComponentFixture<GetGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetGroupComponent]
    });
    fixture = TestBed.createComponent(GetGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
