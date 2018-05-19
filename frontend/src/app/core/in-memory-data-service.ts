import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ExamInfo } from '../student/exams/exam-info';
import { ExamState } from '../student/exams/exam-state.enum';

export class InMemoryDataService extends InMemoryDbService {
  createDb() {
    const exams = [
      new ExamInfo(
        1,
        'exam1',
        'Mr.V',
        new Date(2018, 4, 20, 9, 0, 0),
        new Date(2018, 4, 20, 14, 0, 0)
      ),
      new ExamInfo(
        2,
        'exam2',
        'Mr.O',
        new Date(2018, 4, 19, 0, 0, 0),
        new Date(2018, 4, 19, 23, 0, 0)
      )
      ,
      new ExamInfo(
        3,
        'exam3',
        'Mr.I',
        new Date(2018, 4, 18, 9, 0, 0),
        new Date(2018, 4, 18, 14, 0, 0)
      )
    ];
    return { exams };
  }
}
