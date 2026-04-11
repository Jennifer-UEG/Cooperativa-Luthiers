import type { LuthierRepositoryPort } from './ports/luthier.repository.port';
import { Luthier } from '../domain/luthier';
export declare class LuthierService {
    private readonly luthierRepo;
    constructor(luthierRepo: LuthierRepositoryPort);
    create(nomeMestre: string, dataAbertura: Date, certificada: boolean, bancadasNum: number): Promise<Luthier>;
    findAll(): Promise<Luthier[]>;
    findById(id: number): Promise<Luthier | null>;
    findWithInstrumentos(id: number): Promise<any>;
    update(id: number, nomeMestre: string, dataAbertura: Date, certificada: boolean, bancadasNum: number): Promise<Luthier>;
    deactivate(id: number): Promise<Luthier>;
    delete(id: number): Promise<void>;
}
