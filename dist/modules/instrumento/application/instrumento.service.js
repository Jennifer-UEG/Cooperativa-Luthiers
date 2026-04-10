"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrumentoService = void 0;
const common_1 = require("@nestjs/common");
const instrumentoRepositoryPort = __importStar(require("./ports/instrumento.repository.port"));
const instrumento_1 = require("../domain/instrumento");
let InstrumentoService = class InstrumentoService {
    instrumentoRepo;
    luthierRepo;
    constructor(instrumentoRepo, luthierRepo) {
        this.instrumentoRepo = instrumentoRepo;
        this.luthierRepo = luthierRepo;
    }
    async create(modeloMadeira, dataEntrada, reparoConcluido, custoReparo, luthierId) {
        const luthier = await this.luthierRepo.findById(luthierId);
        if (!luthier) {
            throw new common_1.NotFoundException('Luthier não encontrado para vincular ao instrumento');
        }
        if (new Date(dataEntrada) < new Date(luthier.dataAbertura)) {
            throw new common_1.BadRequestException('A data de entrada não pode ser anterior à data de abertura da oficina');
        }
        if (custoReparo <= 0 || custoReparo > 50000) {
            throw new common_1.BadRequestException('O custo do reparo deve ser maior que 0 e no máximo 50.000');
        }
        if (reparoConcluido && custoReparo <= 0) {
            throw new common_1.BadRequestException('Instrumentos com reparo concluído devem ter um custo preenchido');
        }
        const todos = await this.instrumentoRepo.findAll();
        const duplicado = todos.find(i => i.modeloMadeira === modeloMadeira &&
            i.reparoConcluido === false &&
            i.luthierId === luthierId);
        if (duplicado) {
            throw new common_1.ConflictException('Já existe um instrumento deste modelo em reparo para este luthier');
        }
        const instrumento = new instrumento_1.Instrumento(null, modeloMadeira, dataEntrada, reparoConcluido, custoReparo, luthierId);
        return this.instrumentoRepo.create(instrumento);
    }
    async findAll() {
        return this.instrumentoRepo.findAll();
    }
    async findById(id) {
        const instrumento = await this.instrumentoRepo.findById(id);
        if (!instrumento)
            throw new common_1.NotFoundException('Instrumento não encontrado');
        return instrumento;
    }
    async deactivate(id) {
        const instrumento = await this.instrumentoRepo.findById(id);
        if (!instrumento)
            throw new common_1.NotFoundException('Instrumento não encontrado');
        instrumento.reparoConcluido = true;
        return this.instrumentoRepo.update(instrumento);
    }
    async delete(id) {
        await this.instrumentoRepo.delete(id);
    }
};
exports.InstrumentoService = InstrumentoService;
exports.InstrumentoService = InstrumentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('InstrumentoRepositoryPort')),
    __param(1, (0, common_1.Inject)('LuthierRepositoryPort')),
    __metadata("design:paramtypes", [Object, Object])
], InstrumentoService);
//# sourceMappingURL=instrumento.service.js.map