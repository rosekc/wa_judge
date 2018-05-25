import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailInProgressComponent } from './exam-detail-in-progress.component';

describe('ExamDetailInProgressComponent', () => {
  let component: ExamDetailInProgressComponent;
  let fixture: ComponentFixture<ExamDetailInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDetailInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
