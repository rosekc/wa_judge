export enum ContestState {
  NoStarted,
  InProgress,
  Ended
}

export interface ContestInfo {
  id?: number;
  name: string;
  teacherId: number;
  startTime?: number;
  endTime?: number;
  state?: ContestState;
}
