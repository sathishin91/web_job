import { Component } from '@angular/core';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
  page = 4;
  page2 = 1;
  currentPage = 3;
}
