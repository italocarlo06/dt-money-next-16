import { Injectable, NotFoundException } from "@nestjs/common";
import { ITransactionRepository } from "src/modules/transactions/infra/repositories/transaction.repository.abstract";

@Injectable()
export class DeleteTransactionService {
    constructor(private readonly transactionRepository: ITransactionRepository){
        
    }

    async execute(id: string) {
        const existsTransaction = await this.transactionRepository.findById(id)
        if (!existsTransaction) { 
                throw new NotFoundException('Transaction not found');
        }      
        await this.transactionRepository.delete(id);
      }
}