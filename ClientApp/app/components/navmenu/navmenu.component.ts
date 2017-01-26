import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
    selector: 'nav-menu',
    providers: [Auth],
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
    constructor(private auth: Auth) { }
}
