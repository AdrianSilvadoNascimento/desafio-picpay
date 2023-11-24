import { Injectable } from '@nestjs/common'

import { UserDto } from '../../dtos/user-dto'
import { UserModel } from '../../entities/user-model.ts'
import { UserRepository } from '../../repository/user-repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(userBody: UserDto): Promise<UserModel> {
    return await this.userRepository.registerUser(userBody)
  }

  async updateUserBalance(userId: string, oldBalance: number, amount: number): Promise<UserModel> {
    return await this.userRepository.updateUserBalance(userId, oldBalance, amount)
  }

  async checkBalance(userId: string, balance: number): Promise<boolean> {
    return await this.userRepository.checkBalance(userId, balance)
  }

  async getUsers(): Promise<UserModel[]> {
    return await this.userRepository.getUsers()
  }

  async getUserInfos(userId: string): Promise<UserModel> {
    return await this.userRepository.getUserInfos(userId)
  }
}
