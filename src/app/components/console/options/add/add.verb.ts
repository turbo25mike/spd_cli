
import { Injectable, ViewContainerRef } from '@angular/core';
import { Verb } from '../verb';

@Injectable()
export class AddVerb extends Verb {
  constructor() {
    super();
    this.name = 'add';
    this.options = ['Child Title']
  }
}
