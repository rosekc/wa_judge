export enum UserType {
  student,
  teacher,
  admin
}

export interface User {
  id: number;
  userName: string;
  name: string;
  userType: UserType;
}

export const Users: Array<User> = [
  { id: 1, userName: 'a@w.a', name: 'admin', userType: UserType.admin },
  { id: 2, userName: 's@w.a', name: 'student', userType: UserType.student },
  { id: 3, userName: 't@w.a', name: 'teacher', userType: UserType.teacher }
];
