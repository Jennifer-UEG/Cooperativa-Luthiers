import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LuthierOrmEntity } from './modules/luthier/infrastructure/persistence/luthier.orm-entity';
import { InstrumentoOrmEntity } from './modules/instrumento/infrastructure/persistence/instrumento.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cooperatica_luthiers.db',
      entities: [LuthierOrmEntity, InstrumentoOrmEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
