export enum LoginType {
  Logged,
  NoLogged
}

export enum SubmitType {
  Submitted,
  NoSubmitted
}

export interface ContestStudentInfo {
  id: number;
  userName: string;
  name: string;
  group: string;
  isLogged: LoginType;
  isSubmitted: SubmitType;
}
