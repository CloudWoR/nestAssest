import { Injectable } from '@nestjs/common';
import { CreateConfigTestDto } from './dto/create-config-test.dto';
import { UpdateConfigTestDto } from './dto/update-config-test.dto';

@Injectable()
export class ConfigTestService {
  create(createConfigTestDto: CreateConfigTestDto) {
    return 'This action adds a new configTest';
  }

  findAll() {
    return `This action returns all configTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configTest`;
  }

  update(id: number, updateConfigTestDto: UpdateConfigTestDto) {
    return `This action updates a #${id} configTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} configTest`;
  }
}
