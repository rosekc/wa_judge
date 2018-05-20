import { UserType } from './user-type.enum';

export interface User {
  id: number;
  email: string;
  userName: string;
  userType: UserType;
}

export const Users: Array<User> = [
  { id: 1, email: 'a@w.a', userName: 'admin', userType: UserType.admin },
  { id: 2, email: 's@w.a', userName: 'student', userType: UserType.student },
  { id: 3, email: 't@w.a', userName: 'teacher', userType: UserType.teacher }
];
