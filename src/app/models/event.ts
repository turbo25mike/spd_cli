export class Event{
  public request: string;
  public status: string;
  public response: string;

  public GetStatusClass(){
    return 'list-group-item-' + this.status;
  }
}

export class EventLog{
  public statusMap: any;
  public events: Event[];

  constructor(){
    this.Clear();
  }

  public Push(request: string){
    var newEvent = new Event();
    newEvent.request = request;
    this.events.push(newEvent);
  }

  public Clear(){
    this.events = new Array<Event>();
  }

  public SetSuccess(request: string, response: string){
    this.SetResponse(request, 'success', response);
  }

  public SetInfo(request: string, response: string){
    this.SetResponse(request, 'info', response);
  }

  public SetWarning(request: string, response: string){
    this.SetResponse(request, 'warning', response);
  }

  public SetError(request: string, response: string){
    this.SetResponse(request, 'danger', response);
  }

  public SetResponse(request: string, status: string, response:string){
    var e = this.Find(request);
    e.status = status;
    e.response = response;
  }

  public Find(request: string){
    for(var i = this.events.length -1; i > -1; i--){
      if(this.events[i].request === request){
        return this.events[i];
      }
    }
  }
}
