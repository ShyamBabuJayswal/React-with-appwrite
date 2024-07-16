import conf from "../conf/config.js";

import { Client,Account,ID } from "appwrite";

export class AuthService {
    client = new Client();
    account ;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
    }

    async createAccount({email,password,name})
    {
     
      const userAccount =  await this.account.create(ID.unique,email,password,name);
      if(userAccount){
        //call another method
      
      }
      else{
        return userAccount;
      }
    
    }  
}

const authService = new AuthService(
    
);

export default authService;

