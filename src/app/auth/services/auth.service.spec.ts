import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/services/config.service';

describe('AuthService', () => {
  let service: AuthService;
  let configServiceSpy: jasmine.SpyObj<ConfigService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ConfigService', ['config']);
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        AuthService,
        { provide: ConfigService, useValue: spy }
      ]
    });
    service = TestBed.inject(AuthService);
    configServiceSpy = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;
  });

  it('should be created', () => {
    const stubValue = {backendApi:"stub"};
    configServiceSpy.config.and.returnValue(stubValue);
    expect(service).toBeTruthy();
  });
});
