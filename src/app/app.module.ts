import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PathNotFoundComponent } from './shared/components/path-not-found/path-not-found.component';
import { ConfigService } from './shared/services/config.service';
import { DeleteUserComponent } from './main-func/components/delete-user/delete-user.component';
import { MainFuncModule } from './main-func/main-func.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from './material.module';


const appInitializerFn = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    PathNotFoundComponent,
    DeleteUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    MainFuncModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ConfigService]
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
