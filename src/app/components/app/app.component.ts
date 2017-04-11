import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Auth } from '../../services/auth.service';

@Component({
    selector: 'app-root',
    providers: [Auth],
    templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private auth: Auth) {
   }
}
