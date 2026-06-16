import { Luthier } from '../../domain/luthier';

export interface LuthierRepositoryPort {
    create(luthier: Luthier): Promise<Luthier>;
    findById(id: number): Promise<Luthier | null>;
    findByIdWithInstrumentos(id: number): Promise<any>;
    findAll(): Promise<Luthier[]>;
    update(luthier: Luthier): Promise<Luthier>;
    delete(id: number): Promise<void>;
}
