import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMarksComponent } from './file-marks.component';

describe('FileMarksComponent', () => {
  let component: FileMarksComponent;
  let fixture: ComponentFixture<FileMarksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileMarksComponent]
    });
    fixture = TestBed.createComponent(FileMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
