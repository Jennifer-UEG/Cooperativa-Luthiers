export class Luthier {
    constructor(
        public readonly id: number | null,
        public nomeMestre: string,
        public dataAbertura: Date,
        public certificada: boolean,
        public bancadasNum: number,
    ) {
        // Chama a validação interna assim que o objeto é instanciado
        this.validate();
    }

    private validate() {
        // Regra de Negócio: Uma oficina deve ter no mínimo 2 bancadas
        if (this.bancadasNum < 2) {
            throw new Error('A oficina deve possuir no mínimo 2 bancadas para operar na cooperativa.');
        }

        // Regra de Negócio: O nome do mestre luthier não pode ser vazio
        if (!this.nomeMestre || this.nomeMestre.trim().length === 0) {
            throw new Error('O nome do mestre luthier é obrigatório.');
        }

        // Regra de Negócio: A data de abertura não pode ser futura
        if (new Date(this.dataAbertura) > new Date()) {
            throw new Error('A data de abertura da oficina não pode ser uma data futura.');
        }
    }
}