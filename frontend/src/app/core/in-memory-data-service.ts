import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ExamInfo } from '../student/exam/exam-info.model';
import { ExamState } from '../student/exam/exam-state.enum';
import { StudentInfo } from '../admin/student/student-info.model';

export class InMemoryDataService extends InMemoryDbService {
  createDb() {
    const n = new Date();
    const exams: ExamInfo[] = [
      {
        id: 1,
        name: 'exam1',
        teacherName: 'Mr.V',
        startTime: new Date(`2018-05-${n.getDate() + 1}T09:00:00.000+08:00`),
        endTime: new Date(`2018-05-${n.getDate() + 1}T14:00:00.000+08:00`)
      },
      {
        id: 2,
        name: 'exam2',
        teacherName: 'Mr.O',
        startTime: new Date(`2018-05-${n.getDate() - 1}T00:00:00.000+08:00`),
        endTime: new Date(`2018-05-${n.getDate() + 1}T00:00:00.000+08:00`)
      },
      {
        id: 3,
        name: 'exam3',
        teacherName: 'Mr.I',
        startTime: new Date(`2018-05-${n.getDate() - 1}T09:00:00.000+08:00`),
        endTime: new Date(`2018-05-${n.getDate() - 1}T14:00:00.000+08:00`)
      }
    ];
    const students: StudentInfo[] = [
      { id: 1, userName: 's@w.a', name: 'student' }
    ];
    return { exams, students };
  }
}
