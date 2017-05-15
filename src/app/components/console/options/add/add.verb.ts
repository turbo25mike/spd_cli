
import { Injectable, ViewContainerRef } from '@angular/core';
import { Verb } from '../verb';
import { TagVerb } from './tag.verb';
import { WorkVerb } from './work.verb';

@Injectable()
export class AddVerb extends Verb {
  constructor(public tag:TagVerb, public work: WorkVerb) {
    super();
    this.name = 'add';
    this.verbs = [tag, work];
  }
}
