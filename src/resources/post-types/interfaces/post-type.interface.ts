export interface EventPostStructure {
  location: number[];
  date: string;
  length: number;
  users: number[];
}

export interface PollOption {
  id: number;
  title: string;
  users: number[];
}

export interface PollPostStructure {
  options: PollOption[];
}

export interface InfoPostStructure {
  type: string;
}
