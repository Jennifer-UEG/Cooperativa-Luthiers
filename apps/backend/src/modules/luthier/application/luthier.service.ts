import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import type { LuthierRepositoryPort } from './ports/luthier.repository.port';
import { Luthier } from '../domain/luthier';

@Injectable()
export class LuthierService {
    constructor(
        @Inject('LuthierRepositoryPort')
        private readonly luthierRepo: LuthierRepositoryPort
    ) { }

    async create(nomeMestre: string, dataAbertura: Date, certificada: boolean, bancadasNum: number): Promise<Luthier> {

        // REGRA DE NEGÓCIO 1: Todos os campos são obrigatórios
        if (!nomeMestre || !dataAbertura || certificada === undefined || certificada === null || bancadasNum === undefined || bancadasNum === null) {
            throw new BadRequestException('Todos os campos são obrigatórios: nomeMestre, dataAbertura, certificada, bancadasNum.');
        }

        // REGRA DE NEGÓCIO 2: Mínimo de 2 bancadas
        if (bancadasNum < 2) {
            throw new BadRequestException('Uma oficina de luthier deve possuir no mínimo 2 bancadas.');
        }

        // REGRA DE NEGÓCIO 3: bancadasNum deve ser número inteiro
        if (!Number.isInteger(bancadasNum)) {
            throw new BadRequestException('A quantidade de bancadas deve ser um número inteiro.');
        }

        // REGRA DE NEGÓCIO 4: Nome deve conter nome e sobrenome
        if (nomeMestre.trim().split(' ').length < 2) {
            throw new BadRequestException('Informe o nome e sobrenome completo do mestre luthier.');
        }

        // REGRA DE NEGÓCIO 5: Data de abertura não pode ser futura
        if (new Date(dataAbertura) > new Date()) {
            throw new BadRequestException('A data de abertura não pode ser uma data futura.');
        }

        // REGRA DE NEGÓCIO 6: Data de abertura não pode ser anterior a 1900
        if (new Date(dataAbertura) < new Date('1900-01-01')) {
            throw new BadRequestException('A data de abertura não pode ser anterior ao ano de 1900.');
        }

        const luthier = new Luthier(null, nomeMestre, dataAbertura, certificada, bancadasNum);
        return this.luthierRepo.create(luthier);
    }

    async findAll(): Promise<Luthier[]> {
        return this.luthierRepo.findAll();
    }

    async findById(id: number): Promise<Luthier | null> {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier) throw new NotFoundException('Luthier não encontrado.');
        return luthier;
    }

    async findWithInstrumentos(id: number): Promise<any> {
        const luthier = await this.luthierRepo.findByIdWithInstrumentos(id);
        if (!luthier) throw new NotFoundException('Luthier não encontrado.');
        return luthier;
    }

    async update(id: number, nomeMestre: string, dataAbertura: Date, certificada: boolean, bancadasNum: number): Promise<Luthier> {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier) throw new NotFoundException('Luthier não encontrado.');

        if (bancadasNum < 2) {
            throw new BadRequestException('Uma oficina de luthier deve possuir no mínimo 2 bancadas.');
        }
        if (!Number.isInteger(bancadasNum)) {
            throw new BadRequestException('A quantidade de bancadas deve ser um número inteiro.');
        }
        if (nomeMestre.trim().split(' ').length < 2) {
            throw new BadRequestException('Informe o nome e sobrenome completo do mestre luthier.');
        }
        if (new Date(dataAbertura) > new Date()) {
            throw new BadRequestException('A data de abertura não pode ser uma data futura.');
        }

        luthier.nomeMestre = nomeMestre;
        luthier.dataAbertura = dataAbertura;
        luthier.certificada = certificada;
        luthier.bancadasNum = bancadasNum;

        return this.luthierRepo.update(luthier);
    }

    async deactivate(id: number): Promise<Luthier> {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier) throw new NotFoundException('Luthier não encontrado.');

        luthier.certificada = false;
        return this.luthierRepo.update(luthier);
    }

    async delete(id: number): Promise<void> {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier) throw new NotFoundException('Luthier não encontrado.');

        await this.luthierRepo.delete(id);
    }
}
