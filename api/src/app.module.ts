import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaTransactionRepository } from './modules/transactions/infra/repositories/prisma/prisma.transaction.repository';
import { ITransactionRepository } from './modules/transactions/infra/repositories/transaction.repository.abstract';
import { PrismaService } from './shared/prisma.service';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [TransactionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, {
    provide: ITransactionRepository,
    useClass: PrismaTransactionRepository
  }],
})
export class AppModule {}
