export type DateString = string;

export type Set = {
  reps: number;
  weight: number;
};

export type DropSet = Set[];

export type Exercise = {
  name: string;
  sets: DropSet[];
};

export type Workout = {
  date: DateString;
  name: string;
  bodyWeight: number;
  exercises: Exercise[];
};
