import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransactionRepository } from './modules/transactions/infra/repositories/transaction.repository.abstract';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }

}
