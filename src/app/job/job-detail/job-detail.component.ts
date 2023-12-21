import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  active = 'jobDetail';
  page = 4;
  page2 = 1;
  currentPage = 3;
  jobId!: number;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  editJob() {
    this.router.navigate(['/jobs/edit-job'], {
      queryParams: { job_id: this.jobId, tab_id: 4 },
    });
  }

  activateJobPreviewTab() {
    console.log('inside active');
    this.active = 'jobPreview';
  }

  ngOnInit() {
    //Access the id from the params
    this.route.params.subscribe((params) => {
      this.jobId = params['id'];
      console.log('id on the params', this.jobId);
    });
  }
}
