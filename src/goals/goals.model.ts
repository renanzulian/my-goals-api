export type GoalsRequest = {
  description: string;
  dueDate: string;
  userId?: number;
};

export type Goal = GoalsRequest & {
  id: number;
};
