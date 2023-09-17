import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowPasswordDirective } from '../../directives/show-password.directive';
import { AuthService } from '../../services/auth.service';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['logIn']);
    await TestBed.configureTestingModule({
      declarations: [
        LogInComponent,
        ShowPasswordDirective
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
