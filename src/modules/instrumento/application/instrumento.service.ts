import { Injectable, Inject, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import type { LuthierRepositoryPort } from '../../luthier/infrastructure/persistence/application/ports/luthier.repository.port';
import type { InstrumentoRepositoryPort } from './ports/instrumento.repository.port';
import { Instrumento } from '../domain/instrumento';

@Injectable()
export class InstrumentoService {
    constructor(
        @Inject('InstrumentoRepositoryPort')
        private readonly instrumentoRepo: InstrumentoRepositoryPort,

        @Inject('LuthierRepositoryPort')
        private readonly luthierRepo: LuthierRepositoryPort
    ) { }

    async create(
        modeloMadeira: string,
        dataEntrada: Date,
        reparoConcluido: boolean,
        custoReparo: number,
        luthierId: number
    ): Promise<Instrumento> {

        // 1. [Regra de Negócio] Verificar se o Luthier (Oficina) existe
        const luthier = await this.luthierRepo.findById(luthierId);
        if (!luthier) {
            throw new NotFoundException(`Oficina de Luthier com ID ${luthierId} não encontrada.`);
        }

        // 2. [Regra de Negócio 2] Data de entrada não pode ser anterior à abertura da oficina
        if (new Date(dataEntrada) < new Date(luthier.dataAbertura)) {
            throw new BadRequestException('A data de entrada do instrumento não pode ser anterior à abertura da oficina.');
        }

        // 3. [Regra de Negócio 5] Custo do reparo deve estar entre 0 e 50.000
        if (custoReparo < 0 || custoReparo > 50000) {
            throw new BadRequestException('O custo do reparo deve ser entre R$ 0,00 e R$ 50.000,00.');
        }

        // 4. [Regra de Negócio 6] Se o reparo está concluído, o custo deve ser maior que zero
        if (reparoConcluido && custoReparo <= 0) {
            throw new BadRequestException('Um reparo concluído exige um custo de manutenção maior que zero.');
        }

        // 5. [Regra de Negócio 7] Evitar duplicidade de modelo em reparo para o mesmo luthier
        const todos = await this.instrumentoRepo.findAll();
        const duplicado = todos.find(i =>
            i.modeloMadeira === modeloMadeira &&
            i.reparoConcluido === false &&
            i.luthierId === luthierId
        );
        if (duplicado) {
            throw new ConflictException('Este luthier já possui um instrumento deste modelo em reparo no momento.');
        }

        const instrumento = new Instrumento(null, modeloMadeira, dataEntrada, reparoConcluido, custoReparo, luthierId);
        return this.instrumentoRepo.create(instrumento);
    }

    async findAll(): Promise<Instrumento[]> {
        return this.instrumentoRepo.findAll();
    }

    async findById(id: number): Promise<Instrumento | null> {
        const instrumento = await this.instrumentoRepo.findById(id);
        if (!instrumento) throw new NotFoundException('Registro de instrumento não encontrado.');
        return instrumento;
    }

    async deactivate(id: number): Promise<Instrumento> {
        const instrumento = await this.instrumentoRepo.findById(id);
        if (!instrumento) throw new NotFoundException('Instrumento não encontrado.');

        instrumento.reparoConcluido = true; // Finaliza o processo de reparo
        return this.instrumentoRepo.update(instrumento);
    }

    async delete(id: number): Promise<void> {
        await this.instrumentoRepo.delete(id);
    }
}