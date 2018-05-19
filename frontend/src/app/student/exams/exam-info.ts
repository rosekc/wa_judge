import { ExamState } from './exam-state.enum';

export class ExamInfo {
  state: ExamState;
  constructor(
    public id: number,
    public name: string,
    public teacherName: string,
    public startTime: Date,
    public endTime: Date
  ) {}
}
