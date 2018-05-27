import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProgressComponent } from './exam-progress.component';

describe('ExamProgressComponent', () => {
  let component: ExamProgressComponent;
  let fixture: ComponentFixture<ExamProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
