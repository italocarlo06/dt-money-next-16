import { Controller, Delete, HttpStatus, Param, Res } from "@nestjs/common";
import { DeleteTransactionService } from "../services/delete-transaction.service";
import type { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('transactions')
@Controller('transactions')
export class DeleteTransactionController {
    constructor(private readonly deleteTransactionService: DeleteTransactionService){}

  @Delete('/:id')
  @ApiOperation({ summary: 'Remover uma transação financeira' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Transação removida com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transação não encontrada.' })
  @ApiParam({ name: 'id', description: 'ID da transação a ser removida', example: '123e4567-e89b-12d3-a456-426614174000' })
  async deleteTransaction(@Param('id') id: string, @Res()res: Response) {
    await this.deleteTransactionService.execute(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}