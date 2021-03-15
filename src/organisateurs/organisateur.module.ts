import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { OrganisatorController } from './organisateur.controller';
import { OrganisatorSchema } from './organisateur.model';
import { OrganisatorService } from './organisateur.service';



@Module({
  imports: [MongooseModule.forFeature([{name: 'Organisateur', schema: OrganisatorSchema}]), 
  EmailModule,
  AuthModule],
  providers: [OrganisatorService],
  controllers: [OrganisatorController],
  exports: [OrganisatorService]
})
export class OrganisateurModule {}