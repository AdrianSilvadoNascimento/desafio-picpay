import { Body, Controller, Get, Post } from '@nestjs/common'

import { TransactionDto } from '../../dtos/transaction-dto'
import { TransactionModel } from '../../entities/transaction-model'
import { TransactionService } from '../../services/transaction/transaction.service'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post('do-transaction')
  async transaction(@Body() body: TransactionDto): Promise<TransactionModel> {
    return await this.transactionService.transaction(body)
  }

  @Get('get-transactions')
  async getTransactions(): Promise<TransactionModel[]> {
    return await this.transactionService.getTransactions()
  }
}
