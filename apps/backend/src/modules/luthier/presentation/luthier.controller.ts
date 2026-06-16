import { Body, Controller, Delete, Get, Param, Post, Patch, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LuthierService } from '../application/luthier.service';
import { CreateLuthierDto } from './dto/create-luthier.dto';

@ApiTags('Luthiers')
@Controller('luthiers')
export class LuthierController {
    constructor(private readonly luthierService: LuthierService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um luthier' })
    create(@Body() dto: CreateLuthierDto) {
        return this.luthierService.create(dto.nomeMestre, dto.dataAbertura, dto.certificada, dto.bancadasNum);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os luthiers' })
    findAll() {
        return this.luthierService.findAll();
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Busca luthier por id' })
    findById(@Param('id') id: string) {
        return this.luthierService.findById(Number(id));
    }

    @Get(':id/com-instrumentos')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Busca luthier com todos os seus instrumentos em reparo' })
    findWithInstrumentos(@Param('id') id: string) {
        return this.luthierService.findWithInstrumentos(Number(id));
    }

    @Put(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Atualiza os dados de um luthier' })
    update(@Param('id') id: string, @Body() dto: CreateLuthierDto) {
        return this.luthierService.update(Number(id), dto.nomeMestre, dto.dataAbertura, dto.certificada, dto.bancadasNum);
    }

    @Patch(':id/deactivate')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Desativa a certificação de um luthier' })
    deactivate(@Param('id') id: string) {
        return this.luthierService.deactivate(Number(id));
    }

    @Delete(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: 'Remove um luthier' })
    delete(@Param('id') id: string) {
        return this.luthierService.delete(Number(id));
    }
}
