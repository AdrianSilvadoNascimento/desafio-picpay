import { Injectable } from "@nestjs/common"

import { PrismaService } from "../../services/database/prisma.service"
import { TransactionRepository } from "../transaction-repository"
import { TransactionModel } from "../../entities/transaction-model"
import { TransactionDto } from "../../dtos/transaction-dto"
import { UserService } from "../../services/user/user.service"
import { AuthService } from "../../services/external-services/auth/auth.service"
import { NotificationMessageService } from "../../services/external-services/notification/notification.service"

@Injectable()
export class TransactionDb implements TransactionRepository {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationMessageService,
  ) {}

  async transaction(transactionBody: TransactionDto): Promise<TransactionModel> {
    try {
      const user = await this.userService.getUserInfos(transactionBody.sender)
      const receiver = await this.userService.getUserInfos(transactionBody.receiver)
      const checkBalance = await this.userService.checkBalance(transactionBody.sender, transactionBody.amount)
      
      if (user.type !== 'COMMON') {
        throw new Error('Invalid user type')
      }
      
      if (!checkBalance) {
        throw new Error('The sender does not have a valid balance')
      }
      
      const auth = await this.authService.checkAuth()
      const notification = await this.notificationService.checkNotification()

      if (!auth) {
        throw new Error('Authentication failed')
      } else if (!notification) {
        throw new Error('Notification failed')
      }

      this.userService.updateUserBalance(transactionBody.receiver, receiver.balance, transactionBody.amount)
      this.userService.updateUserBalance(transactionBody.sender, user.balance, -transactionBody.amount)
      
      return await this.prisma.transaction.create({
        data: transactionBody
      })
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }

  async getTransactions(): Promise<TransactionModel[]> {
    try {
      return await this.prisma.transaction.findMany()
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}