import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GoalsRequest } from './goals.model';

@Controller('goals')
@UseGuards(AuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Req() request, @Body() goalsRequest: GoalsRequest) {
    this.goalsService.create({ ...goalsRequest, userId: request.userId });
  }

  @Get()
  listGoals(@Req() request) {
    return this.goalsService.findByUserId(request.userId);
  }

  @Delete(':id')
  delete(@Req() request, @Param('id') id) {
    this.goalsService.delete(id);
  }
}
