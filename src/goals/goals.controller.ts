import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsRequest } from './goals.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Req() request, @Body() goalsRequest: GoalsRequest) {
    this.goalsService.create({ ...goalsRequest, userId: request.user.userId });
  }

  @Get()
  async listGoals(@Req() request) {
    return await this.goalsService.findByUserId(request.user.userId);
  }

  @Delete(':id')
  async delete(@Req() request, @Param('id') id) {
    this.goalsService.delete(id, request.user.userId);
  }
}
