import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ContestInfo, ContestState } from './contest.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  contestInfo: ContestInfo;
  private contestUrl = '/api/exams';

  constructor(private http: HttpClient) {}

  getContest(id: string) {
    return this.http.get<ContestInfo>(`${this.contestUrl}/2`).pipe(
      map(data => {
        return this.updateContestState(data);
      }),
      tap(data => {
        this.contestInfo = data;
      })
    );
  }

  updateCurrentContestInfo() {
    this.contestInfo = this.updateContestState(this.contestInfo);
  }

  updateContestState(x: ContestInfo) {
    const d = Date.now();
    const s = new Date(x.startTime).getTime();
    const e = new Date(x.endTime).getTime();
    if (d < s) {
      x.state = ContestState.NoStarted;
    } else if (d >= s && d <= e) {
      x.state = ContestState.InProgress;
    } else {
      x.state = ContestState.Ended;
    }
    return x;
  }
}
