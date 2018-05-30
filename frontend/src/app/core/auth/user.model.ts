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
  className: string;
}

export const TeacherUsers: Array<TeacherUser> = [
  { id: 1, userName: 'a@w.a', name: 'admin', userType: UserType.admin },
  { id: 2, userName: 't@w.a', name: 'teacher', userType: UserType.teacher }
];

export const StudentUsers: Array<StudentUser> = [
  { id: 3, studentId: '123', name: 'student', className: '15-1', userType: UserType.student }
];
