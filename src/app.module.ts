import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionService } from './services/transaction/transaction.service';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { NotificationService } from './services/notification/notification.service';
import { UserRepository } from './repository/user-repository';
import { UserDb } from './repository/prisma/user-db';
import { TransactionRepository } from './repository/transaction-repository';
import { TransactionDb } from './repository/prisma/transaction-db';
import { PrismaService } from './services/database/prisma.service';
import { AuthService } from './services/external-services/auth/auth.service';
import { NotificationMessageService } from './services/external-services/notification/notification.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TransactionController],
  providers: [
    AppService,
    PrismaService,
    TransactionService,
    UserService,
    NotificationService,
    NotificationMessageService,
    {
      provide: UserRepository,
      useClass: UserDb,
    },
    {
      provide: TransactionRepository,
      useClass: TransactionDb,
    },
    AuthService
  ],
})
export class AppModule { }
