import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { UserDto } from '../../dtos/user-dto';
import { UserModel } from '../../entities/user-model.ts';

const userDto: UserDto = {
  name: 'Adrian',
  email: 'adrian@email.com',
  balance: 50,
  identity: '12345678912',
  type: 'COMMON',
  password: '123456'
}

const userModel = new UserModel()
userModel.id = '6560ca29d8f790e41177ebb8',
userModel.name = 'Adrian',
userModel.email = 'adrian@email.com',
userModel.balance = 50,
userModel.identity = '12345678912',
userModel.type = 'COMMON',
userModel.password = '123456'

const userList: UserModel[] = [
  userModel,
  userModel,
  userModel,
  userModel,
]

describe('UserController', () => {
  let service: UserService
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          registerUser: jest.fn().mockResolvedValue(userModel),
          getUsers: jest.fn().mockResolvedValue(userList)
        }
      }]
    }).compile()

    service = module.get<UserService>(UserService)
    controller = module.get<UserController>(UserController)
  })

  it('should service be defined', () => {
    expect(service).toBeDefined()
  })

  it('should register user', async () => {
    // Arrange

    // Act
    const user = await service.registerUser(userDto)

    // Asset
    expect(user).toHaveProperty('id')
  })
  
  it('should not register duplicate users', async () => {
    // Arrange

    
    // Act
    const user = await service.registerUser(userDto)
    const newUser = await service.registerUser(userDto)

    // Assert
    expect(user.identity).toBe(newUser.identity)
    expect(user.email).toBe(newUser.email)
  })

  it('should get users', async () => {
    // Arrange

    // Act
    const userList = await service.getUsers()

    // Assert
    expect(userList).toEqual(userList)
    expect(typeof userList).toEqual('object')
    expect(service.getUsers).toHaveBeenCalledTimes(1)
  })
})
