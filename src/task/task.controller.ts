import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.createTask(createTaskDto, req.user);
  }

  @Get()
  async getTasks(@Request() req) {
    return this.taskService.getTasks(req.user);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.taskService.updateTask(id, updateTaskDto, req.user);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number, @Request() req) {
    return this.taskService.deleteTask(id, req.user);
  }
}
