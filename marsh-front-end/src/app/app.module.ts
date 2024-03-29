import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {ListEmployeeComponent} from './list-employee/list-employee.component'
import {AppRoutingModule} from './app-routing.module'
import {RouterModule} from '@angular/router'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HomeComponent} from './home/home.component'
import {AddUpdateEmployeeComponent} from './add-update-employee/add-update-employee.component'
import {LoggingInterceptor} from './interceptors/logging.interceptor'
import {AuthInterceptor} from './interceptors/auth.interceptor'
import { AdminComponent } from './admin/admin.component'
import { HeaderComponent } from './header/header.component'
import {CookieModule} from 'ngx-cookie'
import {StoreModule} from "@ngrx/store";
import {allReducer} from "./state/app.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AppEffects} from "./state/app.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {BaseUrl, EMP_URL} from "./service/tokens";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListEmployeeComponent,
    HomeComponent,
    AddUpdateEmployeeComponent,
    AdminComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CookieModule.forRoot(),
    StoreModule.forRoot(allReducer),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: EMP_URL, useValue: BaseUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
