import { TransactionDto } from "../dtos/transaction-dto";
import { TransactionModel } from "../entities/transaction-model";

export abstract class TransactionRepository {
  abstract transaction(transactionBody: TransactionDto): Promise<TransactionModel>
  abstract getTransactions(): Promise<TransactionModel[]>
}
