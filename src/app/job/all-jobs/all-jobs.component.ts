import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../Store/Common/App.state';
import { Observable } from 'rxjs';
import { getJobLists } from '../../Store/Job/Job.Selector';
import { of } from 'rxjs';

import * as TokenActions from '../../Store/Token/Token.Actions';

import * as JobActions from '../../Store/Job/Job.Action';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss'],
})
export class AllJobsComponent implements OnInit {
  jobList$: Observable<any> = of([]);
  userId = localStorage.getItem('userId');
  id: any;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(TokenActions.getToken());

    // Select the job list from the store
    this.jobList$ = this.store.pipe(select(getJobLists));
    console.log('job list', this.jobList$);
    if (this.userId !== null) {
      this.id = this.userId;
      console.log('id', this.id);
    } else {
      console.error('User data not found in localStorage');
    }
    this.getList();
  }

  getList() {
    const list = {
      api_key: environment.api_key,
      user_id: this.id,
    };
    console.log('Dispatching setJobsList action:', list);
    this.store.dispatch(
      JobActions.setJobsList({
        list,
      })
    );
  }
}
