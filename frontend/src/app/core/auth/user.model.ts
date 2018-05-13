import { UserType } from './user-type.enum';

export class User {
  constructor(
    public id: number | undefined,
    public userName: string | undefined,
    public userType: UserType | undefined
  ) {}
}
