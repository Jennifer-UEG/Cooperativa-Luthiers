import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentoController } from './presentation/instrumento.controller';
import { InstrumentoService } from './application/instrumento.service';
import { InstrumentoOrmEntity } from './infrastructure/persistence/typeorm/instrumento.orm-entity';
import { InstrumentoTypeOrmRepository } from './infrastructure/persistence/typeorm/instrumento.typeorm.repository';
import { LuthierOrmEntity } from '../luthier/infrastructure/persistence/typeorm/luthier.orm-entity';
import { LuthierTypeOrmRepository } from '../luthier/infrastructure/persistence/typeorm/luthier.typeorm.repository';

@Module({
    imports: [TypeOrmModule.forFeature([InstrumentoOrmEntity, LuthierOrmEntity])],
    controllers: [InstrumentoController],
    providers: [
        InstrumentoService,
        {
            provide: 'InstrumentoRepositoryPort',
            useClass: InstrumentoTypeOrmRepository,
        },
        {
            provide: 'LuthierRepositoryPort',
            useClass: LuthierTypeOrmRepository,
        },
    ],
})
export class InstrumentoModule { }
