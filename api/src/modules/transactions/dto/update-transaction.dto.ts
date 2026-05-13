import { PartialType } from '@nestjs/swagger';
import { CreateTransactionDTO } from './create-transaction.dto';
export class UpdateTransactionDTO extends PartialType(CreateTransactionDTO) {
   
}