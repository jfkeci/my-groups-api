export type EventPostStructure = {
  location: number[];
  date: string;
  length: number;
  users: number[];
};

export type PollOption = {
  id: number;
  title: string;
  users: number[];
};

export type PollPostStructure = {
  options: PollOption[];
};

export type InfoPostStructure = {};
