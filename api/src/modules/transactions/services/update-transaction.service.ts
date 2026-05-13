import  { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateTransactionDTO } from "../dto/update-transaction.dto";
import { ITransactionRepository } from "src/modules/transactions/infra/repositories/transaction.repository.abstract";


@Injectable()
export class UpdateTransactionService {
    constructor( private readonly transactionRepository: ITransactionRepository) {

    }

   async execute(id: string, data: UpdateTransactionDTO) {
    const existsTransaction = await this.transactionRepository.findById(id)
    if (!existsTransaction) { 
            throw new NotFoundException('Transaction not found');
    }
    const updatedTransaction = await this.transactionRepository.update(id, data)

    return updatedTransaction;
  }
}
