import { InstrumentoOrmEntity } from '../../../instrumento/infrastructure/persistence/instrumento.orm-entity';
export declare class LuthierOrmEntity {
    id: number;
    nomeMestre: string;
    dataAbertura: Date;
    certificada: boolean;
    bancadasNum: number;
    instrumentos: InstrumentoOrmEntity[];
}
