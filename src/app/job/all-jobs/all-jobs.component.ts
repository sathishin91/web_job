import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../Store/Common/App.state';

import * as TokenActions from '../../Store/Token/Token.Actions';

import * as JobActions from '../../Store/Job/Job.Action';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss'],
})
export class AllJobsComponent implements OnInit {
  userId = localStorage.getItem('currentUser');
  id: any;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(TokenActions.getToken());
    if (this.userId !== null) {
      // Parse the JSON string into an object
      const userData = JSON.parse(this.userId);

      // Now you can access properties of userData safely
      this.id = userData.data?.id;
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
