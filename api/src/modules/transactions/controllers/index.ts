
import { CreateTransactionController } from "./create-transaction.controller";
import { DeleteTransactionController } from "./delete-transaction.controller";
import { FindTransactionByIdController } from "./find-transaction-by-id.controller";
import { GetTransactionsController } from "./get-transactions.controller";
import { UpdateTransactionController } from "./update-transaction.controller";

export const transactionsControllers = [
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionsController,
    FindTransactionByIdController,
    UpdateTransactionController
]