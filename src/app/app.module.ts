import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { WorkComponent } from './components/work/work.component';
import { ServicesComponent } from './components/services/services.component';
import { CareersComponent } from './components/careers/careers.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        FooterComponent,
        CareersComponent,
        ContactComponent,
        ServicesComponent,
        WorkComponent,
        HomeComponent,
        SitemapComponent
    ],
    imports: [
        BsDropdownModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'services', component: ServicesComponent },
            { path: 'work', component: WorkComponent },
            { path: 'careers', component: CareersComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'sitemap', component: SitemapComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {}
