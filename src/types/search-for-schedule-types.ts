export type Schedule = { schedule: any[]; invalidSearchResults: number };
export type ClassEntry = {
  level: string;
  room: string | null;
  subbingFor: string | null;
  teacher: string;
  subject: string | null;
  period: number;
  timeInterval: string;
};
