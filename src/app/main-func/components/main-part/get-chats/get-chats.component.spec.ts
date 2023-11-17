import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetChatsComponent } from './get-chats.component';

describe('GetChatsComponent', () => {
  let component: GetChatsComponent;
  let fixture: ComponentFixture<GetChatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetChatsComponent]
    });
    fixture = TestBed.createComponent(GetChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
