import { UserDto } from "../dtos/user-dto"
import { UserModel } from "../entities/user-model.ts"

export abstract class UserRepository {
  abstract registerUser(userBody: UserDto): Promise<UserModel>
  abstract checkBalance(userId: string, amount: number): Promise<boolean>
  abstract updateUserBalance(userId: string, oldBalance: number, amount: number): Promise<UserModel>
  abstract getUsers(): Promise<UserModel[]>
  abstract getUserInfos(userId: string): Promise<UserModel>
}
