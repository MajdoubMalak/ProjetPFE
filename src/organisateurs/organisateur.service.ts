import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { Organisator } from './organisateur.model';

@Injectable()
export class OrganisatorService {
    constructor(@InjectModel('Organisateur') private readonly organisatorModel: Model<Organisator>,
    private authService: AuthService){}

    async  AddOrganisator(username: string, email: string, password: string, company: string,region: string, category: string, phoneNumber: string, age: number){
        const usernameexist = await this.organisatorModel.findOne({username : username}).exec();
        const useremailexist = await  this.organisatorModel.findOne({email: email}).exec();
        const userphoneexist =  await this.organisatorModel.findOne({phoneNumber : phoneNumber}).exec();
        if(usernameexist){
         
            return await " user name exist !"
        }
           else if(useremailexist){
             
              return await " user email exist !"
           }
          else if(userphoneexist){
              return await " user phone number exist !"
         }
        else{

        const newOrganisator= new this.organisatorModel({
            username: username,
            email: email.toLowerCase(), 
            password: password, 
            company: company, 
            region:region,
            category: category,
            phoneNumber: phoneNumber,
            age: age })
           
            const hashed = await this.authService.hashPassword(newOrganisator.password);
            newOrganisator.password = hashed;
            console.log(newOrganisator);
            newOrganisator.save();
            return newOrganisator
            // const token = await this.authService.generateJWT(newOrganisateur);
            // console.log(token);
            // return await token;


        }     
     }
    }
    