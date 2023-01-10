export type GoalsRequest = {
  description: string;
  dueDate: string;
  createdAt: string;
  userId: number;
};

export type Goal = GoalsRequest & {
  id: number;
  isCompleted: boolean;
};
