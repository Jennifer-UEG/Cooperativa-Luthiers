import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { InstrumentoService } from '../application/instrumento.service';
import { CreateInstrumentoDto } from './dto/create-instrumento.dto';

@ApiTags('Instrumentos')
@Controller('instrumentos')
export class InstrumentoController {
    constructor(private readonly instrumentoService: InstrumentoService) { }

    @Post()
    @ApiOperation({ summary: 'Registre a entrada de um instrumento na oficina para reparo   ' })
    @ApiBody({ type: CreateInstrumentoDto })
    create(@Body() dto: CreateInstrumentoDto) {
        return this.instrumentoService.create(dto.modeloMadeira, dto.dataEntrada, dto.reparoConcluido, dto.custoReparo, dto.luthierId);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os instrumentos em manutenção na oficina' })
    findAll() {
        return this.instrumentoService.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: 1, description: 'ID do instrumento' })
    @ApiOperation({ summary: 'Busca instrumento por id' })
    findById(@Param('id') id: string) {
        return this.instrumentoService.findById(Number(id));
    }

    @Patch(':id/concluir')
    @ApiParam({ name: 'id', example: 1, description: 'ID do instrumento' })
    @ApiOperation({ summary: 'Marca o reparo de um instrumento como concluído' })
    deactivate(@Param('id') id: string) {
        return this.instrumentoService.deactivate(Number(id));
    }

    @Delete(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Remove o registro de um instrumento' })
    delete(@Param('id') id: string) {
        return this.instrumentoService.delete(Number(id));
    }
}