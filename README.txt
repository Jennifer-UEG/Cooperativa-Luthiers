========================================================
  COOPERATIVA DE LUTHIERS - API REST
  Disciplina: Programação Web I - UEG
========================================================

DESCRIÇÃO DO PROJETO
--------------------
API RESTful desenvolvida com NestJS, TypeORM e SQLite para
gerenciar uma cooperativa de luthiers (artesãos de instrumentos
musicais). O sistema controla oficinas de luthiers e os
instrumentos em reparo nessas oficinas.

TEMA: 7 - Cooperativa de Luthiers
BANCO DE DADOS: SQLite (arquivo: data/cooperativa_luthiers.db)
PORTA: 3000

ENTIDADES
---------
1. Luthier (Entidade Pai)
   - id: número (gerado automaticamente)
   - nomeMestre: texto (nome completo do mestre luthier)
   - dataAbertura: data (data de abertura da oficina)
   - certificada: booleano (se a oficina possui certificação)
   - bancadasNum: número (quantidade de bancadas, mínimo 2)

2. InstrumentoReparo (Entidade Filho)
   - id: número (gerado automaticamente)
   - modeloMadeira: texto (ex: "Violino Stradivarius")
   - dataEntrada: data (data de entrada do instrumento)
   - reparoConcluido: booleano (se o reparo foi concluído)
   - custoReparo: número (custo em reais, de 0 a 50.000)
   - luthierId: número (chave estrangeira para Luthier)

COMO EXECUTAR
-------------
1. Instalar dependências:
   npm install

2. Iniciar o servidor em modo desenvolvimento:
   npm run start:dev

3. Acessar a documentação Swagger no navegador:
   http://localhost:3000/api

ENDPOINTS - LUTHIERS
--------------------
POST   /luthiers                      -> Cria um novo luthier
GET    /luthiers                      -> Lista todos os luthiers
GET    /luthiers/:id                  -> Busca luthier por ID
GET    /luthiers/:id/com-instrumentos -> Busca luthier com seus instrumentos
PUT    /luthiers/:id                  -> Atualiza dados do luthier
PATCH  /luthiers/:id/deactivate       -> Desativa a certificação
DELETE /luthiers/:id                  -> Remove um luthier

ENDPOINTS - INSTRUMENTOS
------------------------
POST   /instrumentos                  -> Registra instrumento para reparo
GET    /instrumentos                  -> Lista todos os instrumentos
GET    /instrumentos/:id              -> Busca instrumento por ID
PATCH  /instrumentos/:id/concluir     -> Marca reparo como concluído
DELETE /instrumentos/:id              -> Remove registro de instrumento

VALIDAÇÕES DE NEGÓCIO IMPLEMENTADAS
------------------------------------
Luthier (Service):
  1. Todos os campos são obrigatórios
  2. bancadasNum deve ser no mínimo 2
  3. bancadasNum deve ser número inteiro
  4. nomeMestre deve conter nome e sobrenome
  5. dataAbertura não pode ser data futura
  6. dataAbertura não pode ser anterior a 1900

InstrumentoReparo (Service):
  7. luthierId referenciado deve existir (integridade de FK)
  8. dataEntrada não pode ser anterior à dataAbertura da oficina
  9. custoReparo deve estar entre R$ 0 e R$ 50.000
 10. Se reparoConcluido = true, custoReparo deve ser maior que 0
 11. Não é permitido duplicar modeloMadeira em reparo no mesmo luthier

ARQUITETURA
-----------
O projeto segue a Arquitetura Hexagonal (Ports and Adapters):

src/
  modules/
    luthier/
      domain/            -> Classe de domínio Luthier
      application/       -> Service + Interface (Port)
        ports/
      infrastructure/
        persistence/
          typeorm/       -> ORM Entity + Repository (Adapter)
      presentation/      -> Controller + DTO
        dto/
    instrumento/
      domain/
      application/
        ports/
      infrastructure/
        persistence/
          typeorm/
      presentation/
        dto/
  shared/
    database/            -> Configuração do TypeORM/SQLite
    filters/             -> Filtro global de exceções

TECNOLOGIAS
-----------
- NestJS 11
- TypeORM 0.3
- SQLite3
- class-validator / class-transformer
- @nestjs/swagger
