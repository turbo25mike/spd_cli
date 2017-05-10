// auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, NavigationStart } from '@angular/router';
import { Member } from '../models/member.model';
import { EnvService } from './env.service';
import 'rxjs/add/operator/filter';

// Avoid name not found warnings
//declare var Auth0Lock: any;
let Auth0Lock = require('auth0-lock').default;


@Injectable()
export class Auth {
    // Configure Auth0
    lock = new Auth0Lock('VRuQOIlWkBs3WEwjwafACwuY43tWZ5Tn', 'spd.auth0.com');

    constructor(public router: Router, private env: EnvService) {
        // Add callback for lock `authenticated` event
        // this.lock.on("authenticated", (authResult) => {
        //     localStorage.setItem('id_token', authResult.idToken);
        // });
        this.router.events
          .filter(event => event instanceof NavigationStart)
          .filter((event: NavigationStart) => (/access_token|id_token|token|error/).test(event.url))
          .subscribe(() => {
            this.lock.resumeAuth(window.location.hash, (error, authResult) => {
              if (error) return console.log(error);
              localStorage.setItem('token', authResult.idToken);

              this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
                if (error) return console.log(error);
                localStorage.setItem('member', JSON.stringify(profile));
                if(this.env)
                  this.env.userUpdated();
              });

              this.router.navigate(['/dashboard']);

            });
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    }

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('token');
    }
}
