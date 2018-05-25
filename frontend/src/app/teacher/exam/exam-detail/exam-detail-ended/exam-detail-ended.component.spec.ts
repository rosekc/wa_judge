import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailEndedComponent } from './exam-detail-ended.component';

describe('ExamDetailEndedComponent', () => {
  let component: ExamDetailEndedComponent;
  let fixture: ComponentFixture<ExamDetailEndedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDetailEndedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
