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
  notice?: string;
  state?: ContestState;
}
