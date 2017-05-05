import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventLog } from '../../models/event';
import { Verb } from './options/verb';
import { AddVerb } from './options/add/add.verb';
import { WorkVerb } from './options/add/work.verb';
import { TagVerb } from './options/add/tag.verb';
import { ApiVerb } from './options/api.verb';
import { EditVerb } from './options/edit.verb';
import { SpdVerb } from './options/spd/spd.verb';
import { ToVerb } from './options/spd/to.verb';
import { UpVerb } from './options/spd/up.verb';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OptionManager } from '../../models/optionManager';

@Component({
  selector: 'console',
  providers: [AddVerb, WorkVerb, TagVerb,
              ApiVerb,
              SpdVerb, ToVerb, UpVerb,
              EditVerb],
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class ConsoleComponent extends Verb {
  eventLog: EventLog;
  searchPos: number = 0;
  previousGlobalKey: number;
  currentOptions: string[];
  hasFocus: boolean = false;

  @ViewChild('cmd') el: ElementRef;

  constructor(
    private toastr: ToastsManager,
    private add: AddVerb,
    private edit: EditVerb,
    private spd: SpdVerb,
    private api: ApiVerb
  ) {
    super();
    this.verbs = [spd, add, api, edit];
    this.eventLog = new EventLog();
    this.options = ['clear'];
    this.currentOptions = this.getCurrentOptions();
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    var key = event.which || event.keyCode;

    if (this.previousGlobalKey === 17 && key === 67) {
      this.el.nativeElement.focus();
    }

    this.previousGlobalKey = key;
  }

  checkOptions(val) {
    if (val === '') {
      this.currentOptions = this.getCurrentOptions();
      return;
    }
    var actions = val.split(' ');
    if (actions === null) {
      this.currentOptions = this.getCurrentOptions();
      return;
    }

    var currentAction = actions[0].toLowerCase();

    this.currentOptions = this.getOptions(actions);
  }

  execute(cmd: HTMLInputElement) {

    var userInput = cmd.value;
    cmd.value = null;

    this.currentOptions = this.getCurrentOptions();


    this.searchPos = this.eventLog.events.length - 1;

    var optionManager = new OptionManager(userInput);
    if (optionManager.actions.length === 0) return;

    if (optionManager.actions[0] === 'clear') {
      this.eventLog.Clear();
      return;
    }

    this.run(optionManager);
  }

  setLastCmd(cmd: HTMLInputElement, dir: number) {
    if (this.eventLog.events.length === 0) return;
    cmd.value = this.eventLog.events[this.searchPos].request;
    var nextPos = this.searchPos + dir;
    if (nextPos > -1 && nextPos < this.eventLog.events.length)
      this.searchPos += dir;
  }
}
