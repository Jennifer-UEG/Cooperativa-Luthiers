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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInstrumentoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInstrumentoDto {
    modeloMadeira;
    dataEntrada;
    reparoConcluido;
    luthierId;
    custoReparo;
}
exports.CreateInstrumentoDto = CreateInstrumentoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Modelo e madeira do instrumento', example: 'Violão de nylon' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O modelo/madeira do instrumento é obrigatório' }),
    __metadata("design:type", String)
], CreateInstrumentoDto.prototype, "modeloMadeira", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de entrada do instrumento na oficina', example: '2022-01-01' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'A data de entrada é obrigatória' }),
    __metadata("design:type", Date)
], CreateInstrumentoDto.prototype, "dataEntrada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status do reparo', example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateInstrumentoDto.prototype, "reparoConcluido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do luthier responsável pelo reparo', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O ID do luthier é obrigatório' }),
    __metadata("design:type", Number)
], CreateInstrumentoDto.prototype, "luthierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Custo do reparo', example: 1250.20 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O custo do reparo é obrigatório' }),
    (0, class_validator_1.Min)(0, { message: 'O custo do reparo deve ser maior que 0' }),
    (0, class_validator_1.Max)(50000, { message: 'O custo do reparo não deve ultrapassar 50000' }),
    __metadata("design:type", Number)
], CreateInstrumentoDto.prototype, "custoReparo", void 0);
//# sourceMappingURL=create-instrumento.dto.js.map