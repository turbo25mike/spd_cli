import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { EnvService } from '../../services/env.service';

@Component({
    selector: 'nav-menu',
    providers: [Auth],
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    isCollapsed: boolean = true;

    constructor(public auth: Auth, public env: EnvService) {
     }

    toggleCollapse(): void {
      this.isCollapsed = !this.isCollapsed;
    }
}
