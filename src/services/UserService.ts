import { MUser } from "../models/MUser";
import { ApiService } from "./ApiService";

export class UserService extends ApiService<MUser> {
    endpoint = "users";

    async getUserByMail(mail: string, token: string):Promise<MUser>{
        return fetch(`${this.apiURL}/${this.endpoint}/getUserByEmail/${mail}`,{
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }
}