import { Injectable } from "@nestjs/common"

import { UserDto } from "../../dtos/user-dto"
import { UserModel } from "../../entities/user-model.ts"
import { UserRepository } from "../user-repository"
import { PrismaService } from "../../services/database/prisma.service"


@Injectable()
export class UserDb implements UserRepository {
  constructor(private prisma: PrismaService) { }

  async registerUser(userBody: UserDto): Promise<UserModel> {
    try {
      const newUser = await this.prisma.user.findUnique({
        where: {
          identity: userBody.identity,
        }
      })

      if (newUser) {
        throw new Error(`The user ${userBody.name} with identity: ${userBody.identity} already exists`)
      }
      
      
      const user =  await this.prisma.user.create({
        data: userBody
      })

      return user
    } catch (error) {
      console.error('Erro:', error)
      throw new Error(error)
    }
  }

  async updateUserBalance(userId: string, oldBalance: number, amount: number): Promise<UserModel> {
    try {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          balance: oldBalance + amount,
        },
      })
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }

  async checkBalance(userId: string, amount: number): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        }
      })

      if (!user) {
        throw new Error(`The user ${user} does not exist`)
      }

      return amount <= user.balance
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }

  async getUserInfos(userId: string): Promise<UserModel> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        }
      })

      if (!user) {
        throw new Error(`The user ${user} does not exist`)
      }

      return user
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }

  async getUsers(): Promise<UserModel[]> {
    try {
      return await this.prisma.user.findMany()
    } catch (error) {
      console.error('Error:', error)
      throw new Error(error)
    }
  }
}
