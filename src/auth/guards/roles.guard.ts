import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "src/user/user.model";
import { UserService } from "src/user/user.service";
import { map } from "rxjs/operators";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @Inject (forwardRef(() => UserService))
              private userService: UserService
              ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: User = request.user.user;
      
       console.log(user.role);
              console.log( roles.indexOf(user.role) );
               const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;
                console.log(hasRole());  
                if (hasRole()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            
        
    }
   

        
   
    }

