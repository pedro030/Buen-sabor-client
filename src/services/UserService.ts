import { MUser } from "../models/MUser";
import { ApiService } from "./ApiService";

export class UserService extends ApiService<MUser> {
    endpoint = "users";

    async getUserByMail(mail: string):Promise<MUser>{
        return fetch(`${this.apiURL}/${this.endpoint}/getUserByEmail/${mail}`)
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }
}