import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/typeorm.module';
import { LuthierModule } from './modules/luthier/luthier.module';
import { InstrumentoModule } from './modules/instrumento/instrumento.module';

@Module({
  imports: [
    DatabaseModule,
    LuthierModule,
    InstrumentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
