import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';

import { ContestInfo } from '../contest.model';
import { ContestService } from '../contest.service';

@Component({
  selector: 'app-contest-detail',
  templateUrl: './contest-detail.component.html',
  styleUrls: ['./contest-detail.component.css']
})
export class ContestDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true;
  get contestInfo(): ContestInfo {
    return this.contestService.contestInfo;
  }
  constructor(
    private contestService: ContestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.isLoading = true;
    this.initContestInfo();
  }

  ngOnDestroy() {
    this.contestService.contestInfo = undefined;
  }

  getIsLoading() {
    return !this.contestInfo && this.isLoading;
  }

  private initContestInfo() {
    if (!this.contestService.contestInfo) {
      const id = this.route.snapshot.paramMap.get('id');
      const nid = Number(id);
      if (isNumber(nid) && !isNaN(nid)) {
        this.contestService.getContest(nid).subscribe(
          x => {
            if (x) {
              this.isLoading = false;
            } else {
              this.router.navigate(['/teacher/contest']);
            }
          },
          error => {
            this.router.navigate(['/teacher/contest']);
          }
        );
      } else {
        this.router.navigate(['/teacher/contest']);
      }
    } else {
      this.isLoading = false;
    }
  }
}
