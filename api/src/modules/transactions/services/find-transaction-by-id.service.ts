import { Injectable } from "@nestjs/common";
import { ITransactionRepository } from "src/modules/transactions/infra/repositories/transaction.repository.abstract";

@Injectable()
export class FindTransactionByIdService {
    constructor( private readonly transactionRepository: ITransactionRepository) {

    }

    async execute(id: string) {
        const existsTransaction = await this.transactionRepository.findById(id);
        return existsTransaction;    
    }
}