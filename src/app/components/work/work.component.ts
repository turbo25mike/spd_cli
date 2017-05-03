import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnvService } from '../../services/env.service';
import { Work,WorkBreadCrumb } from '../../models/work.model';

@Component({
  selector: 'work',
  templateUrl: './work.component.html'
})
export class WorkComponent {
  id: number;
  currentWork: Work;
  activeChildren: Work[];
  inactiveChildren: Work[];
  crumbTrail: WorkBreadCrumb[];
  showActive: boolean = true;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private env: EnvService,
    private router: Router
  ) {
    this.currentWork = new Work();
    this.activeChildren = new Array<Work>();
    this.inactiveChildren = new Array<Work>();
    this.crumbTrail = new Array<WorkBreadCrumb>();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.env.workLoaded.subscribe(
          res => {
            this.activeChildren = new Array<Work>();
            this.inactiveChildren = new Array<Work>();
            this.crumbTrail = new Array<WorkBreadCrumb>();

            this.env.setSelectedWork(params['id']);

            if (this.env.selectedObj != null) {

              this.currentWork = this.env.selectedObj as Work;
              this.crumbTrail = this.env.getBreadcrumbs(this.currentWork.parentWorkID, null);
              if (this.currentWork.children != null) {
                for (var i = 0; i < this.currentWork.children.length; i++) {
                  if (!this.currentWork.children[i].completeDate)
                    this.activeChildren.push(this.currentWork.children[i]);
                  else
                    this.inactiveChildren.push(this.currentWork.children[i]);
                }
              }
            }
          },
          err => this.router.navigate(['/dashboard'])
        );
      }
    );
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
