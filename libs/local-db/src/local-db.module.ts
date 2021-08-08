import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Holiday } from './holiday/holidy.model';
import { SignImage } from './holiday/signImage.model';
import { LocalDbService } from './local-db.service';

const models = TypegooseModule.forFeature([Holiday, SignImage]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/calendar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [LocalDbService],
  exports: [LocalDbService, models],
})
export class LocalDbModule {}
