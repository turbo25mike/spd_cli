import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    selector: 'nav-menu',
    providers: [Auth],
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    isCollapsed: boolean = true;

    constructor(private auth: Auth) {
     }

    toggleCollapse(): void {
      this.isCollapsed = !this.isCollapsed;
    }
}
