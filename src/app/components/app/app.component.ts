import { Component, ViewContainerRef } from '@angular/core';
import { Routes } from '@angular/router';
import { Auth } from '../../services/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-root',
    providers: [Auth],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: Auth, private toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
   }
}
