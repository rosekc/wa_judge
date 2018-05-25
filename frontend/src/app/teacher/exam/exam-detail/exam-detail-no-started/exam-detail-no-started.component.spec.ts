import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailNoStartedComponent } from './exam-detail-no-started.component';

describe('ExamDetailNoStartedComponent', () => {
  let component: ExamDetailNoStartedComponent;
  let fixture: ComponentFixture<ExamDetailNoStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDetailNoStartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailNoStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
