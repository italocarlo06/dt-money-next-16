import { Controller, Get, Res, HttpStatus } from "@nestjs/common";
import { GetTransactionsService } from "../services/get-transactions.service";
import type { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('transactions')
@Controller('transactions')
export class GetTransactionsController {
    constructor( private readonly getTransactionsService: GetTransactionsService){
        
    }

    @Get('')
    @ApiOperation({ summary: 'Listar todas as transações financeiras' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de transações retornada com sucesso.' })
    async getTransactions(@Res() res: Response) {
    const transactions = await this.getTransactionsService.execute();
    return res.status(HttpStatus.OK).json(transactions);
    }

}