import { ExamState } from './exam-state.enum';

export interface ExamInfo {
  id?: number;
  name: string;
  teacherId: number;
  startTime?: number;
  endTime?: number;
  state?: ExamState;
}
