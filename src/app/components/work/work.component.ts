import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnvService } from '../../services/env.service';
import { Work } from '../../models/work.model';

@Component({
  selector: 'work',
  templateUrl: './work.component.html'
})
export class WorkComponent {
  id: number;
  currentWork: Work;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private env: EnvService,
    private router: Router
  ) {
    this.currentWork = new Work();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.env.setSelectedWork(params['id']);
        if(this.env.selectedObj == null){
          this.router.navigate(['/dashboard']);
        }else{
          this.currentWork = this.env.selectedObj as Work;
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
