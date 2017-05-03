import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { EnvService } from '../../services/env.service';

@Component({
    selector: 'left-nav',
    templateUrl: './leftnav.component.html',
    styleUrls: ['./leftnav.component.css']
})
export class LeftNavComponent {
    isCollapsed: boolean = true;

    constructor(public env: EnvService) {
     }

    toggleCollapse(): void {
      this.isCollapsed = !this.isCollapsed;
    }
}
