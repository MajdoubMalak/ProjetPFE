import { Body, Controller, Post} from '@nestjs/common';
import { OrganisatorService } from './organisateur.service';




@Controller('organisator')
export class OrganisatorController {
    constructor(private readonly organisateurService: OrganisatorService){}  

    @Post()
    async addOrganisateur(
    @Body('username') username: string, 
    @Body('email') useremail: string,
    @Body('password') userpassword: string,
    @Body('societe') usercompany: string,
    @Body('region') userregion: string,
    @Body('categorie') usercategory: string,
    @Body('phoneNumber') userphonenumber: string,
    @Body('age') userage: number,
    ){   
       
    const user = await this.organisateurService.AddOrganisator(username,  useremail, userpassword, usercompany,userregion, usercategory,userphonenumber, userage);
        return user;
    }
}