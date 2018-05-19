import { ExamState } from './exam-state.enum';

export interface ExamInfo {
  id: number;
  name: string;
  teacherName: string;
  startTime: Date;
  endTime: Date;
  state?: ExamState;
}
