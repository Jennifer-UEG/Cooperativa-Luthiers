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

        // REGRA DE NEGÓCIO 1: Mínimo de 2 bancadas (Exigência do Tema)
        if (bancadasNum < 2) {
            throw new BadRequestException('Uma oficina de luthier deve possuir no mínimo 2 bancadas.');
        }

        // REGRA DE NEGÓCIO 2: Nome deve ser completo
        if (nomeMestre.trim().split(' ').length < 2) {
            throw new BadRequestException('Informe o nome e sobrenome do mestre luthier.');
        }

        // REGRA DE NEGÓCIO 3: Data não pode ser no futuro
        if (new Date(dataAbertura) > new Date()) {
            throw new BadRequestException('A data de abertura não pode ser uma data futura.');
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

    async deactivate(id: number): Promise<Luthier> {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier) throw new NotFoundException('Luthier não encontrado.');

        luthier.certificada = false; // Desativa a certificação oficial
        return this.luthierRepo.update(luthier);
    }

    async delete(id: number): Promise<void> {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier) throw new NotFoundException('Luthier não encontrado.');

        await this.luthierRepo.delete(id);
    }
}