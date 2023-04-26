import { Inject, Injectable } from '@nestjs/common';
import { Goal, GoalsRequest } from './goals.model';
import { EntityManager } from 'typeorm';
import { Goal as GoalEntity } from './goal.entity';

@Injectable()
export class GoalsService {
  private readonly goals: Goal[] = [];
  private counter = 1000;

  constructor(
    @Inject('GOALS_REPOSITORY') private readonly entityManager: EntityManager,
  ) {}

  async create(goal: GoalsRequest): Promise<Goal> {
    const newGoal = this.entityManager.create(GoalEntity, {
      ...goal,
      user: {
        id: goal.userId,
      },
    });
    return await this.entityManager.save(newGoal);
  }

  async findByUserId(userId: any): Promise<Goal[]> {
    return await this.entityManager.query(
      `SELECT * FROM goal WHERE userId = ${userId}`,
    );
  }

  delete(id: number, userId: number): void {
    this.entityManager
      .getRepository(GoalEntity)
      .createQueryBuilder('goal')
      .innerJoinAndSelect('goal.user', 'user')
      .where('goal.id = :goalId AND user.id = :userId', { goalId: id, userId })
      .delete()
      .execute();
  }
}
