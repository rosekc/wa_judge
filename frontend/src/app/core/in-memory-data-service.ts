import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ContestInfo } from '../student/contest/contest.model';
import { StudentInfo } from '../admin/student/student-info.model';
import { TeacherInfo } from '../admin/teacher/teacher.model';
import { UserType } from './auth/user.model';

export class InMemoryDataService extends InMemoryDbService {
  createDb() {
    const n = new Date();
    const contests: ContestInfo[] = [
      {
        id: 1,
        name: 'contest1',
        teacherName: 'Mr.V',
        startTime: new Date(`2018-05-${n.getDate() + 1}T09:00:00.000+08:00`),
        endTime: new Date(`2018-05-${n.getDate() + 1}T14:00:00.000+08:00`)
      },
      {
        id: 2,
        name: 'contest2',
        teacherName: 'Mr.O',
        startTime: new Date(`2018-05-${n.getDate() - 1}T00:00:00.000+08:00`),
        endTime: new Date(`2018-05-${n.getDate() + 1}T00:00:00.000+08:00`)
      },
      {
        id: 3,
        name: 'contest3',
        teacherName: 'Mr.I',
        startTime: new Date(`2018-05-${n.getDate() - 1}T09:00:00.000+08:00`),
        endTime: new Date(`2018-05-${n.getDate() - 1}T14:00:00.000+08:00`)
      }
    ];
    const students: StudentInfo[] = [
      { id: 3, userName: 's@w.a', name: 'student' }
    ];
    const teachers: TeacherInfo[] = [
      { id: 1, userName: 'a@w.a', name: 'admin', userType: UserType.admin },
      { id: 2, userName: 't@w.a', name: 'teacher', userType: UserType.teacher }
    ];
    return { contest: contests, students, teachers };
  }
}
