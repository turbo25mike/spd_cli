import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import {Http, RequestOptions} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { LeftNavComponent } from './components/leftnav/leftnav.component';
import { HomeComponent } from './components/home/home.component';
import { WorkComponent } from './components/work/work.component';
import { ServicesComponent } from './components/services/services.component';
import { CareersComponent } from './components/careers/careers.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConsoleComponent } from './components/console/console.component';

import { Auth } from './services/auth.service';
import { ApiService } from './services/api.service';
import { EnvService } from './services/env.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('token'))
  }), http, options);
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavMenuComponent,
    LeftNavComponent,
    FooterComponent,
    CareersComponent,
    ContactComponent,
    ServicesComponent,
    ConsoleComponent,
    WorkComponent,
    HomeComponent,
    SitemapComponent,
    DashboardComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    Auth,
    ApiService,
    EnvService
  ],
  imports: [
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'work/:id', component: WorkComponent },
      { path: 'careers', component: CareersComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'sitemap', component: SitemapComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ]
})
export class AppModule { }
