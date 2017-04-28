
import { Injectable } from '@angular/core';
import { ToVerb } from './to.verb';
import { UpVerb } from './up.verb';
import { Verb } from '../verb';

@Injectable()
export class SpdVerb extends Verb {
  constructor(public to:ToVerb, public up: UpVerb) {
    super();
    this.name = 'spd';
    this.verbs = [to, up];
  }
}
