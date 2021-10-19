import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptor } from './services/error.interceptor';
import { Step1Component } from './userdetail/step1/step1.component';
import { Step2Component } from './userdetail/step2/step2.component';
import { Step3Component } from './userdetail/step3/step3.component';

@NgModule({
  declarations: [
    AppComponent,
    UserdetailComponent,
    DashboardComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path:'dashboard',component:DashboardComponent},
      {path:'userdetail/:id',component:UserdetailComponent}
    ])
  
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
