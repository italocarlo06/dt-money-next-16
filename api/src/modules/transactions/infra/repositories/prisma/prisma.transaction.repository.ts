import { CreateTransactionDTO } from "../../../dto/create-transaction.dto";
import { UpdateTransactionDTO } from "../../../dto/update-transaction.dto";
import { ITransactionRepository } from "../transaction.repository.abstract";
import { PrismaService } from "src/shared/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class PrismaTransactionRepository implements ITransactionRepository {
    constructor(private readonly prisma: PrismaService) {
    
    }
    async create(data: CreateTransactionDTO) {
     const transaction = await this.prisma.transaction.create({
      data
    });

    return transaction;
    }
    
    async findAll() {
       const transactions = await this.prisma.transaction.findMany();
       return transactions;
    }
    
    async findById(id: string) {
      const existsTransaction = await this.prisma.transaction.findUnique({
        where: {
            id
        }
        })

      if (!existsTransaction) {
       throw new NotFoundException('Transaction not found');
      }

     return existsTransaction;
    }

    async delete(id: string) {
        await this.prisma.transaction.delete({
            where: {
            id
            }
        })
    }

    async update(id: string, data: UpdateTransactionDTO) {
        const updatedTransaction = await this.prisma.transaction.update({
        where: {
            id       
        },
        data
        })

       return updatedTransaction;
    }

}