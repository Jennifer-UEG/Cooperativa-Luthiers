"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Luthier = void 0;
class Luthier {
    id;
    nomeMestre;
    dataAbertura;
    certificada;
    bancadasNum;
    constructor(id, nomeMestre, dataAbertura, certificada, bancadasNum) {
        this.id = id;
        this.nomeMestre = nomeMestre;
        this.dataAbertura = dataAbertura;
        this.certificada = certificada;
        this.bancadasNum = bancadasNum;
        this.validate();
    }
    validate() {
        if (this.bancadasNum < 2) {
            throw new Error('A oficina deve possuir no mínimo 2 bancadas para operar na cooperativa.');
        }
        if (!this.nomeMestre || this.nomeMestre.trim().length === 0) {
            throw new Error('O nome do mestre luthier é obrigatório.');
        }
        if (new Date(this.dataAbertura) > new Date()) {
            throw new Error('A data de abertura da oficina não pode ser uma data futura.');
        }
    }
}
exports.Luthier = Luthier;
//# sourceMappingURL=luthier.js.map