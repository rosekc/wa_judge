export enum UserType {
  admin,
  teacher,
  student
}

export interface User {
  id: number;
  name: string;
  userType: UserType;
}

export interface TeacherUser extends User {
  userName: string;
}

export interface StudentUser extends User {
  studentId: string;
  group: string;
  contestId: string;
}

export const TeacherUsers: Array<TeacherUser> = [
  { id: 1, userName: 'admin', name: 'admin', userType: UserType.admin },
  { id: 2, userName: 'teacher', name: 'teacher', userType: UserType.teacher }
];

export const StudentUsers: Array<StudentUser> = [
  {
    id: 3,
    studentId: '123',
    name: 'student',
    group: '15-1',
    contestId: '1234',
    userType: UserType.student
  }
];
