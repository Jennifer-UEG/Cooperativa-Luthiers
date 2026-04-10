"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instrumento = void 0;
class Instrumento {
    id;
    modeloMadeira;
    dataEntrada;
    reparoConcluido;
    custoReparo;
    luthierId;
    createdAt;
    updatedAt;
    constructor(id, modeloMadeira, dataEntrada, reparoConcluido, custoReparo, luthierId, createdAt, updatedAt) {
        this.id = id;
        this.modeloMadeira = modeloMadeira;
        this.dataEntrada = dataEntrada;
        this.reparoConcluido = reparoConcluido;
        this.custoReparo = custoReparo;
        this.luthierId = luthierId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.validate();
    }
    validate() {
        if (this.custoReparo < 0 || this.custoReparo > 50000) {
            throw new Error('O custo do reparo deve estar entre 0 e 50000');
        }
        if (this.reparoConcluido && this.custoReparo <= 0) {
            throw new Error('Um reparo concluído deve ter um custo maior que 0');
        }
        if (!this.modeloMadeira || this.modeloMadeira.trim().length === 0) {
            throw new Error('O modelo/madeira do instrumento é obrigatório');
        }
    }
}
exports.Instrumento = Instrumento;
//# sourceMappingURL=instrumento.js.map