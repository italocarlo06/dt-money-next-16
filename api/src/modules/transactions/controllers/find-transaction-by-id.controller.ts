import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { FindTransactionByIdService } from "../services/find-transaction-by-id.service";
import type { Response } from 'express'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('transactions')
@Controller('transactions')
export class FindTransactionByIdController {

    constructor(private readonly findTransactionById: FindTransactionByIdService){}

    @Get('/:id')
    @ApiOperation({ summary: 'Buscar uma transação financeira por ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Transação encontrada com sucesso.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transação não encontrada.' })
    @ApiParam({ name: 'id', description: 'ID da transação a ser buscada', example: '123e4567-e89b-12d3-a456-426614174000' })
      async handle(@Param('id') id: string, @Res()res: Response) {
        const transaction = await this.findTransactionById.execute(id);
        return res.status(HttpStatus.OK).json(transaction);
      }
}