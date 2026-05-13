import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionService } from './create-transaction.service';
import { ITransactionRepository  } from '../infra/repositories/transaction.repository.abstract';
import { CreateTransactionDTO } from '../dto/create-transaction.dto';


describe('CreateTransactionService', () => {
    let service: CreateTransactionService;

    const transactionMockRepository = {
      create: jest.fn(),  
    }

    beforeEach( async () => {
        const module: TestingModule =  await Test.createTestingModule({
            providers: [
                CreateTransactionService,
                {
                    provide: ITransactionRepository,
                    useValue: transactionMockRepository
                }
            ]
        }).compile();

        service = module.get<CreateTransactionService>(CreateTransactionService)
        jest.clearAllMocks();
    })

    it('should create a new transaction', async () => {
        const createTransactionDTO: CreateTransactionDTO = {
            title: 'Test Transaction',
            price: 100,
            type: 'INCOME',
            category: 'Test Category',
            data: new Date()
        }

        const createdTransaction = {
          id: '123e4567-e89b-12d3-a456-426614174000',
          ...createTransactionDTO  
        }   
        
        transactionMockRepository.create.mockResolvedValue(createdTransaction);

        const result = await service.execute(createTransactionDTO);

        expect(transactionMockRepository.create).toHaveBeenCalledWith(createTransactionDTO);
        expect(transactionMockRepository.create).toHaveBeenCalledTimes(1);
        expect(result).toEqual(createdTransaction);

        
    })

})
