import { LuthierService } from '../application/luthier.service';
import { CreateLuthierDto } from './dto/create-luthier.dto';
export declare class LuthierController {
    private readonly luthierService;
    constructor(luthierService: LuthierService);
    create(dto: CreateLuthierDto): Promise<import("../domain/luthier").Luthier>;
    findAll(): Promise<import("../domain/luthier").Luthier[]>;
    findById(id: string): Promise<import("../domain/luthier").Luthier | null>;
    findWithInstrumentos(id: string): Promise<any>;
    update(id: string, dto: CreateLuthierDto): Promise<import("../domain/luthier").Luthier>;
    deactivate(id: string): Promise<import("../domain/luthier").Luthier>;
    delete(id: string): Promise<void>;
}
