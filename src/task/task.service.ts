import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, user });
    return this.tasksRepository.save(task);
  }

  async getTasks(user: User): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user } });
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    await this.tasksRepository.update({ id, user }, updateTaskDto);
    return this.tasksRepository.findOne({ where: { id, user } });
  }

  async deleteTask(id: number, user: User): Promise<void> {
    await this.tasksRepository.delete({ id, user });
  }
}
