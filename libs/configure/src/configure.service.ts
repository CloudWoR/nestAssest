import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigureService {
  constructor(private readonly config: ConfigService) {
    this.libsConfigTest();
  }

  libsConfigTest() {
    console.log(this.config.get('configure'));
  }
}
