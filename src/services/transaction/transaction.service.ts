import { Injectable } from '@nestjs/common'

import { TransactionDto } from '../../dtos/transaction-dto'
import { TransactionModel } from '../../entities/transaction-model'
import { TransactionRepository } from '../../repository/transaction-repository'
import { UserModel } from '../../entities/user-model.ts'

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  
  async transaction(transactionBody: TransactionDto): Promise<TransactionModel> {
    return await this.transactionRepository.transaction(transactionBody)
  }

  async getTransactions(): Promise<TransactionModel[]> {
    return await this.transactionRepository.getTransactions()
  }
}
