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
exports.LuthierController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const luthier_service_1 = require("../application/luthier.service");
const create_luthier_dto_1 = require("./dto/create-luthier.dto");
let LuthierController = class LuthierController {
    luthierService;
    constructor(luthierService) {
        this.luthierService = luthierService;
    }
    create(dto) {
        return this.luthierService.create(dto.nomeMestre, dto.dataAbertura, dto.certificada, dto.bancadasNum);
    }
    findAll() {
        return this.luthierService.findAll();
    }
    findById(id) {
        return this.luthierService.findById(Number(id));
    }
    findWithInstrumentos(id) {
        return this.luthierService.findWithInstrumentos(Number(id));
    }
    update(id, dto) {
        return this.luthierService.update(Number(id), dto.nomeMestre, dto.dataAbertura, dto.certificada, dto.bancadasNum);
    }
    deactivate(id) {
        return this.luthierService.deactivate(Number(id));
    }
    delete(id) {
        return this.luthierService.delete(Number(id));
    }
};
exports.LuthierController = LuthierController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um luthier' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_luthier_dto_1.CreateLuthierDto]),
    __metadata("design:returntype", void 0)
], LuthierController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os luthiers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LuthierController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Busca luthier por id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LuthierController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/com-instrumentos'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Busca luthier com todos os seus instrumentos em reparo' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LuthierController.prototype, "findWithInstrumentos", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza os dados de um luthier' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_luthier_dto_1.CreateLuthierDto]),
    __metadata("design:returntype", void 0)
], LuthierController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Desativa a certificação de um luthier' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LuthierController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: 'Remove um luthier' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LuthierController.prototype, "delete", null);
exports.LuthierController = LuthierController = __decorate([
    (0, swagger_1.ApiTags)('Luthiers'),
    (0, common_1.Controller)('luthiers'),
    __metadata("design:paramtypes", [luthier_service_1.LuthierService])
], LuthierController);
//# sourceMappingURL=luthier.controller.js.map