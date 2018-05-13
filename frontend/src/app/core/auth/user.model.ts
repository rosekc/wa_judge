import { UserType } from './user-type.enum';

export class User {
  constructor(
    public id: number,
    public email: string,
    public userName: string,
    public userType: UserType
  ) {}
}

export const Users: Array<User> = [
  new User(1, 'a@w.a', 'admin', UserType.admin),
  new User(2, 's@w.a', 'student', UserType.student),
  new User(3, 't@w.a', 'teacher', UserType.teacher)
];
