import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  
  async sendemail( username: string, usermail: string, code:number)
   {
     const paramusername= username;
     const paramusermail=usermail;
     const paramcode=code;
    this
      .mailerService
      .sendMail({
        to: paramusermail, // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        //text:'hello',
        html: '<b>welcome to our EventApp</b> '+`${paramusername}`+'<b>votre code est: <b>'+`${paramcode}`, // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }
}