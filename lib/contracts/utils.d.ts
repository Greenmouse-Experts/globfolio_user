export interface FilterState {
  catGroup?: string[];
  time?: {
    start: Date | undefined;
    end: Date | undefined;
  };
  region?: string;
}

export interface InputOptions {
  name?: string,
    value: string | number,
    label: string,
}

export interface PicksInput {
  userId: string,
  stockId: string | number,
}