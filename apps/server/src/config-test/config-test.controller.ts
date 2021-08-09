import { ConfigureService } from '@libs/configure';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { ConfigTestService } from './config-test.service';
import { CreateConfigTestDto } from './dto/create-config-test.dto';
import { UpdateConfigTestDto } from './dto/update-config-test.dto';

@Controller('config-test')
@ApiTags('配置测试')
export class ConfigTestController {
  constructor(
    private readonly configTestService: ConfigTestService,
    private readonly config: ConfigService,
    private readonly libsConfig: ConfigureService,
  ) {}

  @Post()
  create(@Body() createConfigTestDto: CreateConfigTestDto) {
    return this.configTestService.create(createConfigTestDto);
  }

  @Get()
  findAll() {
    console.log('server/configure', this.config.get<string>('http'));
    this.libsConfig.libsConfigTest();
    return this.configTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configTestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigTestDto: UpdateConfigTestDto,
  ) {
    return this.configTestService.update(+id, updateConfigTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configTestService.remove(+id);
  }
}
