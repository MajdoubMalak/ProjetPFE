import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
    private authService: AuthService,
    private emailService: EmailService){}

    async  AddUser(username: string, email: string, password: string, gender: string, profilepicture: string, phoneNumber: string, age: number){
        const usernameexist = await this.userModel.findOne({username : username}).exec();
        const useremailexist = await  this.userModel.findOne({email: email}).exec();
        const userphoneexist =  await this.userModel.findOne({phoneNumber : phoneNumber}).exec();
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

        const newUser= new this.userModel({
            username: username,
            email: email.toLowerCase(), 
            password: password, 
            gender: gender, 
            profilePicture: profilepicture,
            phoneNumber: phoneNumber,
            age: age })
           
            const hashed = await this.authService.hashPassword(newUser.password);
            newUser.password = hashed;
            const saved_user = await newUser.save();
            const token = await this.authService.generateJWT(saved_user);
            console.log(token);
            return await token;
    //    const result= await  newUser.save();
    //        console.log(userphoneexist)
    //           console.log(result);
    //           return result.id as string;
        }     
     }
     async getAllUsers() {
        const result= await  this.userModel.find().exec(); 
        console.log(result);
  
       return result as User[]; 
     }
     async getSingleUser(id: string){
        const user= await this.findUser(id);
        if(!user){
         
            throw new NotFoundException('could not find the user');
            
        }
        return user;
    }

   async  updateUser(id: string, username: string, email: string,  phoneNumber: string,  gender: string, age: number,){
        const updateduser = await this.findUser(id);
      if (username){
         updateduser.username= username;
      }
      if (email){
        updateduser.email=email;
      }

      if (phoneNumber){
        updateduser.phoneNumber=phoneNumber;
      }
      if (age){
        updateduser.age=age;
      }
      if (gender){
        updateduser.gender=gender;
      }

      updateduser.save();
    }

    async updateprofilepic(id: string, profilepicture: string){
        const updateduser = await this.findUser(id);
        updateduser.profilePicture=profilepicture;
        updateduser.save()
    }

    async updateCodeNumber(id: string, codenumber: number){
        const updateuser = await this.findUser(id);
        updateuser.codeNumber = codenumber;
        updateuser.save();
    }

    async deleteUser(id: string){
        const result = await this.userModel.deleteOne({_id: id}).exec();
        console.log(result);
        if (result.n===0){
            throw new NotFoundException('Could not be deleted');
        }
       }

    async findUser(id: string): Promise<User> {
        let user;
        try{
         user = await this.userModel.findById(id);
        } catch (error){
            throw new NotFoundException('Could not find user');
        }
     return user;
    
    }

    async Login(username: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({username : username} ).exec();
        
        if(!user){
            return 'wrong username taped';
        }else{
            if (!user.activated){
                return 'Account not activated'
            }
            else{
            if(await this.authService.comparePasswords(password, user.password)){
                return  this.authService.generateJWT(user);
            }else{
                return 'wrong password inserted taped';
            } 
        }   
        }    
    }

    async checkEmailAccount (id: string): Promise<any>{
        const user= await this.findUser(id);
        const username=user.username;
        const useremail=user.email;
        const random=Math.random()*10000;
        const code = Math.round(random);
        console.log('random number: ', random);
        console.log(code);
       this.emailService.sendemail(username, useremail,code);
       user.codeNumber=code;
       user.save();
       return "Code number sent by email";
    }

    async activateAccount(id: string, codeNumber: number){
       const updateuser = await this.findUser(id);
       if(updateuser.codeNumber == codeNumber){
           updateuser.activated =true;
           updateuser.save();
           return 'account activated';
       }
       else {
           return 'wrong code';
       }
    }

}
