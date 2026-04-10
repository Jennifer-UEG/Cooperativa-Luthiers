import type { LuthierRepositoryPort } from '../../luthier/infrastructure/persistence/application/ports/luthier.repository.port';
import type { InstrumentoRepositoryPort } from './ports/instrumento.repository.port';
import { Instrumento } from '../domain/instrumento';
export declare class InstrumentoService {
    private readonly instrumentoRepo;
    private readonly luthierRepo;
    constructor(instrumentoRepo: InstrumentoRepositoryPort, luthierRepo: LuthierRepositoryPort);
    create(modeloMadeira: string, dataEntrada: Date, reparoConcluido: boolean, custoReparo: number, luthierId: number): Promise<Instrumento>;
    findAll(): Promise<Instrumento[]>;
    findById(id: number): Promise<Instrumento | null>;
    deactivate(id: number): Promise<Instrumento>;
    delete(id: number): Promise<void>;
}
