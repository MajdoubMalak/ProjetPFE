import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserSchema} from './user.model';
import {MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';



@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), 
  EmailModule,
  AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
