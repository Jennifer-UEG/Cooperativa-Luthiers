"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuthierService = void 0;
const common_1 = require("@nestjs/common");
const luthier_1 = require("../domain/luthier");
let LuthierService = class LuthierService {
    luthierRepo;
    constructor(luthierRepo) {
        this.luthierRepo = luthierRepo;
    }
    async create(nomeMestre, dataAbertura, certificada, bancadasNum) {
        if (!nomeMestre || !dataAbertura || certificada === undefined || certificada === null || bancadasNum === undefined || bancadasNum === null) {
            throw new common_1.BadRequestException('Todos os campos são obrigatórios: nomeMestre, dataAbertura, certificada, bancadasNum.');
        }
        if (bancadasNum < 2) {
            throw new common_1.BadRequestException('Uma oficina de luthier deve possuir no mínimo 2 bancadas.');
        }
        if (!Number.isInteger(bancadasNum)) {
            throw new common_1.BadRequestException('A quantidade de bancadas deve ser um número inteiro.');
        }
        if (nomeMestre.trim().split(' ').length < 2) {
            throw new common_1.BadRequestException('Informe o nome e sobrenome completo do mestre luthier.');
        }
        if (new Date(dataAbertura) > new Date()) {
            throw new common_1.BadRequestException('A data de abertura não pode ser uma data futura.');
        }
        if (new Date(dataAbertura) < new Date('1900-01-01')) {
            throw new common_1.BadRequestException('A data de abertura não pode ser anterior ao ano de 1900.');
        }
        const luthier = new luthier_1.Luthier(null, nomeMestre, dataAbertura, certificada, bancadasNum);
        return this.luthierRepo.create(luthier);
    }
    async findAll() {
        return this.luthierRepo.findAll();
    }
    async findById(id) {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier)
            throw new common_1.NotFoundException('Luthier não encontrado.');
        return luthier;
    }
    async findWithInstrumentos(id) {
        const luthier = await this.luthierRepo.findByIdWithInstrumentos(id);
        if (!luthier)
            throw new common_1.NotFoundException('Luthier não encontrado.');
        return luthier;
    }
    async update(id, nomeMestre, dataAbertura, certificada, bancadasNum) {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier)
            throw new common_1.NotFoundException('Luthier não encontrado.');
        if (bancadasNum < 2) {
            throw new common_1.BadRequestException('Uma oficina de luthier deve possuir no mínimo 2 bancadas.');
        }
        if (!Number.isInteger(bancadasNum)) {
            throw new common_1.BadRequestException('A quantidade de bancadas deve ser um número inteiro.');
        }
        if (nomeMestre.trim().split(' ').length < 2) {
            throw new common_1.BadRequestException('Informe o nome e sobrenome completo do mestre luthier.');
        }
        if (new Date(dataAbertura) > new Date()) {
            throw new common_1.BadRequestException('A data de abertura não pode ser uma data futura.');
        }
        luthier.nomeMestre = nomeMestre;
        luthier.dataAbertura = dataAbertura;
        luthier.certificada = certificada;
        luthier.bancadasNum = bancadasNum;
        return this.luthierRepo.update(luthier);
    }
    async deactivate(id) {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier)
            throw new common_1.NotFoundException('Luthier não encontrado.');
        luthier.certificada = false;
        return this.luthierRepo.update(luthier);
    }
    async delete(id) {
        const luthier = await this.luthierRepo.findById(id);
        if (!luthier)
            throw new common_1.NotFoundException('Luthier não encontrado.');
        await this.luthierRepo.delete(id);
    }
};
exports.LuthierService = LuthierService;
exports.LuthierService = LuthierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('LuthierRepositoryPort')),
    __metadata("design:paramtypes", [Object])
], LuthierService);
//# sourceMappingURL=luthier.service.js.map