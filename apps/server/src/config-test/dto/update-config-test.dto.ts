import { PartialType } from '@nestjs/swagger';
import { CreateConfigTestDto } from './create-config-test.dto';

export class UpdateConfigTestDto extends PartialType(CreateConfigTestDto) {}
