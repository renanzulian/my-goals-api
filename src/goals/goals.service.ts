import { Injectable } from '@nestjs/common';
import { Goal, GoalsRequest } from './goals.model';

@Injectable()
export class GoalsService {
  private readonly goals: Goal[] = [];
  private counter = 1000;

  create(goal: GoalsRequest): Goal {
    const newGoal = {
      id: this.counter++,
      isCompleted: false,
      ...goal,
    };
    this.goals.push(newGoal);
    return newGoal;
  }

  findByUserId(userId: number): Goal[] {
    return this.goals.filter((goal) => goal.userId === userId);
  }

  delete(id: number): void {
    const index = this.goals.findIndex((goal) => goal.id === id);
    this.goals.splice(index, 1);
  }
}
