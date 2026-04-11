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
exports.CreateLuthierDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLuthierDto {
    nomeMestre;
    dataAbertura;
    certificada;
    bancadasNum;
}
exports.CreateLuthierDto = CreateLuthierDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "João Silva", description: 'Nome completo do mestre luthier' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome do mestre luthier é obrigatório' }),
    __metadata("design:type", String)
], CreateLuthierDto.prototype, "nomeMestre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2022-01-01", description: 'Data de abertura da oficina (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)({}, { message: 'A data de abertura deve ser uma data válida no formato YYYY-MM-DD' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A data de abertura é obrigatória' }),
    __metadata("design:type", Date)
], CreateLuthierDto.prototype, "dataAbertura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indica se a oficina possui certificação profissional' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLuthierDto.prototype, "certificada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Quantidade de bancadas de trabalho (mínimo 2)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O número de bancadas é obrigatório' }),
    __metadata("design:type", Number)
], CreateLuthierDto.prototype, "bancadasNum", void 0);
//# sourceMappingURL=create-luthier.dto.js.map