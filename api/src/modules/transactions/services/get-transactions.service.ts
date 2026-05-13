import { Injectable } from "@nestjs/common";
import { ITransactionRepository } from "src/modules/transactions/infra/repositories/transaction.repository.abstract";
@Injectable()
export class GetTransactionsService {
  constructor( private readonly transactionRepository: ITransactionRepository){

  }
  async execute() {
    const transactions = await this.transactionRepository.findAll();
    
    return transactions;
  }
}
