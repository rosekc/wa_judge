export interface StudentInfo {
  id?: number;
  userName: string;
  name: string;
  password?: string;
}

export interface StudentInfoWithSymbol {
  userName: string;
  name: string;
  password?: string;
  sid: symbol;
}
