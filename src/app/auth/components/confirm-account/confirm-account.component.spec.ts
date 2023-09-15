import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAccountComponent } from './confirm-account.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConfirmAccountComponent', () => {
  let component: ConfirmAccountComponent;
  let fixture: ComponentFixture<ConfirmAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmAccountComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
