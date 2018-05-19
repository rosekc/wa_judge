import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ExamInfo } from '../student/exam/exam-info.model';
import { ExamState } from '../student/exam/exam-state.enum';

export class InMemoryDataService extends InMemoryDbService {
  createDb() {
    const exams: ExamInfo[] = [
      {
        id: 1,
        name: 'exam1',
        teacherName: 'Mr.V',
        startTime: new Date(2018, 4, 20, 9, 0, 0),
        endTime: new Date(2018, 4, 20, 14, 0, 0)
      },
      {
        id: 2,
        name: 'exam2',
        teacherName: 'Mr.O',
        startTime: new Date(2018, 4, 19, 9, 0, 0),
        endTime: new Date(2018, 4, 19, 23, 0, 0)
      },
      {
        id: 3,
        name: 'exam3',
        teacherName: 'Mr.I',
        startTime: new Date(2018, 4, 18, 9, 0, 0),
        endTime: new Date(2018, 4, 18, 14, 0, 0)
      }
    ];
    return { exams };
  }
}
