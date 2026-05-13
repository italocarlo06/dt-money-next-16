import { Body, Controller, HttpStatus, Param, Put, Res } from "@nestjs/common";
import { UpdateTransactionService } from "../services/update-transaction.service";
import { UpdateTransactionDTO } from "../dto/update-transaction.dto";
import type { Response } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('transactions')
@Controller('transactions')
export class UpdateTransactionController {
    constructor( private readonly updateTransactionService: UpdateTransactionService){
        
    }

  @ApiOperation({ summary: 'Atualizar uma transação financeira' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Transação atualizada com sucesso.'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados de entrada inválidos.'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transação não encontrada.' })
  @ApiBody({ type: UpdateTransactionDTO, description: 'Dados para atualização da transação' })
  @ApiParam({ name: 'id', description: 'ID da transação a ser atualizada', example: '123e4567-e89b-12d3-a456-426614174000' })
  @Put('/:id')
  async updateTransaction(
    @Param('id') id: string, 
    @Body() data: UpdateTransactionDTO,
    @Res() res: Response){
    const updatedTransaction = await this.updateTransactionService.execute(id, data);
    return res.status(HttpStatus.OK).json(updatedTransaction);
  }
}