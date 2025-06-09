export interface Schedule {
  schedule: any[];
  invalidSearchResults: number;
}
export interface ClassEntry {
  level: string;
  room: string | null;
  subbingFor: string | null;
  teacher: string;
  subject: string | null;
  period: number;
  timeInterval: string;
}
