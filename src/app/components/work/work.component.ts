import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnvService } from '../../services/env.service';
import { Work,WorkBreadCrumb, WorkChat } from '../../models/work.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'work',
  templateUrl: './work.component.html'
})
export class WorkComponent {
  id: number;
  currentWork: Work;
  activeChildren: Work[];
  inactiveChildren: Work[];
  workChat: WorkChat[];
  crumbTrail: WorkBreadCrumb[];
  showActive: boolean = true;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private env: EnvService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.currentWork = new Work();
    this.activeChildren = new Array<Work>();
    this.inactiveChildren = new Array<Work>();
    this.crumbTrail = new Array<WorkBreadCrumb>();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.apiService.Get('work/' + params['id']).subscribe(
          res => this.currentWork = res as Work,
          err => this.HandleError(err)
        );


          this.apiService.Get('work/' + params['id'] + "/chat").subscribe(
            res => this.workChat = res as WorkChat[],
            err => this.HandleError(err)
          );

        this.env.workLoaded.subscribe(
          res => {
            this.env.setSelectedWork(params['id']);

            if (this.env.selectedObj != null) {
              this.crumbTrail = this.env.getBreadcrumbs();
            }
          },
          err => this.HandleError(err)
        );
      }
    );
  }


  private HandleError(err) {
    if (err.status === 401) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
