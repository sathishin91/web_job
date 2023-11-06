import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewJobComponent } from './post-new-job.component';

describe('PostNewJobComponent', () => {
  let component: PostNewJobComponent;
  let fixture: ComponentFixture<PostNewJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostNewJobComponent]
    });
    fixture = TestBed.createComponent(PostNewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
