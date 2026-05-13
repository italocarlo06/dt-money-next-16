import { IsDate, IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDTO {
   @ApiPropertyOptional({ description: 'ID da Transação', example: '123e4567-e89b-12d3-a456-426614174000' })
   @IsString()
   @IsOptional()
   id?: string;
   
   @ApiProperty({ description: 'Título da Transação', example: 'Salário' })
   @IsString()
   title: string;
  
   @ApiProperty({ description: 'Valor da Transação', example: 1000, minimum: 0.01 })
   @IsNumber()
   @Min(0.01, { message: 'O preço deve ser um número positivo' })
   price: number;

   @ApiProperty({ description: 'Tipo da Transação', example: 'INCOME', enum: ['INCOME', 'OUTCOME'] })
   @IsIn(['INCOME', 'OUTCOME'], { message: 'O tipo deve ser INCOME ou OUTCOME'})
   type: 'INCOME' | 'OUTCOME';
  
   @ApiProperty({ description: 'Categoria da Transação', example: 'Trabalho' })
   @IsString()
   category: string;
   
   @ApiPropertyOptional({ description: 'Data da Transação', example: '2024-06-01T12:00:00Z' })
   @IsOptional()
   @IsDate({ message: 'A data deve ser uma data válida' })
   @Type(() => Date)
   data?: Date;
}