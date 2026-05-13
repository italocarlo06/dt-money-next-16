import { CreateTransactionService } from "./create-transaction.service";
import { DeleteTransactionService } from "./delete-transaction.service";
import { FindTransactionByIdService } from "./find-transaction-by-id.service";
import { GetTransactionsService } from "./get-transactions.service";
import { UpdateTransactionService } from "./update-transaction.service";

export const transactionServices = [
    CreateTransactionService,
    DeleteTransactionService,
    FindTransactionByIdService,
    GetTransactionsService,
    UpdateTransactionService
];