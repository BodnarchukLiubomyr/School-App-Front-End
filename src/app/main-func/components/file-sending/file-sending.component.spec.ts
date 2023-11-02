import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSendingComponent } from './file-sending.component';

describe('FileSendingComponent', () => {
  let component: FileSendingComponent;
  let fixture: ComponentFixture<FileSendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileSendingComponent]
    });
    fixture = TestBed.createComponent(FileSendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
