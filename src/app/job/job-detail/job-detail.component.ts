import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
  active = 'jobDetail';
  page = 4;
  page2 = 1;
  currentPage = 3;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router
  ) {}

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  editJob() {
    this.router.navigate(['/jobs/edit-job']);
  }

  activateJobPreviewTab() {
    console.log('inside active');
    this.active = 'jobPreview';
  }
}
