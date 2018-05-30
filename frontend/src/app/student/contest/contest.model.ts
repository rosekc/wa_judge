export enum ContestState {
  NoStarted,
  InProgress,
  Ended
}

export interface ContestInfo {
  id: number;
  name: string;
  teacherName: string;
  startTime: Date;
  endTime: Date;
  state?: ContestState;
}
