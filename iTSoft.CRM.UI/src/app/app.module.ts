import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login';
import { APIService, AuthenticationService, AuthInterceptor, LoaderService } from './_services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from './about';
import { NotFoundPageComponent } from './notfoundpage';
import { ConfirmDialog } from './shared/dialog.component';
import { LoadingComponent } from './loading';
import { AuthGuard } from './_guard';
import { iTCRMLoaderService } from './core/services/ITSoftLoaderService';
import { NavLayoutModule } from './_layout/layout-module';
import { Router } from '@angular/router';
import { UserProfilService } from './_services/userProfile.Service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    AboutComponent,
    NotFoundPageComponent,
    ConfirmDialog,
    LoadingComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavLayoutModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    NgxChartsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
  ],
  providers: [
    LoaderService,
    APIService,
    AuthGuard,
    AuthenticationService,
    UserProfilService,
    iTCRMLoaderService,
    {
      provide: HTTP_INTERCEPTORS, useFactory: function (router: Router) {
        return new AuthInterceptor(router);
      },
      multi: true,
      deps: [Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
