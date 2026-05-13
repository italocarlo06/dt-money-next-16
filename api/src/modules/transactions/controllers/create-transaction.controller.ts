import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { CreateTransactionDTO } from "../dto/create-transaction.dto";
import { CreateTransactionService } from "../services/create-transaction.service";
import type { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('transactions')
@Controller('transactions')
export class CreateTransactionController {
    constructor(private readonly createTransactionService: CreateTransactionService) {
    }

    @Post('')
    @ApiOperation({ summary: 'Criar uma nova transação financeira' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Transação criada com sucesso.'})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados de entrada inválidos.'})
    @ApiBody({ type: CreateTransactionDTO, description: 'Dados para criação da transação' })
    async createTransaction(@Body() data: CreateTransactionDTO, @Res() res: Response) {
        const transaction = await this.createTransactionService.execute(data);
        return res.status(HttpStatus.CREATED).json(transaction);
    }
}